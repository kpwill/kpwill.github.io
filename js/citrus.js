var fruit;
var time;
var colors = [];

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
	background(100);
	colorMode(HSB);
	time = 0;
	
	//change this: two sets of colors, dark and light
	//pick one from each
	colors = [
		[color(130,100,43),color(110,51,100)], //lime
		[color(33,59,86),color(0,75,68)], //blood orange
		[color(36,75,100),color(347,70,90)], // grapefruit
		[color(52,100,100),color(54,30,100)], //lemon
		[color(15,90,100),color(30,60,95)], //orange
		[color(90,85,95),color(0,65,95)], //pomelo
	];
	
	fruit = new citrus();
}

function draw() {
	background(255);
	fruit.display();
	
	time+=map(mouseX,0,width,-.04,.04);
}

function mousePressed(){
	fruit = new citrus();

}

function citrus(){
	this.d = random(width*.2,width);
	this.r = this.d/2;
	this.periD = random(this.d*.76,this.d*.9); //pericarp
	this.periR = this.periD/2;
	this.x = width/2;
	this.y = height/2;
	
	this.colorSet = colors[floor(random(colors.length))];
	this.rindC = this.colorSet[0];
	this.segmentC = this.colorSet[1];
	
	var h = random(hue(this.rindC)-20,hue(this.rindC)+20);
	
	var s = saturation(this.rindC);
	var b = brightness(this.rindC);
	
	this.rindC = color(h,s,b);
	
	h = random(hue(this.segmentC)-20,hue(this.segmentC)+20);
	
	s = saturation(this.segmentC);
	b = brightness(this.segmentC);
	
	this.segmentC = color(h,s,b);
	
	var swap = random(2);
	if(swap < 1){
		var temp = this.segmentC;
		this.segmentC = this.rindC;
		this.rindC = temp;
	}
	
	
	this.display = function(){
		noStroke();
		fill(this.rindC);
		ellipse(this.x,this.y,this.d,this.d);
		fill(this.segmentC);
		
		var cx,cy,x1,y1,x2,y2,x3,y3,x4,y4;
		noStroke();
		cx = x2 = x3 = width/2;
		cy = y2 = y3 = height/2;

		for(var i = 0; i < 8; i++){
			var ang1 = PI*(i*.25) + time;
			var ang2 = PI*(i*.25 + .20) + time;
			
			fill(this.segmentC);
			arc(this.x,this.y,this.periD,this.periD,ang1,ang2);
			
			fill(this.rindC);
			
			stroke(this.rindC);
			strokeWeight(8);
			arc(this.x,this.y,this.periD*.8,this.periD*.8,ang1,ang2,PIE);
			
			
			noStroke();
			fill(this.segmentC);
			
			x1 = cx + (this.periR * cos(ang1));
			y1 = cy + (this.periR * sin(ang1));
			x4 = cx + (this.periR * cos(ang2));
			y4 = cy + (this.periR * sin(ang2));
			
			bezier(x1,y1,x2,y2,x3,y3,x4,y4);
			
		}
		
	}
}