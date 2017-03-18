"use strict";
/*
Board:
	0 - empty
	1 - rock
	2 - water
	3 - food
*/

//Настройка холста
var screen = document.getElementById("bge"),
    ctx = screen.getContext('2d');
screen.width  = 640;
screen.height = 640;

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

//Импорт картинок
var picGround = new Image();
	picGround.src = "Images/ground.png";
var picRock = new Image();
	picRock.src = "Images/rock.png";

//Переменные
var bugNumber = 0;
var foodNumber = 0;
var keyPressed = [0, 0, 0, 0, 0]; //w, a, s, d
var key;

//Функции	
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function div(x, y) {
	return(Math.floor(x / y));
}


//События
window.addEventListener('keydown',this.checkDown,false);
window.addEventListener('keyup',this.checkUp,false);

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

//Массив объектов
var bugs = [];
var foodCells = [];

//Класс
class bug {
	constructor() {
		this.xPos = 40;
		this.yPos = 40;
	}
	moveUp() {
		if (board[div(this.xPos, cellSize)][div(this.yPos - 3, cellSize)] == 0) {
			this.yPos = this.yPos - 3;
		}
	}
	moveDown() {
		if (board[div(this.xPos, cellSize)][div(this.yPos + 3, cellSize)] == 0) {
			this.yPos = this.yPos + 3;
		}
	}
	moveLeft() {
		if (board[div(this.xPos - 3, cellSize)][div(this.yPos, cellSize)] == 0) {
			this.xPos = this.xPos - 3;
		}
	}
	moveRight() {
		if (board[div(this.xPos + 3, cellSize)][div(this.yPos, cellSize)] == 0) {
			this.xPos = this.xPos + 3;
		}
	}
}

class foodCell {
	constructor(x, y) {
		this.xCell = div(x, 32);
		this.yCell = div(y, 32);
	}
	
}

function tester(a, b) {
	var FoodCell = new foodCell(a, b)
	FoodCell.foodCellPosition();
	console.log(screen.offsetTop)
}


bugs.push(0);
var bugger = new bug();


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
	if(keyPressed[1] == 1) {
		bugger.moveUp()
	}
	if(keyPressed[2] == 1) {
		bugger.moveLeft()
	}
	if(keyPressed[3] == 1) {
		bugger.moveDown()
	}
	if(keyPressed[4] == 1) {
		bugger.moveRight()
	}
	
	ctx.fillRect(bugger.xPos, bugger.yPos, 3, 3);
	
}

setInterval(tick, 10);