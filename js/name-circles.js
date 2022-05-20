let nameInput, submitButton, clearButton;
var circleColor;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(250);
	noStroke();
	nameInput = createInput('');
	nameInput.size(width,50);
	nameInput.style('font-size', '20px');
	nameInput.position(0,20);
	
	submitButton = createButton('Go!');
	submitButton.size(50,56);
  submitButton.position(width-50, 20);
  submitButton.mousePressed(nameToColor);
	
	clearButton = createButton("Clear");
	clearButton.size(100,50);
	clearButton.position(width/2-50,height-100);
	clearButton.mousePressed(clearScreen);
	
	circleColor = color("#632CA6");
	circleColor.setAlpha(100);
}

function draw() {

}

function clearScreen() {
	background(250);
}

function nameToColor() {
	var name = nameInput.value();
	nameInput.value('');
	
	var nameValue = 0;
	for (var i = 0; i < name.length; i++) {
		nameValue += name.charCodeAt(i);
	}
	
	var nameColor = map(nameValue, 65, 1342, 0, 16777215);
	circleColor = color("#" + hex(nameColor,6));
	circleColor.setAlpha(100);
}

function mousePressed() {
	if (!(mouseX > nameInput.x && mouseX < nameInput.x + nameInput.width*2 + 50 && mouseY < nameInput.y + nameInput.height) && !(mouseX > clearButton.x && mouseX < clearButton.x + clearButton.width*2 && mouseY > clearButton.y && mouseY < clearButton.y + clearButton.height*2)) {
		fill(circleColor);
		circle(mouseX,mouseY,100);
	}

}
