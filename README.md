[![npm version](https://badge.fury.io/js/rollup-plugin-papaparse.svg)](https://badge.fury.io/js/rollup-plugin-papaparse)

# rollup-plugin-papaparse

This is a [Rollup](https://rollupjs.org/) plugin that allows to import CSV files
using the [papaparse](https://www.papaparse.com/) library.

## Installation

Just execute `npm install --save-dev rollup-plugin-papaparse` or `yarn add rollup-plugin-paparse --dev`.

## Usage

Add plugin to the Rollup's config plugin section:

```javascript
import papaparse from "rollup-plugin-papaparse";

export default {
  // ...
  plugins: [papaparse()],
};
```

Now you can import CSV files from your code:

```javascript
import data from "./data.csv";

for (const row of data) {
  // ...
}
```

By default, the papaparse parses CSV to the `string[][]` format, so the
following file:

```csv
type,count
apples,7
pears,4
bananas,5
```

will be imported as

```json
[
  ["type", "count"],
  ["apples", "7"],
  ["pears", "4"],
  ["bananas", "5"]
]
```

You can modify this behavior by using plugin configuration objects or by the import path URL-like arguments (see below)

## Configuration

### papaparse options

You can pass the configuration object to the plugin with any of [papaparse configuration options](https://www.papaparse.com/docs#config).

For example, you can pass the 'header' option to change the parse output from
arrays to records:

```javascript
import papaparse from "rollup-plugin-papaparse";

export default {
  // ...
  plugins: [papaparse({ header: true })],
};
```

The previous fruits example will now be parsed as:

```json
[
  { "type": "apples", "count": "7" },
  { "type": "pears", "count": "4" },
  { "type": "bananas", "count": "5" }
]
```

### URL-like parameters

You can set some of the parsing parameters right in the import string via the
URL-like syntax: `import data from "./data.csv?header=true"`. These parameters
override the parameters specified in the plugin configuration.

Only the following papaparse parameters can be set in this way:

- delimiter
- newline
- quoteChar
- escapeChar
- header
- dynamicTyping
- preview
- comments
- skipEmptyLines
- fastMode

### File extensions

By default, the plugin accepts only files with the ".csv" extension. You can change it by passing the `extensions` option, which is an array of acceptable file endings. It is `[".csv"]` by default.
