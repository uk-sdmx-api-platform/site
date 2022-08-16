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
 * @param {Array} Headline data
 * @return {boolean} 
 */
function headlineHasGlobalReportingType(headlineRows) {
	return headlineRows.some(function(row) {
  	return row[REPORTINGTYPE_COLUMN] === 'Global';
  }, this)

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
  var values = getUniqueValuesByProperty(field, rows).filter(e =>  e);
    return {
      field: field,
      values: values.filter(function(fieldValue) {
        return fieldValueHasGlobalReportingType(field, fieldValue, rows);
      }, this),
    };
  }, this);
}

/**
 * @param {Array} rows
 * @param {Array} columns
 * @return {Array} Field items and values with global data
 */
function fieldValuesWithNationalReportingType(rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
  var values = getUniqueValuesByProperty(field, rows);
    return {
      field: field,
      values: values.filter(function(fieldValue) {
        return fieldValueHasNationalReportingType(field, fieldValue, rows);
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

/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldValueHasNationalReportingType(field, fieldValue, rows) {
  return rows.some(function(row) {
    return row[field] === fieldValue && row[REPORTINGTYPE_COLUMN] === 'National';
  }, this);
}


