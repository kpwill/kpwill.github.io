var current;
var old = [];
var blockWidth = 150;
var blockHeight = 30;
var playing;
var score,highScore;
var surprise,myConfetti;
var colors;
var colorIdx = 0;
var canvas;

function windowResized(){
	var clientHeight = document.getElementById('sketch').clientHeight;
    var clientWidth = document.getElementById('sketch').clientWidth;
	resizeCanvas(clientWidth, clientHeight);
	textSize(width*.05);
}

function setup(){
	var clientHeight = document.getElementById('sketch').clientHeight;
    var clientWidth = document.getElementById('sketch').clientWidth;
	canvas = createCanvas(clientWidth, clientHeight);
	canvas.parent("sketch");
	current = new block(20,height-blockHeight,blockWidth);
	playing = false;
	score = highScore = 0;
	surprise = false;
	colors = [color(87, 186, 143), color(132, 232, 188), color(148, 216, 232),
				color(192, 168, 244), color(97, 69, 155), color(163, 55, 78),
				color(229, 148, 50), color(249, 210, 109)];
	noStroke();
	
	textAlign(CENTER,CENTER);
	// console.log("setup");
}

function draw() {
	background(0);

	textSize(width*.05);
	
	if(playing){
		fill(255);
		text(score,width/2, 100);
		current.update();
		current.display();
		for(var i = 0; i < old.length; i++){
			old[i].display();
		}
		if(surprise){
			myConfetti.display();
			if(myConfetti.done()) surprise = false;
		}
	}else{
		fill(255);
		text("Click to start playing. \n Your last score was " + score + ".\n Your highscore is " + highScore + ".",width/2,height/2);
	}
}

function mousePressed(){
	if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height ){
		if(playing){
			current.clicked();
		}else{
			playing = true;
			score = 0;
		}
		colorIdx++;
		colorIdx = colorIdx % colors.length;
	}
}

function block(x,y,w){
	this.x = x;
	this.y = y;
	this.w = w;
	this.vel = 5;
	this.dir = true;
	
	this.update = function(){
		if(this.x + this.w + this.vel > width) this.dir = false;
		else if(this.x - this.vel < 0) this.dir = true;
		
		if(this.dir) this.x += this.vel;
		else this.x -= this.vel;
	}
	
	this.display = function(){
		fill(colors[colorIdx]);
		rect(this.x,this.y, this.w, blockHeight);
	}
	
	this.clicked = function(){
		var perfect = false;
		if(old.length > 0){
			var prev = old[old.length -1];
			if(this.x > prev.x + prev.w || this.x + this.w < prev.x){
				playing = false;
				old = [];
				this.x = width/2 - blockWidth/2;
				this.y = height - blockHeight;
				this.w = blockWidth;
				if(score > highScore){
					highScore = score;
				}
				this.vel = 5;
				return;
			}else if(this.x > prev.x){
				this.w = this.w - (this.x - prev.x);
			}else if(this.x < prev.x){
				this.w = this.w - (prev.x - this.x);
				this.x = prev.x;
			}else{
				perfect = true;
				this.w += 40;
				this.x -= 20;
				surprise = true;
				myConfetti = new confetti();
				this.vel /= 1.05;
			}
		}
		old.push(new oldBlock(this.x,this.y,this.w,colors[colorIdx]));
		score++;
		this.vel *= 1.025;
		
		if(perfect){
			old[old.length - 1].perfect = true;
		}
		
		if(this.y > height/2){
			this.y -= blockHeight;
		}else{
			for(var i = 0; i < old.length; i++){
				old[i].y += blockHeight;
			}
		}
	}
}

function oldBlock(x,y,w,c){
	this.x = x;
	this.y = y;
	this.w = w;
	this.c = c;
	
	this.display = function(){
		fill(this.c);
		rect(this.x,this.y, this.w, blockHeight);
	}
}

function confetti(){
	this.dots = [];
	for(var i = 0; i < 100; i++){
		var x = random(width*.4,width*.6);
		var y = -50;
		var size = 10;
		var xspeed = random(-3,3);
		var yspeed = random(5,15);
		var col = color(random(255),random(255),random(255));
		var dot = [x,y,size,xspeed,yspeed,col];
		this.dots.push(dot);
	}
	
	this.display = function(){
		for(var i = 0; i < this.dots.length; i++){
			this.dots[i][0] += this.dots[i][3];
			this.dots[i][1] += this.dots[i][4];
			fill(this.dots[i][5]);
			ellipse(this.dots[i][0],this.dots[i][1],this.dots[i][2],this.dots[i][2]);
		}
	}
	
	this.done = function(){
		for(var i = 0; i < this.dots.length; i++){
			if(this.dots[i][1] < height){
				return false;
			}
		}
		return true;
	}
}