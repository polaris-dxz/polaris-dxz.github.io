/**
 * badge tag
 *
 * Syntax:
 *   {% badge color text %}
 */
var types = {primary:true, secondary:true, success:true, danger:true, warning:true, info:true, light:true, dark:true};
module.exports = function(args, content){
	var text, type = 'secondary';
	if(args.length == 1) {
		text = args[0];
	} else {
		type = args[0];
		text = args[1];
	}

	if(!types[type]) {
		if(!text)
			type = text;
		type = 'secondary';
	}

	return '<span class="badge badge-'+type+'">' + text + '</span>';
};
