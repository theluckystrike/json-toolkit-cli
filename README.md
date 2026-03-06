# json-toolkit-cli

[![npm version](https://img.shields.io/npm/v/json-toolkit-cli.svg)](https://www.npmjs.com/package/json-toolkit-cli)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/theluckystrike/json-toolkit-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/json-toolkit-cli/actions/workflows/ci.yml)

All-in-one JSON command line toolkit. Format, validate, diff, query, and convert JSON. Fast, lightweight, and built for developers who live in the terminal.


INSTALL

```bash
npm install -g json-toolkit-cli
```

Or run directly without installing.

```bash
npx json-toolkit-cli format data.json
```


USAGE

The CLI exposes five commands through the `json-toolkit` binary.

FORMAT

Prettify or minify JSON files with configurable indentation and key sorting.

```bash
json-toolkit format data.json
json-toolkit format data.json --indent 4
json-toolkit format data.json --sort-keys
json-toolkit format data.json --minify
json-toolkit format data.json -o formatted.json
cat data.json | json-toolkit format -
```

VALIDATE

Check JSON syntax or validate against a JSON Schema using Ajv.

```bash
json-toolkit validate data.json
json-toolkit validate data.json --schema schema.json
```

DIFF

Deep comparison of two JSON files. Reports added, removed, changed, and type-changed entries with JSONPath locations.

```bash
json-toolkit diff old.json new.json
```

Example output.

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

QUERY

Query JSON with JSONPath expressions powered by jsonpath-plus.

```bash
json-toolkit query books.json '$.store.book[*].author'
json-toolkit query books.json '$.store.book[?(@.price<10)]'
```

CONVERT

Convert between JSON, YAML, and CSV formats.

```bash
json-toolkit convert data.json --to yaml
json-toolkit convert data.json --to csv
json-toolkit convert config.yaml --from yaml --to json
json-toolkit convert data.csv --from csv --to json
json-toolkit convert data.json --to yaml -o output.yaml
```


LIBRARY API

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


COMMANDS REFERENCE

| Command    | Description                        | Key Flags                              |
|------------|------------------------------------|----------------------------------------|
| `format`   | Prettify or minify JSON            | `--indent`, `--sort-keys`, `--minify`  |
| `validate` | Syntax check or schema validation  | `--schema`                             |
| `diff`     | Deep compare two JSON files        | `--color`                              |
| `query`    | JSONPath query                     | positional path argument               |
| `convert`  | Convert JSON, YAML, CSV           | `--from`, `--to`, `-o`                 |


DEVELOPMENT

```bash
git clone https://github.com/theluckystrike/json-toolkit-cli.git
cd json-toolkit-cli
npm install
npm run build
npm test
npm run lint
```


LICENSE

MIT. See [LICENSE](LICENSE) for details.


Built by [theluckystrike](https://github.com/theluckystrike) | [zovo.one](https://zovo.one)
