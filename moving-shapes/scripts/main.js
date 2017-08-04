// set background of the canvas
Animation.setCanvasSettings("#F1F8E9");
// set array of colors to choose randomly from
Animation.setColorsArray(["#EF6C00", "#2E7D32", "#0277BD"]);
// set size of the frame in milliseconds
Animation.setFrameSize(15);
Animation.setShowMovingShapes(true);
Animation.setShowStaticShapes(true);
Animation.setShowTriangles(false);
Animation.setShowRectangles(true);
Animation.setShowCircles(true);
// start moving shapes
Animation.startMoving();
window.onresize = function(){
	// refresh size of the canvas to be the size of the window
	Animation.refreshCanvasSize();
};