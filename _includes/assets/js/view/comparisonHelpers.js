/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {
	
	console.log('headlineIsComparable: '+args.headlineIsComparable);
	var dataIsComparable = args.dataIsComparable
	if (dataIsComparable === false) {
		$('#toggles').hide()
		$(OPTIONS.rootElement).addClass('no-global-data');
	}
	else {
        	$(OPTIONS.rootElement).removeClass('no-global-data');
    	}
	
	
	$('.toggle-switch-check').change(function() {
		if (this.checked) {
			console.log(this.checked);
			console.log('dataIsComparable: '+args.dataIsComparable);
			console.log('fieldsAreComparable: '+args.fieldsAreComparable)
			$('#toolbar').hide();
			if (args.fieldsAreComparable) {
				var template = _.template($('#categories_template').html());
				$('#categories').html(template({
				fields: args.fields,
				comparableFieldValues: args.comparableFieldValues
			}));
				console.log(args.fieldsAreComparable)
				console.log(comparableFieldValues)
				$('#categories').show();
                                $(OPTIONS.rootElement).on('change', '#category-select', function () {
                                MODEL.updateSelectedComparisonValue($(this).val().concat("|",$(this).val()));
                                });
			}	
		} else {
			console.log(this.checked);
			$('#categories').hide();
			$('#toolbar').show()
		}
	});
}
