# json-toolkit-cli — All-in-One JSON Command Line Toolkit

[![npm version](https://img.shields.io/npm/v/json-toolkit-cli.svg)](https://www.npmjs.com/package/json-toolkit-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

> **Built by [Zovo](https://zovo.one)** — makers of [JSON Formatter Pro](https://chrome.google.com/webstore/detail/json-formatter-pro) and 18+ Chrome extensions

**Format, validate, diff, query, and convert JSON from the command line.** Fast, lightweight, and developer-friendly.

🌐 **Want this in your browser?** Try [JSON Formatter Pro](https://chrome.google.com/webstore/detail/json-formatter-pro) — our free Chrome extension for formatting and validating JSON.

## 📦 Install

```bash
npm install -g json-toolkit-cli
# or use directly with npx
npx json-toolkit-cli format data.json
```

## 🚀 Usage

### Format / Prettify JSON

```bash
# Prettify with 2-space indent (default)
json-toolkit format data.json

# Custom indent
json-toolkit format data.json --indent 4

# Sort keys alphabetically
json-toolkit format data.json --sort-keys

# Minify
json-toolkit format data.json --minify

# Output to file
json-toolkit format data.json -o formatted.json

# Pipe from stdin
cat data.json | json-toolkit format -
```

### Validate JSON

```bash
# Check syntax
json-toolkit validate data.json

# Validate against JSON Schema
json-toolkit validate data.json --schema schema.json
```

### Diff Two JSON Files

```bash
json-toolkit diff old.json new.json
```

Output:
```
Found 3 difference(s):

  $.name: changed
    - "old-name"
    + "new-name"
  $.version: changed
    - "1.0.0"
    + "2.0.0"
  $.newField: added
    + "hello"
```

### Query with JSONPath

```bash
# Get all author names
json-toolkit query books.json '$.store.book[*].author'

# Get books cheaper than $10
json-toolkit query books.json '$.store.book[?(@.price<10)]'
```

### Convert Between Formats

```bash
# JSON → YAML
json-toolkit convert data.json --to yaml

# JSON → CSV
json-toolkit convert data.json --to csv

# YAML → JSON
json-toolkit convert config.yaml --from yaml --to json

# CSV → JSON
json-toolkit convert data.csv --from csv --to json
```

## 📚 Library API

Use as a library in your Node.js projects:

```typescript
import { formatJson, validateJson, diffJson, queryJson, convertJson } from 'json-toolkit-cli';

// Format
const pretty = formatJson('{"a":1}', { indent: 2, sortKeys: true });

// Validate
const result = validateJson(jsonString, schema);
if (!result.valid) console.error(result.errors);

// Diff
const diffs = diffJson(json1, json2);

// Query
const authors = queryJson(bookStore, '$.store.book[*].author');

// Convert
const yaml = await convertJson(jsonString, 'json', 'yaml');
```

## 🔗 Related Projects

- [JSON Formatter Pro](https://chrome.google.com/webstore/detail/json-formatter-pro) — Format JSON in your browser (Chrome extension)
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) — Chrome extension boilerplate
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) — Chrome storage wrapper
- [mv3-migrate](https://github.com/theluckystrike/mv3-migrate) — MV2 → MV3 migration tool
- [tab-manager-api](https://github.com/theluckystrike/tab-manager-api) — Chrome tabs API wrapper

## 📄 License

MIT — [Zovo](https://zovo.one)
