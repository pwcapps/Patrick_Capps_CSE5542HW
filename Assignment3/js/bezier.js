var camera, scene, renderer, controls;
var controlPoints, controlMesh;
var pointsArrays = [];
var stepSize = 0.1;

controlPoints = generateControlPoints(-3, 3, 1, 4);
console.log(controlPoints);

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  camera.position.y = 5;
  camera.position.z = 5;
  camera.rotation.x = -45;

  controls = new THREE.TrackballControls(camera);

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

  // Change control point representation to vector3 like arrays
  pointsArrays = listToVectors(controlPoints);
  // Draw control points
  for (i = 0; i < pointsArrays.length; i++) {
    createPoint(pointsArrays[i]);
  }

  // Get array of points for bezier surface
  var bezierPoints = [];
  for (u = 0; u <= 1; u += stepSize) {
    for (v = 0; v <= 1; v += stepSize) {
      bezierPoints.push(evalBSurface(pointsArrays, u, v));
    }
  }

  // Change representation to fit buffer geometry
  bezierPoints = vectorsToList(bezierPoints);

  // Find indices for points and generate mesh
  segments = 1 / stepSize;
  var bIndices = [];
  for ( i = 0; i < segments; i++ ) {
    for ( j = 0; j < segments; j++ ) {

      var a = i * ( segments + 1 ) + ( j + 1 );
      var b = i * ( segments + 1 ) + j;
      var c = ( i + 1 ) * ( segments + 1 ) + j;
      var d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );
      // generate two faces (triangles) per iteration
      bIndices.push( a, b, d ); // face one
      bIndices.push( b, c, d ); // face two

    }
  }
  var bezGeo = new THREE.BufferGeometry();
  bezGeo.setIndex(bIndices);
  bezGeo.addAttribute( 'position', new THREE.Float32BufferAttribute( bezierPoints, 3 ) );
  material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
  var bMesh = new THREE.Mesh( bezGeo, material );
  scene.add(bMesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

// Evalueate Bezier surface by evaluating curves in two directions
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

// Evaluate Bezier curve by calculating polynomial
function evalBCurve(points, t) {

  var b0 = (1 - t) * (1 - t) * (1 - t);
  var b1 = 3 * t * (1 - t) * (1 - t);
  var b2 = 3 * t * t * (1 - t);
  var b3 = t * t * t;
  var point = pointAddition(multPointScalar(points[0], b0), multPointScalar(points[1], b1));
  point = pointAddition(point, multPointScalar(points[2], b2));
  return pointAddition(point, multPointScalar(points[3], b3));

}

// Vector scalar multiplication
function multPointScalar(point, s) {

  return [point[0] * s, point[1] * s, point[2] * s];

}

// Vector addition
function pointAddition(p1, p2) {

  return [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];

}

// Create sphere for control points
function createPoint(p) {
  var geometry = new THREE.SphereGeometry(0.05, 10, 10);
  var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
  var obj = new THREE.Mesh( geometry, material );
  obj.position.set(p[0], p[1], p[2]);
  scene.add(obj);
}

function listToVectors(vertexList) {
  var vectors = [];
  var i = 0;
  while ( i < vertexList.length - 2 ) {
    vectors.push( [vertexList[i], vertexList[i + 1], vertexList[i + 2]] );
    i += 3;
  }

  return vectors;
}

function vectorsToList(vectors) {
  list = [];
  for (i = 0; i < vectors.length; i++) {
    list.push(vectors[i][0], vectors[i][1], vectors[i][2]);
  }
  return list;
}

// Somewhat randomize control points
function generateControlPoints(minDim, maxDim, xzRange, yRange) {
    var vertices = [];
    var stepSize = (maxDim - minDim) / 3;
    for (i = 0; i < 4; i++) {
      var zDim = minDim + stepSize * i;
      var pos = minDim;
      for (j = 0; j < 4; j++) {
        var x = Math.random() * xzRange + (pos - xzRange / 2);
        var y = Math.random() * yRange - (yRange / 2);
        var z = Math.random() * xzRange + (zDim - xzRange / 2);
        vertices.push(x, y, z);
        pos += stepSize;

      }
    }
    return vertices;
}
