/**
 * Get number value.
 */
var $VN = function(id){
    return parseInt(uki('#' + id).value());
};
/**
 * Get/set string value.
 */
var $VS = function(id, value){
    if (value !== undefined){
	uki('#' + id).value(value);
	return value;
    }
    return uki('#' + id).value();
};

var app = {
    version: "0.0.1",
    about: "Joint Diagram Builder v0.0.1, author: David Durman, 2010",
    currentModule: "uml",
    init: function(){
	Joint.paper("diagram", 700, 600);
    },
    console: {
	help: "Commands:\n\t"
	    + "help: Print this help.\n\t"
	    + "clear: Clear current diagram.\n\t"
	    + "save: Stringify current diagram.\n\t"
	    + "about: Show about string.\n\t"
	    + "version: Show version information.\n\t"
	    + "[JSON]: Load diagram as JSON string.\n\n"

	    + "Key shortcuts:\n\t"
	    + "Ctrl-c: Gain focus.\n\t"
	    + "Ctrl-x: Clear console."

	    + "Tips:\n\tGradients: In console, you can specify gradients instead of just plain colors.\n\t\t"
	    + "Syntax: Linear gradient: ‹angle›-‹colour›[-‹colour›[:‹offset›]]*-‹colour›\n\t\t"
	    + "Radial gradient: r[(‹fx›, ‹fy›)]‹colour›[-‹colour›[:‹offset›]]*-‹colour›\n\t\t"
	    + "Example: 90-#fff-#000  ...  90° gradient from white to black\n\t\t"
	    + "0-#fff-#f00:20-#000 ... 0° gradient from white via red (at 20%) to black\n\t\t"
	    + "r#fff-#000 ... gradient from white to black\n\t\t"
	    + "r(0.25, 0.75)#fff-#000 ... gradient from white to black with focus point at 0.25, 0.75",
	parse: function(cmd){
	    var colonIdx = cmd.indexOf(":");
	    if (colonIdx === -1) colonIdx = cmd.length;
	    var baseCmds = cmd.substring(0, colonIdx).split(" ");
	    var args = cmd.substring(colonIdx + 2).split(",");
	    return {
		base: baseCmds,
		args: args
	    };
	},
	execute: function(cmd){
	    var cmdStr = cmd.replace(/^\s+|\s+$/g,""), properties,
	        registeredElements = Joint.dia.registeredElements();

	    cmd = app.console.parse(cmdStr);


	    switch (cmd.base[0]){
	    case "clear":
		Joint.resetPaper();
		break;
	    case "save":
		var json = Joint.dia.stringify(Joint.paper());
		console.log(json);
		$VS("console", json);
		break;
	    case "about":
		$VS("console", app.about);
		break;
	    case "version":
		$VS("console", app.version);
		break;
	    case "help":
		$VS("console", app.console.help);
		break;
	    case "toggle":
		if (cmd.base[1] == "ghosting")
		    for (var i = 0, l = registeredElements.length; i < l; i++)
			registeredElements[i].toggleGhosting();
		break;
	    case "new":
		switch (cmd.base[1]){
		case "uml":
		    switch (cmd.base[2]){
		    case "state":
			properties = {
			    label: cmd.args[0],
			    rect: {x: (cmd.args[1] || 100), y: (cmd.args[2] || 100), width: (cmd.args[3] || 100), height: (cmd.args[4] || 80)},
			    attrs: { fill: cmd.args[5] }
			};
			Joint.dia.uml.State.create(properties);
			break;
		    case "endstate":
			properties = {
			    position: {x: parseInt(cmd.args[0]), y: parseInt(cmd.args[1])},
			    radius: (cmd.args[2] ? parseInt(cmd.args[2]) : undefined)
			};
			Joint.dia.uml.EndState.create(properties);
			break;
		    case "startstate":
			properties = {
			    position: {x: parseInt(cmd.args[0]), y: parseInt(cmd.args[1])},
			    radius: (cmd.args[2] ? parseInt(cmd.args[2]) : undefined)
			};
			Joint.dia.uml.StartState.create(properties);
			break;
		    case "arrow":
		    case "aggregation":
		    case "generalization":
			if (cmd.args.length){
			    var from, to;
			    if (cmd.args.length == 4){
				from = {x: parseInt(cmd.args[0]), y: parseInt(cmd.args[1])};
				to = {x: parseInt(cmd.args[2]), y: parseInt(cmd.args[3])};
			    } else {  // from/to specified by label of connected states
				for (var i = 0, l = registeredElements.length; i < l; i++){
				    if (registeredElements[i].properties && registeredElements[i].properties.label == cmd.args[0])
					from = registeredElements[i];
				    if (registeredElements[i].properties && cmd.args.length > 1 && registeredElements[i].properties.label == cmd.args[1])
					to = registeredElements[i];
				}
			    }
			}
			if (cmd.base[2] == "aggregation")
			    Joint.dia.Joint(from, to, Joint.dia.uml.aggregationArrow).registerForever(Joint.dia.registeredElements());
			else if (cmd.base[2] == "generalization")
			    Joint.dia.Joint(from, to, Joint.dia.uml.generalizationArrow).registerForever(Joint.dia.registeredElements());
			else
			    Joint.dia.Joint(from, to, Joint.dia.uml.arrow).registerForever(Joint.dia.registeredElements());
			break;
		    }
		    break;
		}
		break;
		// JSON string or unknown command
	    default:
		try {
		    Joint.dia.parse(cmdStr);	// load diagram as JSON string
		} catch (x) {
		    console.log("Unknown command: " + cmdStr);
		}
		break;
	    }
	    $VS("console-history", cmdStr + "\n" + $VS("console-history"));
	    //	    $VS("console", "");	// clear the console
	}
    }
};


/**
 * App init.
 */
app.init();


