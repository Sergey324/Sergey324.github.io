function generator() {	

	//main arrays
	foreground = [];
	for (var x = 0; x < worldLength; x++) {
		foreground.push([]);	
			for (var y = 0; y < worldHeight; y++) {
			foreground[x].push(null);	
		}
	}
	middleground = [];
	for (var x = 0; x < worldLength; x++) {
		middleground.push([]);	
			for (var y = 0; y < worldHeight; y++) {
			middleground[x].push(null);	
		}
	}
	background = [];
	for (var x = 0; x < worldLength; x++) {
		background.push([]);	
			for (var y = 0; y < worldHeight; y++) {
			background[x].push(null);	
		}
	}
	
	
	heightMap = [];
	for (var x = 0; x < worldLength; x++) {
		heightMap.push(undefined);
	}

	biomeMap = [];
	for (var x = 0; x < worldLength; x++) {
		biomeMap.push(undefined);
	}

	var i = 0;
	while (i < worldLength) {
		var biomeLength = getRandomInt(biomeSize - biomeDiff, biomeSize + biomeDiff);
		var biomeType = getRandomInt(0, biomes.length - 1);
		for (var x = 0; x < biomeLength; x++) {
			biomeMap[i] = biomeType;
			i++;
		}
	}
	
	heightMap[0] = div(worldHeight, 2);
	heightMap[1] = div(worldHeight, 2);
	


	for (var x = 2; x < worldLength; x++) {
		heightMap[x] = heightMap[x - 1] + Math.abs(random(-1 * biomes[biomeMap[x]].randBase , biomes[biomeMap[x]].randBase, biomes[biomeMap[x]].randIter)) * boolToInt(random(0, worldHeight, 1) > Math.abs(heightMap[x - 1] - worldHeight / 2) + 50) * boolToInt(heightMap[x - 1] > worldHeight / 2);
	}
	
	for (var x = 0; x < worldLength; x++) {
		for (var y = worldHeight - 1; y > worldHeight - heightMap[x]; y = y - 1) {
			foreground[x][y] = new Block(biomes[biomeMap[x]].mainBlock, 0);
		}
		foreground[x][y + 1] = new Block(biomes[biomeMap[x]].upperBlock, 0);
	}
	
	for (var x = 0; x < worldLength; x++) {

		heightMap[x] = worldHeight - heightMap[x];
	}
	
	for (var x = 20; x < worldLength - 20; x++) {
		if (random(0, biomes[biomeMap[x]].treeSpawn, 1) == 1){
			var tree = new Tree(x, heightMap[x], 1);
		}
	}
	
	
	
	for (var x = 0; x < worldLength - 1; x++) { // borders
		foreground[x][0] = new Block(BORDER, 0);
		foreground[x][worldHeight - 1] = new Block(BORDER, 0);
	}
	for (var y = 0; y < worldHeight; y++) {
		foreground[0][y] = new Block(BORDER, 0);
		foreground[worldLength - 1][y] = new Block(BORDER, 0);
	}
	
	player = new Player(1.5 * blockSize, worldHeight / 2 * blockSize);
}