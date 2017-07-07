// Canvas settings ------------------------------------------------------------------------------------------------------------

var screen = document.getElementById("bge"), ctx = screen.getContext('2d');

var blockSize = 40;
var visionXRange = div(div(document.documentElement.clientWidth, blockSize), 2);
var visionYRange = div(div(document.documentElement.clientHeight, blockSize), 2);
var worldLength = 1000;
var worldHeight = 200;
screen.width  = visionXRange * blockSize * 2;
screen.height = visionYRange * blockSize * 2;


// Images ------------------------------------------------------------------------------------------------------------

var picChar = new Image();
picChar.src = "Pictures/Characters/Char.png";

var picTarget = new Image();
picTarget.src = "Pictures/Others/Target.png";

// Blocks & Biomes ------------------------------------------------------------------------------------------------------------


const DIRT = 0;
const GRASS = 1;
const SAND = 2;
const BORDER = 3;
const WOOD = 4;
const FOLIAGE = 5;
const BUG = 6;
const BETON = 7;

const EMPTYHAND = 200;

const PLAIN = 0;
const MOUNTAIN = 1;
const DESERT = 2;
const ERROR = 3;
const BETONFLAT = 4;


class Biome {
	constructor(name, mainBlock, upperBlock, randBase, randIter, treeSpawn) {
		this.name = name;
		this.mainBlock = mainBlock;
		this.upperBlock = upperBlock;
		this.randBase = randBase;
		this.randIter = randIter;
		this.treeSpawn = treeSpawn;
	}
}
class BlockColor {
	constructor(r, g, b, n, id, s) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.noize = n;
		this.id = id;
		this.s = s;
	}
}
class Item {
	constructor(id, t, n) {
		this.id = id;
		this.type = t;
		this.number = n;
	}
}

// Other vars ------------------------------------------------------------------------------------------------------------

var biomes = [new Biome("plain", DIRT, GRASS, 2, 3, 30), new Biome("forest", DIRT, GRASS, 2, 7, 10), new Biome("mountain", DIRT, DIRT, 3, 2, 50), new Biome("desert", SAND, SAND, 2, 7, 100), new Biome("STRING_WAS_NOT_FOUND", BUG, BUG, 5, 1, 1000000), new Biome("beton", BETON, BETON, 0, 1, 1000000)];
var biomeSize = 200;
var biomeDiff = biomeSize / 4;

var blocks = [new BlockColor(90, 50, 20, 5, DIRT, 50), new BlockColor(0, 140, 40, 5, GRASS, 70), new BlockColor(230, 200, 100, 5, SAND, 20), new BlockColor(0, 0, 0, 5, BORDER, 1000000), new BlockColor(135, 120, 100, 5, WOOD, 100), new BlockColor(100, 235, 40, 5, FOLIAGE, 20), new BlockColor(0, 0, 0, 256, BUG, 1000), new BlockColor(200, 200, 200, 3, BETON, 1000)];

var keyPressed = [0, 0, 0, 0];

var leftBorder = 0;
var rightBorder = 0;
var upBorder = 0;
var downBorder = 0;

var foreground = [];
var middleground = [];
var heightMap;
var biomeMap;

var player;
var useDist = 5;
var checkQuality = 0.25;
var toolPower = 1;

var xMouse;
var yMouse;
var mousePressed;
var buildMode = 0;
var inventory = [null, null, null, null, null, null, null, null, null];
var activeItem = 1;

var obj = [];
var object;
var s;
var target;
var targ;

function blocksSorter() {
	var arr = []

	for (var i = 0; i < blocks.length; i++) {
		arr.push(null);		
	}
	
	for (var i = 0; i < blocks.length; i++) {
		arr[blocks[i].id] = blocks[i];
	}
	
	for (var i = 0; i < blocks.length; i++) {
		blocks[i] = arr[i];
	}
}


function blockBreakChecker(x, y) {
	var sin;
	var cos;
	var y = y;
	var x = x;
	
	sin = (xMouse - screen.width / 2) / (pifagor(xMouse - screen.width / 2, yMouse - screen.height / 2));
	cos = (yMouse - screen.height / 2) / (pifagor(xMouse - screen.width / 2, yMouse - screen.height / 2));
	
	if (div(player.xPos + xMouse - screen.width / 2, blockSize) >= 0 && div(player.yPos + yMouse - screen.height / 2, blockSize) >= 0 && div(player.xPos + xMouse - screen.width / 2, blockSize) < worldLength && div(player.yPos + yMouse - screen.height / 2, blockSize) < worldHeight) {				
		target = foreground[div(player.xPos + xMouse - screen.width / 2, blockSize)][div(player.yPos + yMouse - screen.height / 2, blockSize)];
		if (target != null) {
			sin = (target.xPos + x * blockSize - screen.width / 2) / (pifagor(target.xPos + x * blockSize - screen.width / 2, target.yPos + y * blockSize - screen.height / 2));
			cos = (target.yPos + y * blockSize - screen.height / 2) / (pifagor(target.xPos + x * blockSize - screen.width / 2, target.yPos + y * blockSize - screen.height / 2));	
			for (var i = 0; i < useDist * blockSize; i++) {
				if (div(player.xPos + i * sin, blockSize) >= 0 && div(player.yPos + i * cos, blockSize) >= 0 && div(player.xPos + i * sin, blockSize) < worldLength && div(player.yPos + i * cos, blockSize) < worldHeight && foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize)] != null) {				
					obj = foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize)];
					if (obj == target) {
						obj = [div(player.xPos + i * sin, blockSize), div(player.yPos + i * cos, blockSize)];
						targ = 1;						
					}						
					break;
				}
			}								
		}		
	}	
}

function blockBuildChecker(x, y) {
	var sin;
	var cos;
	var y = y;
	var x = x;
	
	sin = (xMouse - screen.width / 2) / (pifagor(xMouse - screen.width / 2, yMouse - screen.height / 2));
	cos = (yMouse - screen.height / 2) / (pifagor(xMouse - screen.width / 2, yMouse - screen.height / 2));
	
	if (div(player.xPos + xMouse - screen.width / 2, blockSize) >= 0 && div(player.yPos + yMouse - screen.height / 2, blockSize) >= 0 && div(player.xPos + xMouse - screen.width / 2, blockSize) < worldLength && div(player.yPos + yMouse - screen.height / 2, blockSize) < worldHeight) {				
		target = foreground[div(player.xPos + xMouse - screen.width / 2, blockSize)][div(player.yPos + yMouse - screen.height / 2, blockSize)];
		if (target == null) {
			var targXPos = div(player.xPos + xMouse - screen.width / 2, blockSize) * blockSize - player.xPos + visionXRange * blockSize;
			var targYPos = div(player.yPos + yMouse - screen.height / 2, blockSize) * blockSize - player.yPos + visionYRange * blockSize;
			sin = (targXPos + x * blockSize - screen.width / 2) / (pifagor(targXPos + x * blockSize - screen.width / 2, targYPos + y * blockSize - screen.height / 2));
			cos = (targYPos + y * blockSize - screen.height / 2) / (pifagor(targXPos + x * blockSize - screen.width / 2, targYPos + y * blockSize - screen.height / 2));	
			for (var i = 0; i < useDist * blockSize; i++) {		
				if (div(player.xPos + i * sin, blockSize) >= 0 && div(player.yPos + i * cos, blockSize) >= 0 && div(player.xPos + i * sin, blockSize) < worldLength && div(player.yPos + i * cos, blockSize) < worldHeight && foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize)] != null) {				
					break;					
				}
				if (div(player.xPos + i * sin, blockSize) >= 0 && div(player.yPos + i * cos, blockSize) >= 0 && div(player.xPos + i * sin, blockSize) < worldLength && div(player.yPos + i * cos, blockSize) < worldHeight && foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize)] == null) {				
					if ((div(player.xPos + i * sin, blockSize) == div(player.xPos + xMouse - screen.width / 2, blockSize) && div(player.yPos + i * cos, blockSize) == div(player.yPos + yMouse - screen.height / 2, blockSize)) && (foreground[div(player.xPos + i * sin, blockSize) - 1][div(player.yPos + i * cos, blockSize)] != null || foreground[div(player.xPos + i * sin, blockSize) + 1][div(player.yPos + i * cos, blockSize)] != null || foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize) - 1] != null  || foreground[div(player.xPos + i * sin, blockSize)][div(player.yPos + i * cos, blockSize) + 1] != null )) {
						obj = [div(player.xPos + i * sin, blockSize), div(player.yPos + i * cos, blockSize)];
						targ = 1;
						break;
					}					
				}				
			}								
		}		
	}	
}

blocksSorter();



