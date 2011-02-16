(function (global) {

var Joint = global.Joint;

Joint.Mixin(Joint.dia, /** @lends Joint.dia */ {

  /**
   * Translate the entire paper or an area specified by rectangle r.
   */
  translate: function (dx, dy, r) {
      r = r || { x: 0, y: 0, width: 1000000, height: 1000000 };
      var register = this.registeredElements(), idx = register.length, el;
      var rect = Joint.rect;
      while (idx--) {
          el = register[idx];
          if (rect(r).containsPoint(el.wrapperPos())) {
              el.translate(dx, dy);              
          }
      }
      var jregister = this.registeredJoints();
      idx = jregister.length
      while (idx--) {
          var j = jregister[idx],
              vertices = j.getVertices(), vlen = vertices.length, vertex;
          while (vlen--) {
              vertex = vertices[vlen];
              if (rect(r).containsPoint(vertex)) {
                  vertex.x += dx;
                  vertex.y += dy;
              }
          }          
      }
  },

  /**
   * Scale the entire paper.
   */
  scale: function (sx, sy) {
      sy = sy || sx;
    
      var set = Joint.paper().set(), 
          register = this.registeredElements(), len = register.length;
      var idx = len;

      // collect all raphael objects and store them into set set
      // @todo nested Elements
      while (idx--) {
          var el = register[idx],
          robjects = [register[idx].wrapper].concat(register[idx].inner),
          idx2 = robjects.length;
          while (idx2--) set.push(robjects[idx2]);
      }

      // A little bit hacky solution for connection vertices.
      // The trick is to store original position and create a dummy
      // circle at that position every time the scaling is applied.
      // The vertices are then updated according to the position
      // of the circle after it is scaled together with every other element.
      var jregister = this.registeredJoints();
      idx = jregister.length;
      var vertexMap = [], item, paper = Joint.paper();

      while (idx--) {
          var j = jregister[idx],
              vertices = j.getVertices(), vlen = vertices.length, vertex;
          while (vlen--) {
              vertex = vertices[vlen];
              vertex.origx = vertex.origx || vertex.x;
              vertex.origy = vertex.origy || vertex.y;
              console.log(vertex.origx, vertex.origy, vertex.x, vertex.y);
              item = { 
                  joint: j,
                  vertex: vertex, 
                  dummy: paper.circle(vertex.origx, vertex.origy, 1)
              };
              vertexMap.push(item);
              set.push(item.dummy);
          }
          j.update();
      }

      set.scale(sx, sy, 0, 0);

      // update all connection vertices
      // @todo joint.update() doesn't have to be called after every vertex update
      // but only when all vertices belonging to it are updated.
      idx = vertexMap.length;
      while (idx--) {
          item = vertexMap[idx];
          item.vertex.x = item.dummy.attr('cx');
          item.vertex.y = item.dummy.attr('cy');
          item.joint.update();
          item.dummy.remove();
      }

      // should be update() to update all inner elements
      idx = len;    
      while (idx--) register[idx].zoom();

      return this;        // allow chaining
  }
  
});

})(this);
