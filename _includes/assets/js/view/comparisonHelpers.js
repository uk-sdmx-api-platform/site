/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {
	
	  var defaultSelectedFields = [{
		  field: "Reporting type",
		  value: "National"
	  },{
		  field: "Reporting type",
		  value: "Global"
	  }]

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
			}	
		} else {
			console.log(this.checked);
			$('#categories').hide();
			$('#toolbar').show()
		}
	});
	
	$('#category-select').on('change', function() {
		var defaultSelectedFields = [{
			field: "Reporting type",
			value: "National"
		}, {
			field: "Reporting type",
			value: "Global"
		}]
		if ($(this).val() === "total") {
		} else {
			defaultSelectedFields.push(_.map($('#category-select option:selected'), function(fieldValue) {
				return {
					value: $(fieldValue).val(),
					field: $(fieldValue).data('field')
				};
			}))
		}
		return defaultSelectedFields
	});
}
