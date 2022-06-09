
var NumVertices = 36; //(6 faces)(2 triangles/face)(3 vertices/triangle)
var cameraAngleRadians = 200;
var points = [];
var colors = [];
var numKeys = 0;
var keyframes = [[]];
var baseMatrix;
var renderCall = 0;
var renderCall2 = 0;
var concon = 0;
var concon2 = 0;
var concon3 = 0;
var concon4 = 0;
var concon5 = 0;
var concon6 = 0;
var animSpeed = 1;
var radiusCam = 200;
var viewProjectionMatrix;
var renderId;
var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5, -0.5, -0.5, 1.0 )
];

// RGBA colors
var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 0.5, 0.5, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];


// Parameters controlling the size of the Robot's arm

var BASE_HEIGHT      = 1.0;
var BASE_WIDTH       = 4.0;
var BASE_WIDTH2     = 7.0;

var FEET_HEIGHT = 5.0;
var FEET_WIDTH  = 1.5;

var LOWER_FEET_HEIGHT = 3.0;
var LOWER_FEET_WIDTH  = 1.0;

var HeelWidth = 0.5;

var LOWER_BODY_HEIGHT = 1.0;
var LOWER_BODY_WIDTH = 1.0;
var LOWER_BODY_WIDTH2 = 4.0;

var UPPER_BODY_HEIGHT = 4.0;
var UPPER_BODY_WIDTH = 1.0;
var UPPER_BODY_WIDTH2 = 5.0;

var SHOULDER_WIDTH = 1.0;

var LOWER_ARM_HEIGHT = 1.5;
var LOWER_ARM_WIDTH = 1.0;
var LOWER_ARM_WIDTH2 = 1.0;

var UPPER_ARM_HEIGHT = 1.5;
var UPPER_ARM_WIDTH = 1.0;
var UPPER_ARM_WIDTH2 = 1.0;

var HAND_HEIGHT = 1.0;
var HAND_WIDTH = 0.5;
var HAND_WIDTH2 = 1.5;

var NECK_HEIGHT = 1.5;
var NECK_WIDTH = 0.5;
var NECK_WIDTH2 = 1.0;

var HEAD_HEIGHT = 1.5;
var HEAD_WIDTH = 1.5;
var HEAD_WIDTH2 = 1.5;

var EYE_WIDTH = 0.3;

var NOSE_WIDTH = 0.4;

var MOUTH_HEIGHT = 0.2;
var MOUTH_WIDTH = 0.2;
var MOUTH_WIDTH2 = 1.0;
// Shader transformation matrices

var modelViewMatrix, projectionMatrix;

// Array of rotation angles (in degrees) for each rotation axis

var Basex = 0;
var Basey = 1;
var Basez = 2;

var FeetFrontUpper1x = 3;
var FeetFrontUpper1y = 4;
var FeetFrontUpper1z = 5;
var FeetFrontLower1x = 6;
var FeetFrontLower1y = 7;
var FeetFrontLower1z = 8;

var FeetFrontUpper2x = 9;
var FeetFrontUpper2y = 10;
var FeetFrontUpper2z = 11;
var FeetFrontLower2x = 12;
var FeetFrontLower2y = 13;
var FeetFrontLower2z = 14;

var FeetRearUpper1x = 15;
var FeetRearUpper1y = 16;
var FeetRearUpper1z = 17;
var FeetRearLower1x = 18;
var FeetRearLower1y = 19;
var FeetRearLower1z = 20;

var FeetRearUpper2x = 21;
var FeetRearUpper2y = 22;
var FeetRearUpper2z = 23;
var FeetRearLower2x = 24;
var FeetRearLower2y = 25;
var FeetRearLower2z = 26;

var UpperBodyx = 27;
var UpperBodyy = 28;
var UpperBodyz = 29;

var UpperArmRightx = 30;
var UpperArmRighty = 31;
var UpperArmRightz = 32;
var LowerArmRightx = 33;
var LowerArmRighty = 34;
var LowerArmRightz = 35;

var UpperArmLeftx = 36;
var UpperArmLefty = 37;
var UpperArmLeftz = 38;
var LowerArmLeftx = 39;
var LowerArmLefty = 40;
var LowerArmLeftz = 41;

var HandRightx = 42;
var HandRighty = 43;
var HandRightz = 44;

var HandLeftx = 45;
var HandLefty = 46;
var HandLeftz = 47;

var Headx = 48;
var Heady = 49;
var Headz = 50;


var theta= [ 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0 ];
var concon7= [ 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0 ];

var angle = 0;

var modelViewMatrixLoc;

var vBuffer, cBuffer;

//----------------------------------------------------------------------------

function quad(  a,  b,  c,  d ) {
    colors.push(vertexColors[a]); 
    points.push(vertices[a]); 
    colors.push(vertexColors[a]); 
    points.push(vertices[b]); 
    colors.push(vertexColors[a]); 
    points.push(vertices[c]);
    colors.push(vertexColors[a]); 
    points.push(vertices[a]); 
    colors.push(vertexColors[a]); 
    points.push(vertices[c]); 
    colors.push(vertexColors[a]); 
    points.push(vertices[d]); 
}


function colorCube() {
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

//____________________________________________

// Remmove when scale in MV.js supports scale matrices

function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}


//--------------------------------------------------


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.enable( gl.DEPTH_TEST ); 
    
    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    
    gl.useProgram( program );

    colorCube();
    
    // Load shaders and use the resulting shader program
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );    
    gl.useProgram( program );

    // Create and initialize  buffer objects
    
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    for(var i=0; i<49; i++){
        keyframes[i] = [];
        keyframes[i][0] = 0;
        keyframes[i][1] = 0;
    }
    

    document.getElementById("slider1").onchange = function() {
        theta[0] = event.srcElement.value;
    };
    document.getElementById("slider2").onchange = function() {
         theta[1] = event.srcElement.value;
    };
    document.getElementById("slider3").onchange = function() {
         theta[2] =  event.srcElement.value;
    };
    document.getElementById("slider4").onchange = function() {
        theta[3] = event.srcElement.value;
    };
    document.getElementById("slider5").onchange = function() {
         theta[4] = event.srcElement.value;
    };
    document.getElementById("slider6").onchange = function() {
         theta[5] =  event.srcElement.value;
    };
    document.getElementById("slider7").onchange = function() {
        theta[6] = event.srcElement.value;
    };
    document.getElementById("slider8").onchange = function() {
         theta[7] = event.srcElement.value;
    };
    document.getElementById("slider9").onchange = function() {
         theta[8] =  event.srcElement.value;
    };
    document.getElementById("slider10").onchange = function() {
        theta[9] = event.srcElement.value;
    };
    document.getElementById("slider11").onchange = function() {
         theta[10] = event.srcElement.value;
    };
    document.getElementById("slider12").onchange = function() {
         theta[11] =  event.srcElement.value;
    };
    document.getElementById("slider13").onchange = function() {
        theta[12] = event.srcElement.value;
    };
    document.getElementById("slider14").onchange = function() {
         theta[13] = event.srcElement.value;
    };
    document.getElementById("slider15").onchange = function() {
         theta[14] =  event.srcElement.value;
    };
    document.getElementById("slider16").onchange = function() {
        theta[15] = event.srcElement.value;
    };
    document.getElementById("slider17").onchange = function() {
         theta[16] = event.srcElement.value;
    };
    document.getElementById("slider18").onchange = function() {
         theta[17] =  event.srcElement.value;
    };
    document.getElementById("slider19").onchange = function() {
        theta[18] = event.srcElement.value;
    };
    document.getElementById("slider20").onchange = function() {
         theta[19] = event.srcElement.value;
    };
    document.getElementById("slider21").onchange = function() {
         theta[20] =  event.srcElement.value;
    };
    document.getElementById("slider22").onchange = function() {
        theta[21] = event.srcElement.value;
    };
    document.getElementById("slider23").onchange = function() {
         theta[22] = event.srcElement.value;
    };
    document.getElementById("slider24").onchange = function() {
         theta[23] =  event.srcElement.value;
    };
    document.getElementById("slider25").onchange = function() {
        theta[24] = event.srcElement.value;
    };
    document.getElementById("slider26").onchange = function() {
         theta[25] = event.srcElement.value;
    };
    document.getElementById("slider27").onchange = function() {
         theta[26] =  event.srcElement.value;
    };
    document.getElementById("slider28").onchange = function() {
        theta[27] = event.srcElement.value;
    };
    document.getElementById("slider29").onchange = function() {
         theta[28] = event.srcElement.value;
    };
    document.getElementById("slider30").onchange = function() {
         theta[29] =  event.srcElement.value;
    };
    document.getElementById("slider31").onchange = function() {
        theta[30] = event.srcElement.value;
   };
   document.getElementById("slider32").onchange = function() {
        theta[31] =  event.srcElement.value;
   };
   document.getElementById("slider33").onchange = function() {
       theta[32] = event.srcElement.value;
   };
   document.getElementById("slider34").onchange = function() {
        theta[33] = event.srcElement.value;
   };
   document.getElementById("slider35").onchange = function() {
        theta[34] =  event.srcElement.value;
   };
   document.getElementById("slider36").onchange = function() {
       theta[35] = event.srcElement.value;
   };
   document.getElementById("slider37").onchange = function() {
        theta[36] = event.srcElement.value;
   };
   document.getElementById("slider38").onchange = function() {
        theta[37] =  event.srcElement.value;
   };
   document.getElementById("slider39").onchange = function() {
       theta[38] = event.srcElement.value;
   };
   document.getElementById("slider40").onchange = function() {
        theta[39] = event.srcElement.value;
   };
   document.getElementById("slider41").onchange = function() {
        theta[40] =  event.srcElement.value;
   };
   document.getElementById("slider42").onchange = function() {
    theta[41] =  event.srcElement.value;
};
document.getElementById("slider43").onchange = function() {
    theta[42] = event.srcElement.value;
};
document.getElementById("slider44").onchange = function() {
    theta[43] =  event.srcElement.value;
};
document.getElementById("slider45").onchange = function() {
   theta[44] = event.srcElement.value;
};
document.getElementById("slider46").onchange = function() {
    theta[45] = event.srcElement.value;
};
document.getElementById("slider47").onchange = function() {
    theta[46] =  event.srcElement.value;
};
document.getElementById("slider48").onchange = function() {
theta[47] =  event.srcElement.value;
};
document.getElementById("slider49").onchange = function() {
    theta[48] = event.srcElement.value;
};
document.getElementById("slider50").onchange = function() {
    theta[49] =  event.srcElement.value;
};
document.getElementById("slider51").onchange = function() {
theta[50] =  event.srcElement.value;
};

document.getElementById("shrink").onclick = function() {
     BASE_HEIGHT      -= 0.02;
 BASE_WIDTH       -= 0.02;
 BASE_WIDTH2     -= 0.02;

 FEET_HEIGHT -= 0.02;
 FEET_WIDTH  -= 0.02;

 LOWER_FEET_HEIGHT -= 0.02;
 LOWER_FEET_WIDTH  -= 0.02;

 HeelWidth -= 0.02;

 LOWER_BODY_HEIGHT -= 0.02;
 LOWER_BODY_WIDTH -= 0.02;
 LOWER_BODY_WIDTH2 -= 0.02;

 UPPER_BODY_HEIGHT -= 0.02;
 UPPER_BODY_WIDTH -= 0.02;
 UPPER_BODY_WIDTH2 -= 0.02;

 SHOULDER_WIDTH -= 0.02;

 LOWER_ARM_HEIGHT -= 0.02;
 LOWER_ARM_WIDTH -= 0.02;
 LOWER_ARM_WIDTH2 -= 0.02;

 UPPER_ARM_HEIGHT -= 0.02;
 UPPER_ARM_WIDTH -= 0.02;
 UPPER_ARM_WIDTH2 -= 0.02;

 HAND_HEIGHT -= 0.02;
 HAND_WIDTH -= 0.02;
 HAND_WIDTH2 -= 0.02;

 NECK_HEIGHT -= 0.02;
 NECK_WIDTH -= 0.02;
 NECK_WIDTH2 -= 0.02;


 EYE_WIDTH -= 0.02;

 NOSE_WIDTH -= 0.02;

 MOUTH_HEIGHT -= 0.02;
 MOUTH_WIDTH -= 0.02;
 MOUTH_WIDTH2 -= 0.02;
 console.log("sa");
};
document.getElementById("enlarge").onclick = function() {
    BASE_HEIGHT      += 0.02;
BASE_WIDTH       += 0.02;
BASE_WIDTH2     += 0.02;

FEET_HEIGHT += 0.02;
FEET_WIDTH  += 0.02;

LOWER_FEET_HEIGHT += 0.02;
LOWER_FEET_WIDTH  += 0.02;

HeelWidth += 0.02;

LOWER_BODY_HEIGHT += 0.02;
LOWER_BODY_WIDTH += 0.02;
LOWER_BODY_WIDTH2 += 0.02;

UPPER_BODY_HEIGHT += 0.02;
UPPER_BODY_WIDTH += 0.02;
UPPER_BODY_WIDTH2 += 0.02;

SHOULDER_WIDTH += 0.02;

LOWER_ARM_HEIGHT += 0.02;
LOWER_ARM_WIDTH += 0.02;
LOWER_ARM_WIDTH2 += 0.02;

UPPER_ARM_HEIGHT += 0.02;
UPPER_ARM_WIDTH += 0.02;
UPPER_ARM_WIDTH2 += 0.02;

HAND_HEIGHT += 0.02;
HAND_WIDTH += 0.02;
HAND_WIDTH2 += 0.02;

NECK_HEIGHT += 0.02;
NECK_WIDTH += 0.02;
NECK_WIDTH2 += 0.02;



EYE_WIDTH += 0.02;

NOSE_WIDTH += 0.02;

MOUTH_HEIGHT += 0.02;
MOUTH_WIDTH += 0.02;
MOUTH_WIDTH2 += 0.02;
console.log("sa");
};
document.getElementById("clap").onclick = function() {
    if(renderCall==1)
    renderCall=0;
    else
    renderCall = 1;
    };
    document.getElementById("walk").onclick = function() {
        if(renderCall2==1)
        renderCall2=0;
        else{
            renderCall2 = 1;
    
            console.log("sa");
        }
        
    };
    document.getElementById("decrease").onclick = function() {
        animSpeed -= 0.05;
        };
        document.getElementById("increase").onclick = function() {
            animSpeed += 0.05;
            };
            document.getElementById("Save").onclick = function() {
                if(numKeys<=1){
                    for(var i=0; i<49; i++){
                        keyframes[i][numKeys] = theta[i];
                        if(numKeys==1 && keyframes[i][0]!=keyframes[i][1]){
                            console.log(keyframes[i][0]);
                            console.log(keyframes[i][1]);
                            if(keyframes[i][0]<keyframes[i][1]){
                                concon7[i] = -1;
                            }
                            else
                                concon7[i] = 1;
                        }
                        
                            
                       
                    }
                    numKeys+=1;
                    
                }
                }    
                
                document.getElementById("Load").onclick = function() {
                    for(var i=0; i<49; i++){
                        if(concon7[i]!=0){
                            theta[i] = keyframes[i][0]
                            console.log(concon7[i]);
                        }
                    }
                    
                    numKeys=0;
                    concon6=1;
                    };
                    var save = document.getElementById("Save")
    save.addEventListener("click", function(){
        SaveDatFileBro();
    });
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix) );
    

    render();
}

//----------------------------------------------------------------------------


function base() {

    var s = scale4(BASE_WIDTH2, BASE_HEIGHT, BASE_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * BASE_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//----------------------------------------------------------------------------


function feetFrontLower1() {

    var s = scale4(LOWER_FEET_WIDTH, LOWER_FEET_HEIGHT, LOWER_FEET_WIDTH);
    var instanceMatrix = mult(translate( 0.0, 0.5 * LOWER_FEET_HEIGHT, 0.0 ),s);    
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//----------------------------------------------------------------------------


function feetFrontUpper1()
{

    var s = scale4(FEET_WIDTH, FEET_HEIGHT, FEET_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * FEET_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//----------------------------------------------------------------------------

function heel()
{

    var s = scale4(HeelWidth, HeelWidth, HeelWidth);
    var instanceMatrix = mult( translate( 0.0, 0.5 * HeelWidth, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//----------------------------------------------------------------------------

function feet1(){
    var FeetFront1Upper = mult(baseMatrix, translate(-(BASE_WIDTH2/2-FEET_WIDTH/2), 0, -(BASE_WIDTH/2-FEET_WIDTH/2))); 
    totalRotateBase = rotate(theta[FeetFrontUpper1x]+180, 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontUpper1y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontUpper1z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetFront1Upper, totalRotateBase);
    FeetFront1Upper = modelViewMatrix;
    feetFrontUpper1();

    
    var FeetFront1Lower  = mult(FeetFront1Upper, translate(0.0, FEET_HEIGHT, 0.0));
    totalRotateBase = rotate(theta[FeetFrontLower1x], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontLower1y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontLower1z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetFront1Lower, totalRotateBase);
    FeetFront1Lower = modelViewMatrix;
    feetFrontLower1();

    var heel1 = mult(FeetFront1Lower, translate(0.0, LOWER_FEET_HEIGHT, 0.0));
    modelViewMatrix = heel1;
    heel();
}

//----------------------------------------------------------------------------

function feet2(){
    var FeetFront2Upper = mult(baseMatrix, translate(-(BASE_WIDTH2/2-FEET_WIDTH/2), 0, (BASE_WIDTH/2-FEET_WIDTH/2))); 
    totalRotateBase = rotate(theta[FeetFrontUpper2x]+180, 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontUpper2y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontUpper2z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetFront2Upper, totalRotateBase);
    FeetFront2Upper = modelViewMatrix;
    feetFrontUpper1();

    
    var FeetFront2Lower  = mult(FeetFront2Upper, translate(0.0, FEET_HEIGHT, 0.0));
    totalRotateBase = rotate(theta[FeetFrontLower2x], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontLower2y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetFrontLower2z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetFront2Lower, totalRotateBase);
    FeetFront2Lower = modelViewMatrix;
    feetFrontLower1();

    var heel2 = mult(FeetFront2Lower, translate(0.0, LOWER_FEET_HEIGHT, 0.0));
    modelViewMatrix = heel2;
    heel();
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function feet3(){
    var FeetRear1Upper = mult(baseMatrix, translate((BASE_WIDTH2/2-FEET_WIDTH/2), 0, -(BASE_WIDTH/2-FEET_WIDTH/2))); 
    totalRotateBase = rotate(theta[FeetRearUpper1x]+180, 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearUpper1y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearUpper1z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetRear1Upper, totalRotateBase);
    FeetRear1Upper = modelViewMatrix;
    feetFrontUpper1();

    
    var FeetRear1Lower  = mult(FeetRear1Upper, translate(0.0, FEET_HEIGHT, 0.0));
    totalRotateBase = rotate(theta[FeetRearLower1x], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearLower1y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearLower1z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetRear1Lower, totalRotateBase);
    FeetRear1Lower = modelViewMatrix;
    feetFrontLower1();

    var heel3 = mult(FeetRear1Lower, translate(0.0, LOWER_FEET_HEIGHT, 0.0));
    modelViewMatrix = heel3;
    heel();
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function feet4(){
    var FeetRear2Upper = mult(baseMatrix, translate((BASE_WIDTH2/2-FEET_WIDTH/2), 0, (BASE_WIDTH/2-FEET_WIDTH/2))); 
    totalRotateBase = rotate(theta[FeetRearUpper2x]+180, 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearUpper2y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearUpper2z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetRear2Upper, totalRotateBase);
    FeetRear2Upper = modelViewMatrix;
    feetFrontUpper1();

    
    var FeetRear2Lower  = mult(FeetRear2Upper, translate(0.0, FEET_HEIGHT, 0.0));
    totalRotateBase = rotate(theta[FeetRearLower2x], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearLower2y], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[FeetRearLower2z], 0, 0, 1 ));
    modelViewMatrix = mult(FeetRear2Lower, totalRotateBase);
    FeetRear2Lower = modelViewMatrix;
    feetFrontLower1();

    var heel4 = mult(FeetRear2Lower, translate(0.0, LOWER_FEET_HEIGHT, 0.0));
    modelViewMatrix = heel4;
    heel();
}

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------

function lowerBody(){
    var lower_body = mult(baseMatrix, translate(-(BASE_WIDTH2/2-LOWER_BODY_WIDTH/2), BASE_WIDTH/2 - LOWER_BODY_HEIGHT, 0.0)); 
    
    modelViewMatrix = lower_body;
    var s = scale4(LOWER_BODY_WIDTH, LOWER_BODY_HEIGHT, LOWER_BODY_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * LOWER_BODY_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    upperBody(lower_body);
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function upperBody(lower_body){

    var upper_body = mult(lower_body, translate(0.0, LOWER_BODY_HEIGHT, 0.0)); 
    totalRotateBase = rotate(theta[UpperBodyx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[UpperBodyy], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[UpperBodyz], 0, 0, 1 ));
    modelViewMatrix = mult(upper_body, totalRotateBase);
    upper_body = modelViewMatrix;



    var s = scale4(UPPER_BODY_WIDTH, UPPER_BODY_HEIGHT, UPPER_BODY_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * UPPER_BODY_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    shoulder(upper_body);
    shoulder2(upper_body);
    neck(upper_body)
};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function shoulder(upper_body){

    var shoulder = mult(upper_body, translate(0.0, UPPER_BODY_HEIGHT-SHOULDER_WIDTH, -(UPPER_BODY_WIDTH2/2+SHOULDER_WIDTH/2))); 

    modelViewMatrix = shoulder;

    var s = scale4(SHOULDER_WIDTH, SHOULDER_WIDTH, SHOULDER_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * SHOULDER_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    right_arm(shoulder);
};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function shoulder2(upper_body){

    var shoulder = mult(upper_body, translate(0.0, UPPER_BODY_HEIGHT-SHOULDER_WIDTH, (UPPER_BODY_WIDTH2/2+SHOULDER_WIDTH/2))); 

    modelViewMatrix = shoulder;

    var s = scale4(SHOULDER_WIDTH, SHOULDER_WIDTH, SHOULDER_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * SHOULDER_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    left_arm(shoulder);
};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function right_arm(shoulder){

    var upper_right_arm = mult(shoulder, translate(0.0, SHOULDER_WIDTH/2, 0.0)); 
    upper_right_arm = mult(upper_right_arm, rotate(-90, 1, 0, 0 )); 
    var totalRotateBase = rotate(theta[UpperArmRightx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[UpperArmRighty], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[UpperArmRightz], 0, 0, 1 ));
    modelViewMatrix = mult(upper_right_arm, totalRotateBase);
    upper_right_arm = modelViewMatrix;

    var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * UPPER_ARM_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    var lower_right_arm = mult(upper_right_arm, translate(0.0, UPPER_ARM_HEIGHT, 0.0)); 

    totalRotateBase = rotate(theta[LowerArmRightx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[LowerArmRighty], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[LowerArmRightz], 0, 0, 1 ));
    modelViewMatrix = mult(lower_right_arm, totalRotateBase);
    lower_right_arm = modelViewMatrix;

    var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * LOWER_ARM_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );


    right_hand(lower_right_arm);
};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function left_arm(shoulder){

    var upper_left_arm = mult(shoulder, translate(0.0, SHOULDER_WIDTH/2, 0.0)); 
    upper_left_arm = mult(upper_left_arm, rotate(90, 1, 0, 0 )); 
    var totalRotateBase = rotate(theta[UpperArmLeftx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[UpperArmLefty], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[UpperArmLeftz], 0, 0, 1 ));
    modelViewMatrix = mult(upper_left_arm, totalRotateBase);
    upper_left_arm = modelViewMatrix;

    var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * UPPER_ARM_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    var lower_left_arm = mult(upper_left_arm, translate(0.0, UPPER_ARM_HEIGHT, 0.0)); 

    totalRotateBase = rotate(theta[LowerArmLeftx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[LowerArmLefty], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[LowerArmLeftz], 0, 0, 1 ));
    modelViewMatrix = mult(lower_left_arm, totalRotateBase);
    lower_left_arm = modelViewMatrix;

    var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * LOWER_ARM_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    left_hand(lower_left_arm);
};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function right_hand(lower_right_arm){

    var hand = mult(lower_right_arm, translate(0.0, LOWER_ARM_HEIGHT, 0.0)); 
    var totalRotateBase = rotate(theta[HandRightx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[HandRighty], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[HandRightz], 0, 0, 1 ));
    modelViewMatrix = mult(hand, totalRotateBase);
    hand = modelViewMatrix;

    var s = scale4(HAND_WIDTH, HAND_HEIGHT, HAND_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * HAND_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

   

};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function left_hand(lower_left_arm){

    var hand = mult(lower_left_arm, translate(0.0, LOWER_ARM_HEIGHT, 0.0)); 
    var totalRotateBase = rotate(theta[HandLeftx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[HandLefty], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[HandLeftz], 0, 0, 1 ));
    modelViewMatrix = mult(hand, totalRotateBase);
    hand = modelViewMatrix;

    var s = scale4(HAND_WIDTH, HAND_HEIGHT, HAND_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * HAND_HEIGHT, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

   

};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function neck(upper_body){

    var neck = mult(upper_body, translate(0.0, UPPER_BODY_HEIGHT, 0.0)); 

    modelViewMatrix = neck;

    var s = scale4(NECK_WIDTH, NECK_HEIGHT, NECK_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * NECK_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    head(neck);
};

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

function head(neck){

    var head = mult(neck, translate(0.0, NECK_HEIGHT/2, 0.0)); 
    var totalRotateBase = rotate(theta[Headx], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[Heady], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[Headz], 0, 0, 1 ));
    modelViewMatrix = mult(head, totalRotateBase);
    head = modelViewMatrix;

    var s = scale4(HEAD_WIDTH, HEAD_HEIGHT, HEAD_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * HEAD_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    var eye = mult(head, translate(-(HEAD_WIDTH/2), HEAD_WIDTH/2+EYE_WIDTH/2, -(HEAD_WIDTH/2-EYE_WIDTH*5/6))); 
    modelViewMatrix = eye;

    var s = scale4(EYE_WIDTH, EYE_WIDTH, EYE_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * EYE_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    var eye2 = mult(head, translate(-(HEAD_WIDTH/2), HEAD_WIDTH/2+EYE_WIDTH/2, (HEAD_WIDTH/2-EYE_WIDTH*5/6))); 
    modelViewMatrix = eye2;

    var s = scale4(EYE_WIDTH, EYE_WIDTH, EYE_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * EYE_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    var nose = mult(head, translate(-(HEAD_WIDTH/2), HEAD_WIDTH/2-NOSE_WIDTH/2, 0.0)); 
    modelViewMatrix = nose;

    var s = scale4(NOSE_WIDTH, NOSE_WIDTH, NOSE_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * NOSE_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    var mouth = mult(head, translate(-(HEAD_WIDTH/2), (MOUTH_WIDTH/2), 0.0)); 
    modelViewMatrix = mouth;

    var s = scale4(MOUTH_WIDTH, MOUTH_HEIGHT, MOUTH_WIDTH2);
    var instanceMatrix = mult( translate( 0.0, 0.5 * MOUTH_WIDTH, 0.0 ), s);
    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
};

//----------------------------------------------------------------------------
var render = function() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    var totalRotateBase = rotate(theta[Basex], 1, 0, 0 );
    totalRotateBase = mult(totalRotateBase,rotate(theta[Basey], 0, 1, 0 ));
    totalRotateBase = mult(totalRotateBase,rotate(theta[Basez], 0, 0, 1 ));
    modelViewMatrix = totalRotateBase;
    baseMatrix = modelViewMatrix;
    base();

    lowerBody();

    feet1();
    
    feet2();

    feet3();
    
    feet4();

    
    
    if(renderCall==1 || renderCall2 == 1){
        if(renderCall==1){
            if(theta[UpperArmRightz]>=90)
            concon=1;
            if(theta[UpperArmRightz]<=0)
            concon=0;
            
            if(concon==0){
                theta[UpperArmRightz] += animSpeed;
            theta[UpperArmLeftz] += animSpeed;
            theta[LowerArmRightz] += animSpeed;
            theta[LowerArmLeftz] += animSpeed;
    
            if(theta[Headz]<=45){
                theta[Headz] += animSpeed;
                theta[UpperBodyz] += animSpeed;
            }
            
            }
            else if (concon==1){
                theta[UpperArmRightz] -= animSpeed;
                theta[UpperArmLeftz] -= animSpeed;
                theta[LowerArmRightz] -= animSpeed;
                theta[LowerArmLeftz] -= animSpeed;
                if(theta[Headz]>=0){
                    theta[Headz] -= animSpeed;
                    theta[UpperBodyz] -= animSpeed;
                }
                    
            }
        }
        if(renderCall2==1){
            
                if(concon2==0){
                    if(theta[FeetFrontLower1z]<=-35){
                        theta[FeetFrontUpper1z] += animSpeed;
                        theta[FeetRearUpper1z] += animSpeed;
                        if(theta[FeetFrontUpper1z]>=35){
                            concon2=1;
                        }
                    }
                    else{
                        theta[FeetFrontLower1z] -= animSpeed;
                        theta[FeetRearLower1z] -= animSpeed;
                    }
                }
                else if(concon2==1){
                    if(theta[FeetFrontLower1z]>=0){
                        theta[FeetFrontUpper1z] -= animSpeed;
                        theta[FeetRearUpper1z] -= animSpeed;
                        concon3=1;
                        if(theta[FeetFrontUpper1z]<=0){
                            concon2=0;
                            
                        }
                    }
                    else{
                        theta[FeetFrontLower1z] += animSpeed;
                        theta[FeetRearLower1z] += animSpeed;
                    }
                }
            
            if(concon3==1){
                if(concon4==0){
                    if(theta[FeetFrontLower2z]<=-35){
                        theta[FeetFrontUpper2z] += animSpeed;
                        theta[FeetRearUpper2z] += animSpeed;
                        if(theta[FeetFrontUpper2z]>=35){
                            concon4=1;
                        }
                    }
                    else{
                        theta[FeetFrontLower2z] -= animSpeed;
                        theta[FeetRearLower2z] -= animSpeed;
                    }
                }
                else if(concon4==1){
                    if(theta[FeetFrontLower2z]>=0){
                        theta[FeetFrontUpper2z] -= animSpeed;
                        theta[FeetRearUpper2z] -= animSpeed;
                        if(theta[FeetFrontUpper2z]<=0){
                            concon4=0;
                        }
                    }
                    else{
                        theta[FeetFrontLower2z] += animSpeed;
                        theta[FeetRearLower2z] += animSpeed;
                    }
                }
            }
            
            if(theta[Basez]<=-10){
                concon5 = 1;
            }
            if(theta[Basez]>0){
                concon5 = 0;
            }

            if(concon5==1){
                theta[Basez] += animSpeed/5;
            }
            else{
                theta[Basez] -= animSpeed/5;
            }

        }
        
    }

    if(concon6==1){
        for(var i=0; i<49; i++){
            if(concon7[i]==-1){
                
                theta[i] = parseInt(theta[i])  + parseInt(animSpeed);
                console.log(theta[i]);
                if(theta[i]>=keyframes[i][1]){
                    console.log(theta[i]);
                    concon7[i]=1;
                }
            }
            else if(concon7[i]==1){
                console.log(false);
                theta[i] -= animSpeed;
                if(theta[i]<=keyframes[i][0]){
                    concon7[i]=-1;
                }
            }
            
        }
    }
  
        renderId = requestAnimFrame(render);
    

    
}
//----------------------------------------------------------------------------
function SaveDatFileBro(){
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
    
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };
    var txt = "";
    console.log("index:",index);
      for(var i = 0; i < 49; i++)
      {
      	txt = txt + theta[i];
      	txt+="\n";
      	txt = txt + keyframes[i][0];
      	txt+="\n";
      	txt = txt + keyframes[i][1];
      	txt+="\n";
      	txt = txt + concon7;
      	txt+="\n";
      }
          txt = txt + concon6;
      

      var create = document.getElementById('create'),
        textbox = document.getElementById('textbox');
    
      create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(txt);
        link.style.display = 'block';
      }, false);
    }