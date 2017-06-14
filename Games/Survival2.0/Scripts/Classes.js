class Block {
	constructor(x, y, type, r, g, b) {
		this.isSelected;
		this.xCell = x;
		this.yCell = y;
		this.type = type;
		this.colour = ("rgb" + "(" + String(blockColours[this.type][0] + getRandomInt(-1 * colourNoize, colourNoize)) + ", " + String(blockColours[this.type][1] + getRandomInt(-1 * colourNoize, colourNoize)) + ", " + String(blockColours[this.type][2] + getRandomInt(-1 * colourNoize, colourNoize)) + ")");
	}
	draw() {
		this.isSelected = 0;
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
		var sin;
		var cos;
		
		sin = (xMouse - screen.width / 2) / (pifagor(xMouse - screen.width / 2, yMouse - screen.height / 2));
		cos = (yMouse - screen.height / 2) / (pifagor(xMouse - screen.width / 2, yMouse - screen.height / 2));
		
		for (var i = 0; i < useDist * blockSize; i++) {
			if (div(player.xPos + i * sin, blockSize) >= 0 && div(player.yPos + i * cos, blockSize) >= 0 && foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize)] != null) {
				ctx.fillStyle = "red";
				obj = foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize)];
				obj.isSelected = 1;
				ctx.fillRect(obj.xPos, obj.yPos, blockSize, blockSize);
				break
			}
		}
		
	}
 }

 
class Tree {
	constructor(x, y, type) {
		this.xPos = x;
		this.yPos = y;
		this.type = type;
		this.arr = [];
		this.height = random(15, 25, 5);
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






























