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
				fieldValuesWithGlobalReportingType: args.fieldValuesWithGlobalReportingType
			}));
				$('#categories').show();
                                $(OPTIONS.rootElement).on('change', '#category-select', function () {
                                MODEL.updateSelectedComparisonValue($(this).val());
                                });
			}	
		} else {
			console.log(this.checked);
			$('#categories').hide();
			$('#toolbar').show()
		}
	});
}

function getSelectedComparisonFields() {
	var selectedFields = [{field: "Reporting type", values: ["National", "Global"]}];
	$('#category-select').on('change', function() {
		var selectedFields = [{field: "Reporting type", values: ["National", "Global"]}];
		console.log('from comparisonHelpers: '+selectedFields)
		if ($(this).val() === "total") {
			//do nothing
			console.log('from comparisonHelpers: '+selectedFields)
		} else {
			selectedFields.push(_.map($('#category-select option:selected'), function(fieldValue) {
				return {
					values: [$(fieldValue).val()],
					field: $(fieldValue).data('field')
				};
			}))
			console.log('from comparisonHelpers: '+selectedFields)
		}
	});
	
	
	
	
}
