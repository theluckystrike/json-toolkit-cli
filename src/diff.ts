/**
 * JSON Diff Module
 * Deep comparison of two JSON structures
 */

export interface DiffEntry {
    path: string;
    type: 'added' | 'removed' | 'changed' | 'type_changed';
    oldValue?: unknown;
    newValue?: unknown;
}

function deepDiff(obj1: unknown, obj2: unknown, path: string = '$'): DiffEntry[] {
    const diffs: DiffEntry[] = [];

    // Same value
    if (obj1 === obj2) return diffs;

    // Different types
    if (typeof obj1 !== typeof obj2) {
        diffs.push({ path, type: 'type_changed', oldValue: obj1, newValue: obj2 });
        return diffs;
    }

    // Null checks
    if (obj1 === null || obj2 === null) {
        diffs.push({ path, type: 'changed', oldValue: obj1, newValue: obj2 });
        return diffs;
    }

    // Arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        const maxLen = Math.max(obj1.length, obj2.length);
        for (let i = 0; i < maxLen; i++) {
            const itemPath = `${path}[${i}]`;
            if (i >= obj1.length) {
                diffs.push({ path: itemPath, type: 'added', newValue: obj2[i] });
            } else if (i >= obj2.length) {
                diffs.push({ path: itemPath, type: 'removed', oldValue: obj1[i] });
            } else {
                diffs.push(...deepDiff(obj1[i], obj2[i], itemPath));
            }
        }
        return diffs;
    }

    // Objects
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        const keys1 = Object.keys(obj1 as Record<string, unknown>);
        const keys2 = Object.keys(obj2 as Record<string, unknown>);
        const allKeys = new Set([...keys1, ...keys2]);

        for (const key of allKeys) {
            const keyPath = `${path}.${key}`;
            const val1 = (obj1 as Record<string, unknown>)[key];
            const val2 = (obj2 as Record<string, unknown>)[key];

            if (!(key in (obj1 as Record<string, unknown>))) {
                diffs.push({ path: keyPath, type: 'added', newValue: val2 });
            } else if (!(key in (obj2 as Record<string, unknown>))) {
                diffs.push({ path: keyPath, type: 'removed', oldValue: val1 });
            } else {
                diffs.push(...deepDiff(val1, val2, keyPath));
            }
        }
        return diffs;
    }

    // Primitive values that differ
    if (obj1 !== obj2) {
        diffs.push({ path, type: 'changed', oldValue: obj1, newValue: obj2 });
    }

    return diffs;
}

/**
 * Compare two JSON strings and return differences
 */
export function diffJson(json1: string, json2: string): DiffEntry[] {
    const parsed1 = JSON.parse(json1);
    const parsed2 = JSON.parse(json2);
    return deepDiff(parsed1, parsed2);
}
