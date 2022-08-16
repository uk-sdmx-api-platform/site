/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {

	if (args.dataHasGlobalReportingType === false) {
		$('#toggles').hide()
		return
	}
	
	$('.toggle-switch-check').change(function() {
		if (this.checked) {
			console.log(this.checked);
			console.log('fieldsHaveGlobalReportingType: '+args.fieldsHaveGlobalReportingType);
			$('#toolbar').hide();
			if (args.fieldsHaveGlobalReportingType) {
				var template = _.template($('#categories_template').html());
				$('#categories').html(template({
				fields: args.fields,
				fieldValuesWithGlobalReportingType: args.fieldValuesWithGlobalReportingType
			}));
			}
			
			
		} else {
			$('#categories').hide();
			$('#toolbar').show()
		}
	});



}
        
