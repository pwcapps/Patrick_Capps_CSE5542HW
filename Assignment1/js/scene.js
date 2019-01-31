var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
var geometry = new THREE.PlaneGeometry(3, 3, 5, 5);
var material = new THREE.MeshNormalMaterial();
material.wireframe = true;
var group = new THREE.Group();
scene.add(group);

// Create ground plane
var object = new THREE.Mesh(geometry, material);
object.position.y = -2
object.rotation.x = - Math.PI / 2;
group.add(object);

// Create legs
geometry = new THREE.BoxGeometry(.5, .5, 1);
object = new THREE.Mesh(geometry, material);
object.position.x = .5;
object.position.y = -1.5;
object.position.z = 1;
group.add(object);

// geometry = new THREE.BoxGeometry(.5, .5, 1);
// object = new THREE.Mesh(geometry, material);
// object.position.x = -.5;
// object.position.y = -1.5;
// object.position.z = 1;
// group.add(object);
//
// geometry = new THREE.BoxGeometry(.5, 1, .5);
// object = new THREE.Mesh(geometry, material);
// object.position.x = -.5;
// object.position.y = -1.5;
// // object.position.z = 1;
// group.add(object);
//
// geometry = new THREE.BoxGeometry(.5, 1, .5);
// object = new THREE.Mesh(geometry, material);
// object.position.x = .5;
// object.position.y = -1;
// // object.position.z = 1;
// group.add(object);


// geometry = new THREE.SphereGeometry(1);
// var sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);
//
// geometry = new THREE.CylinderGeometry();
// var cylinder = new THREE.Mesh(geometry, material);
// cylinder.position.x = 2;
// scene.add(cylinder);
//
// geometry = new THREE.ConeGeometry();
// var cone = new THREE.Mesh(geometry, material);
// cone.position.x = -2;
// scene.add(cone);
//
// geometry = new THREE.TorusGeometry();
// var torus = new THREE.Mesh(geometry, material);
// torus.position.y = 2;
// scene.add(torus);

var render = function() {
    requestAnimationFrame(render);
    group.rotation.y += 0.005
    renderer.render(scene, camera);
}

render();
