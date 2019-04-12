var city,tempC,tempF,angle,condition,code;
var currLat, currLong,currCoords;
var currTime, currHour;
var dayColor, nightColor, bgColor;
var snowflakes = [];
var snowCodes = [1114,1210,1213,1216,1219,1222,1225,1255,1258];
var drops = [];
var rainCodes = [1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1240,1243,1246];
var heavyRain = [1195,1246];
var sleetCodes = [1204,1207,1249,1252];
var pelletCodes = [1237,1261,1264];
var fogCodes = [1135,1147];
var mySun;
var partlyClouds = [];
var cloudyClouds = [];
var overcastClouds = [];
var input,button;
var time = 0;
var celcius = false;
var dayFog, dayFog2, nightFog,nightFog2;
var canvas;

function windowResized(){
	var clientHeight = document.getElementById('sketch').clientHeight;
    var clientWidth = document.getElementById('sketch').clientWidth;
	resizeCanvas(clientWidth, clientHeight);
	input.size(width*.25,width*.04);
	input.position(width/2-input.width/2,20);
	button.size(input.width*.3, input.height);
  	button.position(input.x + input.width + 10, 20);
  	var fontSize = str(width*.04)
	input.style('font-size', fontSize)
}

function setup(){
	var clientHeight = document.getElementById('sketch').clientHeight;
    var clientWidth = document.getElementById('sketch').clientWidth;
	canvas = createCanvas(clientWidth, clientHeight);
	canvas.parent("sketch");
	
	textFont('Helvetica');
	textAlign(CENTER,CENTER);
	
	navigator.geolocation.getCurrentPosition(getPos);
	
	// var url = 'http://api.apixu.com/v1/current.json?key=8812c17c42514e19ae4201716191402&q=ljubljana';
	// loadJSON(url,gotWeather);
	
	dayColor = color(139, 186, 239);
	nightColor = color(45, 9, 89);
	dayRain = color(8, 101, 206);
	nightRain = color(79, 198, 214);
	dayFog = color(11, 23, 45);
	dayFog2 = color(11, 23, 45,0);
	nightFog = color(135, 145, 163);
	nightFog2 = color(135, 145, 163,0);
	
	input = createInput();
	// input.size(300,40);
	input.size(width*.3,width*.04);
	var fontSize = str(width*.04)
	input.style('font-size', fontSize);
	input.parent("sketch");
	input.position(width/2-input.width/2,20);

	// input.position(0,0);
	// console.log(canvas.x);
	
	button = createButton('Go');
	// button.size(50,45);
	button.size(input.width*.3, input.height);
	button.parent("sketch");
  	button.position(input.x + input.width + 10, 20);
  	button.mousePressed(newWeather);
	
	mySun = new sun();
	
	partlyClouds.push(new cloud(mySun.x-mySun.d/2,mySun.y,200,50,0), new cloud(mySun.x+mySun.d/2.5,mySun.y+mySun.d*.4,300,100,1));
	cloudyClouds.push(new cloud(mySun.x-mySun.d/2,mySun.y,400,150,0), new cloud(mySun.x+mySun.d/2.5,mySun.y+mySun.d*.4,250,100,1), new cloud(width*.4,height*.3,175,90,0), new cloud(width*.8,height*.4,450,200,1), new cloud(width*.58,height*.2,200,60,0));
	
	var cloudNum = width/100;
	var w = width * .3 > 300 ? width *.3 : 300;
	for(var i = 0; i < cloudNum; i++){
		overcastClouds.push(new cloud(width*(.2*(i+1))+random(-width*.1,width*.1),height*.1+random(-height*.05,height*.05),w,150,floor(random(2)),1));
		overcastClouds.push(new cloud(width*(.2*(i))+random(-width*.1,width*.1),height*.22+random(-height*.05,height*.05),w,150,floor(random(2)),1));
		overcastClouds.push(new cloud(width*(.2*(i))+random(-width*.1,width*.1),height*.35+random(-height*.05,height*.05),w*.6,110,floor(random(2)),1));
		overcastClouds.push(new cloud(width*(.2*(i-1))+random(-width*.1,width*.1),height*.42+random(-height*.05,height*.05),w*.3,90,floor(random(2)),1));
	}
}

function draw() {
	if(currHour >= 17 && currHour <= 21){ //sunset
		var inc = map(currHour, 17, 21, 0, 1);
		bgColor = lerpColor(dayColor, nightColor, inc);
	}else if(currHour >= 7 && currHour < 17){//daytime
		bgColor = dayColor;
	}else{//nighttime
		bgColor = nightColor;
	}
	background(bgColor);
	
	//SUN
	if(code >= 1000 && code <= 1003){
		mySun.display();
	}
	
	//CLOUDS
	if(code == 1003){
		for(var i = 0; i < partlyClouds.length; i++){
			partlyClouds[i].display();
		}
	}else if(code == 1006){
		for(var i = 0; i < cloudyClouds.length; i++){
			cloudyClouds[i].display();
		}
	}else if(code==1009){
		for(var i = 0; i < overcastClouds.length; i++){
			overcastClouds[i].display();
		}
	}

	// RAIN
	if(rainCodes.includes(code) || sleetCodes.includes(code) || pelletCodes.includes(code)){
		if(heavyRain.includes(code)){
			for (var i = 0; i < random(25); i++) {
				drops.push(new drop());
			}
		}else{
			for (var i = 0; i < random(5); i++) {
				drops.push(new drop());
			}
		}
		for (var i = 0; i < drops.length; i++) {
			drops[i].update();
			drops[i].display();
			drops[i].outOfBounds();
		}
	}
	
	// SNOW
	if(snowCodes.includes(code)){
		for (var i = 0; i < random(5); i++) {
    		snowflakes.push(new snowflake());
		}
		var t = frameCount / 60;
		for (let flake of snowflakes) {
			flake.update(t);
			flake.display();
		}
	}
	
	//FOG
	if(fogCodes.includes(code)){
		showFog();
	}
		
	//TEXT
	strokeWeight(5);
	stroke(red(bgColor),green(bgColor),blue(bgColor),150);
	fill(255);
	textSize(width*.05);
	var y = input.y + input.height + width * .05;
	if(typeof tempC == 'undefined'){
		text("Loading...",width/2,y);
	}else{
		text(city, width/2, y);
		text(currTime+":"+nf(second(),2),width/2, y + width * .05);
		text(condition, width/2, y + width * .1);
		if(celcius){
			text(tempC + " °C", width/2, y + width * .15);
		}else{
			text(tempF + " °F", width/2, y + width * .15);
		}
	}
	
	//update time
	if(second() == 0){
		var url = 'https://api.apixu.com/v1/current.json?key=8812c17c42514e19ae4201716191402&q=' + currCoords;
		loadJSON(url,updateTime);
	}
	
	time+=.03;
}

function gotWeather(weather){
	city = weather.location.name;
	tempC = weather.current.temp_c;
	tempF = weather.current.temp_f;
	condition = weather.current.condition.text;
	code = weather.current.condition.code;
	angle = weather.current.wind_degree;
	currTime = weather.location.localtime;
	currHour = int(currTime.substring(11,13));
	currTime = currTime.substring(11,currTime.length);
	if(currTime.length < 5){
		currTime = "0"+currTime;
	}
	currLat = weather.location.lat;
	currLong = weather.location.lon;
	currCoords = "" + currLat + "," + currLong;
}

function updateTime(weather){
 	currTime = weather.location.localtime;
	currHour = int(currTime.substring(11,13));
	currTime = currTime.substring(11,currTime.length);
	if(currTime.len < 5){
		currTime = "0"+currTime;
	}
}

function newWeather(){
	var place = input.value();
	input.value('');
	var url = 'https://api.apixu.com/v1/current.json?key=8812c17c42514e19ae4201716191402&q=' + place;
	loadJSON(url,gotWeather);
}

function getPos(position){
	currLat = position.coords.latitude;
	currLong = position.coords.longitude;
	var place = "" + currLat + "," + currLong;
	var url = 'https://api.apixu.com/v1/current.json?key=8812c17c42514e19ae4201716191402&q=' + place;
	loadJSON(url,gotWeather);
}

function mousePressed(){
	if(!((mouseX > input.x && mouseX < input.x + input.width && mouseY > input.y && mouseY < input.y + input.height)||(mouseX > button.x && mouseX < button.x + button.width && mouseY > button.y && mouseY < button.y + button.height))){
		celcius = !celcius;
	}
}

function keyPressed(){
	if(keyCode == 13 && input.value()!=""){
		newWeather();
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

