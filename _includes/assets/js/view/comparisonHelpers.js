/**
 * @param {Object} args
 * @return null
 */
function initialiseReportingType(args) {
    var template = _.template($('#comparison_template').html()),
        dataHasGlobalValues = args.dataHasGlobalValues || false;
  
    $('#comparison').html(template({
        dataHasGlobalValues: dataHasGlobalValues
    }));
  
}
  
  
