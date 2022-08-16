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
 * @param {Array} Field items and values with global data
 * @return {boolean} 
 */
function dataHasGlobalReportingType(fieldValuesWithGlobalReportingType) {
  _.map(fieldValuesWithGlobalReportingType, 'values').some(element => element.length > 0);
}
  

/**
 * @param {Array} rows
 * @param {Array} columns
 * @return {Array} Field items and values with global data
 */
function fieldValuesWithGlobalReportingType(rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
  var values = getUniqueValuesByProperty(field, rows);
    return {
      field: field,
      values: fieldValues.filter(function(fieldValue) {
        return fieldValueHasGlobalValues(field, fieldValue, rows);
      }, this),
    };
  }, this);
}


/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldValueHasGlobalReportingType(field, fieldValue, rows) {
  return rows.some(function(row) {
    return row[field] === fieldValue && row[REPORTINGTYPE_COLUMN] === 'Global';
  }, this);
}

