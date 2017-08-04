function Rectangle(x, y, color, width, height){
	Shape.call(this, x, y, color);
	this.width = width;
	this.height = height;
	// A
	this.a = this.getPointA();
	// B
	this.b = this.getPointB();
	// C
	this.c = this.getPointC();
	// D
	this.d = this.getPointD();
	// O - center
	this.o = this.getPointO();
	
	// AB
	this.ab = new Side(this.a, this.b);
	// BC
	this.bc = new Side(this.b, this.c);
	// CD
	this.cd = new Side(this.c, this.d);
	// DA
	this.da = new Side(this.d, this.a);
	
	// list of sides
	this.sides = [this.ab, this.bc, this.cd, this.da];
	// list of points
	this.points = [this.a, this.b, this.c, this.d];
	
	// rotate points to start angle
	this.rotatePoint(this.o, this.a, this.rotationAngle);
	this.rotatePoint(this.o, this.b, this.rotationAngle);
	this.rotatePoint(this.o, this.c, this.rotationAngle);
	this.rotatePoint(this.o, this.d, this.rotationAngle);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

/**
* @returns {Side[]} sides of this rectangle
*/
Rectangle.prototype.getSides= function(){
	return this.sides;
};

/**
* @returns {Point[]} points of this rectangle
*/
Rectangle.prototype.getPoints= function(){
	return this.points;
	
};
/**
* Create object for point A
* @returns {Point}
*/
Rectangle.prototype.getPointA= function(){
	return new Point(this.point.x, this.point.y);
};
/**
* Create object for point B
* @returns {Point}
*/
Rectangle.prototype.getPointB= function(){
	return new Point(this.point.x + this.width, this.point.y);
};
/**
* Create object for point C
* @returns {Point}
*/
Rectangle.prototype.getPointC= function(){
	return new Point(this.point.x + this.width, this.point.y + this.height);
};
/**
* Create object for point D
* @returns {Point}
*/
Rectangle.prototype.getPointD= function(){
	return new Point(this.point.x, this.point.y + this.height);
};
/**
* Create object for point O (center)
* @returns {Point}
*/
Rectangle.prototype.getPointO= function(){
	return new Point(this.point.x + this.width / 2, this.point.y + this.height / 2);
};

/**
* Draw this rectangle onto canvas
* @param {CanvasRenderingContext2D}
*/
Rectangle.prototype.draw = function(context){
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(this.a.x, this.a.y);
	context.lineTo(this.b.x, this.b.y);
	context.lineTo(this.c.x, this.c.y);
	context.lineTo(this.d.x, this.d.y);
	context.fill();
};
/**
* Rotate this rectangle(changes position of the points)
*/
Rectangle.prototype.rotate = function(){
	this.rotateShape();
	
	this.rotatePoint(this.o, this.a, this.rotationStep);
	this.rotatePoint(this.o, this.b, this.rotationStep);
	this.rotatePoint(this.o, this.c, this.rotationStep);
	this.rotatePoint(this.o, this.d, this.rotationStep);
	
};

/** 
* Move all points of the rectangle 
*/
Rectangle.prototype.makeAStep = function(){
	this.moveShape();
	var xStep = this.getXStep();
	var yStep = this.getYStep();
	this.a.move(xStep, yStep);
	this.b.move(xStep, yStep);
	this.c.move(xStep, yStep);
	this.d.move(xStep, yStep);
	this.o.move(xStep, yStep);
};
/**
* Checks for collision with right border of the canvas
* @param {Integer} canvasWidth - width of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Rectangle.prototype.checkForRightCanvasSideCollision= function(canvasWidth){
	return this.c.x >= canvasWidth || this.a.x >= canvasWidth || this.b.x >= canvasWidth || this.d.x >= canvasWidth;
};
/**
* Checks for collision with left border of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Rectangle.prototype.checkForLeftCanvasSideCollision= function(){
	return this.a.x <= 0 || this.b.x <= 0 || this.c.x <= 0 || this.d.x <= 0;
};
/**
* Checks for collision with bottom border of the canvas
* @param {Integer} canvasHeight - height of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Rectangle.prototype.checkForBottomCanvasSideCollision= function(canvasHeight){
	return this.c.y >= canvasHeight || this.a.y >= canvasHeight || this.b.y >= canvasHeight || this.d.y >= canvasHeight;
};
/**
* Checks for collision with top border of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Rectangle.prototype.checkForTopCanvasSideCollision= function(){
	return this.a.y <= 0 || this.b.y <= 0 || this.c.y <= 0 || this.d.y <= 0;
};