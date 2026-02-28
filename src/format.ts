/**
 * JSON Format/Prettify Module
 * Format, prettify, or minify JSON strings
 */

export interface FormatOptions {
    indent?: number;
    sortKeys?: boolean;
    minify?: boolean;
}

function sortObjectKeys(obj: unknown): unknown {
    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
    }
    if (obj !== null && typeof obj === 'object') {
        const sorted: Record<string, unknown> = {};
        const keys = Object.keys(obj as Record<string, unknown>).sort();
        for (const key of keys) {
            sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
        }
        return sorted;
    }
    return obj;
}

/**
 * Format a JSON string with configurable options
 */
export function formatJson(input: string, options: FormatOptions = {}): string {
    const { indent = 2, sortKeys = false, minify = false } = options;

    let parsed: unknown;
    try {
        parsed = JSON.parse(input);
    } catch (error) {
        throw new Error(`Invalid JSON: ${(error as Error).message}`);
    }

    if (sortKeys) {
        parsed = sortObjectKeys(parsed);
    }

    if (minify) {
        return JSON.stringify(parsed);
    }

    return JSON.stringify(parsed, null, indent);
}
