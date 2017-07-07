// Mouse -------------------------------------------------------------------------------------------------------------------
function mouseMoved(x, y) {
	xMouse = x;
	yMouse = y;
}

function mouseDown() {
	mousePressed = 1;
}

function mouseUp () {
	mousePressed = 0;
}

// Keyboard -------------------------------------------------------------------------------------------------------------------

window.addEventListener("keydown", this.checkDown, false);
window.addEventListener("keyup", this.checkUp, false);
var key;

function checkDown(e) {
	key = e.keyCode;
	switch(key){
		case 87:
			keyPressed[0] = 1;
			break;
		case 65:
			keyPressed[1] = 1;
			break;
		case 83:
			keyPressed[2] = 1;
			break;
		case 68:
			keyPressed[3] = 1;
			break;
		case 66:
			player.yPos = player.yPos - 10;
			break;
		case 32:
			buildMode = (buildMode - 1) * -1
			break;
	}
}

function checkUp(e) {
    key = e.keyCode;
	switch(key){
		case 87:
			keyPressed[0] = 0;
			break;
		case 65:
			keyPressed[1] = 0;
			break;
		case 83:
			keyPressed[2] = 0;
			break;
		case 68:
			keyPressed[3] = 0;
			break;
	}
}
