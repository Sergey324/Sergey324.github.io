//"use strict";

// Canvas settings ------------------------------------------------------------------------------------------------------------

var screen = document.getElementById("bge"), ctx = screen.getContext('2d');

var blockSize = 40;
var visionXRange = div(div(document.documentElement.clientWidth, blockSize), 2);
var visionYRange = div(div(document.documentElement.clientHeight, blockSize), 2);
var worldLength = 1000;
var worldHeight = 200;
screen.width  = visionXRange * blockSize * 2;
screen.height = visionYRange * blockSize * 2;


// Images ------------------------------------------------------------------------------------------------------------

var picChar = new Image();
	picChar.src = "Pictures/Characters/Char.png";


// Variables ------------------------------------------------------------------------------------------------------------

var biomeList = ["plain", "mountain", "desert"];
var biomeSize = 200;
var biomeDiff = biomeSize / 4;

var blockColours = [[90, 50, 20], [0, 140, 40], [230, 200, 100],[0, 0, 0], [75, 60, 40], [100, 235, 40]];
var colourNoize = 5;

var keyPressed = [0, 0, 0, 0];

var leftBorder = 0;
var rightBorder = 0;
var upBorder = 0;
var downBorder = 0;

var foreground = [];
var middleground = [];
var heightMap;
var biomeMap;

var player;

var xMouse;
var yMouse;

var obj;
// Blocks ------------------------------------------------------------------------------------------------------------

const DIRT = 0;
const GRASS = 1;
const SAND = 2;
const BORDER = 3;
const WOOD = 4;
const FOLIAGE = 5;

// Classes ------------------------------------------------------------------------------------------------------------
	
class Block {
	constructor(x, y, type, r, g, b) {
		this.xCell = x;
		this.yCell = y;
		this.type = type;
		this.colour = ("rgb" + "(" + String(blockColours[this.type][0] + getRandomInt(-1 * colourNoize, colourNoize)) + ", " + String(blockColours[this.type][1] + getRandomInt(-1 * colourNoize, colourNoize)) + ", " + String(blockColours[this.type][2] + getRandomInt(-1 * colourNoize, colourNoize)) + ")");
	}
	draw() {
		this.xPos = this.xCell * blockSize - player.xPos + visionXRange * blockSize;
		this.yPos = this.yCell * blockSize - player.yPos + visionYRange * blockSize;
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.xPos, this.yPos, blockSize, blockSize);
	}
}


class Player {
	constructor(x, y) {
		this.xPos = x;
		this.yPos = y;
		this.speed = blockSize / 10;
		this.xForce = 0;
		this.yForce = 0;
		this.xCollision = 7 * blockSize / 19;
		this.yCollision = blockSize;
	}
	movement() {
		
		this.yForce = this.yForce + 0.1 * blockSize / 30; //gravity

		
		if ((this.xForce != 0 && keyPressed[1] == 0 && keyPressed[3] == 0) && (foreground[this.xCell][div(this.yPos + 1 + this.yCollision, blockSize)] != null)) {
			this.xForce = 0;
		}
		
		//keyboard control
		if ((keyPressed[0] == 1) && (foreground[this.xCell][div(this.yPos + 1 + this.yCollision, blockSize)] != null)) {
			this.yForce = -2 * this.speed;
		}
		if (keyPressed[1] == 1 && this.xForce - this.speed / 10 > -1 * this.speed) {
			this.xForce = this.xForce - this.speed / 10 ;
		}
		if (keyPressed[3] == 1 && this.xForce + this.speed / 10 < this.speed) {
			this.xForce = this.xForce + this.speed / 10;
		}
		
		
			// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ vvv  Collision  vvv _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ \\
		
		if ((this.xForce != 0) && ((foreground[div(this.xPos + this.xForce + this.xCollision * digit(this.xForce), blockSize)][div(this.yPos + this.yCollision - 0.1, blockSize)] != null) || (foreground[div(this.xPos + this.xForce + this.xCollision * digit(this.xForce), blockSize)][div(this.yPos - this.yCollision, blockSize)] != null))) {
			this.xForce = 0;
		}
		
		if (this.yForce != 0) {
			for (var i = 0; i < Math.abs(Math.round(this.yForce * 10)); i++) {
				if ((foreground[div(this.xPos + this.xCollision - 0.1, blockSize)][div(this.yPos + (i / 10 + this.yCollision) * digit(this.yForce), blockSize)] != null) || (foreground[div(this.xPos - this.xCollision + 0.1, blockSize)][div(this.yPos + (i / 10 + this.yCollision) * digit(this.yForce), blockSize)] != null)) {
					this.yForce = (i - 1) / 10;
				}
			}
		}
		
		//movement
		this.xPos = this.xPos + Math.round(this.xForce);
		this.yPos = this.yPos + Math.round(this.yForce);
		
	}
	
	draw() {
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(picChar, visionXRange * blockSize - this.xCollision, visionYRange * blockSize - this.yCollision, 14 * blockSize / 19, 2 * blockSize);
	}
	
	vision() {
		this.xCell = div(this.xPos, blockSize);
		this.yCell = div(this.yPos, blockSize);
		
		if (this.xCell - visionXRange < 0) {
			leftBorder = 0;
		}
		else {
			leftBorder = this.xCell - visionXRange;
		}
		
		if (this.xCell + visionXRange + 1 > worldLength - 1) {
			rightBorder = worldLength - 1;
		}
		else {
			rightBorder = this.xCell + visionXRange + 1;
		}
		
		if (this.yCell - visionYRange < 0) {
			upBorder = 0;
		}
		else {
			upBorder = this.yCell - visionYRange;
		}
		
		if (this.yCell + visionYRange + 1 > worldHeight - 1) {
			downBorder = worldHeight;
		}
		else {
			downBorder = this.yCell + visionYRange + 1;
		}
	}
	
	blockSelector () {
		if (div(player.xPos + xMouse - screen.width / 2, blockSize) >= 0 && div(player.yPos + yMouse - screen.height / 2, blockSize) >= 0 && foreground[div(player.xPos + xMouse - screen.width / 2, blockSize)][div(player.yPos + yMouse - screen.height / 2, blockSize)] != null) {
			ctx.fillStyle = "red";
			obj = foreground[div(player.xPos + xMouse - screen.width / 2, blockSize)][div(player.yPos + yMouse - screen.height / 2, blockSize)];
			ctx.fillRect(obj.xPos, obj.yPos, blockSize, blockSize);
			
		}
	}
 }

 
class Tree {
	constructor(x, y, type) {
		this.xPos = x;
		this.yPos = y;
		this.type = type;
		this.arr = [];
		this.height = random(10, 20, 3);
		this.crownSize = random(2, 4, 3);
		for (var x = 0; x < this.crownSize * 2 + 1; x++) {
		this.arr.push([]);	
			for (var y = 0; y < this.crownSize + this.height; y++) {
			this.arr[x].push(0);	
			}			
		}
		
		for (var x = 0; x < this.height; x++) {
			this.arr[this.crownSize][this.height - 1 - x] = 1;
		}
		for (var x = 0; x < this.crownSize * 2 + 1; x++) {
			for (var y = 0; y < this.crownSize * 2 + 1; y++) {
				this.arr[x][y] = 2;
			}
		}
		for (var x = 0; x < this.crownSize * 2 + 1; x++) {
			for (var y = 0; y < this.crownSize + this.height; y++) {
				switch (this.arr[x][y]) {
					case 1:
						middleground[x + this.xPos - this.crownSize][y + this.yPos - (this.height - 1)] = new Block(x + this.xPos - this.crownSize, y + this.yPos - (this.height - 1), WOOD);
						break;
					case 2:
						middleground[x + this.xPos - this.crownSize][y + this.yPos  - (this.height - 1)] = new Block(x + this.xPos - this.crownSize, y + this.yPos - (this.height - 1), FOLIAGE);
						foreground[x + this.xPos - this.crownSize][y + this.yPos  - (this.height - 1)] = new Block(x + this.xPos - this.crownSize, y + this.yPos - (this.height - 1), FOLIAGE);
						break;
				}
			}
		}
	}
}



// Functions ------------------------------------------------------------------------------------------------------------
	
function mouseMoved(x, y) {
	xMouse = x;
	yMouse = y;
}

// foreground ------------------------------------------------------------------------------------------------------------

// Generator ------------------------------------------------------------------------------------------------------------

function generator() {	
	foreground = [];
	for (var x = 0; x < worldLength; x++) {
		foreground.push([]);	
			for (var y = 0; y < worldHeight; y++) {
			foreground[x].push(null);	
		}
	}
	middleground = [];
	for (var x = 0; x < worldLength; x++) {
		middleground.push([]);	
			for (var y = 0; y < worldHeight; y++) {
			middleground[x].push(null);	
		}
	}
	background = [];
	for (var x = 0; x < worldLength; x++) {
		background.push([]);	
			for (var y = 0; y < worldHeight; y++) {
			background[x].push(null);	
		}
	}
	
	heightMap = [];
	for (var x = 0; x < worldLength; x++) {
		heightMap.push(undefined);
	}

	biomeMap = [];
	for (var x = 0; x < worldLength; x++) {
		biomeMap.push(undefined);
	}

	var i = 0;
	while (i < worldLength) {
		var biomeLength = getRandomInt(biomeSize - biomeDiff, biomeSize + biomeDiff);
		var biomeType = getRandomInt(0, biomeList.length - 1);
		for (var x = 0; x < biomeLength; x++) {
			biomeMap[i] = biomeType;
			i++;
		}
	}
	
	heightMap[0] = div(worldHeight, 2);
	heightMap[1] = div(worldHeight, 2);
	


	for (var x = 2; x < worldLength; x++) {
		switch (biomeMap[x]) {
			case 0:
				heightMap[x] = heightMap[x - 1] + Math.abs(random(-2, 2, 3)) * boolToInt(random(0, worldHeight, 1) > Math.abs(heightMap[x - 1] - worldHeight / 2) + 50) * boolToInt(heightMap[x - 1] > worldHeight / 2);
				break;
			case 1:
				heightMap[x] = heightMap[x - 1] + Math.abs(random(-3, 3, 2)) * boolToInt(random(0, worldHeight, 1) > Math.abs(heightMap[x - 1] - worldHeight / 2) + 50) * boolToInt(heightMap[x - 1] > worldHeight / 2);
				break;
			case 2:
				heightMap[x] = heightMap[x - 1] + Math.abs(random(-2, 2, 7)) * boolToInt(random(0, worldHeight, 1) > Math.abs(heightMap[x - 1] - worldHeight / 2) + 50) * boolToInt(heightMap[x - 1] > worldHeight / 2);
				break;
		}
	}
	
	for (var x = 0; x < worldLength; x++) {
		switch(biomeMap[x]) {
			case 0:
				for (var y = worldHeight - 1; y > worldHeight - heightMap[x]; y = y - 1) {
					foreground[x][y] = new Block(x, y, DIRT);
				}
				foreground[x][y + 1] = new Block(x, y + 1, GRASS);
				break;
			case 1:
				for (var y = worldHeight - 1; y > worldHeight - heightMap[x]; y = y - 1) {
					foreground[x][y] = new Block(x, y, DIRT);
				}
				break;
			case 2:
				for (var y = worldHeight - 1; y > worldHeight - heightMap[x]; y = y - 1) {
					foreground[x][y] = new Block(x, y, SAND);
				}
				break;
		}
	}
	
	for (var x = 0; x < worldLength; x++) {

		heightMap[x] = worldHeight - heightMap[x];
	}
	
	for (var x = 2; x < worldLength; x++) {
		if (random(0, 50, 1) == 1){
			var tree = new Tree(x, heightMap[x], 1);
		}
	}
	
	
	
	for (var x = 0; x < worldLength - 1; x++) { // borders
		foreground[x][0] = new Block(x, 0, BORDER);
		foreground[x][worldHeight - 1] = new Block(x, worldHeight - 1, BORDER);
	}
	for (var y = 0; y < worldHeight; y++) {
		foreground[0][y] = new Block(0, y, BORDER);
		foreground[worldLength - 1][y] = new Block(worldLength - 1, y, BORDER);
	}
	
	player = new Player(1.5 * blockSize, worldHeight / 2 * blockSize);
}

generator();

// Keyforeground --------------------------------------------------------------------------------------------------------------

window.addEventListener("keydown", this.checkDown, false);
window.addEventListener("keyup", this.checkUp, false);
var key;

function checkDown(e) {
  key = e.keyCode;
	switch(key){
		case 87:
			keyPressed[0] = 1;
			break;
		case 65:
			keyPressed[1] = 1;
			break;
		case 83:
			keyPressed[2] = 1;
			break;
		case 68:
			keyPressed[3] = 1;
			break;
		case 32:
			generator();
			break;
	}
}

function checkUp(e) {
  key = e.keyCode;
	switch(key){
		case 87:
			keyPressed[0] = 0;
			break;
		case 65:
			keyPressed[1] = 0;
			break;
		case 83:
			keyPressed[2] = 0;
			break;
		case 68:
			keyPressed[3] = 0;
			break;
	}
}





// Tick ------------------------------------------------------------------------------------------------------------

function tick() {
	
	//screen settings
	visionXRange = div(div(document.documentElement.clientWidth, blockSize), 2);
	visionYRange = div(div(document.documentElement.clientHeight, blockSize), 2);
	screen.width  = visionXRange * blockSize * 2;
	screen.height = visionYRange * blockSize * 2;
	
	player.vision();
	player.movement();
	
	
	
	
	//drawing
    ctx.fillStyle = "#7FC7FF";
	ctx.fillRect(0, 0, screen.width, screen.height);

	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (background[x][y] != null) {
				background[x][y].draw();
			}			
			
		}
	}
	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (middleground[x][y] != null) {
				middleground[x][y].draw();
			}			
			
		}
	}
	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (foreground[x][y] != null) {
				foreground[x][y].draw();
			}			
			
		}
	}
	
	player.draw();
	player.blockSelector();
}


setInterval(tick, 10);









































