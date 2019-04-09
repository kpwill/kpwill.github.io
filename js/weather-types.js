function sun(){
	this.x = width * .3;
	this.y = height * .4;
	this.d = width *.22;
	
	this.display = function(){
		noStroke();
		if(currHour >= 21 || (currHour >= 0 && currHour <= 6)){//moon
			fill(234, 253, 255);
			ellipse(this.x,this.y,this.d*.8+10*sin(time),this.d*.8+10*sin(time));
		}else{
			fill(255, 151, 48);
			ellipse(this.x,this.y,this.d+10*sin(time),this.d+10*sin(time));
		}
		
	}
}

function drop(){
	this.x = random(-width*.25,width*1.25);
	this.y = -50;
	this.w = 3;
	this.h = random(8,15);
	this.speed = random(5,7);
	
	this.update = function(){
		this.y += this.speed;
		this.x += radians(angle);
	}
	
	this.outOfBounds = function(){
		if(this.y - this.h > height){
			var idx = drops.indexOf(this);
			drops.splice(idx,1);
		}
	}
	
	this.display = function(){
		var w = this.w;
		var h = this.h;
		strokeWeight(w);
		if(pelletCodes.includes(code)){
			w = 5;
			h = 5;
			stroke(255);
			ellipse(this.x,this.y,w,h);
		}else{
			if(sleetCodes.includes(code)){
				stroke(255);
				if(pelletCodes.includes(code)){
					w = 6;
					h = 6;
				}else{
					w = this.w;
					h = this.h;
				}
			}else{
				w = this.w;
				h = this.h;
				if(currHour >= 17 && currHour <= 21){
					var inc = map(currHour, 17, 21, 0, 1);
					stroke(lerpColor(dayRain, nightRain, inc));
				}else if(currHour >= 7 && currHour < 17){
					stroke(dayRain);
				}else{
					stroke(nightRain);
				}
			}
			line(this.x + radians(angle),this.y, this.x , this.y-h);
		}
	}
}

function snowflake(){
	this.x = 0;
	this.y = 0;
	this.size = random(2,5);
	this.radius = sqrt(random(pow(width / 2, 2)));
  	this.initialangle = random(0, 2 * PI);
	
	this.update = function(time){
		
		var w = 0.6;
		var angle = w * time + this.initialangle;
		this.x = width/2 + this.radius * sin(angle);
		
		this.y += pow(this.size,0.5);
		
		if(this.y > height){
      var index = snowflakes.indexOf(this);
			snowflakes.splice(index,1);
		}
	}
	
	this.display = function(){
		noStroke();
		fill(255);
		ellipse(this.x,this.y,this.size,this.size);
	}

}

function cloud(x,y,w,h,dir,type){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.parties = [];
	for(var i = 0; i < this.w*.65; i++){
		this.parties.push(new particle(this.x,this.y, this.w,this.h,dir,type));
	}
	
	this.display = function(){
		for(var i = 0; i < this.parties.length; i++){
			this.parties[i].display();
		}
	}
}

function particle(x,y,w,h,dir,type){
	this.hD = random(-w/2,w/2);
	this.vD = random(-h/2,h/2);
	this.x = x + this.hD;
	this.y = y + this.vD;
	var d = dist(x,y,this.x,this.y);
	this.size = random(w/8,w/3)*map(d,0,w/2,1,0);
	this.dir = dir;
	this.speed = random(5,20);
	this.offset = random(.05);
	this.c = 255;
	if(type == 1){//overcast
		this.c = random(150,230);
	}
	
	this.display = function(){
		noStroke();
		fill(this.c,80);
		var dx ;
		if(this.dir == 0) dx = sin(time + this.offset) * this.speed;
		else dx = -sin(time + this.offset)*this.speed;
		ellipse(this.x+dx,this.y,this.size,this.size);
	}

}

function showFog(){
	noFill();
	strokeWeight(1);
	var c1, c2;
	if(code == 1147){
		c1 = color(255);
		c2 = color(255,0);
	}else{
		if(currHour > 6 && currHour < 18){
			c1 = dayFog;
			c2 = dayFog2;
		}else{
			c1 = nightFog;
			c2 = nightFog2;
		}
	}
	
	var change = sin(time)*40;
	var fogHeight = height * .80 + change;
	for(var i = 0; i < fogHeight; i++){
		var inc = map(i, 0, fogHeight, 0, 1);
		var c = lerpColor(c1, c2, inc);
		stroke(c);
		line(0, i, width, i);
	}
}