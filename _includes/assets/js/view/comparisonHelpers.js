/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {

  if (args.dataHasGlobalReportingType === false) {
		$('#toggles').hide()
		return
  }
	
	let compareGlobalData = $('.toggle-switch-check').is(':checked');

  var template = _.template($('#categories_template').html());
  	$('#categories').html(template({
			fields: args.fields,
			fieldValuesWithGlobalReportingType: args.fieldValuesWithGlobalReportingType
	}));

}
        
