// var gui = new dat.GUI();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 50 );
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight - 20);
document.body.appendChild(renderer.domElement);

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = true;
orbit.noPan = true;
orbit.zoomSpeed = 0.3;
orbit.minDistance = 0;
orbit.maxDistance = Infinity;

orbit.minPolarAngle = 0; // radians
orbit.maxPolarAngle = Math.PI; // ra



var ambientLight = new THREE.AmbientLight( 0x000000 );
scene.add( ambientLight );

var lights = [];
lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[0].position.set( 0, 200, 0 );
lights[1].position.set( 100, 200, 100 );
lights[2].position.set( -100, -200, -100 );

scene.add( lights[0] );
scene.add( lights[1] );
scene.add( lights[2] );
var data = {
			radius : 20,
			widthSegments : 30,
			heightSegments : 16,
			phiStart : 0,
			phiLength : twoPi,
			thetaStart : 0,
			thetaLength : Math.PI,
		};


var mesh = new THREE.Object3D()

mesh.add( new THREE.LineSegments(
	new THREE.Geometry(),
	new THREE.LineBasicMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.5
	})
));

mesh.add( new THREE.Mesh(
	new THREE.Geometry(),
	new THREE.MeshPhongMaterial({
		color: 0x156289,
		emissive: 0x072534,
		side: THREE.DoubleSide,
		shading: THREE.FlatShading
	})
));

var options = chooseFromHash( mesh, data );

scene.add(mesh);

var prevFog = false;

var animateCount = 0;

var render = function () {
	requestAnimationFrame(render);
	var time = Date.now() * 0.001;
	// if( !options.fixed ) {
	// 	mesh.rotation.x += 0.005;
	// 	mesh.rotation.y += 0.005;
	// }

	renderer.render( scene, camera );

};

window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

orbit.addEventListener( 'change', function(){
	// data.radius += 1;
	// var options = chooseFromHash( mesh, data );
	// console.log(mesh);
});

render();

// var geometry = new THREE.SphereGeometry( 5, 32, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// var sphere = new THREE.Mesh( geometry, material );
// scene.add(sphere);