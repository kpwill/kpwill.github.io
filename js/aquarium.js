var fishies = [];
var species = [];

var wavelength = 400;
var amplitude = 20;
var theta = 0;
var dx;
var yValues;

var weeds = [];
var weeds2 = [];
var bubbles = [];

var mouse;

var canvas;

function windowResized(){
	var clientHeight = document.getElementById('sketch').clientHeight;
    var clientWidth = document.getElementById('sketch').clientWidth;
	resizeCanvas(clientWidth, clientHeight);
}

function setup(){
	var clientHeight = document.getElementById('sketch').clientHeight;
    var clientWidth = document.getElementById('sketch').clientWidth;
	canvas = createCanvas(clientWidth, clientHeight);
	canvas.parent("sketch");
	for(var i = 0; i < 5; i++){
		fishies.push( new fish());
		fishies[i].pos.x = random(width);
	}
	dx = TWO_PI / wavelength;
	yValues = new Array(width);

	
	for(var i = 0; i < random(20,35); i++){
		weeds.push(new seaweed());
	}
	for(var i = 0; i < random(20,35); i++){
		weeds2.push(new seaweed());
	}
	
	mouse = createVector(mouseX, mouseY);
}// END SETUP()

function draw() {
	background(186, 225, 239);
	mouse.x = mouseX;
	mouse.y = mouseY;
	
	sineWave();

	if(frameCount % 70 == 0){
		fishies.push( new fish());
	}
	
	// back weeds
	for(var i = 0; i < weeds.length; i++){
		weeds[i].update();
		weeds[i].display();
	}

	for(var i = 0; i < fishies.length; i++){
		var f = fishies[i];
	    f.update();
	    f.display();
		f.mouseOver();
		if(f.outOfBounds()){
			fishies.splice(i,1);
		}
		
	}
	
	// front weeds
	for(var i = 0; i < weeds2.length; i++){
		weeds2[i].update();
		weeds2[i].display();
	}
	
	for(var i = 0; i < bubbles.length; i++){
		bubbles[i].display();
		if(bubbles[i].outOfBounds()){
			bubbles.splice(i,1);
		}
	}
} // END DRAW()

function sineWave(){
	theta += 0.015;
	var x = theta;
	for(var i = 0; i < yValues.length; i++){
		yValues[i] = sin(x)*amplitude;
		x+=dx;
	}
	
	stroke(30, 93, 201);
	for(x = 0; x < yValues.length; x++){
		line(x,yValues[x]+100,x,height);
	}

} // END SINEWAVE()

function fish(){
	this.size = createVector(random(50,100),0);
	this.size.y = this.size.x * random(.4,.9);
	
	this.vel = createVector(random(1,2),0);
	this.vel.y = random(this.vel.x * -.15,this.vel.x * .15);
	
	this.pos = createVector(-this.size.x,random(250, height-50));
	
	this.c = color(random(255),random(255),random(255));
	
	this.update = function() {
		this.pos.add(this.vel);
	}
	
	this.mouseOver = function(){
		var d = dist(this.pos.x,this.pos.y,mouse.x,mouse.y);
		if (d < this.size.x/2 && frameCount % 8 == 0){
			bubbles.push(new bubble(this.pos.x,this.pos.y,this.vel.x));
		}
	}
	
	this.display = function(){
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		
		if(this.pos.y <= 200 || this.pos.y > height){
			this.vel.y *= -1;
		}
		

		//body
		noStroke();
		fill(this.c);
		ellipse(this.pos.x,this.pos.y,this.size.x,this.size.y);
		
		//tail fin
		triangle(this.pos.x,this.pos.y,this.pos.x-this.size.x*.75,this.pos.y+this.size.y*.4,this.pos.x-this.size.x*.75,this.pos.y-this.size.y*.4);
		
		//eye
		strokeWeight(1);
		stroke(255);
		ellipse(this.pos.x+this.size.x*.3,this.pos.y,9,9);
		
	}
	
	this.outOfBounds = function(){
		if(this.dir == 0 && this.pos.x > width) return true;
		else if(this.dir == 1 && this.pos.x < -this.size.x) return true;
		return false;
	}
	
}// END FISH()

function bubble(x,y,xspeed){
	this.x = x+30;
	this.y = y;
	this.size = random(10,30);
	this.yspeed = random(-6,-2);
	this.xspeed = xspeed/2;
	
	this.display = function(){
		fill(255,255,255,80);
		noStroke();
		ellipse(this.x,this.y,this.size,this.size);
		this.y += this.yspeed;
		this.x += this.xspeed;
	}
	
	this.outOfBounds = function(){
		if(this.y < 80) return true;
		return false;
	}
} // END BUBBLE()

function seaweed(){
	this.x1 = random(width);
	this.x2 = this.x1;
	this.y = height;
	this.h = random(width*.05,width*.3);
	this.dx = 0;
	this.blue = random(50,200);
	
	this.amp = 5;
	
	this.display = function(){
		strokeWeight(10);
		stroke(29, this.blue, 112);
		line(this.x2,height-this.h,this.x1,this.y);
	}
	
	this.update = function(){
		this.amp = 5;
		this.x2 = this.x1+sin(this.dx)*this.amp;
		this.dx += .05;
	}
}//END SEAWEED()