var colors = [];
var numSquares = 6;
var pickColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modebtn = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
	reset();
});


function init(){
	
	setUpModeButton();
	setUpButtons();
	reset();

}

function changeColor(color){
	//matching the given selected color
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickedColor(){
	//generatiing a random pick color
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	//generating a random color for the color squares
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new color froom an Array
	pickColor = pickedColor();
	//change the color display
	colorDisplay.textContent = pickColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
	//adding colors to the squares
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
}

function setUpModeButton(){
	for (var i = 0; i < modebtn.length; i++) {
		modebtn[i].addEventListener("click", function(){
			modebtn[0].classList.remove("selected");
			modebtn[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			}
			else{
				numSquares = 6;
			}
			reset();
		});
	}
}

function setUpButtons(){
	for (var i = 0; i < squares.length; i++) {
		//adding colors to the squares
		squares[i].style.background = colors[i];

		//adding the click listener to the squares
		squares[i].addEventListener("click", function(){
			//get color of clicked square and compare to the pickedColor
			var clickedColor = this.style.backgroundColor;
			if(pickColor === clickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColor(clickedColor);
				h1.style.backgroundColor = clickedColor;
				
			}else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}