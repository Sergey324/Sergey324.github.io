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
			if (getRandomInt(0, 50) == 1) {
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
var picFood = new Image();
	picFood.src = "Images/food.png";

	
//---------------------------------------------------------------------------------------------------------------------------
	
	
//Переменные
var bugNumber = 0;


var foodNumber = 0;
var foodBoard = [];
var foodCoord = [];

var keyPressed = [0, 0, 0, 0, 0]; //w, a, s, d
var key;

var localX = 0;
var localY = 0;

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
	if (board[a][b] == 2) {
		var object = foodCells[foodCoord.indexOf(String(a) + " " + String(b))];
		object.lifeTime = object.lifeTime - 1;
	}
	
}

function lifeFoodTick(i) {
	if (foodCells[i].lifeTime > 0) {
		foodCells[i].aging();
	}
	else {
		board[foodCells[i].xPos][foodCells[i].yPos] = 0;
		foodCells.splice(i, 1);		
		foodCoord.splice(i, 1);
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
var foodCeller = [0];


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
		if (board[div(this.xPos + a, cellSize)][div(this.yPos, cellSize)] != 1) {
			this.xPos = this.xPos + a;
		}
	}
	moveY(a) {
		if (board[div(this.xPos, cellSize)][div(this.yPos + a, cellSize)] != 1) {
			this.yPos = this.yPos + a;
		}
	}
	

	
}

class foodCell {
	constructor(x, y) {
		this.lifeTime = getRandomInt(10, 30);
		this.xCell = x;
		this.yCell = y;		
		foodNumber++;
		foodCoord.push(String(this.xCell) + " " + String(this.yCell));
	}
	aging () {
		//this.lifeTime = this.lifeTime - 1;
	}
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
	
	
	localX = parseInt(getRandomInt(0, 19));
	localY = parseInt(getRandomInt(0, 19));
	
	if (board[localX][localY] == 0 && getRandomInt(0, 50) ==  1){
		foodCells[foodNumber] = new foodCell(localX, localY);
		board[localX][localY] = 2;
	}

	console.log(foodNumber);
	for (var i = foodNumber - 1; i >= 0; i = i - 1) {

		ctx.drawImage(picFood, foodCells[i].xCell * 32, foodCells[i].yCell * 32);
		lifeFoodTick(i);
	}
	
	
	ctx.fillRect(bugger.xPos - 2, bugger.yPos - 2, 5, 5);
	for (var i = 0; i < bugNumber; i++) {
		lifeBugTick(bugs[i]);
		ctx.fillRect(bugs[i].xPos - 2, bugs[i].yPos - 2, 5, 5);
	}
	
	
}

setInterval(tick, 10);