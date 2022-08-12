/**
 * Model helper functions related to comparing national and global data.
 */

/**
 * @param {Array} rows
 * @return {boolean}
 */
function dataHasReportingType(columns) {
  return columns.includes(REPORTINGTYPE_COLUMN);
}

/**
 * @param {Array} reportingTypes
 * @return {boolean}
 */
function dataHasGlobalValues(reportingTypes) {
  return reportingTypes.includes("Global")
}
