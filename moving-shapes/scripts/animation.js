// global list of moving shapes
var movingShapes = [];
// global list of static shapes
var staticShapes = [];
// width of the canvas
var canvasWidth = 0;
// height of the canvas
var canvasHeight = 0;
// size of figures' cells
var cellWidth = 150;
var cellHeight = 150;

var Animation = new function(){
	// size of the frame
	var frameSize = 10;
	// references to elements of the document
	var w = window,
		d = document,
		element = d.documentElement,
		g = d.getElementsByTagName('body')[0];
	// reference to the canvas
	var canvas = document.getElementById("myCanvas");
	// array of the colors
	var colorsArray = [];
	// reference to interval of the animation
	var movingInterval = null;
	// show static shapes
	var showStaticShapes = false;
	// show moving shapes
	var showMovingShapes = true;
	// show circles
	var showCircles = true;
	// show rectangles
	var showRectangles = true;
	// show triangles
	var showTriangles = true;
	
	/**
	* sets whether to show static shapes
	* @param {Boolean} show - 
	*/
	this.setShowStaticShapes = function(show){
		showStaticShapes = show;
	};
	/**
	* sets whether to show moving shapes
	* @param {Boolean} show - 
	*/
	this.setShowMovingShapes = function(show){
		showMovingShapes = show;
	};
	/**
	* sets whether to show circles
	* @param {Boolean} show - 
	*/
	this.setShowCircles = function(show){
		showCircles = show;
	};
	/**
	* sets whether to show rectangles
	* @param {Boolean} show - 
	*/
	this.setShowRectangles = function(show){
		showRectangles = show;
	};
	/**
	* sets whether to show triangles
	* @param {Boolean} show - 
	*/
	this.setShowTriangles = function(show){
		showTriangles = show;
	};
	
	/**
	* sets width and height of the canvas and global variables
	*/
	this.refreshCanvasSize = function(){
		// set values to global variables
		canvasWidth = window.innerWidth || element.clientWidth || g.clientWidth;
		canvasHeight = window.innerHeight|| element.clientHeight|| g.clientHeight;
		
		// set size of canvas
		canvas.setAttribute("width", canvasWidth);
		canvas.setAttribute("height", canvasHeight);
		
		// draw again all shapes
		draw();
	};
	/**
	* Fills lists of shapes
	*/
	function populateShapeArrays(){
		var colorsRange = colorsArray.length;
		
		var rand;
		var shape;
		for(var i = 1; i < canvasWidth/cellWidth - 1; i++){
			for(var j = 1; j < canvasHeight/cellHeight - 1; j++){
				shape = null;
				rand = parseInt(Math.random()*10);
				
				if(rand%3 == 1 && showCircles){
					shape = new Circle(i*cellWidth,j*cellHeight, colorsArray[(i+j + parseInt(Math.random()*10))%colorsRange], 20);
				}else if(rand%3 == 2 && showRectangles){
					shape = new Rectangle(i*cellWidth,j*cellHeight, colorsArray[(i+j + parseInt(Math.random()*10))%colorsRange], 50, 50);
				}else if(showTriangles){
					shape = new Triangle(colorsArray[(i+j + parseInt(Math.random()*10))%colorsRange], i*cellWidth + 30, j*cellHeight+ 30);
				}
				
				if(shape != null){
					rand = parseInt(Math.random()*10);
					if(rand%9 == 1 && showStaticShapes){
						staticShapes.push(shape);
					}else if(showMovingShapes){
						movingShapes.push(shape);
					}
				}
			}
		}
	};
	/**
	* Draws all shapes
	*/
	function draw(){
		var context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		for(var shapeId = 0; shapeId < movingShapes.length; shapeId++){
			movingShapes[shapeId].draw(context);
		}
		for(var shapeId = 0; shapeId < staticShapes.length; shapeId++){
			staticShapes[shapeId].draw(context);
		}
	};

	/**
	* Sets background of the canvas
	* @param {String} background - new color for the background
	*/
	this.setCanvasSettings = function(background){
		canvas.style.background = background;
	};
	/**
	* Sets list of colors
	* @param {String[]} colors - 
	*/
	this.setColorsArray = function(colors){
		colorsArray = colors;
	};
	/**
	* Start moving shapes
	*/
	this.startMoving = function(){
		if(movingInterval == null){
			populateShapeArrays();
			movingInterval = setInterval(function(){
				for(var shapeId = 0; shapeId < movingShapes.length; shapeId++){
					movingShapes[shapeId].rotate();
					movingShapes[shapeId].move(canvasWidth, canvasHeight);
				}
				for(var shapeId = 0; shapeId < staticShapes.length; shapeId++){
					staticShapes[shapeId].rotate();
				}
				draw();
			}, frameSize);
		}
	};
	/**
	* Resume moving shapes
	*/
	this.resumeMoving = function(){
		if(movingInterval == null){
			movingInterval = setInterval(function(){
				for(var shapeId = 0; shapeId < movingShapes.length; shapeId++){
					movingShapes[shapeId].rotate();
					movingShapes[shapeId].move(canvasWidth, canvasHeight);
				}
				draw();
			}, frameSize);
		}
	};
	/**
	* Set size of the frame
	* @param {Integer} size - size of the frame in milliseconds
	*/
	this.setFrameSize = function(size){
		frameSize = size;
	};
	/**
	* Stop moving shapes
	*/
	this.stopMoving = function(){
		clearInterval(movingInterval);
		movingInterval = null;
	};
	
	// Set size of the canvas
	this.refreshCanvasSize();
};