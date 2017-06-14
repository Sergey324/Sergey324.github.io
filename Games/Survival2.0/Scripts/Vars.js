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

// Blocks & Biomes ------------------------------------------------------------------------------------------------------------

const DIRT = 0;
const GRASS = 1;
const SAND = 2;
const BORDER = 3;
const WOOD = 4;
const FOLIAGE = 5;

const PLAIN = 0;
const MOUNTAIN = 1;
const DESERT = 2;

// Other vars ------------------------------------------------------------------------------------------------------------

var biomes = [["plain", DIRT, GRASS, 2, 3, 30], ["mountain", DIRT, DIRT, 3, 2, 50], ["desert", SAND, SAND, 2, 7, 100]];
var biomeSize = 200;
var biomeDiff = biomeSize / 4;

var blockColours = [[90, 50, 20], [0, 140, 40], [230, 200, 100],[0, 0, 0], [75, 60, 40], [100, 235, 40]];
var colourNoize = 5;

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

var xMouse;
var yMouse;
var mousePressed;

var obj;





