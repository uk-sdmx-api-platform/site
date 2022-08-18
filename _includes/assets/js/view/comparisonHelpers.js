/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {

	var dataHasGlobalReportingType = args.dataHasGlobalReportingType
	if (dataHasGlobalReportingType === false) {
		$('#toggles').hide()
		$(OPTIONS.rootElement).addClass('no-global-data');
	}
	else {
        	$(OPTIONS.rootElement).removeClass('no-global-data');
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
				comparableFieldValues: args.comparableFieldValues
			}));
				$('#categories').show();
                                $(OPTIONS.rootElement).on('change', '#category-select', function () {
                                MODEL.updateSelectedComparisonValue($(this).val()+);
                                });
			}	
		} else {
			console.log(this.checked);
			$('#categories').hide();
			$('#toolbar').show()
		}
	});
}
