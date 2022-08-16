/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {

  if args.dataHasGlobalReportingType === False {
		$('#toggles').hide()
		return
  }

  var template = _.template($('#categories_template').html());
  	$('#categories').html(template({
			fields: args.fields,
			fieldValuesWithGlobalReportingType: args.fieldValuesWithGlobalReportingType
	}));

}
        
