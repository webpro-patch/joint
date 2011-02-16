/**
 * Test init.
 */

var plus = document.createElement('button');
plus.innerHTML = 'zoom +';
plus.style.position = 'absolute';
plus.style.top = '50px';
plus.style.left = '50px';
document.body.appendChild(plus);
var minus = document.createElement('button');
minus.innerHTML = 'zoom -';
minus.style.position = 'absolute';
minus.style.top = '50px';
minus.style.left = '120px';
document.body.appendChild(minus);
var zoom = document.createElement('span');
zoom.innerHTML = '1';
zoom.style.position = 'absolute';
zoom.style.top = '55px';
zoom.style.left = '190px';
zoom.style.width = '50px';
zoom.style.color = 'white';
document.body.appendChild(zoom);

var sx = 1, sy = 1;

Joint.addEvent(plus, 'click', function(){
  Joint.dia.scale(sx += 0.1);
  zoom.innerHTML = ('' + sx).substring(0, 3);
});
Joint.addEvent(minus, 'click', function(){
  Joint.dia.scale(sx -= (sx > 0.3 ? 0.1 : 0));
  zoom.innerHTML = ('' + sx).substring(0, 3);
});


var uml = Joint.dia.uml;
Joint.paper("world", 800, 1000);

/**
 * Regular connection.
 */

var s1 = uml.State.create({
  rect: {x: 100, y: 50, width: 100, height: 60},
  label: "state 1",
  attrs: {
    fill: "90-#000-green:1-#fff"
  },
  actions: {
    entry: "init()",
    exit: "destroy()"
  }
});
var s2 = uml.State.create({
  rect: {x: 220, y: 50, width: 100, height: 60},
  label: "state 2",
  attrs: {
    fill: "90-#000-red:1-#fff"
  },
  actions: {
    entry: "init()",
    exit: "destroy()"
  }
});

s1.joint(s2, uml.arrow);

/**
 * Bent connection.
 */

var s3 = uml.State.create({
  rect: {x: 100, y: 150, width: 100, height: 60},
  label: "state 3",
  attrs: {
    fill: "90-#000-green:1-#fff"
  },
  actions: {
    entry: "init()",
    exit: "destroy()"
  }
});
var s4 = uml.State.create({
  rect: {x: 320, y: 150, width: 100, height: 60},
  label: "state 4",
  attrs: {
    fill: "90-#000-red:1-#fff"
  },
  actions: {
    entry: "init()",
    exit: "destroy()"
  }
});

s3.joint(s4, uml.arrow).setVertices(['120 300', '270 280']);


/**
 * Nested elements.
 */

var s5 = uml.State.create({
  rect: {x: 100, y: 400, width: 300, height: 200},
  label: "super",
  attrs: {
    fill: "90-#000-green:1-#fff"
  },
  actions: {
    entry: "init()",
    exit: "destroy()"
  }
});
var s6 = uml.State.create({
  rect: {x: 150, y: 470, width: 100, height: 60},
  label: "nested",
  attrs: {
    fill: "90-#000-red:1-#fff"
  },
  actions: {
    entry: "init()",
    exit: "destroy()"
  }
});

s6.embed();

/**
 * Selection.
 */

Joint.paper().rect(20, 20, 500, 300).attr({ 
    stroke: 'gray',
    'stroke-width': 3,
    fill: 'green',
    'fill-opacity': 0.3
});


Joint.paper().canvas.onclick = function () {
    console.log('paper clicked');
};

/**
 * Translation.
 */

//Joint.dia.translate(300, 0, { x: 0, y: 0, width: 300, height: 100 });
Joint.dia.translate(0, 200);