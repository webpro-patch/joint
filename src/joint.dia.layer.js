//(function (global) {

var Joint = global.Joint;

Joint.Mixin(Joint.dia, /** @lends Joint.dia */ {

  /**
   * Scale the entire paper.
   */
  scale: function (sx, sy) {
    sy = sy || sx;
    
    var s = Joint.paper().set(), els = this.registeredElements(), len = els.length;
    var idx = len;

    // collect all raphael objects and store them into set s
    while (idx--) {
      var el = els[idx],
          robjects = [els[idx].wrapper].concat(els[idx].inner),
          idx2 = robjects.length;
      while (idx2--) s.push(robjects[idx2]);
    }

    s.scale(sx, sy, 0, 0);

    // should be update() to update all inner elements
    idx = len;    
    while (idx--) els[idx].zoom();

    return this;        // allow chaining
  }
  
});

//})(this);
