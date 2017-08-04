// global list of moving shapes
var movingShapes = [];
// global list of static shapes
var staticShapes = [];
// width of the canvas
var canvasWidth = 0;
// height of the canvas
var canvasHeight = 0;
// size of figures' cells
var cellWidth = 100;
var cellHeight = 100;

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
		for(var i = 1; i < 5; i++){//canvasWidth/cellWidth - 1
			for(var j = 1; j < 5; j++){//canvasHeight/cellHeight - 1
				rand = parseInt(Math.random()*10);
				
				if(rand%3 == 1){
					shape = new Circle(i*cellWidth,j*cellHeight, colorsArray[(i+j + parseInt(Math.random()*10))%colorsRange], 20);
				}else if(rand%3 == 2){
					shape = new Rectangle(i*cellWidth,j*cellHeight, colorsArray[(i+j + parseInt(Math.random()*10))%colorsRange], 50, 50);
				}else{
					shape = new Triangle(colorsArray[(i+j + parseInt(Math.random()*10))%colorsRange], i*cellWidth + 30, j*cellHeight+ 30);
				}
				
				rand = parseInt(Math.random()*10);
				if(rand%3 == 1){
					movingShapes.push(shape);
				}else{
					staticShapes.push(shape);
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






	
	// TESTING
	
	// top right
	// var circle = new Circle(100,20, colorsArray[colorsRange-1], 20);
	// circle.movementAngle = 135;
	// movingShapes.push(circle);
	// var rect = new Rectangle(20,100, colorsArray[0], 50, 50);
	// rect.movementAngle = 315;
	// movingShapes.push(rect);
	
	// bottom left
	// var circle = new Circle(20,100, colorsArray[colorsRange-1], 20);
	// circle.movementAngle = 315;
	// movingShapes.push(circle);
	// var rect = new Rectangle(100,20, colorsArray[0], 50, 50);
	// rect.movementAngle = 135;
	// movingShapes.push(rect);
	
	// bottom right
	// var circle = new Circle(100,100, colorsArray[colorsRange-1], 20);
	// circle.movementAngle = 225;
	// movingShapes.push(circle);
	// var rect = new Rectangle(20,20, colorsArray[0], 50, 50);
	// rect.movementAngle = 45;
	// movingShapes.push(rect);
	
	// left top angle
	// var circle = new Circle(20,20, colorsArray[colorsRange-1], 20);
	// circle.movementAngle = 45;
	// movingShapes.push(circle);
	// var rect = new Rectangle(100,100, colorsArray[0], 50, 50);
	// rect.movementAngle = 225;
	// movingShapes.push(rect);