"use strict";
/*
Board:
	0 - empty
	1 - rock
	2 - water
	3 - food
*/

//---------------------------------------------------------------------------------------------------------------------------

//Настройка холста
var screen = document.getElementById("bge"),
    ctx = screen.getContext('2d');
screen.width  = 640;
screen.height = 640;

//---------------------------------------------------------------------------------------------------------------------------

//Настройка доски
var board = [];
var boardSize = 20;
var cellSize = 32;
for (var i = 0; i < boardSize; i++) {
	board.push([]);
	for (var j = 0; j < boardSize; j++) {
		board[i].push(0);
	}
}
for (var i = 2; i < boardSize; i++) {
		for (var j = 0; j < boardSize; j++){
			if (getRandomInt(0, 5) == 5) {
				board[i][j] = 1;
			}
		}
	}
	
for (var i = 0; i < boardSize; i++) {
	board[i][0] = 1;
}
for (var i = 0; i < boardSize; i++) {
	board[0][i] = 1;
}
for (var i = 0; i < boardSize; i++) {
	board[i][boardSize - 1] = 1;
}
for (var i = 0; i < boardSize; i++) {
	board[boardSize - 1][i] = 1;
}


//---------------------------------------------------------------------------------------------------------------------------


//Импорт картинок
var picGround = new Image();
	picGround.src = "Images/ground.png";
var picRock = new Image();
	picRock.src = "Images/rock.png";

	
//---------------------------------------------------------------------------------------------------------------------------
	
	
//Переменные
var bugNumber = 0;
var foodNumber = 0;
var keyPressed = [0, 0, 0, 0, 0]; //w, a, s, d
var key;


//---------------------------------------------------------------------------------------------------------------------------


//Функции	
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function div(x, y) {
	return(Math.floor(x / y));
}

function lifeTick(i) {
	bugs[i].moveX(getRandomInt(-5, 5));
	bugs[i].moveY(getRandomInt(-5, 5));
	
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
			keyPressed[1] = 1;
			break;
		case 65:
			keyPressed[2] = 1;
			break;
		case 83:
			keyPressed[3] = 1;
			break;
		case 68:
			keyPressed[4] = 1;
			break;
	}
}

function checkUp(e) {
  key = e.keyCode;
	switch(key){
		case 87:
			keyPressed[1] = 0;
			break;
		case 65:
			keyPressed[2] = 0;
			break;
		case 83:
			keyPressed[3] = 0;
			break;
		case 68:
			keyPressed[4] = 0;
			break;
	}
}

if(keyPressed[1] == 1) {
	bugger.moveUp();
}
if(keyPressed[2] == 1) {
	bugger.moveLeft();
}
if(keyPressed[3] == 1) {
	bugger.moveDown();
}
if(keyPressed[4] == 1) {
	bugger.moveRight();
}
	

//---------------------------------------------------------------------------------------------------------------------------


//Массив объектов
var bugs = [];
var foodCells = [];


//---------------------------------------------------------------------------------------------------------------------------


//Класс
class bug {
	constructor(xPos, yPos, speed) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.speedX = speed;
		this.speedY = speed;
		this.stepCount;
	}
	
	moveUp() {
		if (board[div(this.xPos, cellSize)][div(this.yPos - this.speedY, cellSize)] == 0) {
			this.yPos = this.yPos - this.speedY;
		}
	}
	moveDown() {
		if (board[div(this.xPos, cellSize)][div(this.yPos + this.speedY, cellSize)] == 0) {
			this.yPos = this.yPos + this.speedY;
		}
	}
	moveLeft() {
		if (board[div(this.xPos - this.speedX, cellSize)][div(this.yPos, cellSize)] == 0) {
			this.xPos = this.xPos - this.speedX;
		}
	}
	moveRight() {
		if (board[div(this.xPos + this.speedX, cellSize)][div(this.yPos, cellSize)] == 0) {
			this.xPos = this.xPos + this.speedX;
		}
	}
	moveX(a) {
		if (board[div(this.xPos + a, cellSize)][div(this.yPos, cellSize)] == 0) {
			this.xPos = this.xPos + a;
		}
	}
	moveY(a) {
		if (board[div(this.xPos, cellSize)][div(this.yPos + a, cellSize)] == 0) {
			this.yPos = this.yPos + a;
		}
	}
	

	
}

class foodCell {
	constructor(x, y) {
		this.xCell = div(x, cellSize);
		this.yCell = div(y, cellSize);
	}
	
}

function tester(a, b) {
	var FoodCell = new foodCell(a, b);
	FoodCell.foodCellPosition();
	console.log(screen.offsetTop);
}

var bugger = new bug(40, 40, 2);

for (var i = 0; i < 10; i++) {
	bugs.push(0);
	bugs[bugNumber] = new bug(40, 40, 2);
	bugNumber++;
}

//---------------------------------------------------------------------------------------------------------------------------


//Тик
function tick() {
	
	//Отрисовка поля	
	for (var i = 0; i < boardSize; i++) {
		for (var j = 0; j < boardSize; j++){
			switch (board[i][j]) {
				case 0:
					ctx.drawImage(picGround, 0 + i * cellSize, 0 + j * cellSize);
					break;
				case 1:
					ctx.drawImage(picRock, 0 + i * cellSize, 0 + j * cellSize);
					break;
				default:
					ctx.drawImage(picGround, 0 + i * cellSize, 0 + j * cellSize);
					break;
			}
		}
	}

	
	//Персонаж

	ctx.fillRect(bugger.xPos - 2, bugger.yPos - 2, 5, 5);
	for (var i = 0; i < bugNumber; i++) {
		lifeTick(i);
		ctx.fillRect(bugs[i].xPos - 2, bugs[i].yPos - 2, 5, 5);
	}
}

setInterval(tick, 10);