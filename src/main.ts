import init, { repair_zip, RepairResult } from './pkg/zipkirei.js';
import wasmUrl from './pkg/zipkirei_bg.wasm?url';
import { initLanguage, setLanguage, t } from './i18n.js';

// Register theme change listener (initial theme config is handled inline by index.html)
function initTheme() {
  // Real-time system theme change listener
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  });
}

// Run theme listener registration
initTheme();

// GTag (Google Analytics) Dynamic Initialization
const gtagId = import.meta.env.VITE_GTAG_ID;
if (gtagId) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', gtagId);
}

// State Interface
interface AppState {
  selectedFile: File | null;
  repairedBlob: Blob | null;
  repairedFileName: string;
}

// Global state
const state: AppState = {
  selectedFile: null,
  repairedBlob: null,
  repairedFileName: '',
};

let wasmInitialized = false;

// Shared Helpers
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error || new Error('Failed to read file.'));
    reader.readAsArrayBuffer(file);
  });
}

function getRequiredElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id) as T | null;
  if (!element) {
    throw new Error(`Required DOM element with id "${id}" was not found.`);
  }
  return element;
}

// Format file size
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Initialize WASM
async function initializeWasm() {
  const logOutput = document.getElementById('log-output');
  try {
    // Start initial loading of WebAssembly
    await init(wasmUrl);
    wasmInitialized = true;
    console.log('zipkirei WebAssembly initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize zipkirei WebAssembly:', err);
    if (logOutput) {
      logOutput.textContent = `[System Error] Failed to initialize WebAssembly engine:\n${getErrorMessage(err)}`;
    }
  }
}

// Setup Event Listeners
function setupApp() {
  let dropZone: HTMLDivElement;
  let fileInput: HTMLInputElement;
  let fileDetails: HTMLDivElement;
  let fileNameElem: HTMLParagraphElement;
  let fileSizeElem: HTMLSpanElement;
  let appSettings: HTMLDivElement;
  let repairResults: HTMLDivElement;
  let logOutput: HTMLPreElement;
  let repairBtn: HTMLButtonElement;
  let previewBtn: HTMLButtonElement;
  let optNoExclude: HTMLInputElement;
  let resetBtn: HTMLButtonElement;
  let statusSuccess: HTMLDivElement;
  let statusError: HTMLDivElement;
  let errorMessage: HTMLParagraphElement;
  let downloadBtn: HTMLButtonElement;
  let copyCmdBtn: HTMLButtonElement;
  
  let toggleLogsBtn: HTMLButtonElement;
  let toggleLogsText: HTMLSpanElement;
  let toggleLogsChevron: SVGElement | null;
  let logContainer: HTMLDivElement;
  let isExecuting = false;

  // Language switcher buttons
  const btnJa = document.getElementById('lang-btn-ja');
  const btnEn = document.getElementById('lang-btn-en');
  const btnKo = document.getElementById('lang-btn-ko');
  const btnZh = document.getElementById('lang-btn-zh');

  // Critical UI elements safety load guard
  try {
    dropZone = getRequiredElement<HTMLDivElement>('drop-zone');
    fileInput = getRequiredElement<HTMLInputElement>('file-input');
    fileDetails = getRequiredElement<HTMLDivElement>('file-details');
    fileNameElem = getRequiredElement<HTMLParagraphElement>('file-name');
    fileSizeElem = getRequiredElement<HTMLSpanElement>('file-size');
    appSettings = getRequiredElement<HTMLDivElement>('app-settings');
    repairResults = getRequiredElement<HTMLDivElement>('repair-results');
    logOutput = getRequiredElement<HTMLPreElement>('log-output');
    repairBtn = getRequiredElement<HTMLButtonElement>('repair-btn');
    previewBtn = getRequiredElement<HTMLButtonElement>('preview-btn');
    optNoExclude = getRequiredElement<HTMLInputElement>('opt-no-exclude');
    resetBtn = getRequiredElement<HTMLButtonElement>('reset-btn');
    statusSuccess = getRequiredElement<HTMLDivElement>('status-success');
    statusError = getRequiredElement<HTMLDivElement>('status-error');
    errorMessage = getRequiredElement<HTMLParagraphElement>('error-message');
    downloadBtn = getRequiredElement<HTMLButtonElement>('download-btn');
    copyCmdBtn = getRequiredElement<HTMLButtonElement>('copy-cmd-btn');
    
    toggleLogsBtn = getRequiredElement<HTMLButtonElement>('toggle-logs-btn');
    toggleLogsText = getRequiredElement<HTMLSpanElement>('toggle-logs-text');
    logContainer = getRequiredElement<HTMLDivElement>('log-container');
    
    // Optional / non-critical elements
    toggleLogsChevron = document.getElementById('toggle-logs-chevron') as SVGElement | null;
  } catch (err) {
    console.error('Critical UI elements missing from DOM. App initialization aborted:', err);
    return;
  }

  btnJa?.addEventListener('click', () => setLanguage('ja'));
  btnEn?.addEventListener('click', () => setLanguage('en'));
  btnKo?.addEventListener('click', () => setLanguage('ko'));
  btnZh?.addEventListener('click', () => setLanguage('zh'));

  // Trigger file selection via click on drop-zone
  dropZone.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle file select
  fileInput.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      handleFileSelection(target.files[0]);
    }
  });

  // Drag & drop state classes to prevent styling conflicts
  const normalClasses = ['border-slate-300', 'dark:border-slate-700', 'bg-slate-50/55', 'dark:bg-slate-950/40'];
  const activeClasses = ['border-indigo-500', 'bg-indigo-500/10', 'dark:bg-indigo-500/10'];

  // Drag & drop events
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.remove(...normalClasses);
    dropZone.classList.add(...activeClasses);
  });

  const resetDragState = () => {
    dropZone.classList.remove(...activeClasses);
    dropZone.classList.add(...normalClasses);
  };

  dropZone.addEventListener('dragleave', resetDragState);

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    resetDragState();
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.toLowerCase().endsWith('.zip')) {
        handleFileSelection(file);
      } else {
        alert('Please select a valid .zip file.');
      }
    }
  });

  function handleFileSelection(file: File) {
    state.selectedFile = file;
    state.repairedBlob = null;

    // Update Details
    fileNameElem.textContent = file.name;
    fileSizeElem.textContent = formatBytes(file.size);

    // Show details & settings, hide dropzone contents details
    fileDetails.classList.remove('hidden');
    appSettings.classList.remove('hidden');
    
    // Hide previous results
    repairResults.classList.add('hidden');
    statusSuccess.classList.add('hidden');
    statusError.classList.add('hidden');

    // Scroll smoothly to settings
    setTimeout(() => {
      appSettings.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  // Reset to initial state
  resetBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents opening file browser
    state.selectedFile = null;
    state.repairedBlob = null;
    fileInput.value = '';
    
    fileDetails.classList.add('hidden');
    appSettings.classList.add('hidden');
    repairResults.classList.add('hidden');
    statusSuccess.classList.add('hidden');
    statusError.classList.add('hidden');

    // Reset log accordion state
    logContainer.classList.add('hidden');
    toggleLogsChevron?.classList.remove('rotate-180');
    toggleLogsText.setAttribute('data-i18n', 'toggleShowLogs');
    toggleLogsText.textContent = t('toggleShowLogs');
  });

  // Common ZIP repair and preview logic
  async function executeRepair(dryRun: boolean) {
    if (!state.selectedFile) return;
    if (isExecuting) return;

    if (!wasmInitialized) {
      await initializeWasm();
      if (!wasmInitialized) {
        alert('WebAssembly engine is still loading or failed to load. Please refresh.');
        return;
      }
    }

    isExecuting = true;

    // Options
    const notUtf8 = (document.getElementById('opt-not-utf8') as HTMLInputElement | null)?.checked || false;
    const keepBackslashes = (document.getElementById('opt-keep-backslashes') as HTMLInputElement | null)?.checked || false;
    const noDefaultExclude = optNoExclude.checked;

    let result: RepairResult | null = null;
    try {
      logOutput.textContent = `[Processing] Reading ZIP file data (${formatBytes(state.selectedFile.size)})...\n`;
      
      // Async FileReader reading using Promise wrapper
      const buffer = await readFileAsArrayBuffer(state.selectedFile);
      const zipData = new Uint8Array(buffer);

      logOutput.textContent = `[Processing] Executing repairs in WebAssembly engine...\n`;
      
      // Execute Rust WASM core
      result = repair_zip(zipData, dryRun, notUtf8, keepBackslashes, noDefaultExclude);

      // Show results box
      repairResults.classList.remove('hidden');
      logOutput.textContent = result.log || 'Success: No logs returned.';
      
      if (dryRun) {
        // Dry Run success logic
        statusSuccess.classList.add('hidden');
        downloadBtn.classList.add('hidden');
        statusError.classList.add('hidden');

        // Automatically expand and show preview logs
        logContainer.classList.remove('hidden');
        toggleLogsChevron?.classList.add('rotate-180');
        toggleLogsText.setAttribute('data-i18n', 'toggleHideLogs');
        toggleLogsText.textContent = t('toggleHideLogs');
      } else {
        // Actual repair success logic
        const repairedData = result.data;
        state.repairedBlob = new Blob([repairedData.buffer as ArrayBuffer], { type: 'application/zip' });
        
        // Generate new file name
        const baseName = state.selectedFile.name.substring(0, state.selectedFile.name.lastIndexOf('.')) || state.selectedFile.name;
        state.repairedFileName = `${baseName}_kirei.zip`;

        statusSuccess.classList.remove('hidden');
        const successDescElem = statusSuccess.querySelector('[data-i18n="successDesc"]') as HTMLElement | null;
        if (successDescElem) {
          successDescElem.textContent = t('successDesc');
        }
        downloadBtn.classList.remove('hidden');
        statusError.classList.add('hidden');
      }

      // Scroll smoothly to results
      setTimeout(() => {
        repairResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);

    } catch (err: unknown) {
      const errMsg = getErrorMessage(err);
      console.error('Repair execution failed:', err);
      repairResults.classList.remove('hidden');
      statusSuccess.classList.add('hidden');
      statusError.classList.remove('hidden');
      errorMessage.textContent = errMsg;
      logOutput.textContent += `\n\n[ERROR] Repair failed:\n${errMsg}`;
      
      setTimeout(() => {
        statusError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } finally {
      // Free Rust WASM memory if allocated
      if (result) {
        result.free();
      }
      
      isExecuting = false;
    }
  }

  // Handle Repair & Preview clicks
  repairBtn.addEventListener('click', () => executeRepair(false));
  previewBtn.addEventListener('click', () => executeRepair(true));

  // Toggle execution logs
  toggleLogsBtn.addEventListener('click', () => {
    const isHidden = logContainer.classList.contains('hidden');
    if (isHidden) {
      logContainer.classList.remove('hidden');
      toggleLogsChevron?.classList.add('rotate-180');
      toggleLogsText.setAttribute('data-i18n', 'toggleHideLogs');
      toggleLogsText.textContent = t('toggleHideLogs');
    } else {
      logContainer.classList.add('hidden');
      toggleLogsChevron?.classList.remove('rotate-180');
      toggleLogsText.setAttribute('data-i18n', 'toggleShowLogs');
      toggleLogsText.textContent = t('toggleShowLogs');
    }
  });

  // Download Trigger
  downloadBtn.addEventListener('click', () => {
    if (!state.repairedBlob) return;
    
    const url = URL.createObjectURL(state.repairedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.repairedFileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  });

  // Copy cargo command
  copyCmdBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('cargo install zipkirei').then(() => {
      // Temporary tooltip / checkmark animation
      const origSvg = copyCmdBtn.innerHTML;
      copyCmdBtn.innerHTML = `
        <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
        </svg>
      `;
      setTimeout(() => {
        copyCmdBtn.innerHTML = origSvg;
      }, 1500);
    });
  });
}

// Main execution
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  setupApp();
  initializeWasm();
});
