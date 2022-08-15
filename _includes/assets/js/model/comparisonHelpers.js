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
 * @param {Array} fieldsWithGlobalValues
 * @param {string} field
 * @return {boolean} 
 */
function fieldHasGlobalValues(fieldsWithGlobalValues, field) {
  return fieldsWithGlobalValues.includes(field);
}

/**
 * @param {Array} fieldValuesWithGlobalValues
 * @param {string} field
 * @return {boolean} 
 */
function fieldValueHasGlobalValues(fieldValuessWithGlobalValues, field, value) {
  return fieldValuesUsedByReportingType.filter(obj => obj.field == field)[0]['reportingTypes'].filter(obj => obj.reportingType == 'Global')[0]['values'].includes(value)
}

/**
 * @param {Array} fieldsUsedByReportingType
 * @return {Array} Field names
 */
function fieldsWithGlobalValues(fieldsUsedByReportingType) {
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
 * @param {Array} columns
 * @return {Array} Field item state by reporting type
 */
function fieldItemStateReportingType(reportingTypes, rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
    var values = getUniqueValuesByProperty(field, rows);
    return {
      field: field,
      hasGlobalValues: fieldHasGlobalValues(field)
      values: values.map(function(value) {
        var fieldValuesUsedByReportingType = fieldValuesUsedByReportingType(reportingTypes, rows, columns);
        return {
          value: value,
          hasGlobalValues: fieldValueHasGlobalValues(fieldValuesUsedByReportingType,field,value)
        };
      }, this),
    };
  }, this);
}


/**
 * @param {Array} reportingTypes
 * @param {Array} rows
 * @param {Array} columns
 * @return {Array} Field names by reporting type
 */
function fieldValuesUsedByReportingType(reportingTypes, rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
    var values = getUniqueValuesByProperty(field, rows);
    return {
  		field: field,
  		reportingTypes: reportingTypes.map(function(reportingType) {
    		return {
      		reportingType: reportingType,
          values: values.filter(function(value) {
        		return fieldValueIsUsedInDataWithReportingType(field, value, reportingType, rows)
            ;
      }, this),
      	};
  }, this),
  }
  }, this);
}


/**
 * @param {Array} reportingTypes
 * @param {Array} rows
 * @return {Array} Field names by reporting type
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
function fieldIsUsedInDataWithReportingType(field, reportingType, rows) {
  return rows.some(function(row) {
    return row[field] && row[REPORTINGTYPE_COLUMN] === reportingType;
  }, this);
}

/**
 * @param {string} field
 * @param {string} reportingType
 * @param {Array} rows
 */
function fieldValueIsUsedInDataWithReportingType(field, fieldValue, reportingType, rows) {
  return rows.some(function(row) {
    return row[field] === fieldValue && row[REPORTINGTYPE_COLUMN] === reportingType;
  }, this);
}
