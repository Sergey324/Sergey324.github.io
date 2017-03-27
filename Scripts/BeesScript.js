"use strict";
/*
Board:
	0 - empty
	1 - rock
	2 - water
	3 - food
*/
//---------------------------------------------------------------------------------------------------------------------------

//Переменные

var bugNumber = 0;
var bugs = [];

var foodNumber = 0;
var foodCells = [];

var keyPressed = [0, 0, 0, 0]; //w, a, s, d
var key;

var localX = 0;
var localY = 0;

var mouseX = 0;
var mouseY = 0;

var board = [];
var boardSize = 25;
var cellSize = 32;

//---------------------------------------------------------------------------------------------------------------------------

//Класс

class bug {
	constructor(number, xPos, yPos, speed, saturation) {
		this.number = number;
		this.xPos = xPos;
		this.yPos = yPos;
		this.speed = speed;
		this.moveX = speed;
		this.moveY = speed;
		this.saturation = saturation;
		this.loc; //location
		this.dist = [];
		this.moveSin;
		this.moveCos;
	}
	movementX(r) {
		if (board[div(this.xPos + this.moveX, cellSize)][div(this.yPos, cellSize)].type != 1) {
			this.xPos = this.xPos + this.moveX;
		}
	}
	movementY(r) {
		if (board[div(this.xPos, cellSize)][div(this.yPos + this.moveY, cellSize)].type != 1) {
			this.yPos = this.yPos + this.moveY;
		}
	}
	findNearestCell() {
		this.loc = target;
	}
	
	bugNavigation () {
		this.findNearestCell();
		this.moveSin = (this.loc.yPos - this.yPos) / (Math.sqrt(Math.pow(this.xPos - this.loc.xPos, 2) + Math.pow(this.yPos - this.loc.yPos, 2)));
		this.moveCos = (this.loc.xPos - this.xPos) / (Math.sqrt(Math.pow(this.xPos - this.loc.xPos, 2) + Math.pow(this.yPos - this.loc.yPos, 2)));
		this.moveX = this.moveCos * this.speed + getRandomInt(-1 * this.speed, 1 * this.speed);
		this.moveY = this.moveSin * this.speed + getRandomInt(-1 * this.speed, 1 * this.speed);

		
	}

	
	lifeBugTick(number) {
		this.number = number;
		this.saturation = this.saturation - 1;
		this.bugNavigation();
		this.movementX();
		this.movementY();
		if (this.saturation == 0){
			bugs.splice(this.number, 1);
			console.log("death");
			bugNumber = bugNumber - 1;
		}
		if (board[div(this.xPos, cellSize)][div(this.yPos, cellSize)].type == 2) {
			this.saturation = this.saturation + 100;
			board[div(this.xPos, cellSize)][div(this.yPos, cellSize)].lifeTime = board[div(this.xPos, cellSize)][div(this.yPos, cellSize)].lifeTime - 1;
		}		
	}
}


class foodCell {
	constructor(x, y) {
		this.xCell = x;
		this.yCell = y;
		this.xPos = this.xCell * cellSize + div(cellSize, 2);
		this.yPos = this.yCell * cellSize + div(cellSize, 2);
		this.type = 2;
		this.lifeTime = getRandomInt(10, 30);


	}
	lifeFoodTick() {
		if (this.lifeTime <= 0) {
			board[this.xCell][this.yCell] = new emptyCell(this.xCell, this.yCell);
			foodNumber = foodNumber - 1;
		}
		else {
			foodCells.push(new foodCell(this.xCell, this.yCell));
		}
	
	}
}


class emptyCell {
	constructor(x, y) {
		this.xCell = x;
		this.yCell = y;
		this.type = 0;
	}
}

class rockCell { 
	constructor(x, y) {
		this.xCell = x;
		this.yCell = y;
		this.type = 1;
		this.moveX;
		this.moveY;
	}
}

class aim {
	constructor(xPos, yPos, speed) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.speed = speed;
		this.moveX = 1;
		this.moveY = 1;

	}
	movementX(r) {
		if (board[div(this.xPos + r, cellSize)][div(this.yPos, cellSize)].type != 1) {
			this.xPos = this.xPos + r;
		}
	}
	movementY(r) {
		if (board[div(this.xPos, cellSize)][div(this.yPos + r, cellSize)].type != 1) {
			this.yPos = this.yPos + r;
		}
	}
	
	aimNavigation () {3
		this.moveSin = (mouseY - this.yPos) / (Math.sqrt(Math.pow(this.xPos - mouseX, 2) + Math.pow(this.yPos - mouseY, 2)));
		this.moveCos = (mouseX - this.xPos) / (Math.sqrt(Math.pow(this.xPos - mouseX, 2) + Math.pow(this.yPos - mouseY, 2)));
		this.moveX = this.moveCos * this.speed;
		this.moveY = this.moveSin * this.speed;
	}
	movement() {
		if (keyPressed[0] == 1) {
			this.movementY(-1 * this.speed);
		}
		if (keyPressed[1] == 1) {
			this.movementX(-1 * this.speed);
		}
		if (keyPressed[2] == 1) {
			this.movementY(this.speed);
		}
		if (keyPressed[3] == 1) {
			this.movementX(this.speed);
		}
		this.aimNavigation();
		if ((Math.sqrt(Math.pow(this.xPos - mouseX, 2) + Math.pow(this.yPos - mouseY, 2))) >= this.speed){
			this.movementX(this.moveX);
			this.movementY(this.moveY);
		}
		
	}
	
}



//---------------------------------------------------------------------------------------------------------------------------

//Настройка холста

var screen = document.getElementById("bge"), ctx = screen.getContext('2d');
screen.width  = boardSize * cellSize;
screen.height = boardSize * cellSize;

//---------------------------------------------------------------------------------------------------------------------------

//Настройка доски

for (var i = 0; i < boardSize; i++) {
	board.push([]);
	for (var j = 0; j < boardSize; j++) {
		board[i].push(new emptyCell(i, j));
		if(getRandomInt(0, 15) == 1){
			bugs.push(0);
			bugs[bugNumber] = new bug(bugNumber, i * cellSize + div(cellSize, 2), j * cellSize + div(cellSize, 2), 2, getRandomInt(100, 10000));
			bugNumber++;
		}
		
	}
}

/*
for (var i = 2; i < boardSize; i++) {
	for (var j = 0; j < boardSize; j++){
		if (getRandomInt(0, 50) == 1) {
			board[i][j] = new rockCell(i, j);
		}
	}
}
*/
	
for (var i = 0; i < boardSize; i++) {
	board[i][0] = new rockCell(i, 0);
}
for (var i = 0; i < boardSize; i++) {
	board[0][i] = new rockCell(0, i);
}
for (var i = 0; i < boardSize; i++) {
	board[i][boardSize - 1] = new rockCell(i, boardSize - 1);
}
for (var i = 0; i < boardSize; i++) {
	board[boardSize - 1][i] = new rockCell(boardSize, i);
}


//---------------------------------------------------------------------------------------------------------------------------

//Импорт картинок

var picGround = new Image();
	picGround.src = "Images/ground.png";
var picRock = new Image();
	picRock.src = "Images/rock.png";
var picFood = new Image();
	picFood.src = "Images/food.png";
var picTarget = new Image();
	picTarget.src = "Images/target.png";

//---------------------------------------------------------------------------------------------------------------------------

//Функции	

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function div(x, y) {
	return(Math.floor(x / y));
}

function getMaxElem(array){
    var max = 0;
    for (var i = 0; i < array.length; i++) { 
        if (max < array[i]){
			max = i
		}
    }
    return max;
}
function getMinElem(arr){
	if (arr.length != 0) {
		var min = arr[0];
		var minElem = 0;
		for (var j = 0; j < arr.length; j++) { 
			if (min > arr[j]){
				minElem = j;				
			}
		}
		return minElem;
	}
}

function mouseMovement(x, y) {
	mouseX = x - screen.getBoundingClientRect().left;
	mouseY = y - screen.getBoundingClientRect().top;
	
}
//---------------------------------------------------------------------------------------------------------------------------

//События

window.addEventListener('keydown',this.checkDown,false);
window.addEventListener('keyup',this.checkUp,false);

//---------------------------------------------------------------------------------------------------------------------------

//Клавиатура

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

var target = new aim(40, 40, 10);

//---------------------------------------------------------------------------------------------------------------------------

//Тик

function tick() {
	

	//Отрисовка поля	
	foodCells = [];
	for (var i = 0; i < boardSize; i++) {
		for (var j = 0; j < boardSize; j++){
			switch (board[i][j].type) {
				case 0:
					ctx.drawImage(picGround, 0 + i * cellSize, 0 + j * cellSize);
					break;
				case 1:
					ctx.drawImage(picRock, 0 + i * cellSize, 0 + j * cellSize);
					break;
				case 2:
					board[i][j].lifeFoodTick();
					ctx.drawImage(picFood, 0 + i * cellSize, 0 + j * cellSize);
					break;
			}
		}
	}
	
	
	localX = getRandomInt(0, boardSize - 1);
	localY = getRandomInt(0, boardSize - 1);
	
	if (board[localX][localY].type == 0 && getRandomInt(0, 10) ==  1){
		board[localX][localY] = new foodCell(localX, localY);
	}
	
	target.movement();
	
	
	
	
	for (var i = 0; i < bugNumber; i++) {
		bugs[i].lifeBugTick(i);
		ctx.fillRect(bugs[i].xPos - 2, bugs[i].yPos - 2, 5, 5);
	}
	
	ctx.drawImage(picTarget, 0 + target.xPos - 14, 0 + target.yPos - 14);
}

setInterval(tick, 10);
