/**
 * @param {Object} args
 * @return null
 */

function initialiseCategories(args) {

  var template = _.template($('#categories_template').html());
  
	$('#categories').html(template({
        fields: args.fields
    }));

}
        
