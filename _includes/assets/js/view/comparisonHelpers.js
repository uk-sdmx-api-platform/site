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
			$('#toolbar').hide();
			if (args.fieldsHaveGlobalReportingType === true) {
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
        
