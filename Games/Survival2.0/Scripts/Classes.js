class Block {
	constructor(type, l) {
		this.type = type;
		this.lay = l;
		this.color = ("rgb(" + String(blocks[this.type].r + getRandomInt(-1 * blocks[this.type].noize, blocks[this.type].noize) - this.lay * 30) + ", " + String(blocks[this.type].g + getRandomInt(-1 * blocks[this.type].noize, blocks[this.type].noize) - this.lay * 30) + ", " + String(blocks[this.type].b + getRandomInt(-1 * blocks[this.type].noize, blocks[this.type].noize) - this.lay * 30) + ")");
		
	}
	draw(x, y) {
		this.xPos = x * blockSize - player.xPos + visionXRange * blockSize;
		this.yPos = y * blockSize - player.yPos + visionYRange * blockSize;
		ctx.fillStyle = this.color;
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
		
		this.collisionPoints = [[this.xPos - this.xCollision, this.yPos + this.yCollision - 1], [this.xPos - this.xCollision, this.yPos], [this.xPos - this.xCollision, this.yPos - this.yCollision], [this.xPos + this.xCollision - 1, this.yPos + this.yCollision - 1], [this.xPos + this.xCollision - 1, this.yPos], [this.xPos + this.xCollision - 1, this.yPos - this.yCollision]];
		
		for (var i = 0; i < this.collisionPoints.length; i++) {
			this.collision(this.collisionPoints[i][0], this.collisionPoints[i][1], this);
		}
		
		//movement
		this.xPos = this.xPos + Math.floor(this.xForce);
		this.yPos = this.yPos + Math.floor(this.yForce);
		
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
		if (buildMode == 0) {
			targ = 0;
			obj = []; 
			if (targ == 0) {
				var x = 0;
				for (var y = checkQuality; y < 1; y = y + checkQuality) {
					if (targ == 0) {
						blockBreakChecker(x, y);
					}
					else {
						break;
					}			
				}	
			}
		
			if (targ == 0) {
				var x = 1;
				for (var y = checkQuality; y < 1; y = y + checkQuality) {
					if (targ == 0) {
						blockBreakChecker(x, y);
					}
					else {
						break;
					}
				}
			}
			
			if (targ == 0) {
				var y = 0;
				for (var x = checkQuality; x < 1; x = x + checkQuality) {
					if (targ == 0) {
						blockBreakChecker(x, y);
					}
					else {
						break;
					}			
				}
			}
		
			if (targ == 0) {
				var y = 1;
				for (var x = checkQuality; x < 1; x = x + checkQuality) {
					if (targ == 0) {
						blockBreakChecker(x, y);
					}	
					else {
						break;
					}		
				}
			}
		
			if (targ == 1) {
				ctx.drawImage(picTarget, foreground[obj[0]][obj[1]].xPos, foreground[obj[0]][obj[1]].yPos, blockSize, blockSize);	
			}				
		}
	
		if (buildMode == 1) {
			targ = 0;
			obj = []; 
			if (targ == 0) {
				var x = 0;
				for (var y = checkQuality; y < 1; y = y + checkQuality) {
					if (targ == 0) {
						blockBuildChecker(x, y);
					}
					else {
						break;
					}			
				}	
			}
		
			if (targ == 0) {
				var x = 1;
				for (var y = checkQuality; y < 1; y = y + checkQuality) {
					if (targ == 0) {
						blockBuildChecker(x, y);
					}
					else {
						break;
					}
				}
			}
			
			if (targ == 0) {
				var y = 0;
				for (var x = checkQuality; x < 1; x = x + checkQuality) {
					if (targ == 0) {
						blockBuildChecker(x, y);
					}
					else {
						break;
					}			
				}
			}
		
			if (targ == 0) {
				var y = 1;
				for (var x = checkQuality; x < 1; x = x + checkQuality) {
					if (targ == 0) {
						blockBuildChecker(x, y);
					}	
					else {
						break;
					}		
				}
			}			
		}
	}	
	
	collision (x, y, obj) {	
		if (foreground[div(x + obj.xForce + 1 * digit(obj.xForce), blockSize)][div(y, blockSize)] != null) {
			obj.xForce = 0;
		}
		
		if ((foreground[div(obj.xPos + obj.xCollision - 1, blockSize)][div(this.yPos + 1 + this.yCollision, blockSize)] != null || foreground[div(obj.xPos - obj.xCollision, blockSize)][div(this.yPos + 1 + this.yCollision, blockSize)] != null) && keyPressed[1] != 1 && keyPressed[3] != 1) {
			obj.xForce = 0;
		}
		
		for (var i = 0; i < Math.abs(obj.yForce); i++) {
			if (foreground[div(x, blockSize)][div(y + (i + 1) * digit(obj.yForce), blockSize)] != null) {
				obj.yForce = i * digit(obj.yForce);
				break;
			}			
		}		
	}
	
	mouse() {
		if (mousePressed == 1) {
			object = obj;
			this.blockSelector();
			if (buildMode == 0 && obj.length > 0) {
				if (object[0] == obj[0] && object[1] == obj[1]) {
					s = s - toolPower;
					if (s <= 0) {
						foreground[obj[0]][obj[1]] = null;
					}
					else {
						ctx.fillStyle = "black";
						ctx.fillRect(foreground[obj[0]][obj[1]].xPos, foreground[obj[0]][obj[1]].yPos + blockSize, blockSize, s / blocks[foreground[obj[0]][obj[1]].type].s * blockSize - blockSize);
						ctx.drawImage(picTarget, obj[0] * blockSize - player.xPos + visionXRange * blockSize, obj[1]  * blockSize - player.yPos + visionYRange * blockSize, blockSize, blockSize);
					}
				}
				else {					
					s = blocks[foreground[obj[0]][obj[1]].type].s;								
				}
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
						background[x + this.xPos - this.crownSize][y + this.yPos - (this.height - 1)] = new Block(WOOD, 2);
						break;
					case 2:
						background[x + this.xPos - this.crownSize][y + this.yPos  - (this.height - 1)] = new Block(FOLIAGE, 2);
						foreground[x + this.xPos - this.crownSize][y + this.yPos  - (this.height - 1)] = new Block(FOLIAGE, 0);
						break;
				}
			}
		}
	}
}
























