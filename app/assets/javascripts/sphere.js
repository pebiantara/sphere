// var gui = new dat.GUI();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 50 );
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight - 20);
document.body.appendChild(renderer.domElement);

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;
orbit.zoomSpeed = 0.3;

var ambientLight = new THREE.AmbientLight( 0x000000 );
scene.add( ambientLight );

// var lights = [];
// lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
// lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
// lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

// lights[0].position.set( 0, 200, 0 );
// lights[1].position.set( 100, 200, 100 );
// lights[2].position.set( -100, -200, -100 );

// scene.add( lights[0] );
// scene.add( lights[1] );
// scene.add( lights[2] );

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
		color: 0x000000,
		transparent: true,
		opacity: 0.5
	})
	));

tmap = "/assets/a.jpg";

mesh.add( new THREE.Mesh(
	new THREE.Geometry(),
	new THREE.MeshPhongMaterial({
		color: 0x156289,
		emissive: 0x072534,
		map: THREE.ImageUtils.loadTexture(tmap),
		side: THREE.DoubleSide,
		shading: THREE.FlatShading
	})
));

// var texture = THREE.ImageUtils.loadTexture( tmap );
// texture.needsUpdate = true;

// mesh.add(new THREE.Mesh(
// 	new THREE.Geometry(), 
// 	new THREE.MeshLambertMaterial({map: texture})
// 	));

var options = chooseFromHash( mesh, data );

scene.add(mesh);

var prevFog = false;

var animateCount = 0;
var y_rotation = 0.05;

function updateGroupGeometry( mesh, geometry ) {

	mesh.children[0].geometry.dispose();
	mesh.children[1].geometry.dispose();

	mesh.children[0].geometry = new THREE.WireframeGeometry( geometry );
	mesh.children[1].geometry = geometry;

	//these do not update nicely together if shared
}

function generateGeometry(mesh, data) {
	updateGroupGeometry( mesh,
		new THREE.SphereGeometry(
			data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength
			)
		);
}

function chooseFromHash ( mesh, data ) {
	generateGeometry(mesh, data);
	return {};
}


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

var render = function () {
	animateCount += 1;
	requestAnimationFrame(render);
	var time = Date.now() * 0.001;
	if( animateCount % 50 != 0 && y_rotation > 0) {
		mesh.rotation.y += y_rotation;
	}else if(y_rotation > 0){
      y_rotation -= 0.01;
	}
	renderer.render( scene, camera );
};

render();