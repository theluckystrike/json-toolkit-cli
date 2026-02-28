#!/usr/bin/env node

import { Command } from 'commander';
import { formatJson } from './format';
import { validateJson } from './validate';
import { diffJson } from './diff';
import { queryJson } from './query';
import { convertJson } from './convert';
import * as fs from 'fs';

const program = new Command();

program
    .name('json-toolkit')
    .description('All-in-one JSON CLI toolkit — format, validate, diff, query, and convert')
    .version('0.1.0');

program
    .command('format')
    .description('Format/prettify a JSON file')
    .argument('<file>', 'JSON file to format')
    .option('-i, --indent <spaces>', 'Number of indent spaces', '2')
    .option('-s, --sort-keys', 'Sort object keys alphabetically')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .option('--minify', 'Minify instead of prettify')
    .action(async (file: string, options) => {
        const input = file === '-' ? fs.readFileSync(0, 'utf-8') : fs.readFileSync(file, 'utf-8');
        const result = formatJson(input, {
            indent: options.minify ? 0 : parseInt(options.indent),
            sortKeys: options.sortKeys || false,
            minify: options.minify || false,
        });

        if (options.output) {
            fs.writeFileSync(options.output, result);
            console.log(`✅ Formatted JSON written to ${options.output}`);
        } else {
            console.log(result);
        }
    });

program
    .command('validate')
    .description('Validate JSON against a schema')
    .argument('<file>', 'JSON file to validate')
    .option('-s, --schema <file>', 'JSON Schema file to validate against')
    .action(async (file: string, options) => {
        const input = fs.readFileSync(file, 'utf-8');
        const schema = options.schema ? JSON.parse(fs.readFileSync(options.schema, 'utf-8')) : undefined;
        const result = validateJson(input, schema);

        if (result.valid) {
            console.log('✅ Valid JSON');
        } else {
            console.error('❌ Invalid JSON:');
            result.errors.forEach((err) => console.error(`  - ${err}`));
            process.exit(1);
        }
    });

program
    .command('diff')
    .description('Compare two JSON files')
    .argument('<file1>', 'First JSON file')
    .argument('<file2>', 'Second JSON file')
    .option('--color', 'Enable colored output', true)
    .action(async (file1: string, file2: string) => {
        const json1 = fs.readFileSync(file1, 'utf-8');
        const json2 = fs.readFileSync(file2, 'utf-8');
        const result = diffJson(json1, json2);

        if (result.length === 0) {
            console.log('✅ Files are identical');
        } else {
            console.log(`Found ${result.length} difference(s):\n`);
            result.forEach((d) => {
                console.log(`  ${d.path}: ${d.type}`);
                if (d.oldValue !== undefined) console.log(`    - ${JSON.stringify(d.oldValue)}`);
                if (d.newValue !== undefined) console.log(`    + ${JSON.stringify(d.newValue)}`);
            });
        }
    });

program
    .command('query')
    .description('Query JSON with JSONPath')
    .argument('<file>', 'JSON file to query')
    .argument('<path>', 'JSONPath expression (e.g., $.store.book[*].author)')
    .action(async (file: string, path: string) => {
        const input = fs.readFileSync(file, 'utf-8');
        const result = queryJson(input, path);
        console.log(JSON.stringify(result, null, 2));
    });

program
    .command('convert')
    .description('Convert JSON to/from CSV or YAML')
    .argument('<file>', 'Input file')
    .option('-f, --from <format>', 'Input format (json, csv, yaml)', 'json')
    .option('-t, --to <format>', 'Output format (json, csv, yaml)', 'yaml')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .action(async (file: string, options) => {
        const input = fs.readFileSync(file, 'utf-8');
        const result = await convertJson(input, options.from, options.to);

        if (options.output) {
            fs.writeFileSync(options.output, result);
            console.log(`✅ Converted to ${options.to} and written to ${options.output}`);
        } else {
            console.log(result);
        }
    });

program.parse();
