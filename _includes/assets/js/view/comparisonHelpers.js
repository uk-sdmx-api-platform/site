/**
 * @param {Object} args
 * @return null
 */

function initialiseComparison(args) {

  var template = _.template($('#categories_template').html());
  
	$('#categories').html(template({
        fieldsWithGlobalData: args.fieldsWithGlobalData
    }));

}
        
