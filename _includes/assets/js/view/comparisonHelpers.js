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
	console.log(compareGlobalData);
	
	if (compareGlobalData) {
		var template = _.template($('#categories_template').html());
		
		$('#categories').html(template({
			fields: args.fields,
			fieldValuesWithGlobalReportingType: args.fieldValuesWithGlobalReportingType
		}));
	
	}



}
        
