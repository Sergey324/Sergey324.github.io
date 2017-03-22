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
var foodBoard = [];
var foodCoord = [];

var keyPressed = [0, 0, 0, 0, 0]; //w, a, s, d
var key;

var localX = 0;
var localY = 0;

var board = [];
var boardSize = 20;
var cellSize = 32;


//---------------------------------------------------------------------------------------------------------------------------


//Класс
class bug {
	constructor(xPos, yPos, speed) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.speedX = speed;
		this.speedY = speed;
	}
	moveX(r) {
		this.speedX = r;
		if (board[div(this.xPos + this.speedX, cellSize)][div(this.yPos, cellSize)].type != 1) {
			this.xPos = this.xPos + this.speedX;
		}
	}
	moveY(r) {
		this.speedY = r;
		if (board[div(this.xPos, cellSize)][div(this.yPos + this.speedY, cellSize)].type != 1) {
			this.yPos = this.yPos + this.speedY;
		}
	}
	
}


class foodCell {
	constructor(x, y) {
		this.xCell = x;
		this.yCell = y;
		this.type = 2;
		this.lifeTime = getRandomInt(100, 300);
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
	}
}

for (var i = 0; i < 10; i++) {
	bugs.push(0);
	bugs[bugNumber] = new bug(40, 40, 2);
	bugNumber++;
}

//---------------------------------------------------------------------------------------------------------------------------


//Настройка холста
var screen = document.getElementById("bge"),
    ctx = screen.getContext('2d');
screen.width  = 640;
screen.height = 640;

//---------------------------------------------------------------------------------------------------------------------------

//Настройка доски

for (var i = 0; i < boardSize; i++) {
	board.push([]);
	for (var j = 0; j < boardSize; j++) {
		board[i].push(new emptyCell(i, j));
	}
}
for (var i = 2; i < boardSize; i++) {
		for (var j = 0; j < boardSize; j++){
			if (getRandomInt(0, 50) == 1) {
				board[i][j] = new rockCell(i, j);
			}
		}
	}
	
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

	
//---------------------------------------------------------------------------------------------------------------------------
	


//Функции	
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function div(x, y) {
	return(Math.floor(x / y));
}

function lifeBugTick(obj) {
	obj.moveX(getRandomInt(-5, 5));
	obj.moveY(getRandomInt(-5, 5));
	var a = div(obj.xPos, cellSize);
	var b = div(obj.yPos, cellSize);
	
}

function lifeFoodTick(i) {
	if (i.lifeTime > 0) {
		i.lifeTime = i.lifeTime - 1;
	}
	else {
		board[i.xCell][i.yCell] = new emptyCell(i.xCell, i.yCell);
		foodNumber = foodNumber - 1;
		
	}
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



//---------------------------------------------------------------------------------------------------------------------------


//Тик
function tick() {
	
	//Отрисовка поля	
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
					lifeFoodTick(board[i][j]);
					ctx.drawImage(picFood, 0 + i * cellSize, 0 + j * cellSize);
					break;
			}
		}
	}
	
	
	localX = getRandomInt(0, 19);
	localY = getRandomInt(0, 19);
	
	if (board[localX][localY].type == 0 && getRandomInt(0, 15) ==  1){
		board[localX][localY] = new foodCell(localX, localY);
	}

	for (var i = 0; i < bugNumber; i++) {
		lifeBugTick(bugs[i]);
		ctx.fillRect(bugs[i].xPos - 2, bugs[i].yPos - 2, 5, 5);
	}
	
	
}

setInterval(tick, 10);