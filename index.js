const chalk = require('chalk');

/**
 * Pad text on the right side.
 * @param  {String} text      Text to pad.
 * @param  {Number} length    Length to pad the string to.
 * @param  {Object} [options] Options for padding.
 * @return {String}           Padded text.
 */
const pad = (text, length, { padWith = ' ', color = '' } = {}) => {
  let result = text;

  if (padWith.length === 0) {
    return text;
  }

  while (result.length < length) {
    result += padWith;
  }

  return color ? chalk.hex(color)(result) : result;
};

/**
 * Find the widest column.
 * @param  {Array<Array>} rows  All rows to find the widest from.
 * @param  {Number}       index Index of the column.
 * @return {Number}             Length of the widest column.
 */
const widest = (rows, index) => {
  let result;

  rows.forEach(row => {
    if (!result || row[index].length > result) {
      result = row[index].length;
    }
  });

  return result;
};

/**
 * Create a single row.
 * @param  {Number}   columns   Number of columns.
 * @param  {Function} get       Get the value for a specific column.
 * @param  {Object}   [options] Options for the row.
 * @return {String}             Constructed row.
 */
const buildRow = (columns, get, { borderColor = '', paddingLeft = 0 } = {}) => {
  const borderChar = borderColor ? chalk.hex(borderColor)('|') : '|';
  let result = pad('', paddingLeft);

  for (let i = 0; i < columns; i += 1) {
    result += `${borderChar} ${get(i)} `;
  }

  result += `${borderChar}\n`;
  return result;
};

/**
 * Get a table as a string.
 * @param  {Array}        header    Header columns.
 * @param  {Array<Array>} rows      Actual data rows.
 * @param  {Object}       [options] Options for the table.
 * @return {String}                 The table as a string.
 */
module.exports = (
  header,
  rows,
  { x = 0, y = 0, colors = { head: '', data: '', border: '' } } = {}
) => {
  const cols = header.length;
  const widths = Array(header.length)
    .fill(0)
    .map((_, i) => widest([header, ...rows], i));

  let table = '';

  table += pad('', y, { padWith: '\n' });

  const rowBuilder = f =>
    buildRow(cols, f, { borderColor: colors.border, paddingLeft: x });

  table += rowBuilder(i => pad(header[i], widths[i], { color: colors.head }));
  table += rowBuilder(i =>
    pad('', widths[i], { padWith: '-', color: colors.border })
  );

  rows.forEach(row => {
    table += rowBuilder(i => pad(row[i], widths[i], { color: colors.data }));
  });

  table += pad('', y, { padWith: '\n' });

  return table;
};
