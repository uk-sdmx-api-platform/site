/** 
* Model helper functions related to comparing national and global data.
 */

/**
 * @param {Array} columns
 * @return {boolean}
 */
function dataHasReportingTypes(columns) {
  return columns.includes(REPORTINGTYPE_COLUMN);
}

/**
 * @param {Array} fieldsUsedByReportingType
 * @return {Array} Field names
 */
function fieldsWithGlobalData(fieldsUsedByReportingType) {
  return fieldsUsedByReportingType.filter(obj => obj.reportingType == 'Global')[0].fields
}


/**
 * @param {Array} fieldsUsedByReportingType
 * @return {boolean}
 */
function dataHasGlobalValues(fieldsUsedByReportingType) {
  return fieldsUsedByReportingType.filter(obj => obj.reportingType == 'Global').length > 0
}

/**
 * @param {Array} reportingTypes
 * @param {Array} rows
 * @return {Array} Field names
 */
function fieldsUsedByReportingType(reportingTypes, rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return reportingTypes.map(function(reportingType) {
    return {
      reportingType: reportingType,
      fields: fields.filter(function(field) {
        return fieldIsUsedInDataWithReportingType(field, reportingType, rows);
      }, this),
    }
  }, this);
}


/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldIsUsedInDataWithGlobalValues(field, reportingType, rows) {
  return rows.some(function(row) {
    return row[field] && row[REPORTINGTYPE_COLUMN] === reportingType;
  }, this);
}
