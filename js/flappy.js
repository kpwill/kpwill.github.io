var bird;
var blocks = [];
var score,gameOn,firstRun,skin;
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
	textAlign(CENTER);
  	gameOn = false;
  	bird = new Bird();
	firstRun = true;
	textSize(32);
	score = 0;
	skin = 1;
}

function draw() {
	background(142, 225, 255);
	textSize(width*.06);

	if(firstRun){
		bird.display(skin);
		fill("#FFFFFF");
		text("SPACEBAR TO FLAP \n ENJOY",width/2,height/2);
	}else if (gameOn){
		fill("#FFFFFF");
		textSize(16);
		var scoreText = "Score: " + score;
		text(scoreText,50,30);
		bird.update();
		bird.display(skin);
		for (var i = 0; i < blocks.length; i++){
			blocks[i].display();
			if(blocks[i].hits(bird)){
				gameOn = false;
			}
			if(blocks[i].offscreen()){
				score ++;
				blocks.splice(i,1);
			}
		}

		if (frameCount % 75 == 0){
			blocks.push(new Block());
		}
	}else{
		bird = new Bird();
		bird.display(skin);
		fill("#FFFFFF");
		var gameOverText = "GAME OVER \n CLICK TO RESTART \n SCORE: " + score;
		text(gameOverText, width/2,height/2);
	}
  
}

function keyPressed(){
  if (key == ' '){
	if(firstRun){
		firstRun = false;
		restart();
	}
    bird.flap();
	}else if(key >= 1 && key <=5){
		skin = key;
	}
}

function mousePressed(){
	if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height ){
		if(firstRun){
			firstRun = false;
		}
		if(!gameOn){
			restart();
		}else{
			bird.flap();
		}
	}
}

function restart(){
  	gameOn = true;
	blocks = [];
	score = 0;
}

function Bird(){
  this.x = 20;
  this.y = height/2;
  this.vel = 0;
  this.gravity = .6;
  this.lift = -15;
  this.airDrag = .9;
  
  this.flap = function(){
    this.vel += this.lift;
  }
  
  this.update = function(){
    this.vel += this.gravity;
    this.vel *= this.airDrag;
    this.y += this.vel;
    
    if (this.y > height){
      this.y = height;
      this.vel = 0;
    }
    if (this.y < 0){
      this.y = 0;
      this.vel = 0;
    }
  }
  
  this.display = function(n){
    noStroke();
		if (n == 1){//bird
			fill("#FCD02B");
			rect(this.x,this.y,20,20);
			fill("#f49242");
			rect(this.x+20,this.y+10,5,5);
			rect(this.x-5,this.y+10,10,10);
			fill("#FFFFFF");
			rect(this.x+15,this.y+5,3,3);
		}else if (n == 2){//panda
			fill("#fff");
			rect(this.x,this.y,20,20);//head
			fill(30);
			rect(this.x+6,this.y-6,7,9);//ear
			fill(30);
			rect(this.x+12,this.y+6,8,8);//outer eye
			fill("#FFFFFF");
			rect(this.x+16,this.y+9,2,2);//inner eye
		}else if (n==3){//turtle
			fill(32, 86, 30);
			rect(this.x,this.y,20,20);//shell
			fill(41, 198, 82);
			rect(this.x+20,this.y+6,9,9);//ear
			rect(this.x-6,this.y+7,6,6);//tail
			rect(this.x+2,this.y-6,5,6);//leg
			rect(this.x+2,this.y+20,5,6);//leg
			rect(this.x+13,this.y-6,5,6);//leg
			rect(this.x+13,this.y+20,5,6);//leg
		}else if(n == 4){//person
			fill(150, 100, 60);
			rect(this.x,this.y,20,20);//head
			rect(this.x+18,this.y+10,4,5);//nose
			fill(63, 44, 29);
			rect(this.x-3,this.y-8,26,10); //hair
			rect(this.x-3,this.y-8,8,20); //hair
			fill(0);
			rect(this.x+14,this.y+6,3,3);//eye
		}else if(n == 5){ //cat
			fill("#ff6c20");
			rect(this.x,this.y,20,20);//head
			triangle(this.x,this.y,this.x+5,this.y-8,this.x+10,this.y); //ear
			fill("#602105");
			rect(this.x+18,this.y+10,4,4);//nose
			fill(0);
			rect(this.x+14,this.y+4,3,3);//eye
			rect(this.x,this.y+10,10,2);//stripes
			rect(this.x,this.y+14,10,2);
		}
	}

}

function Block(){
  this.spacing = 175;
  this.top = random(height/6, 3/4*height);
  this.bottom = this.top + this.spacing;
  this.x = width;
  this.w = 50;
  this.speed = 6;
  
  this.hits = function(bird){
    if(bird.y < this.top || bird.y > this.bottom){
      if (bird.x > this.x && bird.x < this.x + this.w){
        return true;
      }
    }
    return false;
  }
  
  this.offscreen = function(){
    if (this.x < -this.w){
      return true;
    }
    return false;
  }
  
  
  this.display = function(){
		this.x -= this.speed;
    fill("#09389B");
    rect(this.x, 0, this.w, this.top);
    rect(this.x,this.bottom, this.w, height-this.bottom);
  }
}