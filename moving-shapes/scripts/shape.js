function Shape(x, y, color){
	// center point of this shape
	this.point = new Point(x, y);
	// color of this shape
	this.color = color;
	// Size of rotation step in one frame
	this.rotationStep = 1;
	// angle by which this shape is rotated
	this.rotationAngle = (parseInt(Math.random()*1000))%360;
	// Size of movement step in one frame
	this.stepSize = 1;
	// Angle of the movement for this shape.
	this.movementAngle = (parseInt(Math.random()*1000))%360;
};
Shape.prototype = {
    constructor: Shape,

	// Right side of the canvas
	RIGHT: 0,
	// Top side of the canvas
	TOP: 1,
	// Left side of the canvas
	LEFT: 2,
	// Bottom side of the canvas
	BOTTOM: 3,
	
	/**
	 * @abstract
	 * Make a step
	 */
	makeAStep: function(){
		throw new Error('makeAStep must be implemented by subclass!');
	},
	/**
	 * @abstract
	 * Rotate shape
	 */
	rotate: function(){
		throw new Error('rotate must be implemented by subclass!');
	},
	/**
	 * @abstract
	 * Draw shape
	 */
	draw: function(){
		throw new Error('draw must be implemented by subclass!');
	},
	/**
	* @abstract
	* Checks for collision with right border of the canvas
	* @param {Integer} canvasWidth - width of the canvas
	* @returns {boolean} true if there is a collision, false otherwise
	*/
	checkForRightCanvasSideCollision: function(canvasWidth){
		throw new Error('checkForRightCanvasSideCollision must be implemented by subclass!');
	},
	/**
	* @abstract
	* Checks for collision with left border of the canvas
	* @returns {boolean} true if there is a collision, false otherwise
	*/
	checkForLeftCanvasSideCollision: function(){
		throw new Error('checkForLeftCanvasSideCollision must be implemented by subclass!');
	},
	/**
	* @abstract
	* Checks for collision with bottom border of the canvas
	* @param {Integer} canvasHeight - height of the canvas
	* @returns {boolean} true if there is a collision, false otherwise
	*/
	checkForBottomCanvasSideCollision: function(canvasHeight){
		throw new Error('checkForBottomCanvasSideCollision must be implemented by subclass!');
	},
	/**
	* @abstract
	* Checks for collision with top border of the canvas
	* @returns {boolean} true if there is a collision, false otherwise
	*/
	checkForTopCanvasSideCollision: function(){
		throw new Error('checkForTopCanvasSideCollision must be implemented by subclass!');
	},
	
	/**
	* Check for collisions and if there are less than two - move shape
	*/
	move: function(){
		var sideCollision = this.checkForCollisionsAndChangeAngle(canvasWidth, canvasHeight);
		var collisionCount = this.checkForMovingShapeCollisions(movingShapes);
		var collisionCount2 = this.checkForStaticShapeCollisions(staticShapes);
		if(collisionCount + collisionCount2 == 0 || collisionCount + collisionCount2 == 1 && !sideCollision){
			this.makeAStep();
		}
	},
	
	
	/**
	* Changes rotationAngle of the shape
	*/
    rotateShape: function () {
		this.rotationAngle += this.rotationStep;
		if(this.rotationAngle >= 360){
			this.rotationAngle = 0;
		}
    },
	/**
	* Converts degrees to radians
	* @param {Integer} degrees
	* @returns {Integer} radians
	*/
	degreesToRadians: function(degrees){
		return degrees * Math.PI / 180;
	},
	/**
	* @returns {Side[]} list of the sides of a polygon
	*/
	getSides: function(){
		return [];
	},
	/**
	* @returns {Point[]} list of the points that represent draw points of a polygon
	*/
	getPoints: function(){
		return [];
	},
	/**
	* Moves central point of the shape
	*/
	moveShape: function(){
		this.point.move(this.getXStep(), this.getYStep());
	},
	/**
	* Computes step on x-axis
	* @returns {Integer}
	*/
	getXStep: function(){
		return Math.cos(this.degreesToRadians(this.movementAngle)) * this.stepSize;
	},
	/**
	* Computes step on y-axis
	* @returns {Integer}
	*/
	getYStep: function(){
		return Math.sin(this.degreesToRadians(this.movementAngle)) * this.stepSize;
	},
	/**
	* Filter array of shapes and return only those that definitely need checking
	* uses gloab variables cellWidth and cellHeight
	* @param {Shape[]} shapesArray
	*/
	getShapesThatAreNearby: function(shapesArray){
		var shapes = [];
		var length = 0;
		for(var i = 0; i < shapesArray.length; i++){
			length = findVectorLength(this.point, shapesArray[i].point);
			if(length < cellWidth || length < cellHeight){
				shapes.push(shapesArray[i]);
			}
		}
		return shapes;
	},
	/**
	* Check for collisions with borders of the canvas 
	* @param {Integer} canvasWidth - width of the canvas
	* @param {Integer} canvasHeight - height of the canvas
	* @returns {boolean} true if there was collision with any of four borders, false otherwise
	*/
	checkForCollisionsAndChangeAngle: function(canvasWidth, canvasHeight){
		if(this.checkForRightCanvasSideCollision(canvasWidth)){
			this.onCollision(this.RIGHT);
			return true;
		}else if(this.checkForLeftCanvasSideCollision()){
			this.onCollision(this.LEFT);
			return true;
		}else if(this.checkForBottomCanvasSideCollision(canvasHeight)){
			this.onCollision(this.BOTTOM);
			return true;
		}else if(this.checkForTopCanvasSideCollision()){
			this.onCollision(this.TOP);
			return true;
		}
	},
	/**
	* Check for collision with moving shapes from nearby
	* @param {Shape[]} shapesArray - all shapes drawn on the canvas
	*/
	checkForMovingShapeCollisions: function(shapesArray){
		var shapes = this.getShapesThatAreNearby(shapesArray);
		var collisionCount = 0;
		for(var shapeIndex in shapes){
			if(shapes[shapeIndex] == this){
				continue;
			}
			if(this.detectCollision(shapes[shapeIndex])){
				this.reactToCollision(shapes[shapeIndex]);
				collisionCount ++;
			}
		}
		return collisionCount;
	},
	/**
	* Check for collision with static shapes from nearby
	* @param {Shape[]} shapesArray - all shapes drawn on the canvas
	*/
	checkForStaticShapeCollisions: function(shapesArray){
		var shapes = this.getShapesThatAreNearby(shapesArray);
		var collisionCount = 0;
		for(var shapeIndex in shapes){
			if(shapes[shapeIndex] == this){
				continue;
			}
			if(this.detectCollision(shapes[shapeIndex])){
				this.reactToStaticCollision(shapes[shapeIndex]);
				collisionCount ++;
			}
		}
		return collisionCount;
	},
	/**
	* Check for collision with given shape
	* @param {Shape} object2 - 
	*/
	detectCollision: function(object2){
		// try to find any gap
		if(this instanceof Circle && object2 instanceof Circle){
			return this.radius + object2.radius > findVectorLength(this.point, object2.point);
		}else{
			return !isThereAGapBetweenShapes(this, object2);
		}
	},
	/**
	* This method rotates point
	* @param {Point} o - 
	* @param {Point} p - 
	* @param {Integer} rotationStep - 
	*/
	rotatePoint: function(o, p, rotationStep){
		// cx, cy - center of coordinates
		var cx = o.x;
		var cy = o.y;
		// x, y - coordinates of a corner point
		var x = p.x; 
		var y = p.y;
		// theta is the angle of rotation
		var theta = this.degreesToRadians(rotationStep);

		// translate point to origin
		var tempX = x - cx;
		var tempY = y - cy;

		// now apply rotation
		var rotatedX = tempX*Math.cos(theta) - tempY*Math.sin(theta);
		var rotatedY = tempX*Math.sin(theta) + tempY*Math.cos(theta);

		// translate back
		p.x = rotatedX + cx;
		p.y = rotatedY + cy;
	},
	/**
	* This method was made to react to collision with another shape
	* @param {Shape} object2 - another shape that this chape collided with
	*/
	reactToCollision: function(object2){
		// swap movement angles between shapes
		this.vector = new Point(this.point.x - object2.point.x, this.point.y - object.point.y);
		var thisAngle = this.movementAngle;
		this.movementAngle = object2.movementAngle;
		object2.movementAngle = thisAngle;
		// step away to avoid dragging
		this.makeAStep();
		//object2.makeAStep();
		// change rotation angle to opposite
		this.rotationStep = - this.rotationStep;
		object2.rotationStep = - object2.rotationStep;
	},
	/**
	* This method was made to react to collision with another shape
	* @param {Shape} object2 - another shape that this chape collided with
	*/
	reactToStaticCollision: function(object2){
		// reflect movementAngle of this shape
		this.movementAngle = -this.movementAngle;
		// step away to avoid dragging
		//this.makeAStep();
		// change rotation angle to opposite
		this.rotationStep = - this.rotationStep;
		//object2.rotationStep = - object2.rotationStep;
	},
	/**
	* This method was created to react to collisions with sides of the canvas
	* It changes moving angle of this shape depending on the side that was passed in
	* @param {Integer} side - side of the canvas: RIGHT/LEFT/TOP or BOTTOM
	*/
	onCollision: function(side){
		switch(side){
			case this.RIGHT:
				if(this.movementAngle < 90){
					this.movementAngle = 180 - this.movementAngle;
				}else{
					this.movementAngle = 180 - this.movementAngle;
				}
				break;
			case this.LEFT:
				if(this.movementAngle < 180){
					this.movementAngle = 180 - this.movementAngle;
				}else{
					this.movementAngle = 180 - this.movementAngle;
				}
				break;
			case this.BOTTOM:
				if(this.movementAngle < 90){
					this.movementAngle = 360 - this.movementAngle;
				}else{
					this.movementAngle = 360 - this.movementAngle;
				}
				break;
			case this.TOP:
				if(this.movementAngle > 270){
					this.movementAngle = 360 - this.movementAngle;
				}else{
					this.movementAngle = 360 - this.movementAngle;
				}
				break;
			default:
				console.log("Shape.onCollision: Wrong side");
		}
		this.rotationStep = - this.rotationStep;
	}
}; 

/**
* Constructor of Point object
* @param {Integer} x - 
* @param {Integer} y -
*/
function Point(x, y){
	this.x = x;
	this.y = y;
}
Point.prototype = {
	constructor: Point,
	/** Move point by x pixels by x-axis and y pixels by y-axis
	* @param {Integer} x - number of pixels to move by x-axis
	* @param {Integer} y - number of pixels to move by y-axis
	*/
	move: function(x, y){
		this.x += x;
		this.y += y;
	}
};
/**
* Constructor of Side object
* @param {Point} a - 
* @param {Point} b -
*/
function Side(a, b){
	this.a = a;
	this.b = b;
};
Side.prototype = {
	/**
	* transform Side into vector Point
	* @returns {Point} 
	*/
	toVector: function(){
		return new Point(this.a.x - this.b.x, this.a.y - this.b.y);
	}
};
/**
* Constructor of Projection object
* @param {Integer} min - 
* @param {Integer} max -
*/
var Projection = function(min, max){
	return {min: min, max: max};
}

/**
* Find Length of the vector
* @param {Point} a - A point of the vector
* @param {Point} b - B point of the vector
*
* @returns {Integer} length of the vector
*/
var findVectorLength = function(a, b){
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
};
/**
* Check that two shapes are or are not overlaping
*
* @param {Shape} shape1 - first shape that you are checking
* @param {Shape} shape2 - second shape that you are checking
*
* @returns {boolean} True if there was found gap and shapes(shape1 and shape2) do not overlap
*/
var isThereAGapBetweenShapes = function(shape1, shape2){
	if(shape1 instanceof Circle || shape2 instanceof Circle){
		var circle = shape1;
		var polygon = shape2;
		if(shape2 instanceof Circle){
			circle = shape2;
			polygon = shape1;
		}
		
		
		var points = polygon.getPoints();
		var point;
		var closestPoint;
		var dist;
		var currentDist;
		// find the closest point
		for(var p in points) {
			point = points[p];
			currentDist = (circle.point.x - point.x) * (circle.point.x - point.x) + (circle.point.y - point.y) * (circle.point.y - point.y);
			if (dist == null || currentDist < dist) {
				dist = currentDist;
				closestPoint = point;
			}
			
		}
		
		var axis = new Point( closestPoint.x-circle.point.x, closestPoint.y-circle.point.y);
		var polygonProjection = projectPointsOntoAxis(polygon, axis);
		var circleProjection = projectPointsOntoAxis(circle, axis);
		return !checkIfProjectionsOverlap(circleProjection, polygonProjection);
	}
	else{
		/* 
			Step 1. Take one side from one of the polygons you are testing and find the normal (perpendicular) vector from it. This will be the ‘axis’.
			Step 2. Loop through every point on the first polygon and project it onto the axis. (Keep track of the highest and lowest values found for this polygon)
			Step 3. Do the same for the second polygon.
			Step 4. Check the values you found and see if they overlap. 
		*/
		var sides = shape1.getSides().concat(shape2.getSides());
		for(var sideIndex in sides){
			var side = sides[sideIndex];
			if(!checkAxis(findAxis(side), shape1, shape2)){
				// FOUND GAP!
				return true;
			}
		}
	}
	
	return false;
};
/**
* Check that two shapes are or are not overlaping when projected on given axis
*
* @param {Point} axis - Vector of the axis on which you are projecting shapes
* @param {Shape} shape1 - first shape that you are checking
* @param {Shape} shape2 - second shape that you are checking
*
* @returns {boolean} True if there was found no gap and on this axis shape1 and shape2 overlap
*/
var checkAxis = function(axis, shape1, shape2){
	var projectionShape1 = projectPointsOntoAxis(shape1, axis);
	var projectionShape2 = projectPointsOntoAxis(shape2, axis);
	return checkIfProjectionsOverlap(projectionShape1, projectionShape2);
};
/**
* Find axis that is perpendicular to the given side of a polygon
*
* @param {Side} side - Side of the polygon
*
* @returns {Point} Vector that is perpendicular to vector of the given side.
*/
var findAxis = function(side){
	var vector = side.toVector();
	return new Point(-vector.y, vector.x);
};
/**
* Project all points of the shape onto axis
*
* @param {Point} axis - Vector of the axis on which you are projecting shapes
* @param {Shape} shape - shape that you are projecting
*
* @returns {Projection} Minimum and maximum vaules of projection
*/
var projectPointsOntoAxis = function(shape, axis){
	if(shape instanceof Circle){
		var oProjection = projectPointOntoAxis(shape.point, axis);
		var min = oProjection - shape.radius;
		var max = oProjection + shape.radius;
		return new Projection(min, max);
	}else{
		var points = shape.getPoints();
		var min = max = projectPointOntoAxis(points[0], axis);

		for(var i = 1; i < points.length; i++){
			var pointProjection = projectPointOntoAxis(points[i], axis);
			if(pointProjection < min){
				min = pointProjection;
			}else if(pointProjection > max){
				max = pointProjection;
			}
		}
		
		return new Projection(min, max);
	}
};
/**
* Project given point onto axis
*
* @param {Point} point - point that you are projecting
* @param {Point} axis - axis that you are projecting onto
*
* @returns {Integer} result of projection
*/
var projectPointOntoAxis = function(point, axis){
	return (point.x * axis.x + point.y * axis.y);
};
/**
* Project all points of the shape onto axis
*
* @param {Projection} projection1 - 
* @param {Projection} projection2 - 
*
* @returns {boolean} true if projection1 and projection2 are overlapping
*/
var checkIfProjectionsOverlap = function(projection1, projection2){
	return projection1.min < projection2.max && projection1.max > projection2.min;
};
