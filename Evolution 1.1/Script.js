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
var keyPressed = [0, 0, 0, 0, 0]; //w, a, s, d
var key;
var xPos = 40;
var yPos = 40;

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

//Класс
class bug {
	sayAlert(x) {
		alert(x);
	}	
}

function moveUp(y) {
	return(y - 3);
}
function moveDown(y) {
	return(y + 3);
}
function moveLeft(x) {
	return(x - 3);
}
function moveRight(x) {
	return(x + 3);
}

for (var k = 0; k < 10; k++){
	bugs.push(0);
	bugs[bugNumber] = new bug(0, 0);
	bugNumber++;
}

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
	if(keyPressed[1] == 1 && board[div(xPos, cellSize)][div(yPos - 3, cellSize)] != 1) {
		yPos = moveUp(yPos)
	}
	if(keyPressed[2] == 1 && board[div(xPos - 3, cellSize)][div(yPos, cellSize)] != 1) {
		xPos = moveLeft(xPos)
	}
	if(keyPressed[3] == 1 && board[div(xPos, cellSize)][div(yPos + 3, cellSize)] != 1) {
		yPos = moveDown(yPos)
	}
	if(keyPressed[4] == 1 && board[div(xPos + 3, cellSize)][div(yPos, cellSize)] != 1) {
		xPos = moveRight(xPos)
	}
	ctx.fillRect(xPos, yPos, 3, 3);
	
}

setInterval(tick, 10);