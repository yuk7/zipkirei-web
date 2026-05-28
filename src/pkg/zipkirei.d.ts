/* tslint:disable */
/* eslint-disable */

export class RepairResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly data: Uint8Array;
    readonly log: string;
}

export function repair_zip(zip_data: Uint8Array, dry_run: boolean, not_utf8: boolean, keep_backslashes: boolean, no_default_exclude: boolean): RepairResult;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_repairresult_free: (a: number, b: number) => void;
    readonly repair_zip: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly repairresult_data: (a: number, b: number) => void;
    readonly repairresult_log: (a: number, b: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
