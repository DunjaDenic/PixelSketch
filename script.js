var mouseDown = false;
var canvasColor = "white";
var gridOn = true;


function main() {
	//width and height of the canvas in actual pixels
	const canvasSizePixels = 430;
	//width and height of the canvas in pixel elements
	var canvasSizePseudoPixels = 24;
    var lastCanvasSize = canvasSizePseudoPixels;
	//width and height of pixel elements in actual pixels
	var pixelSize = canvasSizePixels / canvasSizePseudoPixels;
	var penColor = "#ff595e";
    
	const canvas = document.querySelector("#canvas");
	createCanvas(canvas, canvasSizePseudoPixels, pixelSize);
	preparePixels(penColor, mouseDown);
	generateColors();

	document.addEventListener("mousedown", (e) => {
		if (e.buttons == 1) {
			mouseDown = true; } })

	document.addEventListener("mouseup", (e) => {
        mouseDown = false; })
    
    var previous=document.querySelector("#s");
	const sizePresetBtns = document.querySelectorAll(".size-preset");
	sizePresetBtns.forEach(button => {
		button.addEventListener("click", () => {
            previous.classList.remove("current-preset");
            previous=button;
            button.classList.add("current-preset");
            
			canvasSizePseudoPixels = button.value;
            pixelSize = canvasSizePixels / canvasSizePseudoPixels;
			lastCanvasSize = 
                resizeCanvas(canvas, canvasSizePseudoPixels, lastCanvasSize, pixelSize);
			preparePixels(penColor); }) })
    
    const customSize = document.querySelector("#custom-size");
	customSize.addEventListener("change", () => {
		if (customSize.value >= 5 && customSize.value <= 100) {
			canvasSizePseudoPixels = customSize.value;
            pixelSize = canvasSizePixels / canvasSizePseudoPixels;
			lastCanvasSize = 
                resizeCanvas(canvas, canvasSizePseudoPixels, lastCanvasSize, pixelSize);
			preparePixels(penColor); }
		else { //needs work
			const warningDiv = document.querySelector("#warning");
			warningDiv.textContent = "Enter a size between 5 and 100!"; } })

	const colorDivs = document.querySelectorAll(".color");
	colorDivs.forEach(color => {
		color.addEventListener("click", () => {
			if (color.id == "eraser") {
				penColor = canvasColor; }
			else {
				penColor = color.id; }
			preparePixels(penColor); }) });

	const colorPicker = document.querySelector(".color-picker");
	colorPicker.addEventListener("close", () => {
		penColor = colorPicker.value;
		preparePixels(penColor); });
	Coloris({themeMode: 'dark', alpha: false })

    const gridOnBtn = document.querySelector("#grid-on");
    const gridOffBtn = document.querySelector("#grid-off");
	gridOnBtn.addEventListener("click", () => {toggleGrid(gridOnBtn, gridOffBtn)});
    gridOffBtn.addEventListener("click", () => {toggleGrid(gridOnBtn, gridOffBtn)});
    
    const clearBtn = document.querySelector("#clear-button");
	clearBtn.addEventListener("click", clearCanvas);

	//prevent immediate reload
	window.addEventListener('beforeunload', (e) => {
		e.preventDefault();
		e.returnValue = ''; }); 
}

function createCanvas(canvas, canvasSizePseudoPixels, pixelSize) {
	for (var i = 0; i < canvasSizePseudoPixels * canvasSizePseudoPixels; i++) {
		const pixel = document.createElement("div");
		pixel.classList.add("pixel");
		pixel.style.height = pixel.style.width = `${pixelSize}px`;
        pixel.style.backgroundColor=canvasColor;
        if(gridOn==true) {
            pixel.classList.add("grid");}
		canvas.appendChild(pixel); } }

function resizeCanvas(canvas, newSize, oldSize, pixelSize) {
    if (oldSize < newSize) {
        var pixelsToAdd = (newSize * newSize) - (oldSize*oldSize);
        for (var i = 0; i < pixelsToAdd; i++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.backgroundColor=canvasColor;
            canvas.appendChild(pixel); 
            if(gridOn==true) {
                pixel.classList.add("grid");} } }
    else if (oldSize > newSize) {
        var pixelsToRemove = (oldSize*oldSize)-(newSize * newSize);
        for (var i = 0; i < pixelsToRemove; i++) {
            canvas.removeChild(canvas.lastChild); } }  
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel =>{
        pixel.style.height = pixel.style.width = `${pixelSize}px`; 
        pixel.style.backgroundColor = canvasColor});
    return newSize;}

function generateColors() {
	const colorDivs = document.querySelectorAll(".color");
	colorDivs.forEach((div) => {
		div.style.backgroundColor = div.id }) }

function preparePixels(penColor) {
	const canvas = document.querySelector("#canvas");
	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach(pixel => {pixel.addEventListener("mouseover", (e) => {
		if(mouseDown == true) {
			color(e.target, penColor); } }); }); }

function color(thisPixel, penColor) {
	if (penColor != "rainbow") {
		thisPixel.style.backgroundColor = penColor }
	else {
		thisPixel.style.backgroundColor = `hsl(${getRandomHue()}, 85%, 65% )`; } }

function getRandomHue() {
	return (Math.floor(Math.random() * 357)); }

function clearCanvas() {
	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach(pixel => {
		pixel.style.backgroundColor = canvasColor; }) }

function toggleGrid(gridOnBtn, gridOffBtn) {
	const pixels = document.querySelectorAll(".pixel");
	if (gridOn == false) {
		pixels.forEach(pixel => {
			pixel.classList.add("grid") });
		gridOn = true;
        gridOffBtn.classList.remove("display-none");
        gridOnBtn.classList.add("display-none"); }
	else {
		pixels.forEach(pixel => {
			pixel.classList.remove("grid") });
		gridOn = false; 
        gridOnBtn.classList.remove("display-none");
        gridOffBtn.classList.add("display-none"); } }