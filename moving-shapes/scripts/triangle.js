function Triangle(color, x, y){
	Shape.call(this, x, y, color);
	
	// A
	this.a = this.getPointA();
	// B
	this.b = this.getPointB();
	// C
	this.c = this.getPointC();
	// AB
	this.ab = new Side( this.a, this.b );
	// AC
	this.ac = new Side( this.a, this.c );
	// BC
	this.bc = new Side( this.b, this.c );
	
	// list of sides
	this.sides = [this.ab, this.ac, this.bc];
	// list of points
	this.points = [this.a, this.b, this.c];
	
	// rotate points to start angle
	this.rotatePoint(this.point, this.a, this.rotationAngle);
	this.rotatePoint(this.point, this.b, this.rotationAngle);
	this.rotatePoint(this.point, this.c, this.rotationAngle);
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

/**
* Creates x of the A point of this triangle relative to the origin.
* shift is hardcoded
* @returns {Integer}
*/
Triangle.prototype.getAX = function(){
	return this.point.x - 30;
};

/**
* Creates y of the A point of this triangle relative to the origin.
* shift is hardcoded
* @returns {Integer}
*/
Triangle.prototype.getAY = function(){
	return this.point.y + 30;
};

/**
* Creates x of the B point of this triangle relative to the origin.
* shift is hardcoded
* @returns {Integer}
*/
Triangle.prototype.getBX = function(){
	return this.point.x;
};

/**
* Creates y of the B point of this triangle relative to the origin.
* shift is hardcoded
* @returns {Integer}
*/
Triangle.prototype.getBY = function(){
	return this.point.y - 20;
};

/**
* Creates x of the C point of this triangle relative to the origin.
* shift is hardcoded
* @returns {Integer}
*/
Triangle.prototype.getCX = function(){
	return this.point.x + 30;
};

/**
* Creates y of the C point of this triangle relative to the origin.
* shift is hardcoded
* @returns {Integer}
*/
Triangle.prototype.getCY = function(){
	return this.point.y + 30;
};

/**
* @returns {Side[]} sides of this triangle
*/
Triangle.prototype.getSides = function(){		
	return this.sides;
};

/**
* @returns {Point[]} points of this triangle
*/
Triangle.prototype.getPoints = function(){
	return this.points;
};

/**
* Create object for point A
* @returns {Point}
*/
Triangle.prototype.getPointA = function(){
	return new Point( this.getAX(), this.getAY() );
};

/**
* Create object for point B
* @returns {Point}
*/
Triangle.prototype.getPointB = function(){
	return new Point( this.getBX(), this.getBY() );
};

/**
* Create object for point C
* @returns {Point}
*/
Triangle.prototype.getPointC = function(){
	return new Point( this.getCX(), this.getCY() );
};

/**
* Draw this triangle onto canvas
* @param {CanvasRenderingContext2D}
*/
Triangle.prototype.draw = function(context){
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(this.a.x, this.a.y);
	context.lineTo(this.b.x, this.b.y);
	context.lineTo(this.c.x, this.c.y);
	context.fill();
};

/**
* Move all points of the triangle
*/
Triangle.prototype.makeAStep = function(){
	this.moveShape();
	var xStep = this.getXStep();
	var yStep = this.getYStep();
	this.a.move(xStep, yStep);
	this.b.move(xStep, yStep);
	this.c.move(xStep, yStep);
};
/**
* Rotate all points of the triangle
*/
Triangle.prototype.rotate = function(){
	this.rotateShape();
	
	this.rotatePoint(this.point, this.a, this.rotationStep);
	this.rotatePoint(this.point, this.b, this.rotationStep);
	this.rotatePoint(this.point, this.c, this.rotationStep);
};


/**
* Checks for collision with right border of the canvas
* @param {Integer} canvasWidth - width of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Triangle.prototype.checkForRightCanvasSideCollision = function(canvasWidth){
	return this.a.x >= canvasWidth || this.b.x >= canvasWidth || this.c.x >= canvasWidth;
};

/**
* Checks for collision with left border of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Triangle.prototype.checkForLeftCanvasSideCollision = function(){
	return this.a.x <= 0 || this.b.x <= 0 || this.c.x <= 0;
};

/**
* Checks for collision with bottom border of the canvas
* @param {Integer} canvasHeight - height of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Triangle.prototype.checkForBottomCanvasSideCollision = function(canvasHeight){
	return this.a.y >= canvasHeight || this.b.y >= canvasHeight || this.c.y >= canvasHeight;
};

/**
* Checks for collision with top border of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Triangle.prototype.checkForTopCanvasSideCollision = function(){
	return this.a.y <= 0 || this.b.y <= 0 || this.c.y <= 0;
};
