"use strict";

// Canvas settings ------------------------------------------------------------------------------------------------------------

var boardXSize = 400;
var boardYSize = 400;
var cellSize = 40;
var cameraX = 0;
var cameraY = 0;
var cameraSpeed = 5;


var screen = document.getElementById("bge"), ctx = screen.getContext('2d');
screen.width  = 1000;
screen.height = 1000;



// Images ------------------------------------------------------------------------------------------------------------

var picChar = new Image();
	picChar.src = "Images/Characters/Char.png";
var picTree = new Image();
	picTree.src = "Images/ForestBiome/Oak2.png";
var picLoading = new Image();
	picLoading.src = "Images/Loading.png";

ctx.drawImage(picLoading, 0, 0);

// Variables ------------------------------------------------------------------------------------------------------------

var board = [];
var keyPressed = [0, 0, 0, 0]; //w, a, s, d
var key;
var biomeSpreading = 100;
var visObjects = [];

// Functions ------------------------------------------------------------------------------------------------------------

function neighbourCounter(arr, i, j, type) {
	var s = 0;
	if (arr[i][j - 1].type == type) {
		s++;
	}
	if (arr[i][j + 1].type == type) {
		s++;
	}
	if (arr[i - 1][j].type == type) {
		s++;
	}
	if (arr[i + 1][j].type == type) {
		s++;
	}
	return(s);
	
}

function neighbourBiomeCounter(arr, i, j, biome) {
	var s = 0;
	if (arr[i][j - 1].biome == biome) {
		s++;
	}
	if (arr[i][j + 1].biome == biome) {
		s++;
	}
	if (arr[i - 1][j].biome == biome) {
		s++;
	}
	if (arr[i + 1][j].biome == biome) {
		s++;
	}
	return(s);
	
}


// Classes ------------------------------------------------------------------------------------------------------------

class camera {
	
	constructor() {
		this.xPos = screen.width / 2;
		this.yPos = screen.height / 2;
		this.speed = 5;
		this.moveX = 0;
		this.moveY = 0;
	}
	
	cameraMovement() {
	
		if (keyPressed[0] == 1) {
			this.moveY = -1 * this.speed;
			this.movementY();
		}
		if (keyPressed[1] == 1) {
			this.moveX = -1 * this.speed;
			this.movementX();
		}
		if (keyPressed[2] == 1) {
			this.moveY = 1 * this.speed;
			this.movementY();
		}
		if (keyPressed[3] == 1) {
			this.moveX = 1 * this.speed;
			this.movementX();
		}
	
	}
	
	movementX() {
		if (board[div(this.xPos + this.moveX, cellSize)][div(this.yPos, cellSize)].type == 0) {
			this.xPos = this.xPos + this.moveX;
		}
	}
	
	movementY() {
		if (board[div(this.xPos, cellSize)][div(this.yPos + this.moveY, cellSize)].type == 0) {
			this.yPos = this.yPos + this.moveY;
		}
	}
}

var cam = new camera();

class emptyCell {
	
	constructor(x, y, biome) {
		this.xCell = x;
		this.yCell = y;
		this.xPos = this.xCell * cellSize - cam.xPos + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
		this.type = 0;
		this.biome = biome;
		switch (this.biome) {
			case 0:
				this.color = ("rgb" + "(" + String(60 + getRandomInt(-10, 10)) + ", " + String(170 + getRandomInt(-10, 10)) + ", " + String(60 + getRandomInt(-10, 10)) + ")");
				break;
			case 1:
				this.color = ("rgb" + "(" + String(120 + getRandomInt(-10, 10)) + ", " + String(250 + getRandomInt(-10, 10)) + ", " + String(10 + getRandomInt(-10, 10)) + ")");
				break;
		}
	}
	
	cellTick() {
		this.xPos = this.xCell * cellSize - cam.xPos + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
	
	}
}

class rockCell { 
	constructor(x, y) {
		this.xCell = x;
		this.yCell = y;
		this.xPos = this.xCell * cellSize - cam.xPos  + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
		this.type = 1;
		this.baseColor = (120 + getRandomInt(-10, 10))
		this.color = ("rgb" + "(" + String(this.baseColor) + ", " + String(this.baseColor) + ", " + String(this.baseColor) + ")");
	}
	cellTick() {
		this.xPos = this.xCell * cellSize - cam.xPos  + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
	}
}

class waterCell { 
	constructor(x, y) {
		this.xCell = x;
		this.yCell = y;
		this.xPos = this.xCell * cellSize - cam.xPos  + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
		this.type = 2;
		this.color = ("rgb" + "(" + String(20 + getRandomInt(-10, 10)) + ", " + String(120 + getRandomInt(-10, 10)) + ", " + String(210 + getRandomInt(-10, 10)) + ")");
	}
	cellTick() {
		this.xPos = this.xCell * cellSize - cam.xPos  + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
	}
}

class treeCell {
	constructor(x, y) {
		this.xCell = x;
		this.yCell = y;
		this.xPos = this.xCell * cellSize - cam.xPos  + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
		this.type = 3;
		this.color = ("rgb" + "(" + String(60 + getRandomInt(-10, 10)) + ", " + String(170 + getRandomInt(-10, 10)) + ", " + String(60 + getRandomInt(-10, 10)) + ")");
	}
	cellTick() {
		this.xPos = this.xCell * cellSize - cam.xPos  + screen.width / 2;
		this.yPos = this.yCell * cellSize - cam.yPos + screen.height / 2;
	}
}

class tree {
	constructor(x, y) {
		this.xPos = x * cellSize - cam.xPos  + screen.width / 2;
		this.yPos = y * cellSize - cam.yPos  + screen.height / 2;
		this.visX = this.xPos - 12;
		this.visY = this.yPos - 96;
		this.pic = picTree;
		
	}
	
}

class character {
	constructor() {
		this.xPos = screen.width / 2;
		this.yPos = screen.height / 2;
		this.visX = this.xPos - 16;
		this.visY = this.yPos - 32;
		this.pic = picChar;
		
	}
	
}

var visChar = new character();

// Board ------------------------------------------------------------------------------------------------------------

for (var i = 0; i < boardXSize; i++) {
	board.push([]);
	for (var j = 0; j < boardYSize; j++) {
		if (getRandomInt(0, 10) == 0){
			if (getRandomInt(0, 4) != 1) {
				board[i].push(new treeCell(i, j));
			}
			else {
				board[i].push(new rockCell(i, j));
			}
		}
		else {
				board[i].push(new emptyCell(i, j, 0));
		}
	}
}

for (var i = 0; i < boardXSize; i++) {
	board[i][0] = new rockCell(i, 0);
}
for (var i = 0; i < boardYSize; i++) {
	board[0][i] = new rockCell(0, i);
}
for (var i = 0; i < boardXSize; i++) {
	board[i][boardYSize - 1] = new rockCell(i, boardXSize - 1);
}
for (var i = 0; i < boardYSize; i++) {
	board[boardYSize - 1][i] = new rockCell(boardYSize, i);
}

// Keyboard --------------------------------------------------------------------------------------------------------------

window.addEventListener("keydown", this.checkDown, false);
window.addEventListener("keyup", this.checkUp, false);

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


// Biome generator ------------------------------------------------------------------------------------------------------ 



for (var i = 1; i < boardXSize - 1; i++) {
	for (var j = 1; j < boardYSize - 1; j++){
		if (getRandomInt(0, 500) == 0) {
			board[i][j] = new emptyCell(i, j, 1);
		}
	}	
}

for (var k = 0; k < biomeSpreading; k++) {
	for (var i = 1; i < boardXSize - 1; i++) {
		for (var j = 1; j < boardYSize - 1; j++){
			if (Math.pow(neighbourBiomeCounter(board, i, j, 1), 3) >= getRandomInt(0, 50) && neighbourBiomeCounter(board, i, j, 1) != 0) {
				board[i][j] = new emptyCell(i, j, 1);
			}
		}	
	}
}



for (var i = 1; i < boardXSize - 1; i++) {
	for (var j = 1; j < boardYSize - 1; j++){
		if (getRandomInt(0, 1000) == 0) {
			board[i][j] = new waterCell(i, j);
		}
	}	
}


for (var k = 0; k < biomeSpreading; k++) {
	for (var i = 1; i < boardXSize - 1; i++) {
		for (var j = 1; j < boardYSize - 1; j++){
			if (Math.pow(neighbourCounter(board, i, j, 2), 3) >= getRandomInt(0, 50) && neighbourCounter(board, i, j, 2) != 0) {
				board[i][j] = new waterCell(i, j);
			}
		}	
	}
}

board[10][10] = new emptyCell(10, 10, 1);
for (var k = 0; k < 30; k++) {
	for (var i = 1; i < boardXSize - 1; i++) {
		for (var j = 1; j < boardYSize - 1; j++){
			if (Math.pow(neighbourBiomeCounter(board, i, j, 1), 3) >= getRandomInt(0, 50) && neighbourBiomeCounter(board, i, j, 1) != 0) {
				board[i][j] = new emptyCell(i, j, 1);
			}
		}	
	}
}



// Tick ------------------------------------------------------------------------------------------------------------

function tick() {
	visObjects = []
	visObjects.push(visChar);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, screen.width, screen.height);
	for (var i = 0; i < boardXSize; i++) {
		for (var j = 0; j < boardYSize; j++){
			switch (board[i][j].type) {
				case 0:
					board[i][j].cellTick();
					if (board[i][j].xPos > 0 - cellSize && board[i][j].yPos > 0 - cellSize && board[i][j].xPos < screen.width && board[i][j].yPos < screen.height) {
						ctx.fillStyle = (board[i][j].color);
						ctx.fillRect(board[i][j].xPos, board[i][j].yPos, cellSize, cellSize);
					}
					break;
				case 1:	
					board[i][j].cellTick();
					if (board[i][j].xPos > 0 - cellSize && board[i][j].yPos > 0 - cellSize && board[i][j].xPos < screen.width && board[i][j].yPos < screen.height) {
						
						ctx.fillStyle = (board[i][j].color);
						ctx.fillRect(board[i][j].xPos, board[i][j].yPos, cellSize, cellSize);
					}
					break;
				case 2:
					board[i][j].cellTick();
					if (board[i][j].xPos > 0 - cellSize && board[i][j].yPos > 0 - cellSize && board[i][j].xPos < screen.width && board[i][j].yPos < screen.height) {
						ctx.fillStyle = (board[i][j].color);
						ctx.fillRect(board[i][j].xPos, board[i][j].yPos, cellSize, cellSize);
					}
					break;
				case 3:
					board[i][j].cellTick();
					if (board[i][j].xPos > 0 - cellSize && board[i][j].yPos > 0 - cellSize && board[i][j].xPos < screen.width + 100 && board[i][j].yPos < screen.height + 100) {
						ctx.fillStyle = (board[i][j].color);
						ctx.fillRect(board[i][j].xPos, board[i][j].yPos, cellSize, cellSize);
						visObjects.push(new tree(i, j));
					}
					break;
			}
		}
	}
	
	for (var i = 0; i < screen.height; i++) {
		for (var j = visObjects.length - 1; j >= 0; j = j - 1) {
			if (visObjects[j].yPos == i) {
				ctx.drawImage(visObjects[j].pic, visObjects[j].visX, visObjects[j].visY);
				visObjects.splice(j, 1);
			}
		}
	}
	//ctx.drawImage(picChar, screen.width / 2 - 16, screen.height/2 - 32);
	cam.cameraMovement();
}

setInterval(tick, 10);