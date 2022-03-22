const paintCanvas = document.querySelector("#paintCanvas");
const colorPicker = document.querySelector("#colorPicker");
const resetBtn = document.querySelector("#resetBtn");
const selectedSize = document.querySelector("#selectedSize");
const recentColorsContainer = document.querySelector("#recentColorsContainer");
const eraserBtn = document.querySelector("#eraserBtn");
const showBordersBtn = document.querySelector("#showBordersBtn");


const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = '#000000';
const ERASER_COLOR = "#ffffff";
let recentColors = [DEFAULT_COLOR];

let gridSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

let isErasing = false;
let isMouseDown = false;
let borders = false;
document.body.onmousedown = () => (isMouseDown=true)
document.body.onmouseup = () => (isMouseDown=false)





function setupGrid() {
	paintCanvas.style.gridTemplateColumns = `repeat(${gridSize},${Math.floor(400/gridSize)}px)`;
	paintCanvas.style.gridTemplateRows = `repeat(${gridSize},${Math.floor(400/gridSize)}px)`;
	for (let i=0; i < gridSize*gridSize; i++) {
		const cell = document.createElement("div");
		cell.classList.add('cell');
		cell.addEventListener('mouseover', changeColor);
		cell.addEventListener('mousedown', changeColor);
		paintCanvas.appendChild(cell);
	}
	const defaultColorIcon = document.createElement("div");
	defaultColorIcon.classList.add("recent-color");
	defaultColorIcon.style.backgroundColor = DEFAULT_COLOR;
	recentColorsContainer.appendChild(defaultColorIcon);
}







function setCurrentColor(newColor) {

	currentColor = newColor;
	if (!recentColors.includes(newColor)){
		recentColors.unshift(newColor)
	}
	if (recentColors.length > 10) {
		recentColors.pop()
	}
	recentColorsContainer.innerHTML = '';
	recentColors.forEach(color => {
		const recentColorIcon = document.createElement("div");
		recentColorIcon.classList.add("recent-color");
		recentColorIcon.style.backgroundColor = color;
		recentColorIcon.onclick = () => {
			setCurrentColor(color)
			colorPicker.value = color
		}
		recentColorsContainer.appendChild(recentColorIcon);
	})
}
colorPicker.addEventListener("change", (e) => setCurrentColor(e.target.value))


function toggleErase() {
	isErasing ? isErasing = false : isErasing = true;
	eraserBtn.classList.toggle("setting-selected");
}
eraserBtn.addEventListener("click", toggleErase);

function toggleBorders() {
	borders ? borders = false : borders = true;
	const currentCells = document.querySelectorAll(".cell");
	currentCells.forEach(cell => {
		if (borders) {
			cell.classList.add('borders');
		} else {
			cell.classList.remove('borders');
		}
	})


	showBordersBtn.classList.toggle("setting-selected");

}
showBordersBtn.addEventListener("click", toggleBorders)


function changeColor(e) {
	if (e.type=== 'mouseover' && !isMouseDown) return

	if (isErasing) {
		e.target.style.backgroundColor = ERASER_COLOR;
	} else {
		e.target.style.backgroundColor = currentColor;
		
	}
}




function resetGrid() {
	paintCanvas.innerHTML = '';
	gridSize = parseInt(selectedSize.value)
	recentColors = [DEFAULT_COLOR]
	recentColorsContainer.innerHTML = '';
	colorPicker.value = DEFAULT_COLOR;
	isErasing = false;
	borders = false;
	showBordersBtn.classList.remove("setting-selected");
	eraserBtn.classList.remove("setting-selected");
	setupGrid()
}
resetBtn.addEventListener("click", resetGrid)

window.onload = () => {
	setupGrid();
}