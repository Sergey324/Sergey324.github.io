
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var blockXSize = div(screenWidth, 5);
var blockYSize = div(screenHeight, 5);
var parentElem = document.getElementById("blockContainer");

var list = [["survival2", 0, 0, 0, 1, "<img src='Pictures/MainPageIcons/Survival2.png' align = 'middle'>", "Survival2.0/index.html"], 
			["survival", 1, 4, 0, 0, "<img src='Pictures/MainPageIcons/Survival.png' align = 'middle'>", "Survival2.0/index.html"], 
			["bees", 2, 2, 1, 3, "<img src='Pictures/MainPageIcons/Bees.png' align = 'middle'>", "Survival2.0/index.html"], 
			["about", 0, 0, 2, 4, "<img src='Pictures/MainPageIcons/About.png' align = 'middle'>", "Survival2.0/index.html"],
			["tenger", 4, 4, 1, 4, "<img src='Pictures/MainPageIcons/Tenger.png' align = 'middle'>", "https://starik-tenger.github.io/"], 
			["wiki", 3, 3, 1, 1, "<img src='Pictures/MainPageIcons/Wiki.png' align = 'middle'>", "Survival2.0/index.html"], 
			["recurs", 3, 3, 2, 4, "<img src='Pictures/MainPageIcons/Recurs.png' align = 'middle'>", "https://sergey324.github.io"], 
			["omfs2", 1, 2, 4, 4, "<img src='Pictures/MainPageIcons/Fire.png' align = 'middle'>", "https://www.yandex.ru/"]];

var blocks = [];
for (var x = 0; x < list.length; x++) {
	blocks.push();	
}

var pad = 10;
var blockXSize = div(screenWidth, 5);
var blockYSize = div(screenHeight, 5);



class Block {
	constructor(id, u, d, l, r, i, ref){
		this.id = id;
		this.lBord = l;
		this.rBord = r;
		this.uBord = u;
		this.dBord = d;
		this.inner = i; 
		this.ref = ref;
		this.cont = document.createElement("a");
		this.cont.id = this.id + "Cont";
		this.cont.href = this.ref;
		this.elem = document.createElement("div");
		this.elem.id = this.id;
		this.elem.className = "block";
		parentElem.appendChild(this.cont);
		this.cont = document.getElementById(this.id + "Cont");
		this.cont.appendChild(this.elem);
		this.elem = document.getElementById(this.id);
		this.elem.innerHTML = this.inner;
		this.elem.align = "middle";
		this.elem.childNodes[0].style.position = "relative";
		adapt(this.elem, this.uBord, this.dBord, this.lBord, this.rBord);		
	}
	
}

function adapt(obj, u, d, l, r) {
		obj.style.width = String(blockXSize * (r - l + 1) - pad * 2) + "px";
		obj.style.height = String(blockYSize * (d - u + 1) - pad * 2) + "px";
		obj.style.top = String(u * blockYSize + pad) + "px";
		obj.style.left = String(l * blockXSize + pad) + "px";
		obj.childNodes[0].style.height = String(blockYSize - pad * 2) + "px";
		obj.childNodes[0].style.top = String((d - u) / 2 * blockYSize) + "px";
}
	
var mainlogo = document.getElementById("logo");
adapt(mainlogo, 1, 1, 1, 3);


for (var i = 0; i < list.length; i++) {
	blocks[i] = new Block(list[i][0], list[i][1], list[i][2], list[i][3], list[i][4], list[i][5], list[i][6]);
}

function tick() {
	screenWidth = document.documentElement.clientWidth;
	screenHeight = document.documentElement.clientHeight;
	blockXSize = div(screenWidth, 5);
	blockYSize = div(screenHeight, 5);
	for (var i = 0; i < list.length; i++){
		adapt(blocks[i].elem, blocks[i].uBord, blocks[i].dBord, blocks[i].lBord, blocks[i].rBord);
	}
	adapt(mainlogo, 1, 1, 1, 1);
	adapt(mainstring, 1, 1, 2, 4);
}

setInterval(tick, 5000);













