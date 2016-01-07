/**
 * @author TatumCreative (Greg Tatum) / http://gregtatum.com/
 */

 var twoPi = Math.PI * 2;

 var constants = {

 	combine: {

 		"THREE.MultiplyOperation" : THREE.MultiplyOperation,
 		"THREE.MixOperation" : THREE.MixOperation,
 		"THREE.AddOperation" : THREE.AddOperation

 	},

 	side : {

 		"THREE.FrontSide" : THREE.FrontSide,
 		"THREE.BackSide" : THREE.BackSide,
 		"THREE.DoubleSide" : THREE.DoubleSide

 	},

 	shading : {

 		"THREE.FlatShading" : THREE.FlatShading,
 		"THREE.SmoothShading" : THREE.SmoothShading

 	},

 	colors : {

 		"THREE.NoColors" : THREE.NoColors,
 		"THREE.FaceColors" : THREE.FaceColors,
 		"THREE.VertexColors" : THREE.VertexColors

 	},

 	blendingMode : {

 		"THREE.NoBlending" : THREE.NoBlending,
 		"THREE.NormalBlending" : THREE.NormalBlending,
 		"THREE.AdditiveBlending" : THREE.AdditiveBlending,
 		"THREE.SubtractiveBlending" : THREE.SubtractiveBlending,
 		"THREE.MultiplyBlending" : THREE.MultiplyBlending,
 		"THREE.CustomBlending" : THREE.CustomBlending

 	},

 	equations : {

 		"THREE.AddEquation" : THREE.AddEquation,
 		"THREE.SubtractEquation" : THREE.SubtractEquation,
 		"THREE.ReverseSubtractEquation" : THREE.ReverseSubtractEquation

 	},

 	destinationFactors : {

 		"THREE.ZeroFactor" : THREE.ZeroFactor,
 		"THREE.OneFactor" : THREE.OneFactor,
 		"THREE.SrcColorFactor" : THREE.SrcColorFactor,
 		"THREE.OneMinusSrcColorFactor" : THREE.OneMinusSrcColorFactor,
 		"THREE.SrcAlphaFactor" : THREE.SrcAlphaFactor,
 		"THREE.OneMinusSrcAlphaFactor" : THREE.OneMinusSrcAlphaFactor,
 		"THREE.DstAlphaFactor" : THREE.DstAlphaFactor,
 		"THREE.OneMinusDstAlphaFactor" : THREE.OneMinusDstAlphaFactor

 	},

 	sourceFactors : {

 		"THREE.DstColorFactor" : THREE.DstColorFactor,
 		"THREE.OneMinusDstColorFactor" : THREE.OneMinusDstColorFactor,
 		"THREE.SrcAlphaSaturateFactor" : THREE.SrcAlphaSaturateFactor

 	}

 }

 function updateGroupGeometry( mesh, geometry ) {

 	mesh.children[0].geometry.dispose();
 	mesh.children[1].geometry.dispose();

 	mesh.children[0].geometry = new THREE.WireframeGeometry( geometry );
 	mesh.children[1].geometry = geometry;

	//these do not update nicely together if shared
}

var guis = {

	SphereGeometry : function( mesh, data ) {

		function generateGeometry() {

			updateGroupGeometry( mesh,
				new THREE.SphereGeometry(
					data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength
					)
				);

		}
		generateGeometry();
	}

}

function chooseFromHash ( mesh, data ) {
	var selectedGeometry = 'SphereGeometry';
	if ( guis[ selectedGeometry ] !== undefined ) {
		guis[ selectedGeometry ]( mesh, data );
	}
	return {};
}