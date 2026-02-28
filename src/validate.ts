/**
 * JSON Validation Module
 * Validate JSON syntax and optionally against JSON Schema
 */

import Ajv from 'ajv';

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

/**
 * Validate a JSON string, optionally against a JSON Schema
 */
export function validateJson(input: string, schema?: Record<string, unknown>): ValidationResult {
    // First, validate JSON syntax
    let parsed: unknown;
    try {
        parsed = JSON.parse(input);
    } catch (error) {
        return {
            valid: false,
            errors: [`JSON syntax error: ${(error as Error).message}`],
        };
    }

    // If no schema provided, just validate syntax
    if (!schema) {
        return { valid: true, errors: [] };
    }

    // Validate against JSON Schema
    const ajv = new Ajv({ allErrors: true, verbose: true });
    const validate = ajv.compile(schema);
    const valid = validate(parsed);

    if (valid) {
        return { valid: true, errors: [] };
    }

    const errors = (validate.errors || []).map((err) => {
        const path = err.instancePath || '/';
        return `${path}: ${err.message}`;
    });

    return { valid: false, errors };
}
