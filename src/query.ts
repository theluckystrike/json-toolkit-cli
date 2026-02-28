/**
 * JSON Query Module
 * Query JSON using JSONPath expressions
 */

import { JSONPath } from 'jsonpath-plus';

/**
 * Query a JSON string with a JSONPath expression
 * @param input - JSON string to query
 * @param path - JSONPath expression (e.g., $.store.book[*].author)
 * @returns Array of matching values
 */
export function queryJson(input: string, path: string): unknown[] {
    const parsed = JSON.parse(input);

    const result = JSONPath({
        path,
        json: parsed,
        resultType: 'value',
    });

    return result;
}
