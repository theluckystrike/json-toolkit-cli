/**
 * JSON Convert Module
 * Convert between JSON, CSV, and YAML formats
 */

import * as yaml from 'js-yaml';
import { parse as csvParse } from 'csv-parse/sync';
import { stringify as csvStringify } from 'csv-stringify/sync';

export type Format = 'json' | 'csv' | 'yaml';

/**
 * Convert data between JSON, CSV, and YAML formats
 */
export async function convertJson(input: string, from: Format, to: Format): Promise<string> {
    // Parse input to intermediate JS object
    let data: unknown;

    switch (from) {
        case 'json':
            data = JSON.parse(input);
            break;
        case 'yaml':
            data = yaml.load(input);
            break;
        case 'csv':
            data = csvParse(input, { columns: true, skip_empty_lines: true });
            break;
        default:
            throw new Error(`Unsupported input format: ${from}`);
    }

    // Convert to output format
    switch (to) {
        case 'json':
            return JSON.stringify(data, null, 2);
        case 'yaml':
            return yaml.dump(data, { indent: 2, lineWidth: 120 });
        case 'csv': {
            if (!Array.isArray(data)) {
                throw new Error('CSV output requires array input. Wrap your object in an array.');
            }
            return csvStringify(data, { header: true });
        }
        default:
            throw new Error(`Unsupported output format: ${to}`);
    }
}
