function Circle(x, y, color, radius){
	Shape.call(this, x, y, color);
	// radius of this circle
	this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

/**
* Draw this circle onto canvas
* @param {CanvasRenderingContext2D}
*/
Circle.prototype.draw = function(context){
	var radians = this.degreesToRadians(this.rotationAngle);
	
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.point.x, this.point.y, this.radius,0,Math.PI *2);
	context.fill();
	
	context.fillStyle = "#656533";
	context.beginPath();
	context.arc(this.point.x, this.point.y, this.radius,Math.PI+radians,radians);
	context.fill();
};

/**
* Checks for collision with right border of the canvas
* @param {Integer} canvasWidth - width of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Circle.prototype.checkForRightCanvasSideCollision = function(canvasWidth){
	return (this.point.x + this.radius >= canvasWidth);
};

/**
* Checks for collision with left border of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Circle.prototype.checkForLeftCanvasSideCollision = function(){
	return this.point.x - this.radius <= 0;
};

/**
* Checks for collision with bottom border of the canvas
* @param {Integer} canvasHeight - height of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Circle.prototype.checkForBottomCanvasSideCollision = function(canvasHeight){
	return this.point.y + this.radius >= canvasHeight;
};

/**
* Checks for collision with top border of the canvas
* @returns {boolean} true if there is a collision, false otherwise
*/
Circle.prototype.checkForTopCanvasSideCollision = function(){
	return this.point.y - this.radius <= 0;
};

/**
* Move this circle
*/
Circle.prototype.makeAStep = function(){
	this.moveShape();
};

/**
* Rotate this circle
*/
Circle.prototype.rotate = function(){
	this.rotateShape();
};
