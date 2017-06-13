"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function div(x, y) {
	return(Math.floor(x / y));
}

function random(a, b, iter) {
		var q = 0;
		for (var j = 0; j < iter; j++) {
			q = q + getRandomInt(a, b);		
		}
		q = Math.round(q / iter);
		return q;
}

function getMaxElem(arr){
	if (arr.length != 0) {
		var max = arr[0];
		var maxElem = 0;
		for (var j = 0; j < arr.length; j++) { 
			if (max < arr[j]){
				maxElem = j;				
			}
		}
		return maxElem;
	}
}

function getMinElem(arr){
	if (arr.length != 0) {
		var min = arr[0];
		var minElem = 0;
		for (var j = 0; j < arr.length; j++) { 
			if (min > arr[j]){
				minElem = j;				
			}
		}
		return minElem;
	}
}

function digit(x){
	return(x / Math.abs(x));
}

function boolToInt(x){
	return((Number(x) - 0.5) * 2);
}





















