/**
 * Model helper functions related to units.
 */

/**
 * @param {Array} rows
 * @return {boolean}
 */
function dataHasReportingType(columns) {
  return columns.includes(REPORTINGTYPE_COLUMN);
}
