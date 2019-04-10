var canvas;
var hamButton, textButton, noMenuButton;
var centerLogoButton, rightLogoButton, noLogoButton;
var imgSectButton, txtSectButton, buttSectButton, custSectButton;
var phoneHeight,phoneWidth;
var topBar, bottomBar;
var hamburger,logo;
var navImgs = [];
var navButtons = [];
var navChoice; //0: hamburger, 1: text, 2: none
var logoImgs = [];
var logoButtons = [];
var logoChoice; //0: middle, 1: right, 2: none
var sectImgs = [];
var sectButtons = [];
var sections = [];
var defaultImg,trashImg;
var trashX, trashY, trashW, trashH;

function preload(){
  hamburger = loadImage("images/hamburger-white.png");
  logo = loadImage("images/logo_white.png");
  defaultImg = loadImage("images/Simple_Image.png");
  trashImg = loadImage("images/trash.png");
} //end preload()

function windowResized(){
  var clientHeight = document.getElementById('builder').clientHeight;
  var clientWidth = document.getElementById('builder').clientWidth;
  resizeCanvas(clientWidth, clientHeight);
  trashW = width*.12;
  trashH = trashW;

  trashX = width - (trashW + 10);
  trashY = height - (trashH + 10);
  phoneWidth = width * .5;
  phoneHeight = phoneWidth * 1.875;
  if(phoneHeight > height){
    phoneHeight = height * .8;
    phoneWidth = phoneHeight/1.875;
  }
}

function setup() {
  var w = document.getElementById('builder').clientWidth;
  var h = document.getElementById('builder').clientHeight;
  canvas = createCanvas(w, h);
  canvas.parent('builder');
  textSize(15);
  
  hamButton = createButton("Hamburger Navigation");
  hamButton.parent('navButtons');
  hamButton.mousePressed(function() { buttonPressed(0,0);});
 
  textButton = createButton("Text Navigation");
  textButton.parent('navButtons');
  textButton.mousePressed(function() { buttonPressed(0,1);});
  
  noMenuButton = createButton("No Navigation");
  noMenuButton.parent('navButtons');
  noMenuButton.mousePressed(function() { buttonPressed(0,2);});
  
  centerLogoButton = createButton("Center Logo");
  centerLogoButton.parent('logoButtons');
  centerLogoButton.mousePressed(function() { buttonPressed(1,0);});
 
  rightLogoButton = createButton("Right Logo");
  rightLogoButton.parent('logoButtons');
  rightLogoButton.mousePressed(function() { buttonPressed(1,1);});
  
  noLogoButton = createButton("No Logo");
  noLogoButton.parent('logoButtons');
  noLogoButton.mousePressed(function() { buttonPressed(1,2);});
  
  imgSectButton = createButton("Insert Image");
  imgSectButton.parent('sectButtons');
  imgSectButton.mousePressed(function() { buttonPressed(2,0);});
  
  txtSectButton = createButton("Insert Text");
  txtSectButton.parent('sectButtons');
  txtSectButton.mousePressed(function() { buttonPressed(2,1);});
  
  buttSectButton = createButton("Insert Button");
  buttSectButton.parent('sectButtons');
  buttSectButton.mousePressed(function() { buttonPressed(2,2);});
  
  custSectButton = createButton("Insert Custom Section");
  custSectButton.parent('sectButtons');
  custSectButton.mousePressed(function() { buttonPressed(2,3);});
  
  // phoneHeight = height * .8;
  // phoneWidth = phoneHeight/1.875;

  phoneWidth = width * .5;
  phoneHeight = phoneWidth * 1.875;
  if(phoneHeight > height){
    phoneHeight = height * .8;
    phoneWidth = phoneHeight/1.875;
  }
  
  topBar = false;
  bottomBar = false;
  
  // NAV BUTTONS
  // Use nav images to create an imgButton for each menu type
  for(var i = 0; i < navImgs.length; i++){
    navButtons.push(new imgButton(50 + 60*i, 50, 50, 50, navImgs[i]));
  }
  navChoice = 2; //NONE, by default
  
  //LOGO BUTTONS
  for(var i = 0; i < logoImgs.length; i++){
    logoButtons.push(new imgButton(50, 150+40*i, 200, 30, logoImgs[i]));
  }
  logoChoice = 2; //NONE, by default
  
  for(var i = 0; i < sectImgs.length; i++){
    sectButtons.push(new imgButton(50, 320 + 50*i, 90, 42, sectImgs[i]));
  }
  
  // trashX = width * .75;
  // trashY = height * .75;
  trashW = width*.12;
  trashH = trashW;

  trashX = width - (trashW + 10);
  trashY = height - (trashH + 10);
  
}

function draw() {
  background(190);
  
  
  //DRAW PHONE TEMPLATE
  fill(255);
  strokeWeight(3);
  stroke(0);
  rect(width/2-phoneWidth/2,height/2-phoneHeight/2,phoneWidth,phoneHeight,20);
  
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
  fill(0);
  if(topBar){
    rect(width/2-phoneWidth/2, height/2-phoneHeight/2, phoneWidth, 30, 20);//rounded corners on top
    rect(width/2-phoneWidth/2, height/2-(phoneHeight/2-20), phoneWidth, 35); //square corners on bottom
  }
  
  if(bottomBar){
    rect(width/2-phoneWidth/2, height/2+(phoneHeight/2-30), phoneWidth, 30, 20);//rounded corners on bottom
    rect(width/2-phoneWidth/2, height/2+(phoneHeight/2-55), phoneWidth, 35); //square corners on top
  }
  
  //DRAW HAMBURGER ICON
  if(navChoice == 0){
    image(hamburger,width/2-phoneWidth/2 + 15,height/2-phoneHeight/2 + 15,30,30);
  }
  
  //DRAW TEXT LINKS
  if(navChoice == 1){
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(width*.03);
    text("LINK 1 \t | \t LINK 2 \t | \t LINK 3", width/2, height/2 + phoneHeight/2 - 25);
  }
  
  //DRAW LOGO 
  if(logoChoice == 0){
    image(logo, width/2-20, height/2-phoneHeight/2 + 10, 40, 40);
  }else if(logoChoice == 1){
    image(logo, width/2 + phoneWidth/2 - 60, height/2-phoneHeight/2 + 10, 40, 40);
  }
  
  
  //DRAW SECTIONS
  for(var i = 0; i < sections.length; i++){
    sections[i].scale();
    sections[i].update();  
    sections[i].display();
    sections[i].move();
  }
  
  //DRAW TRASH ICON
  image(trashImg, trashX, trashY, trashW, trashH);
  

}//end draw()


function touchStarted(){
  //TOUCHING SECTIONS
  for(var i = 0; i < sections.length; i++){
    sections[i].touched();
    if(sections[i].editingText && sections[i].clickedAway()){
      sections[i].updateText();
    }
  }
  
} // end touchStarted()


function doubleClicked(){
  for(var i = 0; i < sections.length; i++){
    sections[i].doubleClicked();
  }
}//end doubleClicked()

function keyPressed(){
  if(keyCode == ENTER || keyCode == RETURN){
    for(var i = 0; i < sections.length; i++){
      if(sections[i].editingText){
        sections[i].updateText();
      }
    }
  }
}

function touchEnded(){
  for(var i = 0; i < sections.length; i++){
    sections[i].moving = false;
    sections[i].scalingX = false;
    sections[i].scalingY = false;
  }
} //end touchEnded()


//called when a button is pressed
//type refers to if it's a nav button, logo button, or section button
// type 0 = nav
// type 1 = logo
// type 2 = section
//n refers to which button they have pressed in order to set the proper variables
function buttonPressed(type,n){
  if(type == 0){
    navChoice = n;
  }else if(type == 1){
    logoChoice = n;
  }else{
    sections.push(new section(random(width/2-phoneWidth/2,width/2+phoneWidth/2.5),random(height/2-phoneHeight/2,width/2+phoneHeight/2.5),n));
  }
}
