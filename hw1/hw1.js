var notCopied = false;
var ltext;
var canvas;
var gl;
var pre=12;

var maxNumVertices  = 20000;
var index = 0;
var mouseClick = false;
var cindex = 0;
var OldX=-2.0;
var OldY=-2.0;
var undo = [0];
var lastUndo = 0;
var undoClick = 0;
var brushClick;
var eraserClick;
var rectClick;
var triClick;
var roundClick;
var fillCheck;
var copyClick;
var ellipClick;
var currentLayer=0;
var layers = [];
var copVer = [];
var copied = false;
var filledTriangleIndex;
var unfilledTriangleIndex;
var filledRectIndex;
var unfilledRectIndex;
var colVer = [];
var colors = [

    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0)   // cyan
];
var x1;
var x2;
var y1;
var y2;

var quad = {v1: [0, 0], v2: [0, 0],v3: [0, 0],v4: [0, 0], index: -1};;
var quads = [];
var vertices = [[]];
var cquads = [[0]];   
var t;
var numRounds = 0;
var numIndices = [];
numIndices[0] = 0;
var start = [0];
var bufferId;
var cBufferId;
window.onload = function init() {
    
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    var m = document.getElementById("mymenu");
    
    m.addEventListener("click", function() {
       cindex = m.selectedIndex;
        });
        
        var fill = document.getElementById("FillOption");
        ltext = document.getElementById("clayer");
        ltext.innerHTML = 1;
        currentLayer = 0;
    fill.addEventListener("click", function() {
        fillCheck = fill.selectedIndex;
        });

    var a = document.getElementById("Undo")
    a.addEventListener("click", function(){
    if(index!=0){
        lastUndo-=1;
    index -= undo[lastUndo];
    undoClick+=1;
    render2(); 
    }
    
    
    
    });

    var b = document.getElementById("Redo")
    b.addEventListener("click", function(){
    if(undoClick!=0){
        index += undo[lastUndo];
    lastUndo+=1;
    undoClick-=1;
    render2(); 
    }
});



canvas.addEventListener("mousedown", function(event){
    topMouseDown(event);
});
canvas.addEventListener("mousemove", function(event){
    topMouseMove(event);
});
canvas.addEventListener("mouseup", function(event){
    topMouseUp(event);
});

    var c = document.getElementById("Brush")
    c.addEventListener("click", function(){
        brushClick = true;
        eraserClick = false;
        rectClick = false;
        triClick = false;
        roundClick = false;
        copyClick = false;
        ellipClick = false;
        
    });
    var d = document.getElementById("Eraser")
    d.addEventListener("click", function(){
        brushClick = false;
        eraserClick = true;
        rectClick = false;
        triClick = false;
        roundClick = false;
        copyClick = false;
        ellipClick = false;
        
        
        
    
    });
    
    var cop = document.getElementById("Copy")
    cop.addEventListener("click", function(){
        brushClick = false;
        eraserClick = false;
        rectClick = false;
        triClick = false;
        roundClick = false;
        copyClick = true;
        //console.log(vertices);
        ellipClick = false;
        
        
    
    });
    
    

    var rec = document.getElementById("Rectangle")
    rec.addEventListener("click", function(){
        brushClick = false;
        eraserClick = false;
        rectClick = true;
        triClick = false;
        roundClick = false;
        copyClick = false;
        ellipClick = false;
    });

    var tri = document.getElementById("Triangle")
    tri.addEventListener("click", function(){
        brushClick = false;
        eraserClick = false;
        rectClick = false;
        triClick = true;
        roundClick = false;
        copyClick = false;
        ellipClick = false;
    
    });

    var ell = document.getElementById("Ellipse")
    ell.addEventListener("click", function(){
        brushClick = false;
        eraserClick = false;
        rectClick = false;
        triClick = false;
        roundClick = false;
        copyClick = false;
        ellipClick = true;
    
    });

    var lay1 = document.getElementById("Layer1")
    lay1.addEventListener("click", function(){
       
        
        currentLayer = 0;
        ltext.innerHTML = 1;
    });

    var lay2 = document.getElementById("Layer2")
    lay2.addEventListener("click", function(){
      
        
        currentLayer = 1;
        ltext.innerHTML = 2;
    });

    var lay3 = document.getElementById("Layer3")
    lay3.addEventListener("click", function(){
        brushClick = false;
        eraserClick = false;
        rectClick = false;
        triClick = false;
        roundClick = false;
        copyClick = false;
        
        currentLayer = 2;
        ltext.innerHTML = 3;
    });

    var lay4 = document.getElementById("Layer4")
    lay4.addEventListener("click", function(){
        brushClick = false;
        eraserClick = false;
        rectClick = false;
        triClick = false;
        roundClick = false;
        copyClick = false;
        
        currentLayer = 3;
        ltext.innerHTML = 4;
    });

    var fr = document.getElementById("Front")
    fr.addEventListener("click", function(){
        
        
        takeFront();
    });

    var lg = document.getElementById("Log")
    lg.addEventListener("click", function(){
        logAllVertices();
    });

    var save = document.getElementById("Save")
    save.addEventListener("click", function(){
        SaveDatFileBro();
    });

    var read = document.getElementById("Read")
    read.addEventListener("click", function(){
        ReadFile();
    });
    
    for(var k=0; k<4; k++){
        quads[k] = [];
    for(var i=0; i<300; i++){
        quads[k][i] = [];
        for(var s=0; s<300; s++){
            quads[k][i][s] = -1;
        }
    }
}
    
for(var k=0; k<4; k++){
for(var i=0; i<maxNumVertices;i++){
    vertices[i] = [];
    for(var s=0; s<4; s++){
        vertices[i][s] = [];
    }
}
layers[k] = vertices;
}


    for(var i=0; i<maxNumVertices;i++){
        colVer[i] = [];
        for(var s=0; s<4; s++){
            colVer[i][s] = [];
        }
    }
    

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );

    var vPos = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPos, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPos );
    
    cBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

}

function DrawRound( thickness, x,  y){
	var radian = 0.0;
	var t = vec2(0,0);
    var vers = [];
    var clrs = [];    
            x=x-8;
            y=y-8;
            
            t = vec4(colors[cindex]);
            for(var i=-2; i<=2; i++){
                for(var k=-2; k<=2; k++){
                    
                    
            if(i+k<3 && i+k>-3){
            if(quads[currentLayer][x+i][y+k]==-1){
                
            quads[currentLayer][x+i][y+k] = index;
            //console.log(currentLayer);
            //console.log(quads[currentLayer][x+i][y+k]);
            //console.log(x+i,y+k);
            var vt = [[4]];
            vt[0] = [x+i,y+k,-0.5,1];
            vt[1] =  [x+i+1,y+k,-0.5,1];
            vt[2] =  [x+i,y+k-1,-0.5,1];
            vt[3] =  [x+i+1,y+k-1,-0.5,1];
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten(vt.flat(2)));
            vertices[index/4] =  vt;
            gl.bindBuffer(gl.ARRAY_BUFFER, cBufferId);
                colVer[index/4] = [t,t,t,t];
            gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten([t,t,t,t].flat(2)));
            undo[lastUndo]+=4;
            index=index+4;
            
            }
            
        }
                }
            }
            layers[currentLayer] =vertices;
			render(bufferId, cBufferId);
}

function CheckCollision(x,y){
    x=x-8;
    y=y-8;
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    //console.log(quads[0][x][y], x, y);
    if(quads[currentLayer][x][y]!=-1){
        //console.log("GIRDIMMMMMMM");
        //console.log(quads[x][y]/4);
        //console.log(vertices[quads[x][y]/4]);
        var arr = vertices.slice((quads[currentLayer][x][y]+4)/4,index);
        //console.log(arr[0]);
        
        gl.bufferSubData(gl.ARRAY_BUFFER, quads[currentLayer][x][y]*16, flatten(arr.flat(2)));

        vertices.splice(quads[currentLayer][x][y]/4,1);
        quads[currentLayer][x][y]=-1;
        //console.log(vertices);
        index-=4;
    }

/*
    for(var i=0; i<index*8; i+=32){
        console.log("silinecek x",vertices[i][0][0]);
        console.log("silinecek y",vertices[i][0][1]);
        if(vertices[i][0][0]==x && vertices[i][0][1]==y){
            console.log("GIRDIMMMMMMM");
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            var arr = vertices.slice(i+4*8,index*8);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(arr.flat(2)), gl.STATIC_DRAW);
            vertices.splice(i,i+4*8);
        }
    }
    */
    render(bufferId, cBufferId);
}

function render(bufferId, cBufferId) {
    gl.clear( gl.COLOR_BUFFER_BIT );
    //console.log("hihihihi");
    for(var i = 0; i<index; i+=4){
        
        gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
    }
        
        
}

function render2(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    for(var i = 0; i<index; i+=4)
        gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
    
}

function render3() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(var i = 0; i<index; i+=4)
        gl.drawArrays( gl.LINE_LOOP, i, 4 );
        
}

function render4(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    for(var i = 0; i<index; i+=3)
        gl.drawArrays( gl.TRIANGLE_FAN, i, 3 );
    
}

function render5() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(var i = 0; i<index; i+=3)
        gl.drawArrays( gl.LINE_LOOP, i, 3 );
        
}

function render6() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(var i = 0; i<index; i+=32)
        gl.drawArrays( gl.TRIANGLE_FAN, i, 32 );
        
}

function render7() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(var i = 0; i<index; i+=32)
        gl.drawArrays( gl.LINE_LOOP, i, 32 );
        
}

function topMouseDown(event){
    if(brushClick==true){
        //console.log("sa");
        var x  = event.clientX; 
                var y = event.clientY;
            undo[lastUndo]=0;
                    mouseClick=true;
                    OldX = x;
                   OldY=y;
                DrawRound(0.1,x,y);
        }
    else if(eraserClick==true){
			var x  = event.clientX; 
            var y = event.clientY;
            mouseClick=true;
            CheckCollision(x,y);
}
    else if(copyClick==true){
    if(copied==false){
        x1  = event.clientX-8; 
        y1 = event.clientY-8;
    }
    mouseClick=true;
    if(copied==true){
    var newx = event.clientX-8;
    var newy = event.clientY-8;
    var disx = x1-newx;
    var disy = y1-newy;
    t = vec4(colors[cindex]);
    for(var i=0; i<copVer.length; i++){
    for(var k=0; k<4; k++){
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten([copVer[i][k][0]-disx/2,copVer[i][k][1]-disy/2,copVer[i][k][2],1].flat(1)));
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferId);
    gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten(t));
        index+=1;
    }
    }
    notCopied=true;
    render(bufferId, cBufferId);
    }
}
else if(rectClick == true){
    x1  = event.clientX-8; 
    y1 = event.clientY-8;
    
    mouseClick=true;
    }
 else if(triClick == true){
        x1  = event.clientX-8; 
        y1 = event.clientY-8;
        
        mouseClick=true;
        //console.log("gir");
        }
        else if(ellipClick == true){
            x1  = event.clientX-8; 
            y1 = event.clientY-8;
            
            mouseClick=true;
            //console.log("gir");
            }
}

function topMouseMove(event){
    if(brushClick==true){
        if(mouseClick==true){
            var x  = event.clientX; 
            var y = event.clientY;
            OldX = x;
            OldY=y;
            DrawRound(0.1,x,y);
        }
        }
    else if(eraserClick==true){
            if(mouseClick==true){
                    var x  = event.clientX; 
                    var y = event.clientY;
                        
                    CheckCollision(x,y);       
                }
            }
}



function topMouseUp(event){
    if(brushClick==true){
        mouseClick = false;
                    lastUndo+=1;
        }
        else if(eraserClick==true){
            mouseClick = false;
            }
            else if(copyClick==true){
                if(notCopied==false){
                    x2  = event.clientX-8; 
                y2 = event.clientY-8;
                for(var i=0; i<index/4-4; i++){
                    if(vertices[i][0][0]>x1 && vertices[i][0][0]<x2 && vertices[i][0][1]<y2 && vertices[i][0][0]>y1){
                        copVer[i] = vertices[i];
                    }
                }
                copied=true;
                mouseClick = false;
                }
                }
                else if(rectClick == true){
                    
                mouseClick = false;
                x2  = event.clientX-8; 
                y2 = event.clientY-8;
                t = vec4(colors[cindex]);
                gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
                gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten([x1,y1,0.0,1].flat(2)));
                gl.bufferSubData(gl.ARRAY_BUFFER, (index+1)*16, flatten([x2,y1,0.0,1].flat(2)));
                gl.bufferSubData(gl.ARRAY_BUFFER, (index+2)*16, flatten([x2,y2,0.0,1].flat(2)));
                gl.bufferSubData(gl.ARRAY_BUFFER, (index+3)*16, flatten([x1,y2,0.0,1].flat(2)));
                gl.bindBuffer(gl.ARRAY_BUFFER, cBufferId);
                gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten([t,t,t,t].flat(2)));
                index+=4;
                if(fillCheck==0)
                render();
                if(fillCheck==1)
                render3();
              }
           else if(triClick == true){
            mouseClick = false;
            x2  = event.clientX-8; 
            y2 = event.clientY-8;
            t = vec4(colors[cindex]);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten([x2,y2,0.0,1].flat(2)));
            gl.bufferSubData(gl.ARRAY_BUFFER, (index+1)*16, flatten([x2,2*y1-y2,0.0,1].flat(2)));
            gl.bufferSubData(gl.ARRAY_BUFFER, (index+2)*16, flatten([x1*2-x2,y2,0.0,1].flat(2)));
            gl.bindBuffer(gl.ARRAY_BUFFER, cBufferId);
            gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten([t,t,t,t].flat(2)));
            index+=3;
            if(fillCheck==0)
            render4();
            if(fillCheck==1)
            render5();
          }
          else if(ellipClick == true){
            
        mouseClick = false;
        x2  = event.clientX-8; 
        y2 = event.clientY-8;
        console.log(x2,y2);
        t = vec4(colors[cindex]);
        
            
            var ds2 = (y2-y1)/70;
            var ds1 = (x2-x1)/70;
            var con = false;
            var tt=0;
            var radian = 0;
                for(var i=0; i<32; i++){
                    var data = [x1+(Math.cos(radian)*(1000+100*tt)*ds1)/32,y2+(Math.sin(radian)*(1000+100*tt)*ds2)/32,0.1,1];
                    radian += 0.19;
                    
                    if(tt==1){
                        con = true;
                    }
                    if(tt==0){
                        con = false;
                    }
                    if(con==false){
                        tt = tt+1/8;
                    }
                    else{
                        tt = tt-1/8;
                    }
                    
                    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
                    gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten(data.flat(2)));
                    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferId);
                    gl.bufferSubData(gl.ARRAY_BUFFER, index*16, flatten([t,t,t,t].flat(2)));
                    index+=1;
                    
                }
            
            
        
        
        
        if(fillCheck==0)
        render6();
        if(fillCheck==1)
        render7();
      }
}

function takeFront(){
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    console.log("sa");
    for(var i=0; i<index; i+=4){
        
        
        if(i==quads[currentLayer][vertices[i/4][0][0]][vertices[i/4][0][1]]){
            console.log(i);
            console.log(quads[currentLayer][vertices[i/4][0][0]][vertices[i/4][0][1]]);
            
            for(var k=0; k<4; k++){
                vertices[i/4][k][2] += 0.5;
                
            }
            console.log("x:",vertices[i/4][0][0],"y:",vertices[i/4][0][1], "z:",vertices[i/4][0][2]);
            gl.bufferSubData(gl.ARRAY_BUFFER, i*16, flatten(vertices[i/4].flat(4)));
        }
    }
    render(bufferId, cBufferId);
}

function logAllVertices(){

    console.log(quads);

    for(var i=0; i<index; i+=4){
        if(quads[0][vertices[i/4][0][0]][vertices[i/4][0][1]]!=-1 && quads[1][vertices[i/4][0][0]][vertices[i/4][0][1]]!=-1){
            console.log(vertices[i/4][0][2]);
        }
    }
}

function SaveFile(){
    var fso = new CreateObject("Scripting.FileSystemObject");
    	var filename = "test.txt";
    	var ss = fso.CreateTextFile(filename);
    	let arr = [];
    	
    	let txt = "";
    	for(var i = 0; i < index/4; i++)
    	{
    		for(var j = 0; j < 4; j++)
    		{
    			for(var z = 0; z < 4; z++){
    				txt = txt + vertices[i][j][z];
    			}
    			txt = txt + "\n";
    		}
    		txt = txt + "\n";
    		ss.WriteLine(txt);
    	}
}

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
    var txt=index+"\n";
    console.log("index:",index);
      for(var i = 0; i < index/4; i++)
      {
          for(var j = 0; j < 4; j++)
          {
              for(var z = 0; z < 4; z++){
                  txt = txt + vertices[i][j][z];
                  txt+="\n";
              }
          }
      }
      for(var i = 0; i < index/4; i++)
      {
          for(var j = 0; j < 4; j++)
          {
              for(var z = 0; z < 4; z++){
                  txt = txt + colVer[i][j][z];
                  txt+="\n";
              }
          }
      }

      for(var i = 0; i < 300; i++)
      {
          for(var j = 0; j < 300; j++)
          {
              for(var z = 0; z < 4; z++){
                  txt = txt + quads[z][i][j];
                  txt+="\n";
              }
          }
      }

      var create = document.getElementById('create'),
        textbox = document.getElementById('textbox');
    
      create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(txt);
        link.style.display = 'block';
      }, false);
    }
    function ReadFile()
    {
        document.getElementById('btnOpen').onclick = function() {
            if ('FileReader' in window) {
              document.getElementById('exampleInputFile').click();
            } else {
              alert('Your browser does not support the HTML5 FileReader.');
            }
          };
          
          document.getElementById('exampleInputFile').onchange = function(event) {
            var fileToLoad = event.target.files[0];
          
            if (fileToLoad) {
              var reader = new FileReader();
              reader.onload = function(fileLoadedEvent) {
                var arr = fileLoadedEvent.target.result;
                //console.log(arr[2]);
                var char = arr[0];
                var counter = 0;
                var temp = "";
                while(char != '\n')
                {
                    temp = temp+char;
                    counter++;
                    char = arr[counter];  
                }
                index = parseInt(temp,10);
                console.log(index);counter++;
                var inc=0;
                gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
                for(var i = 0; i < index/4; i++)
                {
                    for(var j = 0; j < 4; j++)
                    {
                        for(var z = 0; z < 4; z++){
                            char = arr[counter];
                            var temp = "";
                            while(char != '\n')
                            {
                                temp = temp+char;
                                counter++;
                                char = arr[counter];  
                            }
                            vertices[i][j][z] = parseInt(temp,10);
                            
                            
                            counter++;
                        }
                        console.log(vertices[i][j]);
                        gl.bufferSubData(gl.ARRAY_BUFFER, inc*16, flatten(vertices[i][j].flat(3)));
                            inc+=1;
                    }
                }
                inc = 0;
                gl.bindBuffer(gl.ARRAY_BUFFER, cBufferId);
                for(var i = 0; i < index/4; i++)
                {
                    for(var j = 0; j < 4; j++)
                    {
                        for(var z = 0; z < 4; z++){
                            char = arr[counter];
                            var temp = "";
                            while(char != '\n')
                            {
                                temp = temp+char;
                                counter++;
                                char = arr[counter];  
                            }
                            colVer[i][j][z] = parseInt(temp,10);
                            
                            
                            counter++;
                        }
                        gl.bufferSubData(gl.ARRAY_BUFFER, inc*16, flatten(colVer[i][j].flat(3)));
                            inc+=1;
                    }
                }
                for(var i = 0; i < 300; i++)
                {
                    for(var j = 0; j < 300; j++)
                    {
                        for(var z = 0; z < 4; z++){
                            char = arr[counter];
                            var temp = "";
                            while(char != '\n')
                            {
                                temp = temp+char;
                                counter++;
                                char = arr[counter];  
                            }
                            quads[z][i][j] = parseInt(temp,10);
                            counter++;
                        }
                    }
                }
                document.getElementById('exampleTextarea').value = arr;
                console.log(vertices);
                
                render(bufferId, cBufferId);
              };
              reader.readAsText(fileToLoad, 'UTF-8');
              
            }
          };
    }
  