"use strict";

// Canvas settings ------------------------------------------------------------------------------------------------------------

var screen = document.getElementById("bge"), ctx = screen.getContext('2d');

var blockSize = 40;
var visionXRange = div(div(document.documentElement.clientWidth, blockSize), 2);
var visionYRange = div(div(document.documentElement.clientHeight, blockSize), 2);
var worldLength = 10000;
var worldHeight = 500;
screen.width  = visionXRange * blockSize * 2;
screen.height = visionYRange * blockSize * 2;

// Images ------------------------------------------------------------------------------------------------------------

var picChar = new Image();
	picChar.src = "Pictures/Characters/Char.png";


// Variables ------------------------------------------------------------------------------------------------------------

var biomeList = ["plain", "mountain", "desert"];
var colourNoize = 5;
var biomeSize = 200;
var biomeDiff = biomeSize / 4;
var blockColours = [[],[90, 50, 20], [100, 240, 20], [230, 200, 100],[0, 0, 0]];
var keyPressed = [0, 0, 0, 0];
var leftBorder = 0;
var rightBorder = 0;
var upBorder = 0;
var downBorder = 0;

// Functions ------------------------------------------------------------------------------------------------------------



// Classes ------------------------------------------------------------------------------------------------------------
	
	
class Block {
	constructor(x, y, type, r, g, b) {
		this.xCell = x;
		this.yCell = y;
		this.type = type;
		if (this.type != 0) {
			this.colour = ("rgb" + "(" + String(blockColours[this.type][0] + getRandomInt(-1 * colourNoize, colourNoize)) + ", " + String(blockColours[this.type][1] + getRandomInt(-1 * colourNoize, colourNoize)) + ", " + String(blockColours[this.type][2] + getRandomInt(-1 * colourNoize, colourNoize)) + ")");
		}
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
		this.speed = blockSize / 15;
		this.xForce = 0;
		this.yForce = 0;
		this.xCollision = 7;
		this.yCollision = 19;
	}
	movement() {
		
		this.yForce = this.yForce + 0.1;
		
		
		if ((this.xForce != 0) && (Math.abs(this.xForce) >= 0.2) && (board[this.xCell][div(this.yPos + 1 + this.yCollision, blockSize)].type != 0)) {
			this.xForce = ((this.xForce / Math.abs(this.xForce)) * (Math.abs(this.xForce) - 0.5));
		}
		else if ((this.xForce != 0) && (Math.abs(this.xForce) < 0.2) && (board[this.xCell][div(this.yPos + 1 + this.yCollision, blockSize)].type != 0)) {
			this.xForce = 0;
		}
		
		
		if ((keyPressed[0] == 1) && (board[this.xCell][div(this.yPos + 1 + this.yCollision, blockSize)].type != 0)) {
			this.yForce = -2 * this.speed;
		}
		if (keyPressed[1] == 1) {
			this.xForce = -1 * this.speed;
		}
		if (keyPressed[3] == 1) {
			this.xForce = this.speed;
		}
		
		
						// _-_-_-_ Collision _-_-_-_ \\
		
		if ((this.xForce != 0) && ((board[div(this.xPos + this.xForce + this.xCollision * (this.xForce / Math.abs(this.xForce)), blockSize)][div(this.yPos + this.yCollision - 1, blockSize)].type != 0) || (board[div(this.xPos + this.xForce + this.xCollision * (this.xForce / Math.abs(this.xForce)), blockSize)][div(this.yPos - this.yCollision + 1, blockSize)].type != 0)))  {
			this.xForce = 0;
		}
		if (this.yForce != 0) {
			for (var i = 0; i < Math.round(this.yForce * 10 ); i++) {
				if ((board[div(this.xPos + this.xCollision - 1, blockSize)][div(this.yPos + div(i / 10, 1) + this.yCollision * (this.yForce / Math.abs(this.yForce)), blockSize)].type != 0) || (board[div(this.xPos - this.xCollision + 1, blockSize)][div(this.yPos + div(i / 10, 1) + this.yCollision * (this.yForce / Math.abs(this.yForce)), blockSize)].type != 0)) {
					this.yForce = (i - 1) / 10;
				}
			}
		}
		
		
		this.xPos = this.xPos + Math.round(this.xForce);
		this.yPos = this.yPos + Math.round(this.yForce);
		
	}
	
	draw() {
		//ctx.fillStyle = "black";
		ctx.drawImage(picChar, visionXRange * blockSize - this.xCollision, visionYRange * blockSize - this.yCollision);
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
 }

var player = new Player(visionXRange * blockSize, visionYRange * blockSize);

// Board ------------------------------------------------------------------------------------------------------------

var board = [];

for (var x = 0; x < worldLength; x++) {
	board.push([]);	
		for (var y = 0; y < worldHeight; y++) {
		board[x].push(new Block(x, y, 0));	
	}
}

// Generator ------------------------------------------------------------------------------------------------------------
function generator() {
	var heightMap = [];
	for (var x = 0; x < worldLength; x++) {
		heightMap.push(undefined);
	}

	var biomeMap = [];
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
	for (var x = 1; x < worldLength; x++) {
		switch (biomeMap[x]) {
			case 0:
				heightMap[x] = heightMap[x - 1] + random(-2, 2, 3);
				break;
			case 1:
				heightMap[x] = heightMap[x - 1] + random(-3, 3, 2);
				break;
			case 2:
				heightMap[x] = heightMap[x - 1] + random(-2, 2, 7);
				break;
		}
	}
	
	for (var x = 0; x < worldLength; x++) {
		switch(biomeMap[x]) {
			case 0:
				for (var y = worldHeight - 1; y > heightMap[x]; y = y - 1) {
					board[x][y] = new Block(x, y, 1);
				}
				board[x][y + 1] = new Block(x, y + 1, 2);
				break;
			case 1:
				for (var y = worldHeight - 1; y > heightMap[x]; y = y - 1) {
					board[x][y] = new Block(x, y, 1);
				}
				break;
			case 2:
				for (var y = worldHeight - 1; y > heightMap[x]; y = y - 1) {
					board[x][y] = new Block(x, y, 3);
				}
				break;
		}
	}

	for (var x = 0; x < worldLength - 1; x++) {
		board[x][0] = new Block(x, 0, 4);
		board[x][worldHeight - 1] = new Block(x, worldHeight - 1, 4);
	}
	for (var y = 0; y < worldHeight; y++) {
		board[0][y] = new Block(0, y, 4);
		board[worldLength - 1][y] = new Block(worldLength - 1, y, 4);
	}
}

generator();

// Keyboard --------------------------------------------------------------------------------------------------------------

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
    ctx.fillStyle = "#7FC7FF";
	ctx.fillRect(0, 0, screen.width, screen.height);
	player.vision();
	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (board[x][y].type != 0) {
				board[x][y].draw();
			}			
			
		}
	}
	player.movement();
	player.draw();
}


setInterval(tick, 10);









































