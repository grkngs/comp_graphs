
var gl;

var size = 1000;

var DrawType1;
var DrawType2;

var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 40.0;

var ambientColor, diffuseColor, specularColor;

var pointsArray = [];
var normalsArray = []; 
var ShaderIndex = 0;
var fColor;
var kr1 = 0.6;
var kr2 = 0.75;
var sr1 = 0.6;
var sr2 = 0.75;
var near = -1;
var far = 1;
var radius = 6.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;
var vBufferId;
var program;
var vPosition;
var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio
const black = vec4(0.0, 0.0, 0.0, 1.0);
const red = vec4(1.0, 0.0, 0.0, 1.0);

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var normalMatrix, normalMatrixLoc;
window.onload = function init()
{
    initCanvas();

    SetFrontEnd();

    PushPoints();
    
    SetShaders();
  
    DrawType1 = gl.LINE_STRIP;
    DrawType2 = gl.LINES;
    render();
 
}

function PushPoints(){
    var v = 0;
var u = 0;

var p = 2;
var x;
var y;
var z;   

    for(i=0; i<size; i++){
        for(a=0; a<size; a++){
             x = 4*Math.cos(2*u)*(1+sr2*(Math.cos(5*u)+sr1*Math.cos(10*u)))+Math.cos(v)*Math.cos(2*u)*(1+sr2*(Math.cos(5*u)+sr1*Math.cos(10*u)));
         y = 4*Math.sin(2*u)*(1+sr2*(Math.cos(5*u)+sr1*Math.cos(10*u)))+Math.cos(v)*Math.sin(2*u)*(1+sr2*(Math.cos(5*u)+sr1*Math.cos(10*u)));
         z = Math.sin(v)+0.35*Math.sin(5*u);

        pointsArray.push(vec4(x,y,z,1.0));
        normalsArray.push(vec4(0.0, 0.0, -1.0,0.0));
        u += 2*Math.PI/size;
        }
        u = 0;
        v += 2*Math.PI/size;
    }
}

function SetFrontEnd(){
    document.getElementById("SurfaceRadius1").onchange = function() {
        sr1 = event.srcElement.value;
        pointsArray = [];
        PushPoints();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    };
    document.getElementById("SurfaceRadius2").onchange = function() {
        sr2 = event.srcElement.value;
        pointsArray = [];
        PushPoints();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    };
    document.getElementById("IncSub").onclick = function() {
        pointsArray = [];
        size+=50;
        PushPoints();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    };
    document.getElementById("DecSub").onclick = function() {
        pointsArray = [];
        size-=50;
        PushPoints();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    };
    document.getElementById("Button1").onclick = function(){near  *= 1.1; far *= 1.1;};
    document.getElementById("Button2").onclick = function(){near  *= 0.9; far *= 0.9;};
    document.getElementById("Button3").onclick = function(){radius *= 2.0;};
    document.getElementById("Button4").onclick = function(){radius *= 0.5;};
    document.getElementById("Button5").onclick = function(){theta += dr;};
    document.getElementById("Button6").onclick = function(){theta -= dr;};
    document.getElementById("Button7").onclick = function(){phi += dr;};
    document.getElementById("Button8").onclick = function(){phi -= dr;};
    document.getElementById("fovSlider").onchange = function() {
        fovy = event.srcElement.value;
    };
    document.getElementById("mySelect").onchange = function(){
        ShaderIndex = document.getElementById("mySelect").selectedIndex;
        SetShaders();
    };
}

function initCanvas(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    aspect =  canvas.width/canvas.height;
    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 2.0);
}

function SetShaders(){
    if(ShaderIndex==0){
        program = initShaders( gl, "wireframe-shader", "fragment-shader" );
        gl.useProgram( program );
        
    
        vBufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
        
        vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
        
        fColor = gl.getUniformLocation(program, "fColor");
     
        modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
        projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

        DrawType1 = gl.LINE_STRIP;
    DrawType2 = gl.LINES;
    }
    else if(ShaderIndex==1){
        program = initShaders( gl, "phong-vertex-shader", "phong-fragment-shader" );
        gl.useProgram( program );
        var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
        var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

        vBufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
        
        vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
        
     
        modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
        projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
        normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);
    

        gl.uniform4fv( gl.getUniformLocation(program, 
            "ambientProduct"),flatten(ambientProduct) );
         gl.uniform4fv( gl.getUniformLocation(program, 
            "diffuseProduct"),flatten(diffuseProduct) );
         gl.uniform4fv( gl.getUniformLocation(program, 
            "specularProduct"),flatten(specularProduct) );	
         gl.uniform4fv( gl.getUniformLocation(program, 
            "lightPosition"),flatten(lightPosition) );
         gl.uniform1f( gl.getUniformLocation(program, 
            "shininess"),materialShininess );
            DrawType2 = gl.LINE_STRIP;
            
    }
    else if(ShaderIndex==2){
        program = initShaders( gl, "gouraud-vertex-shader", "gouraud-fragment-shader" );
        gl.useProgram( program );
        var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
        var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

        vBufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
        
        vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
        
     
        modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
        projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
        normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);
    

        gl.uniform4fv( gl.getUniformLocation(program, 
            "ambientProduct"),flatten(ambientProduct) );
         gl.uniform4fv( gl.getUniformLocation(program, 
            "diffuseProduct"),flatten(diffuseProduct) );
         gl.uniform4fv( gl.getUniformLocation(program, 
            "specularProduct"),flatten(specularProduct) );	
         gl.uniform4fv( gl.getUniformLocation(program, 
            "lightPosition"),flatten(lightPosition) );
         gl.uniform1f( gl.getUniformLocation(program, 
            "shininess"),materialShininess );
            DrawType2 = gl.LINE_STRIP;
            
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    var eye = vec3( radius*Math.sin(theta)*Math.cos(phi), radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    
    modelViewMatrix = lookAt( eye, at, up );
    projectionMatrix = perspective(fovy, aspect, near, far);
    
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
    normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];

    if(ShaderIndex==1 || ShaderIndex==2)
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
    
    if(ShaderIndex==0)
        gl.uniform4fv(fColor, flatten(black));
        
        gl.drawArrays( DrawType1, 0, size );

    if(ShaderIndex==0)
        gl.uniform4fv(fColor, flatten(red));

            gl.drawArrays( DrawType2, 0, size*size );
       
        

    requestAnimFrame(render);
}
