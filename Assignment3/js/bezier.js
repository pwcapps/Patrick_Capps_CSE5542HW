var camera, scene, renderer;
var controlPoints, controlMesh;
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

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
}
