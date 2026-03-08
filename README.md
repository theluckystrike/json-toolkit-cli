# JSON Toolkit CLI

<p align="center">
  <a href="https://github.com/theluckystrike/json-toolkit-cli">
    <img src="https://img.shields.io/github/stars/theluckystrike/json-toolkit-cli?style=flat&color=FFD700" alt="stars">
  </a>
  <a href="https://github.com/theluckystrike/json-toolkit-cli/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/theluckystrike/json-toolkit-cli?color=blue" alt="license">
  </a>
  <a href="https://www.npmjs.com/package/json-toolkit-cli">
    <img src="https://img.shields.io/npm/v/json-toolkit-cli.svg" alt="npm version">
  </a>
  <a href="https://github.com/theluckystrike/json-toolkit-cli/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/theluckystrike/json-toolkit-cli/ci.yml" alt="CI">
  </a>
  <a href="https://github.com/theluckystrike/json-toolkit-cli/commits/master">
    <img src="https://img.shields.io/github/last-commit/theluckystrike/json-toolkit-cli" alt="last commit">
  </a>
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-5.3-blue" alt="TypeScript">
  </a>
</p>

All-in-one JSON CLI toolkit — format, validate, diff, query, and convert JSON from the command line. Fast, lightweight, and developer-friendly.

## Features

- **Format** — Prettify or minify JSON with configurable indentation and key sorting
- **Validate** — Check JSON syntax or validate against JSON Schema
- **Diff** — Deep comparison of two JSON files with detailed output
- **Query** — Extract data using JSONPath expressions
- **Convert** — Transform JSON to/from YAML and CSV formats

## Installation

```bash
# Install globally
npm install -g json-toolkit-cli

# Or run without installing
npx json-toolkit-cli <command>
```

## Quick Start

```bash
# Format a JSON file
json-toolkit format data.json

# Validate JSON syntax
json-toolkit validate data.json

# Compare two JSON files
json-toolkit diff old.json new.json

# Query with JSONPath
json-toolkit query data.json '$.store.book[*].author'

# Convert to YAML
json-toolkit convert data.json --to yaml
```

## Usage Examples

### Format

Prettify or minify JSON files with configurable indentation and key sorting.

```bash
# Basic formatting (2-space indent)
json-toolkit format data.json

# Custom indent
json-toolkit format data.json --indent 4

# Sort object keys alphabetically
json-toolkit format data.json --sort-keys

# Minify JSON
json-toolkit format data.json --minify

# Write to specific output file
json-toolkit format data.json -o formatted.json

# Read from stdin
cat data.json | json-toolkit format -
```

### Validate

Check JSON syntax or validate against a JSON Schema using [Ajv](https://github.com/ajv-validator/ajv).

```bash
# Validate JSON syntax
json-toolkit validate data.json

# Validate against a JSON Schema
json-toolkit validate data.json --schema schema.json
```

### Diff

Deep comparison of two JSON files. Reports added, removed, changed, and type-changed entries with JSONPath locations.

```bash
# Compare two JSON files
json-toolkit diff old.json new.json

# Example output:
# Found 3 difference(s):
#
#   $.name: changed
#     - "old-name"
#     + "new-name"
#   $.version: changed
#     - "1.0.0"
#     + "2.0.0"
#   $.newField: added
#     + "hello"
```

### Query

Query JSON with JSONPath expressions powered by [jsonpath-plus](https://github.com/JSONPath-Plus/JSONPath).

```bash
# Get all book authors
json-toolkit query books.json '$.store.book[*].author'

# Filter by condition
json-toolkit query books.json '$.store.book[?(@.price<10)]'

# Get nested values
json-toolkit query data.json '$.store.bicycle.color'
```

### Convert

Convert between JSON, YAML, and CSV formats.

```bash
# Convert JSON to YAML
json-toolkit convert data.json --to yaml

# Convert JSON to CSV
json-toolkit convert data.json --to csv

# Convert YAML to JSON
json-toolkit convert config.yaml --from yaml --to json

# Convert CSV to JSON
json-toolkit convert data.csv --from csv --to json

# Write to specific output file
json-toolkit convert data.json --to yaml -o output.yaml
```

## Comparison: json-toolkit vs jq/fx

| Feature | json-toolkit | jq | fx |
|---------|---------------|----|----|
| Format/Prettify | ✅ | ✅ | ✅ |
| Minify | ✅ | ✅ | ✅ |
| Sort Keys | ✅ | ✅ | ❌ |
| JSON Schema Validation | ✅ | ❌ | ❌ |
| JSON Diff | ✅ | ⚠️ Manual | ❌ |
| JSONPath Query | ✅ | ❌ | ❌ |
| JSON → YAML | ✅ | ❌ | ❌ |
| JSON → CSV | ✅ | ⚠️ Limited | ❌ |
| YAML → JSON | ✅ | ❌ | ❌ |
| CSV → JSON | ✅ | ❌ | ❌ |
| Zero Dependencies | ❌ (Node.js) | ✅ (C) | ✅ (Go) |
| Language | TypeScript | C | Go |
| Learning Curve | Low | High | Low |

**Why json-toolkit?**

- **All-in-one**: Covers the full JSON workflow (format, validate, diff, query, convert)
- **Developer-friendly**: Intuitive CLI with helpful error messages
- **Schema Validation**: Built-in JSON Schema support (powered by Ajv)
- **Multi-format**: Native YAML and CSV conversion support
- **Modern**: Written in TypeScript with full type safety

## Project Structure

```
json-toolkit-cli/
├── src/
│   ├── cli.ts        # Main CLI entry point with commander.js
│   ├── format.ts     # JSON formatting/prettifying
│   ├── validate.ts   # JSON syntax & schema validation
│   ├── diff.ts       # JSON deep comparison
│   ├── query.ts      # JSONPath query implementation
│   ├── convert.ts    # Format conversion (JSON/YAML/CSV)
│   └── index.ts      # Library exports
├── dist/             # Compiled JavaScript output
├── package.json      # NPM package configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## Library API

All functions are exported for use in Node.js projects.

```typescript
import {
  formatJson,
  validateJson,
  diffJson,
  queryJson,
  convertJson,
} from 'json-toolkit-cli';

// Format with sorted keys
const pretty = formatJson('{"b":2,"a":1}', { indent: 2, sortKeys: true });

// Validate against a schema
const result = validateJson(jsonString, schemaObject);
if (!result.valid) console.error(result.errors);

// Diff two JSON strings
const diffs = diffJson(json1, json2);

// Query with JSONPath
const authors = queryJson(bookStore, '$.store.book[*].author');

// Convert between formats (async)
const yaml = await convertJson(jsonString, 'json', 'yaml');
```

## Development

```bash
# Clone the repository
git clone https://github.com/theluckystrike/json-toolkit-cli.git
cd json-toolkit-cli

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built at <a href="https://zovo.one">zovo.one</a> by <a href="https://github.com/theluckystrike">theluckystrike</a>
</p>
