[![npm](https://img.shields.io/npm/dm/md-table.svg)](https://www.npmjs.com/package/md-table)
[![npm](https://img.shields.io/npm/v/md-table.svg)](https://www.npmjs.com/package/md-table)
[![npm](https://david-dm.org/markusylisiurunen/md-table.svg)](https://www.npmjs.com/package/md-table)

## Features

* 🖍 **Themable** using [chalk](https://www.npmjs.com/package/chalk).
* 📎 **Copy-pasteable** to markdown files and websites.
* 😍 **Minimal and beautiful** af.

## Install

```shell
$ npm add md-table
```

## Usage

```js
const getTable = require('md-table');

console.log(
  getTable(
    ['Superhero', 'Real name'],
    [
      ['Batman', 'Bruce Wayne'],
      ['Spider-Man', 'Peter Parker'],
      ['Iron Man', 'Elon Musk'],
    ]
  )
);

/*
=>
| Superhero  | Real name    |
| ---------- | ------------ |
| Batman     | Bruce Wayne  |
| Spider-Man | Peter Parker |
| Iron Man   | Elon Musk    |
*/
```

## API

### getTable(header, rows, [options])

* `{Array<String>} header`: An array of the table's head columns.
* `{Array<Array<String>>} rows`: An array of each row of data.
* `{Object} [options]`: An optional options object.
  * `{Number} options.x` (default: `0`): Horizontal padding applied to the table.
  * `{Number} options.y` (default: `0`): Vertical padding applied to the table.
  * `{Object} options.colors`: An object of hex color values for theming.
    * `{String} colors.head` (default: `''`): Header text color.
    * `{String} colors.data` (default: `''`): Data text color.
    * `{String} colors.border` (default: `''`): Border color.

## License

MIT
