/** 
* Model helper functions related to comparing national and global data.
 */

function updateSelectedFieldsFromSelectedValue(selectedComparisonValue) {
  var selectedFields = [{
    field: "Reporting type",
    values: ["National", "Global"]}]
  if (selectedComparisonValue === "total") {
    // do nothing
  } else {
    selectedFields.push(_.map($('#category-select option:selected'), function(selectedComparisonValue) {
      var field = selectedComparisonValue.split("|")[0]
      var value = selectedComparisonValue.split("|")[1]	
      return {
	field: field,
        values: [value]
      };
    })[0])
  }
  return selectedFields
}

function getReportingTypes(hasNationalReportingType, hasGlobalReportingType) {
  if (hasNationalReportingType && hasGlobalReportingType) {
    var reportingTypes = ["National", "Global"]
  } else if (hasNationalReportingType && hasGlobalReportingType === false) {
    var reportingTypes = ["National"]
  } else if (hasNationalReportingType === false && hasGlobalReportingType) {
    var reportingTypes = ["Global"]
  }
  return reportingTypes
}

/**
 * @param {Array} columns
 * @return {boolean}
 */
function dataHasReportingTypes(columns) {
  return columns.includes(REPORTINGTYPE_COLUMN);
}

/**
 * @param {boolean} headlineHasGlobalReportingType
 * @param {boolean} fieldsHaveGlobalReportingType
 * @return {boolean} 
 */
function dataHasGlobalReportingType(headlineHasGlobalReportingType, fieldsHaveGlobalReportingType) {
	return headlineHasGlobalReportingType || fieldsHaveGlobalReportingType
}

function headlineIsComparable(headlineHasGlobalData, headlineHasNationalData) {
  	return headlineHasGlobalData && headlineHasNationalData;
}

/**
 * @param {Array} Headline data
 * @return {boolean} 
 */
function headlineHasNationalReportingType(headlineRows) {
	return headlineRows.some(function(row) {
  	return row[REPORTINGTYPE_COLUMN] === 'National';
  }, this)

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
function fieldsHaveGlobalReportingType(fieldValuesWithGlobalReportingType) {
 	return _.map(fieldValuesWithGlobalReportingType, 'values').some(element => element.length > 0);
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
  var values = getUniqueValuesByProperty(field, rows).filter(e =>  e);
    return {
      field: field,
      values: values.filter(function(fieldValue) {
        return fieldValueHasNationalReportingType(field, fieldValue, rows);
      }, this),
    };
  }, this);
}

/**
 * @param {Array} rows
 * @param {Array} columns
 * @return {Array} Field items and values with national and global data
 */
function comparableFieldValues(rows, columns) {
  var fields = getFieldColumnsFromData(columns);
  return fields.map(function(field) {
  var values = getUniqueValuesByProperty(field, rows).filter(e =>  e);
    return {
      field: field,
      values: values.filter(function(fieldValue) {
        return fieldValueHasNationalReportingType(field, fieldValue, rows) && fieldValueHasGlobalReportingType(field, fieldValue, rows);
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


