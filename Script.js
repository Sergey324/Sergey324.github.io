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

var keyPressed = [0, 0, 0, 0, 0]; //w, a, s, d
var key;

var localX = 0;
var localY = 0;

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
		this.speedX = speed;
		this.speedY = speed;
		this.moveX = speed;
		this.moveY = speed;
		this.saturation = saturation;
		this.loc; //location
		this.sys1;
		this.sys2;
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
	findNearestCell(foodCells) {
		this.sys1 = [];
		for (var i = 0; i < foodCells.length; i++) {
			this.sys1.push(foodCells[this.number]);			
		}
		this.loc = getMinElem(this.sys1);
	}
	
	bugNavigation () {
		
		this.moveSin = (this.xPos - this.loc.xPos) / (Math.sqrt(Math.pow(this.xPos - this.loc.xPos, 2) + Math.pow(this.yPos - this.loc.yPos, 2)));
		this.moveCos = (this.yPos - this.loc.yPos) / (Math.sqrt(Math.pow(this.xPos - this.loc.xPos, 2) + Math.pow(this.yPos - this.loc.yPos, 2)));
		this.moveX = this.moveSin * this.speedX * -1;
		this.moveY = this.moveCos * this.speedY * -1;

		
	}
	lifeBugTick(number) {
		this.number = number;
		this.saturation = this.saturation - 1;
		this.findNearestCell(foodCells);
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
		this.dist = [];
	}
	lifeFoodTick() {
		if (this.lifeTime <= 0) {
			board[this.xCell][this.yCell] = new emptyCell(this.xCell, this.yCell);
			foodNumber = foodNumber - 1;
		}
		else {
			for (var i = 0; i < bugs.length; i ++) {
				this.dist.push(Math.sqrt(Math.pow(this.xPos - bugs[i].xPos, 2) + Math.pow(this.yPos - bugs[i].yPos, 2)));
			}
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
	}
}

for (var i = 0; i < 10; i++) {
	bugs.push(0);
	bugs[bugNumber] = new bug(i, 40, 40, 2, getRandomInt(100, 10000));
	bugNumber++;
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

function getMaxElem(array){
    var max = array[0];
    for (var i = 0; i < array.length; i++) { 
        if (max < array[i]){
			max = i
		}
    }
    return max;
}
function getMinElem(array){
    var min = array[0];
    for (var i = 0; i < array.length; i++) { 
        if (min < array[i]){
			min = i
		}
    }
    return min;
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
					board[i][j].lifeFoodTick();
					ctx.drawImage(picFood, 0 + i * cellSize, 0 + j * cellSize);
					break;
			}
		}
	}
	
	foodCells = [];
	
	for (var i = 0; i < boardSize; i++) {
		for (var j = 0; j < boardSize; j++) {
			if(board[i][j].type == 2) {
				foodCells.push(board[i][j]);
			}
		}
	}
	
	
	localX = getRandomInt(0, boardSize - 1);
	localY = getRandomInt(0, boardSize - 1);
	
	if (board[localX][localY].type == 0 && getRandomInt(0, 50) ==  1){
		board[localX][localY] = new foodCell(localX, localY);
	}

	for (var i = 0; i < bugNumber; i++) {
		bugs[i].lifeBugTick(i);
		ctx.fillRect(bugs[i].xPos - 2, bugs[i].yPos - 2, 5, 5);
	}
	
	
}

setInterval(tick, 10);