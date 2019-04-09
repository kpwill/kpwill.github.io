var canvas;

var vStartX, vStartY;
var vEndX, vEndY;
var vSpeedY;
var vColor;

var hStartX, hStartY;
var hEndX, hEndY;
var hSpeedX;
var hColor;

var vEnded = hEnded = false;
// var hEnded = false;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style("z-index","-1");

	strokeWeight(6);

	reset();
	
}

function draw() {
	background(255);
	stroke(vColor);
	vEndY += vSpeedY;
	line(vStartX, vStartY,vEndX,vEndY);

	stroke(hColor);
	hEndX += hSpeedX;
	line(hStartX, hStartY,hEndX,hEndY);

	if((hStartX < 0 && hEndX > width+200) || (hStartX > width && hEndX < -200)){
		hEnded = true;
	}

	if((vStartY < 0 && vEndY > height + 200) || (vStartY > height && vEndY < -200)){
		vEnded = true;
	}

	if(hEnded && vEnded){
		reset();
	}
}

function reset(){
	var vStartYOptions = [-50,height+50];
	vEndX = vStartX = random(width);
	vEndY = vStartY = vStartYOptions[floor(random(2))];
	vSpeedY = random(5,10) * - (vStartY/abs(vStartY));

	var hStartXOptions = [-50,width+50];
	hEndX = hStartX = hStartXOptions[floor(random(2))];
	hEndY = hStartY = random(height);
	hSpeedX = random(5,10) * - (hStartX/abs(hStartX));

	vEnded =  hEnded =false;
	vColor = color(random(255), random(255), random(255),80);
	hColor = color(random(255), random(255), random(255),80);

}