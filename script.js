function initialize(){
    //width and height of the canvas in actual pixels
    const canvasSizePixels=400;
    //width and height of the canvas in pixel elements
    var canvasSizePseudoPixels=16;
    //width and height of pixel elements in actual pixels
    var pixelSize=canvasSizePixels/canvasSizePseudoPixels;
    
    
    const canvas = document.querySelector("#canvas");
    createCanvas(canvas, canvasSizePseudoPixels, pixelSize);
    
    const btnClear=document.querySelector("#clear-button");
    btnClear.addEventListener("click", clearCanvas);
    
    const numBox=document.querySelector("#numbox");
    numBox.addEventListener("change", () =>{
        canvasSizePseudoPixels=numBox.value;
        pixelSize=canvasSizePixels/canvasSizePseudoPixels;
        createCanvas(canvas, canvasSizePseudoPixels, pixelSize);})   
}

function createCanvas(canvas, canvasSizePseudoPixels, pixelSize){
    //clear existing pixels
    while (canvas.firstChild) {canvas.removeChild(canvas.lastChild);}
    //create new pixels
    for (var i=0; i<(canvasSizePseudoPixels*canvasSizePseudoPixels); i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        canvas.appendChild(pixel);
        pixel.addEventListener("mouseover", function (e) {color(e.target);});
        pixel.style.height=`${pixelSize}px`; 
        pixel.style.width=`${pixelSize}px`;}}

function color(thisPixel){
    thisPixel.style.backgroundColor="blue";}

function clearCanvas() {
    const pixels=document.querySelectorAll(".pixel");
    pixels.forEach(pixel=>{pixel.style.backgroundColor="white";})}

//ADD PREVENT RELOAD LATER