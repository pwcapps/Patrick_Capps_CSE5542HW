var camera, scene, renderer;
var controlPoints, controlMesh;
var pointsArrays = [];
var stepSize = 0.2;

controlPoints = [
  -1.5, 0.0, -1.5,
  -1.5, 0.0, -0.5,
  -1.5, 0.0, 0.5,
  -1.5, 0.0, 1.5,
  -0.5, 0.0, -1.5,
  -0.5, 0.0, -0.5,
  -0.5, 0.0, 0.5,
  -0.5, 0.0, 1.5,
  0.5, 0.0, -1.5,
  0.5, 0.0, -0.5,
  0.5, 0.0, 0.5,
  0.5, 0.0, 1.5,
  1.5, 0.0, -1.5,
  1.5, 0.0, -0.5,
  1.5, 0.0, 0.5,
  1.5, 0.0, 1.5
]

var bezier = [
  [-1, 3, -3, 1],
  [3, -6, 3, 0],
  [-3, 3, 0, 0],
  [1, 0, 0, 0]
]

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  camera.position.y = 5;
  camera.position.z = 5;
  camera.rotation.x = -45;

  // Generate mesh from control points
  var geometry = new THREE.BufferGeometry();

  var segments = 3;

  var indices = [];
  var vertices = controlPoints;

  for ( i = 0; i < segments; i++ ) {

    for ( j = 0; j < segments; j++ ) {

      var a = i * ( segments + 1 ) + ( j + 1 );
      var b = i * ( segments + 1 ) + j;
      var c = ( i + 1 ) * ( segments + 1 ) + j;
      var d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );
      // generate two faces (triangles) per iteration
      indices.push( a, b, d ); // face one
      indices.push( b, c, d ); // face two

    }

  }

  geometry.setIndex(indices);
  geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } );
  controlMesh = new THREE.Mesh( geometry, material );
  scene.add(controlMesh);

  // Get each vertex as an array for calculating bezier surface
  var i = 0;
  while ( i < controlPoints.length - 2 ) {

    pointsArrays.push( [controlPoints[i], controlPoints[i + 1], controlPoints[i + 2]] );
    i += 3;

  }

  // var curve1 = [pointsArrays[0], pointsArrays[1], pointsArrays[2], pointsArrays[3]];
  // for ( i = 0; i <= 1; i += stepSize ) {
  //   var p = evalBCurve(curve1, i);
  //   console.log(p);
  //   geometry = new THREE.SphereGeometry(0.05, 10, 10);
  //   material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
  //   var obj = new THREE.Mesh( geometry, material );
  //   obj.position.set(p[0], p[1], p[2]);
  //   scene.add(obj);
  // }

  for (u = 0; u <= 1; u += stepSize) {
    for (v = 0; v <= 1; v += stepSize) {
      var p = evalBSurface(pointsArrays, u, v);
      console.log(p);
      createPoint(p);
    }
  }
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
}

function evalBSurface(points, u, v) {
    var uPoints = [];
    for (i = 0; i < 4; i++) {
      var curvePoints = [];
      curvePoints[0] = points[i * 4];
      curvePoints[1] = points[i * 4 + 1];
      curvePoints[2] = points[i * 4 + 2];
      curvePoints[3] = points[i * 4 + 3];
      uPoints[i] = evalBCurve(curvePoints, u);
    }

    return evalBCurve(uPoints, v);
}

function evalBCurve(points, t) {

  var b0 = (1 - t) * (1 - t) * (1 - t);
  var b1 = 3 * t * (1 - t) * (1 - t);
  var b2 = 3 * t * t * (1 - t);
  var b3 = t * t * t;
  var point = pointAddition(multPointScalar(points[0], b0), multPointScalar(points[1], b1));
  point = pointAddition(point, multPointScalar(points[2], b2));
  return pointAddition(point, multPointScalar(points[3], b3));

}

function multPointScalar(point, s) {

  return [point[0] * s, point[1] * s, point[2] * s];

}

function pointAddition(p1, p2) {

  return [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];

}

function createPoint(p) {
  geometry = new THREE.SphereGeometry(0.05, 10, 10);
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
  var obj = new THREE.Mesh( geometry, material );
  obj.position.set(p[0], p[1], p[2]);
  scene.add(obj);
}
