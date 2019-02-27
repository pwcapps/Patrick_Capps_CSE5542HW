var camera, scene, renderer;
var controlPoints, controlMesh;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  camera.position.z = 5;

  var geometry = new THREE.BufferGeometry();
  // create a simple square shape. We duplicate the top left and bottom right
  // vertices because each vertex needs to appear once per triangle.
  controlPoints = new Float32Array( [
  	-1.0, -1.0,  1.0,
  	 1.0, -1.0,  1.0,
  	 1.0,  1.0,  1.0,

  	 1.0,  1.0,  1.0,
  	-1.0,  1.0,  1.0,
  	-1.0, -1.0,  1.0
  ] );

  // itemSize = 3 because there are 3 values (components) per vertex
  geometry.addAttribute( 'position', new THREE.BufferAttribute( controlPoints, 3 ) );
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
