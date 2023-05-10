function initialize(){
    //width and height of the canvas in actual pixels
    const canvasSizePixels=400;
    //width and height of the canvas in pixel elements
    var canvasSizePseudoPixels=16;
    //width and height of pixel elements in actual pixels
    var pixelSize=canvasSizePixels/canvasSizePseudoPixels;
    generateColors();
    
    const canvas = document.querySelector("#canvas");
    createCanvas(canvas, canvasSizePseudoPixels, pixelSize);
    
    const btnClear=document.querySelector("#clear-button");
    btnClear.addEventListener("click", clearCanvas);
    
    const numBox=document.querySelector("#numbox");
    numBox.addEventListener("change", () =>{
        canvasSizePseudoPixels=numBox.value;
        pixelSize=canvasSizePixels/canvasSizePseudoPixels;
        createCanvas(canvas, canvasSizePseudoPixels, pixelSize);})
    
    const pixels=document.querySelectorAll(".pixel");
    pixels.forEach((pixel)=>{pixel.addEventListener("mouseover", function (e) {
                                                    color(e.target, penColor);});})
}

function createCanvas(canvas, canvasSizePseudoPixels, pixelSize){
    //clear existing pixels
    while (canvas.firstChild) {canvas.removeChild(canvas.lastChild);}
    //create new pixels
    for (var i=0; i<(canvasSizePseudoPixels*canvasSizePseudoPixels); i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        canvas.appendChild(pixel);
        pixel.style.height=`${pixelSize}px`; 
        pixel.style.width=`${pixelSize}px`;}}

function color(thisPixel, penColor){
    thisPixel.style.backgroundColor=penColor}

function clearCanvas() {
    const pixels=document.querySelectorAll(".pixel");
    pixels.forEach(pixel=>{pixel.style.backgroundColor="white";})}

function generateColors(){
    const colorDivs=document.querySelectorAll(".color");
    colorDivs.forEach((div)=>{div.style.backgroundColor=div.id})
}


//ADD PREVENT RELOAD LATER
//ADD TOGGLE GRID BUTTON