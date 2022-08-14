/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalData(args) {

  var template = _.template($('#categories_template').html());
  
	$('#categories').html(template({
        fieldsWithGlobalData: args.fieldsWithGlobalData
    }));

}
        
