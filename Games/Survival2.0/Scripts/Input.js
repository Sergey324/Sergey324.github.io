// Mouse -------------------------------------------------------------------------------------------------------------------
function mouseMoved(x, y) {
	xMouse = x;
	yMouse = y;
}

function mouseDown() {
	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (foreground[x][y] != null && foreground[x][y].isSelected == 1) {
				foreground[x][y] = null;
			}			
			
		}
	}
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
		case 32:
			generator();
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
