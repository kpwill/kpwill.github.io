function section(x,y, type){
  this.x = x;
  this.y = y;
  this.type = type;
  
  if(this.type == 2){
    this.w = 100;
    this.h = 50;
  }else{
    this.w = (phoneWidth - 20)/2;
    this.h = 100;
  }
  
  //dot1 = scales x, dot2 = scales y
  this.dot1x = this.x+this.w;
  this.dot1y = this.y+this.h/2;
  this.dot2x = this.x+this.w/2;
  this.dot2y = this.y+this.h;
  
  this.scalingX = false;
  this.scalingY = false;
  this.moving = false;
  this.editingText = false;
  this.dx = 0;
  this.dy = 0;
  
  //0 = image
  //1 = text
  //2 = button
  //3 = custom
  if(this.type == 1){
    this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus id massa eget ornare. Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris eu molestie dui.";
  }else if(this.type == 3){
    this.text = "Describe your custom section.\nDouble click to edit text.\nThen press Enter or click away.";
  }else if(this.type == 2){
    this.text = "CLICK!";
  }else{
    this.text = "";
  }
  this.textInput = createElement('textarea');
  this.textInput.style('display','none');
  this.textInput.value(this.text);
  this.textInput.parent('builder');
  
  
  this.touched = function(){
    var d1 = dist(this.dot1x,this.dot1y,mouseX,mouseY);
    var d2 = dist(this.dot2x,this.dot2y,mouseX,mouseY);
    
    if(d1 < 15){
      this.scalingX = true;
    }else if(d2 < 15){
      this.scalingY = true;
    }
    
    if(mouseX > this.x + 5 && mouseX < this.x + this.w - 5 && mouseY > this.y + 5 && mouseY < this.y + this.h - 5 && !this.editingText){
      this.moving = true;
      this.dx = mouseX - this.x;
      this.dy = mouseY - this.y;
    }
  }
  
  //user clicked somewhere besides this section
  this.clickedAway = function(){
    if(!(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h)){
      return true;
    }
  }
  
  this.doubleClicked = function(){
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h && (this.type == 1 || this.type == 3)){
      this.editingText = true;
      this.textInput.position(this.x + 10, this.y + 10);
      this.textInput.size(this.w - 25, this.h - 25);
      this.textInput.show();
    }
  }
  
  this.updateText = function(){
    this.editingText = false;
    this.text = this.textInput.value();
    this.textInput.style('display','none');
  }
  
  this.move = function(){
    if(this.moving){
      this.x = mouseX - this.dx;
      this.y = mouseY - this.dy;
      this.dot1x = this.x+this.w/2;
      this.dot1y = this.y+this.h;
      this.dot2x = this.x+this.w;
      this.dot2y = this.y+this.h/2;
      
      if(mouseX >= trashX && mouseX <= trashX + trashW && mouseY >= trashY && mouseY <= trashY + trashH){
        var idx = sections.indexOf(this);
        sections.splice(idx,1);
      }
    }
  }
  
  this.scale = function(){
    if(this.scalingX){
      this.w = mouseX - this.x;
      this.w = constrain(this.w, 20, phoneWidth - 20);
    }else if(this.scalingY){
      this.h = mouseY - this.y;
      this.h = constrain(this.h, 20, phoneHeight - 60);
    }
  }
  
  this.update = function(){
    this.dot1x = this.x+this.w;
    this.dot1y = this.y+this.h/2;
    this.dot2x = this.x+this.w/2;
    this.dot2y = this.y+this.h;
  }
  
  this.display = function(){
    //updates
//     this.dot1x = this.x+this.w/2;
//     this.dot1y = this.y+this.h;
//     this.dot2x = this.x+this.w;
//     this.dot2y = this.y+this.h/2;
    
    
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(this.x,this.y,this.w,this.h,10);
    
    if(this.type == 0){ //image
      image(defaultImg, this.x + 10, this.y + 10, this.w - 20, this.h - 20);
    }else if(this.type == 1 || this.type == 3){  //text & custom
      noStroke();
      fill(0);
      textSize(14);
      textAlign(LEFT,TOP);
      text(this.text, this.x + 10, this.y + 10, this.w - 20,  this.h - 20);
    }else{  //button
      noStroke();
      fill(0);
      textSize(20);
      textAlign(CENTER,CENTER);
      text(this.text, this.x + this.w/2, this.y + this.h/2);
    }
    
    //handle dots
    fill(255,0,0);
    ellipse(this.dot1x,this.dot1y,10,10);
    ellipse(this.dot2x,this.dot2y,10,10);
    
    var d1 = dist(this.dot1x,this.dot1y,mouseX,mouseY);
    var d2 = dist(this.dot2x,this.dot2y,mouseX,mouseY);
    if(d1 < 7){
      cursor('grab');
    }else if(d2 < 7){
      cursor('grab');
    }else{
      cursor(ARROW);
    }
  }
}
