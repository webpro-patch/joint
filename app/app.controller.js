var controller = {
    "uml-state-btn": {
	click: function(){ app.console.execute("new uml state: " + $VS('uml-label-input') + "," + $VS('uml-rectx-input') + "," + $VS('uml-recty-input') + "," + $VS('uml-rectw-input')  + "," + $VS('uml-recth-input') + ",#" + $VS('uml-color-input')); }
    },
    "uml-startstate-btn": {
	click: function(){ app.console.execute("new uml startstate: " + $VS('uml-posx-input') + "," + $VS('uml-posy-input') + "," + $VS('uml-radius-input'));	}
    },
    "uml-endstate-btn": {
	click: function(){ app.console.execute("new uml endstate: " + $VS('uml-posx-input') + "," + $VS('uml-posy-input') + "," + $VS('uml-radius-input')); }
    },
    "uml-arrow-btn": {
	click: function(){ app.console.execute("new uml arrow: " + $VS('uml-arrowfromx-input') + "," + $VS('uml-arrowfromy-input') + "," + $VS('uml-arrowtox-input') + "," + $VS('uml-arrowtoy-input')); }
    },
    "uml-aggregationarrow-btn": {
	click: function(){ app.console.execute("new uml aggregation: " + $VS('uml-arrowfromx-input') + "," + $VS('uml-arrowfromy-input') + "," + $VS('uml-arrowtox-input') + "," + $VS('uml-arrowtoy-input')); }
    },
    "uml-generalizationarrow-btn": {
	click: function(){ app.console.execute("new uml generalization: " + $VS('uml-arrowfromx-input') + "," + $VS('uml-arrowfromy-input') + "," + $VS('uml-arrowtox-input') + "," + $VS('uml-arrowtoy-input')); }
    },
    "menu-clear-btn": {
	click: function(){ app.console.execute("clear"); }
    },
    "menu-save-btn": {
	click: function(){ app.console.execute("save"); }
    },
    "menu-open-btn": {
	click: function(){ app.console.execute($VS("console")); }
    },
    "menu-toggleghosting-btn": {
	click: function(){ app.console.execute("toggle ghosting"); }
    },
    "menu-about-btn": {
	click: function(){ app.console.execute("about"); }
    },
    "console": {
	keydown: function(e){ if (e.keyCode == 13) app.console.execute($VS("console")); }
    }
};

/**
 * Bindings.
 */

uki("#uml-toolbar [text]").bind("click", function(e){ controller[this.id()].click(e); });
uki("#file-menu Button").bind("click", function(e){ controller[this.id()].click(e); });
uki("#edit-menu Button").bind("click", function(e){ controller[this.id()].click(e); });
uki("#help-menu Button").bind("click", function(e){ controller[this.id()].click(e); });
uki("#console").bind("keydown", function(e){ controller[this.id()].keydown(e); });

// Menu. (Toggle Popups.)
uki("#menu Button").bind("click", function(){
			     var button = this;
			     uki("Popup").grep(function(e){ return e.relativeTo() == button; }).toggle();
			 });


// @todo It doesn't work!
uki("document").bind("keydown", function(e){
			 if (e.keyCode == 67/*c*/ && e.metaKey == e.ctrlKey)
			     uki("#console").focus();
		     });

// @todo Use a cross-browser solution.
document.addEventListener("keydown", function(e){
			      if (e.ctrlKey){
				  switch (e.keyCode){
				  case 67: // c
				      uki("#console").focus();
				      break;
				  case 88: // x
				      $VS("console", "");
				      break;
				  default:
				      break;
				  }
			      }
			  }, false);
