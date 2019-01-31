var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
camera.position.y = 2;
camera.rotation.x = -Math.PI / 8;
var geometry = new THREE.PlaneGeometry(3, 3, 5, 5);
var material = new THREE.MeshBasicMaterial();
material.wireframe = true;
var group = new THREE.Group();
scene.add(group);

// Create ground plane
var object = new THREE.Mesh(geometry, material);
object.position.y = -2
object.rotation.x = - Math.PI / 2;
group.add(object);

material = new THREE.MeshNormalMaterial();
material.wireframe = true;
// Create legs
geometry = new THREE.BoxGeometry(.3, .3, 1);
object = new THREE.Mesh(geometry, material);
object.position.x = .5;
object.position.y = -1.85;
object.position.z = .2;
group.add(object);

geometry = new THREE.BoxGeometry(.3, .3, 1);
object = new THREE.Mesh(geometry, material);
object.position.x = -.5;
object.position.y = -1.85;
object.position.z = .2;
group.add(object);

geometry = new THREE.BoxGeometry(.3, 1, .3);
object = new THREE.Mesh(geometry, material);
object.position.x = .5;
object.position.y = -1.2;
group.add(object);

geometry = new THREE.BoxGeometry(.3, 1, .3);
object = new THREE.Mesh(geometry, material);
object.position.x = -.5;
object.position.y = -1.2;
group.add(object);

geometry = new THREE.SphereGeometry(.3, 12, 12);
object = new THREE.Mesh(geometry, material);
object.position.x = .5;
object.position.y = -.45;
group.add(object);

geometry = new THREE.SphereGeometry(.3, 12, 12);
object = new THREE.Mesh(geometry, material);
object.position.x = -.5;
object.position.y = -.45;
group.add(object);

// Create body
geometry = new THREE.ConeGeometry(.7, 1, 16);
object = new THREE.Mesh(geometry, material);
object.position.y = .3;
group.add(object);

geometry = new THREE.CylinderGeometry(.7, .7, 1, 16);
object = new THREE.Mesh(geometry, material);
object.position.y = 1.3;
group.add(object);

// Create head
geometry = new THREE.SphereGeometry(0.5, 32, 32);
object = new THREE.Mesh(geometry, material);
object.position.y = 2.3;
group.add(object);

geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 12);
object = new THREE.Mesh(geometry, material);
object.position.y = 2.65;
object.rotation.x = Math.PI / 2;
group.add(object);

// Create arms
geometry = new THREE.SphereGeometry(.2, 12, 12);
object = new THREE.Mesh(geometry, material);
object.position.x = .8;
object.position.y = 1.3;
group.add(object);

geometry = new THREE.SphereGeometry(.2, 12, 12);
object = new THREE.Mesh(geometry, material);
object.position.x = -.8;
object.position.y = 1.3;
group.add(object);

geometry = new THREE.BoxGeometry(0.25, 0.9, 0.25);
object = new THREE.Mesh(geometry, material);
object.position.x = 1;
object.position.y = 0.75;
object.rotation.z = Math.PI / 8;
group.add(object);

geometry = new THREE.BoxGeometry(0.25, 0.9, 0.25);
object = new THREE.Mesh(geometry, material);
object.position.x = -1;
object.position.y = 1.85;
object.rotation.z = Math.PI / 8;
group.add(object);

geometry = new THREE.CylinderGeometry(0.13, 0.13, 0.5, 16);
object = new THREE.Mesh(geometry, material);
object.position.x = 1.2;
object.position.y = 0.25;
object.position.z = -0.1;
object.rotation.x = Math.PI / 2;
group.add(object);

geometry = new THREE.CylinderGeometry(0.13, 0.13, 0.5, 16);
object = new THREE.Mesh(geometry, material);
object.position.x = -1.2;
object.position.y = 2.35;
object.position.z = 0.1;
object.rotation.x = Math.PI / 2;
group.add(object);

var render = function() {
    requestAnimationFrame(render);
    group.rotation.y += 0.005
    renderer.render(scene, camera);
}

render();
