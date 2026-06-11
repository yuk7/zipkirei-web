export type Language = 'en' | 'ja' | 'ko' | 'zh';

export interface TranslationDict {
  title: string;
  seoTitle: string;
  seoDescription: string;
  subtitle: string;
  tagline: string;
  offlineBadge: string;
  offlineDesc: string;
  trustLocalTitle: string;
  trustLocalDesc: string;
  trustOriginalTitle: string;
  trustOriginalDesc: string;
  trustPayloadTitle: string;
  trustPayloadDesc: string;
  
  // App section
  dropZoneTitle: string;
  dropZoneSub: string;
  selectedFile: string;
  fileSize: string;
  optionsTitle: string;
  optionNotUtf8: string;
  optionNotUtf8Desc: string;
  optionKeepBackslashes: string;
  optionKeepBackslashesDesc: string;
  optionNoExclude: string;
  optionNoExcludeDesc: string;
  
  btnRepair: string;
  btnRepairing: string;
  btnPreview: string;
  btnPreviewing: string;
  btnDownload: string;
  btnReset: string;
  
  logTitle: string;
  toggleShowLogs: string;
  toggleHideLogs: string;
  successTitle: string;
  successDesc: string;
  errorTitle: string;
  
  // CLI section
  cliTitle: string;
  cliDesc: string;
  cliSpeedNote: string;
  cliInstallCargo: string;
  cliBinaryDownload: string;
  cliGitHubBtn: string;
  
  // Explanation section
  whyTitle: string;
  whyNfdTitle: string;
  whyNfdDesc: string;
  whyUtf8Title: string;
  whyUtf8Desc: string;
  whyJunkTitle: string;
  whyJunkDesc: string;
  whyFooter: string;
  speedTitle: string;
  speedDesc: string;
  limitationsTitle: string;
  limitationsDesc: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    title: "zipkirei",
    seoTitle: "zipkirei - Clean & Repair macOS ZIP Archives",
    seoDescription: "Fix garbled filenames, decomposed Unicode letters (NFD), and strip macOS junk files like __MACOSX and .DS_Store from your ZIP files. ZIP processing runs locally in your browser.",
    subtitle: "Clean up & repair problematic macOS ZIP archives instantly",
    tagline: "Are you troubled by garbled filenames, decomposed Unicode characters (NFD), or mysterious junk files in ZIP archives received from Mac users?",
    offlineBadge: "100% Local ZIP Processing",
    offlineDesc: "All processing is completed entirely within your browser using WebAssembly. Your ZIP files are never sent to external servers.",
    trustLocalTitle: "Runs locally in your browser",
    trustLocalDesc: "The ZIP is processed with WebAssembly on this page.\nIt is not uploaded to an external server.",
    trustOriginalTitle: "Keeps your original ZIP",
    trustOriginalDesc: "The web version writes a repaired ZIP as a new download.\nThe file you selected is not modified.",
    trustPayloadTitle: "No unpacking or recompressing",
    trustPayloadDesc: "zipkirei repairs filenames and ZIP metadata without extracting or recompressing the files inside.",
    
    dropZoneTitle: "Drag & drop your ZIP file here",
    dropZoneSub: "or click to select a file",
    selectedFile: "Selected file",
    fileSize: "File Size",
    optionsTitle: "Repair Options",
    optionNotUtf8: "Disable UTF-8 Fixes",
    optionNotUtf8Desc: "Skip filename encoding fixes and only apply other cleanup steps.",
    optionKeepBackslashes: "Keep Backslashes (\\)",
    optionKeepBackslashesDesc: "Preserve backslashes (\\) in file paths instead of converting them to forward slashes (/).",
    optionNoExclude: "Do Not Remove Junk Files",
    optionNoExcludeDesc: "Keep hidden system files like .DS_Store or the __MACOSX folder.",
    
    btnRepair: "Repair ZIP Now",
    btnRepairing: "Repairing in WebAssembly...",
    btnPreview: "Preview Changes",
    btnPreviewing: "Analyzing ZIP...",
    btnDownload: "Download Repaired ZIP",
    btnReset: "Repair Another File",
    
    logTitle: "Execution Logs",
    toggleShowLogs: "Show Execution Logs",
    toggleHideLogs: "Hide Execution Logs",
    successTitle: "ZIP Repaired Successfully!",
    successDesc: "Your cleaned ZIP is ready for download.",
    errorTitle: "Failed to repair ZIP",
    
    cliTitle: "Use the CLI for large files or frequent repairs",
    cliDesc: "The web version uses zipkirei running in your browser to create a cleaned ZIP without installing anything.\nFor very large files, repeated use, scripting, or direct local repair, use the CLI version.",
    cliSpeedNote: "The CLI can also repair a ZIP by directly rewriting only the changed parts on your computer.\nIt is better suited to heavier workflows because it can use optimized I/O and processing, more detailed options, and does not require opening the web page.",
    cliInstallCargo: "Install with Rust Cargo",
    cliBinaryDownload: "Download Pre-built Binaries",
    cliGitHubBtn: "View on GitHub",
    
    whyTitle: "What zipkirei fixes",
    whyNfdTitle: "2. Split Unicode characters",
    whyNfdDesc: "ZIP files made on macOS can contain filenames in a decomposed Unicode form.\nOn other systems, accents and marks may appear separated from the base letter, such as “cafe´” instead of “café”.",
    whyUtf8Title: "1. Garbled filenames",
    whyUtf8Desc: "Some ZIP files do not clearly mark filename encoding.\nWhen that happens, Windows or other extraction tools may guess wrong and show unreadable names.",
    whyJunkTitle: "3. Unnecessary System Metadata & Junk Files",
    whyJunkDesc: "ZIP archives often contain hidden system files like .DS_Store, __MACOSX, or Thumbs.db.\nThese are completely redundant on other operating systems and serve only to clutter your folder structures.",
    whyFooter: "By default, zipkirei marks filenames as UTF-8, normalizes decomposed Unicode filenames into a more compatible form, cleans path separators, and removes common hidden system files such as .DS_Store, __MACOSX, Thumbs.db, and desktop.ini.",
    speedTitle: "Why it can be fast",
    speedDesc: "zipkirei does not extract the ZIP and compress it again from scratch.\nIt keeps the compressed file data inside the ZIP as-is and repairs the ZIP metadata around it, such as filenames and entry lists.\nBecause file data is left untouched, ZipCrypto and AES-256 password-protected ZIPs work in confirmed cases.",
    limitationsTitle: "Limitations",
    limitationsDesc: "Split multi-part ZIP archives are not supported.\nFilename fixes require filenames that can be read as valid UTF-8.\nIf you are unsure, use Preview Changes (dry-run) first to see what zipkirei plans to change.",
  },
  ja: {
    title: "zipkirei",
    seoTitle: "zipkirei - macOS ZIPの文字化け・OSの不要ファイルを簡単綺麗に",
    seoDescription: "ZIPファイルの文字化け、NFDの分解文字、__MACOSXや.DS_Storeなどの不要ファイルを簡単に綺麗に修正・除去します。ZIP処理はブラウザ内でローカルに実行されます。",
    subtitle: "ZIPファイルの文字化け・ゴミファイルを簡単綺麗に",
    tagline: "Macユーザーから受け取ったZIPファイルの文字化け、文字の分解(NFD)、OSの不要なファイルに悩んでいませんか？",
    offlineBadge: "ZIP処理は100%ローカル",
    offlineDesc: "すべての処理はブラウザ内の WebAssembly で完結します。ZIPファイルが外部サーバーに送信されることは一切ありません。",
    trustLocalTitle: "ブラウザ内でローカル処理",
    trustLocalDesc: "ZIPはこのページ上のWebAssemblyで処理されます。\n外部サーバーへアップロードされません。",
    trustOriginalTitle: "元のZIPは変更しません",
    trustOriginalDesc: "Web版は修復済みZIPを新しいファイルとして生成します。\n選択した元ファイルは書き換えません。",
    trustPayloadTitle: "解凍・再圧縮しません",
    trustPayloadDesc: "zipkireiはZIP内のファイル本体を解凍・再圧縮せず、ファイル名やZIPメタデータを修復します。",
    
    dropZoneTitle: "ここにZIPファイルをドラッグ＆ドロップ",
    dropZoneSub: "または クリックしてファイルを選択",
    selectedFile: "選択されたファイル",
    fileSize: "ファイルサイズ",
    optionsTitle: "修復オプション",
    optionNotUtf8: "UTF-8関連の修正をしない",
    optionNotUtf8Desc: "ファイル名のUTF-8指定やUnicode文字の整形を行わず、不要ファイルの除去などだけを行います。",
    optionKeepBackslashes: "パス区切りをそのままにする",
    optionKeepBackslashesDesc: "ZIP内のファイルパスに含まれる \\ を / に直さず、そのまま保持します。",
    optionNoExclude: "ゴミファイルを除去しない",
    optionNoExcludeDesc: ".DS_Store や __MACOSX などの隠しファイルを除去せず保持します。",
    
    btnRepair: "ZIPを修復する",
    btnRepairing: "WebAssemblyで修復中...",
    btnPreview: "修復内容をプレビュー",
    btnPreviewing: "プレビュー処理中...",
    btnDownload: "修復されたZIPをダウンロード",
    btnReset: "別のファイルを修復",
    
    logTitle: "実行ログ",
    toggleShowLogs: "実行ログを表示する",
    toggleHideLogs: "実行ログを非表示にする",
    successTitle: "ZIPの修復に成功しました！",
    successDesc: "クリーンアップされたZIPファイルの準備ができました。",
    errorTitle: "ZIPの修復に失敗しました",
    
    cliTitle: "大容量ファイルや常用にはCLI版",
    cliDesc: "Web版では、ブラウザ上で動くzipkireiを使って、インストール不要で修復済みZIPを作れます。\nもっと手軽に繰り返し使いたい場合や、大容量ファイル、スクリプト処理、ローカルでの直接修復にはCLI版をご利用ください。",
    cliSpeedNote: "CLI版では、手元のZIPファイルを直接差分のみ書き換える修復もできます。\n最適化されたI/Oや処理、より細かなオプションを使え、Webページを開かずに実行できるため、重い作業や継続利用に向いています。",
    cliInstallCargo: "Rust Cargo でインストール",
    cliBinaryDownload: "実行バイナリをダウンロード",
    cliGitHubBtn: "GitHubで見る",
    
    whyTitle: "このようなZIPファイルの問題を修正します",
    whyNfdTitle: "2. Unicode文字がバラバラに分解されたファイル名",
    whyNfdDesc: "macOSで作成されたZIPでは、ファイル名が分解されたUnicode形式で保存されることがあります。\nWindowsなどで開いたとき、「にほんご.txt」が「にほんこ゛.txt」のように濁点の離れた形に見える原因になります。",
    whyUtf8Title: "1. ファイル名の文字化け",
    whyUtf8Desc: "ZIP内でファイル名の文字コードが明示されていないと、Windowsなどの展開ツールが読み方を間違えてしまいます。\nその結果、ファイル名が文字化けすることがあります。",
    whyJunkTitle: "3. 不要な隠しファイル",
    whyJunkDesc: "ZIPファイルには .DS_Store, __MACOSX, Thumbs.db のようなゴミファイルが含まれることがあります。\nこれらは他のOSでは一切不要で、フォルダ内が散らかる原因になります。",
    whyFooter: "デフォルトでは、ファイル名をUTF-8として読めるようにし、分解されたUnicodeファイル名を互換性の高い形に整え、ZIP内のパス表記も整理します。\nさらに .DS_Store、__MACOSX、Thumbs.db、desktop.ini などの不要な隠しファイルを除去します。",
    speedTitle: "なぜ速いのか",
    speedDesc: "zipkireiはZIPをいったん展開して、もう一度圧縮し直すツールではありません。\nZIP内の圧縮済みファイルデータはそのままに、ファイル名やエントリ一覧などのZIPメタデータを修復します。\nファイルデータには触れないため、確認済みの範囲ではZipCryptoやAES-256で暗号化されたパスワード付きZIPにも対応します。",
    limitationsTitle: "制限事項",
    limitationsDesc: "分割されたZIPファイルには対応していません。\nファイル名修正では、元のファイル名がUTF-8として正しく読める必要があります。\n不安な場合は、先にプレビュー(dry-run)でファイル名が正しく表示されているか修復内容を確認してください。"
  },
  ko: {
    title: "zipkirei",
    seoTitle: "zipkirei - macOS ZIP 파일 글자 깨짐 및 쓰레기 파일 정리",
    seoDescription: "ZIP 파일의 깨진 파일명, NFD 분해 문자, __MACOSX 및 .DS_Store 같은 불필요한 파일을 복구하고 제거합니다. ZIP 처리는 브라우저 안에서 로컬로 실행됩니다.",
    subtitle: "맥(macOS) ZIP 파일 글자 깨짐 및 자소 분리 즉시 해결",
    tagline: "맥(Mac) 사용자에게 받은 ZIP 파일의 한글 깨짐, 자소 분리(자음·모음 분리), 또는 알 수 없는 시스템 휴지통 파일로 인해 불편을 겪고 계신가요?",
    offlineBadge: "ZIP 처리는 100% 로컬",
    offlineDesc: "모든 처리는 웹 브라우저 내부에서 WebAssembly를 통해 완료됩니다. ZIP 파일은 외부 서버로 절대 전송되지 않습니다.",
    trustLocalTitle: "브라우저 안에서 로컬 처리",
    trustLocalDesc: "ZIP은 이 페이지의 WebAssembly로 처리됩니다.\n외부 서버로 업로드되지 않습니다.",
    trustOriginalTitle: "원본 ZIP은 변경하지 않음",
    trustOriginalDesc: "웹 버전은 복구된 ZIP을 새 다운로드 파일로 생성합니다.\n선택한 원본 파일은 수정하지 않습니다.",
    trustPayloadTitle: "압축을 풀고 다시 만들지 않음",
    trustPayloadDesc: "zipkirei는 ZIP 안의 파일 본문을 압축 해제하거나 다시 압축하지 않고, 파일명과 ZIP 메타데이터를 복구합니다.",
    
    dropZoneTitle: "여기에 ZIP 파일을 드래그 앤 드롭하세요",
    dropZoneSub: "또는 클릭하여 기기에서 파일 선택",
    selectedFile: "선택된 파일",
    fileSize: "파일 크기",
    optionsTitle: "복구 옵션",
    optionNotUtf8: "UTF-8 관련 수정 건너뛰기",
    optionNotUtf8Desc: "파일명의 UTF-8 지정이나 Unicode 문자 정리는 건너뛰고, 불필요한 파일 제거 등만 적용합니다.",
    optionKeepBackslashes: "경로 구분자를 그대로 유지",
    optionKeepBackslashesDesc: "ZIP 안의 파일 경로에 있는 \\ 를 / 로 바꾸지 않고 그대로 둡니다.",
    optionNoExclude: "시스템 쓰레기 파일 유지",
    optionNoExcludeDesc: ".DS_Store 또는 __MACOSX 폴더 같은 숨김 파일을 제거하지 않고 보존합니다.",
    
    btnRepair: "ZIP 파일 복구하기",
    btnRepairing: "WebAssembly로 복구 중...",
    btnPreview: "복구 내용 미리보기",
    btnPreviewing: "ZIP 파일 분석 중...",
    btnDownload: "복구된 ZIP 다운로드",
    btnReset: "다른 파일 복구하기",
    
    logTitle: "실행 로그",
    toggleShowLogs: "실행 로그 보기",
    toggleHideLogs: "실행 로그 숨기기",
    successTitle: "ZIP 파일 복구 성공!",
    successDesc: "깨끗하게 정리된 ZIP 파일이 준비되었습니다.",
    errorTitle: "ZIP 파일 복구 실패",
    
    cliTitle: "대용량 파일이나 반복 작업에는 CLI 버전",
    cliDesc: "웹 버전에서는 브라우저에서 실행되는 zipkirei로 설치 없이 정리된 ZIP을 만들 수 있습니다.\n더 편하게 반복해서 쓰거나, 대용량 파일, 스크립트 처리, 로컬 파일 직접 복구가 필요하다면 CLI 버전을 사용하세요.",
    cliSpeedNote: "CLI 버전은 로컬 ZIP 파일에서 변경이 필요한 부분만 직접 다시 쓰는 복구도 지원합니다.\n최적화된 I/O와 처리, 더 세부적인 옵션을 사용할 수 있고 웹 페이지를 열 필요가 없어, 무거운 작업이나 지속적인 사용에 더 적합합니다.",
    cliInstallCargo: "Rust Cargo로 설치",
    cliBinaryDownload: "컴파일된 바이너리 다운로드",
    cliGitHubBtn: "GitHub에서 보기",
    
    whyTitle: "zipkirei가 해결하는 문제",
    whyUtf8Title: "1. 깨진 파일명",
    whyUtf8Desc: "ZIP 안에서 파일명 인코딩이 명확히 표시되어 있지 않으면, Windows 같은 압축 해제 도구가 잘못 해석할 수 있습니다.\n그 결과 파일명이 깨져 보일 수 있습니다.",
    whyNfdTitle: "2. Unicode 문자가 분리된 파일명",
    whyNfdDesc: "macOS에서 만든 ZIP에는 파일명이 분해된 Unicode 형태로 저장될 수 있습니다.\n다른 환경에서 열면 “한글.txt”가 “ㅎㅏㄴㄱㅡㄹ.txt”처럼 자모가 분리되어 보이는 원인이 됩니다.",
    whyJunkTitle: "3. 불필요한 숨김 파일",
    whyJunkDesc: "ZIP 안에는 .DS_Store, __MACOSX, Thumbs.db 같은 시스템용 파일이 섞일 수 있습니다.\n받는 사람에게는 필요 없고 폴더를 지저분하게 보이게 합니다.",
    whyFooter: "기본적으로 zipkirei는 파일명을 UTF-8로 읽을 수 있도록 표시하고, 분해된 Unicode 파일명을 호환성이 높은 형태로 정리하며, ZIP 안의 경로 표기도 정리합니다.\n또한 .DS_Store, __MACOSX, Thumbs.db, desktop.ini 같은 불필요한 숨김 파일을 제거합니다.",
    speedTitle: "왜 빠른가",
    speedDesc: "zipkirei는 ZIP을 풀고 다시 압축하는 도구가 아닙니다.\nZIP 안의 압축된 파일 데이터는 그대로 두고, 파일명과 엔트리 목록 같은 ZIP 메타데이터를 복구합니다.\n파일 데이터는 건드리지 않기 때문에, 확인된 범위에서는 ZipCrypto나 AES-256으로 암호화된 비밀번호 ZIP도 처리할 수 있습니다.",
    limitationsTitle: "제한 사항",
    limitationsDesc: "분할된 ZIP 파일은 지원하지 않습니다.\n파일명 수정은 원래 파일명이 UTF-8로 올바르게 읽힐 때 적용됩니다.\n확실하지 않다면 먼저 미리보기(dry-run)로 변경 내용을 확인하세요."
  },
  zh: {
    title: "zipkirei",
    seoTitle: "zipkirei - 修复 macOS ZIP 乱码并清理垃圾文件",
    seoDescription: "修复 ZIP 文件名乱码、NFD 分解字符，并移除 __MACOSX、.DS_Store 等多余文件。ZIP 处理在浏览器中本地执行。",
    subtitle: "轻松修复并清理 macOS ZIP 压缩包的乱码与垃圾文件",
    tagline: "您是否正为 Mac 用户发来的 ZIP 压缩包中文件名乱码、字符分解（NFD 格式）以及神秘的系统垃圾文件而烦恼？",
    offlineBadge: "ZIP 处理 100% 本地完成",
    offlineDesc: "所有处理均完全在您的浏览器中通过 WebAssembly 完成。您的 ZIP 文件绝不会被上传到任何外部服务器。",
    trustLocalTitle: "在浏览器中本地处理",
    trustLocalDesc: "ZIP 会通过本页面的 WebAssembly 处理。\n不会上传到外部服务器。",
    trustOriginalTitle: "不修改原始 ZIP",
    trustOriginalDesc: "网页版会生成一个修复后的新 ZIP 供下载。\n不会改写您选择的原文件。",
    trustPayloadTitle: "不解压文件内容",
    trustPayloadDesc: "zipkirei 不会解压或重新压缩 ZIP 里的文件本体，只修复文件名和 ZIP 元数据。",
    
    dropZoneTitle: "将 ZIP 文件拖放到此处",
    dropZoneSub: "或者点击选择文件",
    selectedFile: "已选择文件",
    fileSize: "文件大小",
    optionsTitle: "修复选项",
    optionNotUtf8: "跳过 UTF-8 相关修复",
    optionNotUtf8Desc: "不调整文件名的 UTF-8 标记和 Unicode 字符整理，只执行其他清理步骤。",
    optionKeepBackslashes: "保留路径分隔符",
    optionKeepBackslashesDesc: "保留 ZIP 内文件路径中的 \\，不自动改成 /。",
    optionNoExclude: "不移除系统垃圾文件",
    optionNoExcludeDesc: "保留 .DS_Store、__MACOSX 文件夹等隐藏文件。",
    
    btnRepair: "立即修复 ZIP",
    btnRepairing: "正在通过 WebAssembly 修复...",
    btnPreview: "预览更改",
    btnPreviewing: "正在分析 ZIP...",
    btnDownload: "下载已修复的 ZIP",
    btnReset: "修复其他文件",
    
    logTitle: "运行日志",
    toggleShowLogs: "显示运行日志",
    toggleHideLogs: "隐藏运行日志",
    successTitle: "ZIP 修复成功！",
    successDesc: "清理完成的 ZIP 压缩包已准备就绪，可以下载。",
    errorTitle: "ZIP 修复失败",
    
    cliTitle: "大文件或频繁使用请使用 CLI 版本",
    cliDesc: "网页版使用在浏览器中运行的 zipkirei，无需安装即可生成清理后的 ZIP。\n如果希望更方便地重复使用，或需要处理大文件、脚本流程、直接修复本地文件，请使用 CLI 版本。",
    cliSpeedNote: "CLI 版本也支持只重写本地 ZIP 中发生变化的部分。\n它可以使用优化过的 I/O 和处理方式、提供更细的选项，并且不需要打开网页，因此更适合较重的任务和长期使用。",
    cliInstallCargo: "使用 Rust Cargo 安装",
    cliBinaryDownload: "下载预编译的二进制文件",
    cliGitHubBtn: "在 GitHub 上查看",
    
    whyTitle: "zipkirei 修复的问题",
    whyUtf8Title: "1. 文件名乱码",
    whyUtf8Desc: "如果 ZIP 内没有明确标记文件名编码，Windows 等解压工具可能会按错误方式读取。\n这会导致文件名显示成乱码。",
    whyNfdTitle: "2. Unicode 字符被分解的文件名",
    whyNfdDesc: "由 macOS 创建的 ZIP 中，文件名可能以分解后的 Unicode 形式保存。\n在其他系统上打开时，重音符号、浊点或韩文字母等字符的一部分可能会和原本的文字分开显示。",
    whyJunkTitle: "3. 多余的隐藏文件",
    whyJunkDesc: "ZIP 压缩包中经常夹带 .DS_Store、__MACOSX 等隐藏的系统文件。\n这些文件在其他操作系统上完全多余，只会将文件夹弄得杂乱无章。",
    whyFooter: "默认情况下，zipkirei 会将文件名标记为 UTF-8，将分解后的 Unicode 文件名整理为兼容性更高的形式，并整理 ZIP 内的路径写法。\n同时会移除 .DS_Store、__MACOSX、Thumbs.db、desktop.ini 等多余的隐藏文件。",
    speedTitle: "为什么速度快",
    speedDesc: "zipkirei 不是先解压再重新压缩的工具。\n它会保留 ZIP 内已经压缩好的文件数据，只修复文件名和条目列表等 ZIP 元数据。\n因为不会改动文件数据，在已确认的范围内也可以处理使用 ZipCrypto 或 AES-256 加密的带密码 ZIP。",
    limitationsTitle: "限制",
    limitationsDesc: "不支持分卷 ZIP 文件。\n文件名修复需要原始文件名能以 UTF-8 正确读取。\n如果不确定，请先使用预览(dry-run)确认将要修改的内容。"
  }
};

let currentLang: Language = 'en'; // Default to English

export function getLanguage(): Language {
  return currentLang;
}

export function setLanguage(lang: Language): void {
  currentLang = lang;
  localStorage.setItem('zipkirei_lang', lang);
  
  // Sync language with URL query parameters without reloading the page
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
  
  updateDOM();
}

export function initLanguage(): void {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang') as Language | null;
  const saved = localStorage.getItem('zipkirei_lang') as Language | null;
  
  if (urlLang === 'en' || urlLang === 'ja' || urlLang === 'ko' || urlLang === 'zh') {
    currentLang = urlLang;
    localStorage.setItem('zipkirei_lang', urlLang);
  } else if (saved === 'en' || saved === 'ja' || saved === 'ko' || saved === 'zh') {
    currentLang = saved;
    // Sync missing URL param with saved setting
    const url = new URL(window.location.href);
    url.searchParams.set('lang', saved);
    window.history.replaceState({}, '', url.toString());
  } else {
    // Detect system browser language
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith('ja')) {
      currentLang = 'ja';
    } else if (navLang.startsWith('ko')) {
      currentLang = 'ko';
    } else if (navLang.startsWith('zh')) {
      currentLang = 'zh';
    } else {
      currentLang = 'en';
    }
    // Sync missing URL param with detected language
    const url = new URL(window.location.href);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url.toString());
  }
  updateDOM();
}

export function t(key: keyof TranslationDict): string {
  return translations[currentLang][key];
}

export function updateDOM(): void {
  document.documentElement.lang = currentLang;
  document.title = t('seoTitle');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('seoDescription'));

  // Find all elements with data-i18n attribute and update their content
  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const key = elem.getAttribute('data-i18n') as keyof TranslationDict;
    if (key && translations[currentLang][key]) {
      elem.textContent = translations[currentLang][key];
    }
  });

  // Find all elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach((elem) => {
    const key = elem.getAttribute('data-i18n-placeholder') as keyof TranslationDict;
    if (key && translations[currentLang][key]) {
      elem.setAttribute('placeholder', translations[currentLang][key]);
    }
  });

  // Modernized loop-based Language buttons update
  const langButtons: Record<Language, HTMLElement | null> = {
    en: document.getElementById('lang-btn-en'),
    ja: document.getElementById('lang-btn-ja'),
    ko: document.getElementById('lang-btn-ko'),
    zh: document.getElementById('lang-btn-zh'),
  };
  
  Object.entries(langButtons).forEach(([lang, btn]) => {
    if (!btn) return;
    if (lang === currentLang) {
      btn.classList.add('bg-indigo-600', 'text-white');
      btn.classList.remove('text-slate-400', 'hover:text-slate-200');
    } else {
      btn.classList.remove('bg-indigo-600', 'text-white');
      btn.classList.add('text-slate-400', 'hover:text-slate-200');
    }
  });
}
