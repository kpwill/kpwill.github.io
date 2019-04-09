//mini aquarium
var aqua = function ( p ){

	var wavelength = 40;
	var amplitude = 5;
	var theta = 0;
	var dx;
	var yValues;

	var weeds = [];
	var weeds2 = [];
	var bubbles = [];

	var relMouse;
	var canvPos;

	var canvas;

	var fish1;

	p.windowResized = function(){
		var clientHeight = document.getElementById('aqua').clientHeight;
	    var clientWidth = document.getElementById('aqua').clientWidth;
		p.resizeCanvas(clientWidth, clientHeight);
	};

	p.setup = function(){
		var clientHeight = document.getElementById('aqua').clientHeight;
	    var clientWidth = document.getElementById('aqua').clientWidth;
		canvas = p.createCanvas(clientWidth, clientHeight);

		fish1 = new p.fish();

		dx = p.TWO_PI / wavelength;
		yValues = new Array(p.width);

		
		for(var i = 0; i < 20; i++){
			weeds.push(new p.seaweed());
		}
		for(var i = 0; i < 20; i++){
			weeds2.push(new p.seaweed());
		}
		p.noLoop();
	};// END SETUP()

	p.draw = function() {
		
		p.background(186, 225, 239);

		p.sineWave();
		
		// back weeds
		for(var i = 0; i < weeds.length; i++){
			weeds[i].update();
			weeds[i].display();
		}


	    fish1.update();
	    fish1.display();
		if(fish1.outOfBounds()){
			fish1 = new p.fish();
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
	}; // END DRAW()

	p.mouseMoved = function(){
		if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
			p.loop();
		}else{
			p.noLoop();
		}

	};


	p.sineWave = function(){
		theta += 0.015;
		var x = theta;
		for(var i = 0; i < yValues.length; i++){
			yValues[i] = p.sin(x)*amplitude;
			x+=dx;
		}
		
		p.stroke(30, 93, 201);
		for(x = 0; x < yValues.length; x++){
			p.line(x,yValues[x]+p.height*.2,x,p.height);
		}

	}; // END SINEWAVE()

	p.fish = function(){
		this.size = p.createVector(p.random(15,40),0);
		this.size.y = this.size.x * p.random(.4,.9);
		
		this.vel = p.createVector(p.random(.2,1.4),0);
		this.vel.y = p.random(this.vel.x * -.15,this.vel.x * .15);
		
		this.pos = p.createVector(-this.size.x,p.random(p.height*.3, p.height*.95));
		
		this.c = p.color(p.random(255),p.random(255),p.random(255));
		
		this.update = function() {
			this.pos.add(this.vel);
		}
		
		
		this.display = function(){
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
			
			if(this.pos.y < p.height*.19){
				this.vel.y *= -1;
			}
			

			//body
			p.noStroke();
			p.fill(this.c);
			p.ellipse(this.pos.x,this.pos.y,this.size.x,this.size.y);
			
			//tail fin
			p.triangle(this.pos.x,this.pos.y,this.pos.x-this.size.x*.75,this.pos.y+this.size.y*.4,this.pos.x-this.size.x*.75,this.pos.y-this.size.y*.4);
			
			//eye
			p.strokeWeight(1);
			p.stroke(255);
			p.ellipse(this.pos.x+this.size.x*.3,this.pos.y,3,3);
			
		}
		
		this.outOfBounds = function(){
			if(this.pos.x > p.width *1.5) return true;
			return false;
		}
		
	};// END FISH()

	p.seaweed = function(){
		this.x1 = p.random(p.width);
		this.x2 = this.x1;
		this.y = p.height;
		this.h = p.random(5,p.height*.5);
		this.dx = 0;
		this.blue = p.random(50,200);
		
		this.amp = 5;
		
		this.display = function(){
			p.strokeWeight(5);
			p.stroke(29, this.blue, 112);
			p.line(this.x2,p.height-this.h,this.x1,this.y);
		}
		
		this.update = function(){
			this.amp = 5;
			this.x2 = this.x1+p.sin(this.dx)*this.amp;
			this.dx += .05;
		}
	};//END SEAWEED()
};
var myp5 = new p5(aqua,"aqua");



var citrus = function(p){
	var fruit;
	var time;
	var colors = [];

	p.windowResized = function(){
		var clientHeight = document.getElementById('citrus').clientHeight;
	    var clientWidth = document.getElementById('citrus').clientWidth;
		p.resizeCanvas(clientWidth, clientHeight);
	}

	p.setup = function(){
		var clientHeight = document.getElementById('citrus').clientHeight;
	    var clientWidth = document.getElementById('citrus').clientWidth;
		canvas = p.createCanvas(clientWidth, clientHeight);
		canvas.parent("citrus");
		p.noLoop();
		p.colorMode(p.HSB);
		time = 0;
		
		colors = [
			[p.color(130,100,43),p.color(110,51,100)], //lime
			[p.color(33,59,86),p.color(0,75,68)], //blood orange
			[p.color(36,75,100),p.color(347,70,90)], // grapefruit
			[p.color(52,100,100),p.color(54,30,100)], //lemon
			[p.color(15,90,100),p.color(30,60,95)], //orange
			[p.color(90,85,95),p.color(0,65,95)], //pomelo
		];
		
		fruit = new p.citrus();
	}

	p.draw = function() {
		p.background(255);
		fruit.display();
		
		time+=.02;
	}

	p.citrus = function(){
		this.d = p.width*.75;
		this.r = this.d/2;
		this.periD = p.random(this.d*.76,this.d*.9); //pericarp
		this.periR = this.periD/2;
		this.x = p.width/2;
		this.y = p.height/2;
		
		this.colorSet = colors[p.floor(p.random(colors.length))];
		this.rindC = this.colorSet[0];
		this.segmentC = this.colorSet[1];
		
		var h = p.random(p.hue(this.rindC)-20,p.hue(this.rindC)+20);
		
		var s = p.saturation(this.rindC);
		var b = p.brightness(this.rindC);
		
		this.rindC = p.color(h,s,b);
		
		h = p.random(p.hue(this.segmentC)-20,p.hue(this.segmentC)+20);
		
		s = p.saturation(this.segmentC);
		b = p.brightness(this.segmentC);
		
		this.segmentC = p.color(h,s,b);
		
		var swap = p.random(2);
		if(swap < 1){
			var temp = this.segmentC;
			this.segmentC = this.rindC;
			this.rindC = temp;
		}
		
		
		this.display = function(){
			p.noStroke();
			p.fill(this.rindC);
			p.ellipse(this.x,this.y,this.d,this.d);
			p.fill(this.segmentC);
			
			var cx,cy,x1,y1,x2,y2,x3,y3,x4,y4;
			p.noStroke();
			cx = x2 = x3 = p.width/2;
			cy = y2 = y3 = p.height/2;

			for(var i = 0; i < 8; i++){
				var ang1 = p.PI*(i*.25) + time;
				var ang2 = p.PI*(i*.25 + .20) + time;
				
				p.fill(this.segmentC);
				p.arc(this.x,this.y,this.periD,this.periD,ang1,ang2);
				
				p.fill(this.rindC);
				
				p.stroke(this.rindC);
				p.strokeWeight(8);
				p.arc(this.x,this.y,this.periD*.8,this.periD*.8,ang1,ang2,p.PIE);
				
				
				p.noStroke();
				p.fill(this.segmentC);
				
				x1 = cx + (this.periR * p.cos(ang1));
				y1 = cy + (this.periR * p.sin(ang1));
				x4 = cx + (this.periR * p.cos(ang2));
				y4 = cy + (this.periR * p.sin(ang2));
				
				p.bezier(x1,y1,x2,y2,x3,y3,x4,y4);
				
			}
			
		}
	}

	p.mouseMoved = function(){
		if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
			p.loop();
		}else{
			p.noLoop();
		}

	};

}

var myp5 = new p5(citrus,"citrus");

var appBuilder = function(p){

	var canvas;
	var phoneHeight;
	var phoneWidth;
	var topBar, bottomBar;
	var hamburger,logo;
	var navChoice; //0: hamburger, 1: text, 2: none
	var logoChoice; //0: middle, 1: right, 2: none

	p.preload = function(){
	  // hamburger = loadImage("images/hamburger-white.png");
	  hamburger = p.loadImage("https://66.media.tumblr.com/561a80624a9cff3a844669aaccc042ea/tumblr_pp1pm8nChZ1qdrh7io1_75sq.png");
	  // logo = loadImage("images/logo_white.png");
	  logo = p.loadImage("https://66.media.tumblr.com/2a6eba098e2c3ed35ffa6201e8bf15f1/tumblr_pp1pm8nChZ1qdrh7io2_250.png");
	} //end preload()

	p.windowResized = function(){
		var w = document.getElementById('appBuilder').clientWidth;
		var h = document.getElementById('appBuilder').clientHeight;
		p.resizeCanvas(w,h);
	}

	p.setup = function() {
	  var w = document.getElementById('appBuilder').clientWidth;
	  var h = document.getElementById('appBuilder').clientHeight;
	  canvas = p.createCanvas(w, h);
	  canvas.parent('appBuilder');

	  
	  phoneHeight = p.height * .8;
	  phoneWidth = phoneHeight/1.875;
	  
	  topBar = false;
	  bottomBar = false;
	  
	  navChoice = 0; //NONE, by default

	  logoChoice = 2; //NONE, by default
	  

	  p.noLoop();
	}

	p.draw = function() {
	  p.background(190);
	  
	  //RANDOMLY DETERMINE SETTINGS
	  if(p.frameCount % 40 == 0){
	    navChoice = p.floor(p.random(2));
	  }else if(p.frameCount % 20 == 0){
	    logoChoice = p.floor(p.random(3));
	  }

	  //DRAW PHONE TEMPLATE
	  p.fill(255);
	  p.strokeWeight(3);
	  p.stroke(0);
	  p.rect(p.width/2-phoneWidth/2,p.height/2-phoneHeight/2,phoneWidth,phoneHeight,8);
	  
	  //DETERMINE IF TOP BAR SHOULD BE DRAWN
	  if(navChoice == 0 || logoChoice == 0 || logoChoice == 1){
	    topBar = true;
	  }else{
	    topBar = false;
	  }
	  
	  //DETERMINE IF BOTTOM BAR SHOULD BE DRAWN
	  if(navChoice == 1){
	    bottomBar = true;
	  }else{
	    bottomBar = false;
	  }

	  
	  //DRAW TOP & BOTTOM BARS
	  p.fill(0);
	  if(topBar){
	    p.rect(p.width/2-phoneWidth/2, p.height/2-phoneHeight/2, phoneWidth, 10, 8);//rounded corners on top
	    p.rect(p.width/2-phoneWidth/2, p.height/2-(phoneHeight/2-10), phoneWidth, 10); //square corners on bottom
	  }
	  
	  if(bottomBar){
	    p.rect(p.width/2-phoneWidth/2, p.height/2+(phoneHeight/2-10), phoneWidth, 10, 8);//rounded corners on bottom
	    p.rect(p.width/2-phoneWidth/2, p.height/2+(phoneHeight/2-20), phoneWidth, 10); //square corners on top
	  }
	  
	  //DRAW HAMBURGER ICON
	  if(navChoice == 0){
	    p.image(hamburger,p.width/2-phoneWidth/2 + 10,p.height/2-phoneHeight/2 + 8,10,10);
	  }
	  
	  //DRAW TEXT LINKS
	  if(navChoice == 1){
	    p.fill(255);
	    // noStroke();
	    p.textAlign(p.CENTER,p.CENTER);
	    p.textSize(7);
	    p.text("LINK 1 \t | \t LINK 2", p.width/2, p.height/2 + phoneHeight/2 - 10);
	  }
	  
	  //DRAW LOGO 
	  if(logoChoice == 0){
	    p.image(logo, p.width/2-7, p.height/2-phoneHeight/2 + 5, 15, 15);
	  }else if(logoChoice == 1){
	    p.image(logo, p.width/2 + phoneWidth/2 - 15, p.height/2-phoneHeight/2 + 5, 15, 15);
	  }
	  
	  

	}//end draw()

	p.mouseMoved = function(){
	  if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
	    p.loop();
	  }else{
	    p.noLoop();
	  }
	}

}

var myp5 = new p5(appBuilder,"appBuilder");

var weather = function(p){
	var canvas;
	var theSun;
	var theCloud;
	var time = 0;

	p.windowResized = function(){
		var w = document.getElementById('weather').clientWidth;
		var h = document.getElementById('weather').clientHeight;
		p.resizeCanvas(w,h);
	}

	p.setup = function() {
	  var w = document.getElementById('weather').clientWidth;
	  var h = document.getElementById('weather').clientHeight;
	  canvas = p.createCanvas(w, h);
	  canvas.parent('weather');
	  theSun = new p.sun();
	  theCloud = new p.cloud(p.width*.6,p.height*.6, p.width*.7,p.height*.3,0);
	  p.noLoop();
	}

	p.draw = function(){
		p.background(139, 186, 239);
		theSun.display();
		theCloud.display();
		time += .03;
	}

	p.mouseMoved = function(){
	  if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
	    p.loop();
	  }else{
	    p.noLoop();
	  }
	}

	p.sun = function(){
		this.x = p.width/2;
		this.y = p.height/2;
		this.d = p.width * .6;
		
		this.display = function(){
			p.noStroke();
			p.fill(255, 151, 48);
			p.ellipse(this.x,this.y,this.d+10*p.sin(time),this.d+10*p.sin(time));
		}
	}

	p.cloud = function(x,y,w,h,dir){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.parties = [];
		for(var i = 0; i < 165; i++){
			this.parties.push(new p.particle(this.x,this.y, this.w,this.h,dir));
		}
		
		this.display = function(){
			for(var i = 0; i < this.parties.length; i++){
				this.parties[i].display();
			}
		}
	}

	p.particle = function(x,y,w,h,dir){
		this.hD = p.random(-w/2,w/2);
		this.vD = p.random(-h/2,h/2);
		this.x = x + this.hD;
		this.y = y + this.vD;
		var d = p.dist(x,y,this.x,this.y);
		this.size = p.random(w/8,w/3)*p.map(d,0,w/2,1,0);
		this.dir = dir;
		this.speed = p.random(5,20);
		this.offset = p.random(.05);
		this.c = 255;
		
		this.display = function(){
			p.noStroke();
			p.fill(this.c,80);
			var dx = p.sin(time + this.offset) * this.speed;
			p.ellipse(this.x+dx,this.y,this.size,this.size);
		}
	}
}

var myp5 = new p5(weather,"weather");

var stack = function(p){
	var current;
	var blockWidth, blockHeight;
	var colors;
	var currC, prevC;
	var canvas;

	p.windowResized = function(){
		var w = document.getElementById('stack').clientWidth;
		var h = document.getElementById('stack').clientHeight;
		p.resizeCanvas(w,h);
	}

	p.setup = function(){
		var w = document.getElementById('stack').clientWidth;
		var h = document.getElementById('stack').clientHeight;
		canvas = p.createCanvas(w,h);
		blockWidth = p.width * .6;
		blockHeight = p.height * .1;
		current = new p.block(0,p.height-2*blockHeight,blockWidth*.8);
		colors = [p.color(87, 186, 143), p.color(132, 232, 188), p.color(148, 216, 232),p.color(192, 168, 244)];
		var idx = p.floor(p.random(colors.length));
		prevC = colors[idx];
		currC = colors[(idx + 1)% colors.length];
		p.noLoop();
	}

	p.draw = function(){
		p.background(0);
		p.fill(prevC);
		p.rect(p.width/2-blockWidth/2,p.height-blockHeight,blockWidth,blockHeight);
		current.display();
	}

	p.block = function(x,y,w){
		this.x = x;
		this.y = y;
		this.w = w;
		this.vel = 2;
		this.dir = true;

		this.display = function(){
			if(this.x + this.w + this.vel > p.width) this.dir = false;
			else if(this.x - this.vel < 0) this.dir = true;
			if(this.dir) this.x += this.vel;
			else this.x -= this.vel;
			p.fill(currC);
			p.rect(this.x,this.y, this.w, blockHeight);
		}

	}

	p.mouseMoved = function(){
	  if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
	    p.loop();
	  }else{
	    p.noLoop();
	  }
	}
}

var myp5 = new p5(stack,"stack");

var flappy = function(p){
	var canvas,bird,skin;

	p.windowResized = function(){
		var w = document.getElementById('flappy').clientWidth;
		var h = document.getElementById('flappy').clientHeight;
		p.resizeCanvas(w,h);
		bird.x = p.width/2;
		bird.y = p.width/2;
	}

	p.setup = function(){
		var w = document.getElementById('flappy').clientWidth;
		var h = document.getElementById('flappy').clientHeight;
		canvas = p.createCanvas(w,h);
		bird = new p.Bird();
		skin = p.floor(p.random(1,6));
		p.noLoop();
	}

	p.draw = function(){
		p.background(100,200,255);
		bird.update();
		bird.display(skin);
		// if(p.frameCount % 30 == 0){
		// 	bird.flap();
		// }
		if(bird.y >= p.height*.75){
			bird.flap();
		}
	}

	p.mouseMoved = function(){
	  if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
	    p.loop();
	  }else{
	    p.noLoop();
	  }
	}

	p.Bird = function(){
	  this.x = p.width/2-10;
	  this.y = p.height/2-10;
	  this.vel = 0;
	  this.gravity = .6;
	  this.lift = -p.height*.15;
	  this.airDrag = .9;
	  
	  this.flap = function(){
	    this.vel += this.lift;
	  }
	  
	  this.update = function(){
	    this.vel += this.gravity;
	    this.vel *= this.airDrag;
	    this.y += this.vel;
	    
	    if (this.y > p.height){
	      this.y = p.height;
	      this.vel = 0;
	    }
	    if (this.y < 0){
	      this.y = 0;
	      this.vel = 0;
	    }
	  }
	  
	  this.display = function(n){
	    p.noStroke();
			if (n == 1){//bird
				p.fill("#FCD02B");
				p.rect(this.x,this.y,20,20);
				p.fill("#f49242");
				p.rect(this.x+20,this.y+10,5,5);
				p.rect(this.x-5,this.y+10,10,10);
				p.fill("#FFFFFF");
				p.rect(this.x+15,this.y+5,3,3);
			}else if (n == 2){//panda
				p.fill("#fff");
				p.rect(this.x,this.y,20,20);//head
				p.fill(30);
				p.rect(this.x+6,this.y-6,7,9);//ear
				p.fill(30);
				p.rect(this.x+12,this.y+6,8,8);//outer eye
				p.fill("#FFFFFF");
				p.rect(this.x+16,this.y+9,2,2);//inner eye
			}else if (n==3){//turtle
				p.fill(32, 86, 30);
				p.rect(this.x,this.y,20,20);//shell
				p.fill(41, 198, 82);
				p.rect(this.x+20,this.y+6,9,9);//ear
				p.rect(this.x-6,this.y+7,6,6);//tail
				p.rect(this.x+2,this.y-6,5,6);//leg
				p.rect(this.x+2,this.y+20,5,6);//leg
				p.rect(this.x+13,this.y-6,5,6);//leg
				p.rect(this.x+13,this.y+20,5,6);//leg
			}else if(n == 4){//person
				p.fill(150, 100, 60);
				p.rect(this.x,this.y,20,20);//head
				p.rect(this.x+18,this.y+10,4,5);//nose
				p.fill(63, 44, 29);
				p.rect(this.x-3,this.y-8,26,10); //hair
				p.rect(this.x-3,this.y-8,8,20); //hair
				p.fill(0);
				p.rect(this.x+14,this.y+6,3,3);//eye
			}else if(n == 5){ //cat
				p.fill("#ff6c20");
				p.rect(this.x,this.y,20,20);//head
				p.triangle(this.x,this.y,this.x+5,this.y-8,this.x+10,this.y); //ear
				p.fill("#602105");
				p.rect(this.x+18,this.y+10,4,4);//nose
				p.fill(0);
				p.rect(this.x+14,this.y+4,3,3);//eye
				p.rect(this.x,this.y+10,10,2);//stripes
				p.rect(this.x,this.y+14,10,2);
			}
		}

	}

}

var myp5 = new p5(flappy,"flappy");


