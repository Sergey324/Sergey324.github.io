

//initializing
generator();


// Tick ------------------------------------------------------------------------------------------------------------

function tick() {
	
	//screen settings
	visionXRange = div(div(document.documentElement.clientWidth, blockSize), 2);
	visionYRange = div(div(document.documentElement.clientHeight, blockSize), 2);
	screen.width  = visionXRange * blockSize * 2;
	screen.height = visionYRange * blockSize * 2;
	
	player.vision();
	player.movement();
	
	
	
	
	//drawing
    ctx.fillStyle = "#7FC7FF";
	ctx.fillRect(0, 0, screen.width, screen.height);

	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (background[x][y] != null) {
				background[x][y].draw(x, y);
			}			
			
		}
	}
	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (middleground[x][y] != null) {
				middleground[x][y].draw(x, y);
			}			
			
		}
	}
	for (var x = leftBorder; x < rightBorder; x++) {
		for (var y = upBorder; y < downBorder; y++) {
			if (foreground[x][y] != null) {
				foreground[x][y].draw(x, y);
			}			
			
		}
	}
	
	player.draw();
	player.mouse();
}


setInterval(tick, 10);









































