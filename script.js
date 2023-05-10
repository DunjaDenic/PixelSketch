function initialize(){
    //width and height of the canvas in actual pixels
    const canvasSizePixels=400;
    //width and height of the canvas in pixel elements
    var canvasSizePseudoPixels=16;
    //width and height of pixel elements in actual pixels
    var pixelSize=canvasSizePixels/canvasSizePseudoPixels;
    var penColor="blue";
    
    const canvas = document.querySelector("#canvas");
    createCanvas(canvas, canvasSizePseudoPixels, pixelSize);
    preparePixels(penColor);
    generateColors();
    
    const btnClear=document.querySelector("#clear-button");
    btnClear.addEventListener("click", clearCanvas);
    
    const sizeButtons=document.querySelectorAll(".size");
    sizeButtons.forEach((button)=>{button.addEventListener("click", (e) => {
        canvasSizePseudoPixels=button.value;
        pixelSize=canvasSizePixels/canvasSizePseudoPixels;
        createCanvas(canvas, canvasSizePseudoPixels, pixelSize);
        preparePixels(penColor);})})
    
    const customSize=document.querySelector("#numbox");
    customSize.addEventListener("change", () =>{
        if (customSize.value>=5 && customSize.value<=100){
            canvasSizePseudoPixels=customSize.value;
            pixelSize=canvasSizePixels/canvasSizePseudoPixels;
            createCanvas(canvas, canvasSizePseudoPixels, pixelSize);
            preparePixels(penColor);}
        else{
            const warningDiv=document.querySelector("#warning");
            warningDiv.textContent="Enter a size between 5 and 100!";}})
    
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
    colorDivs.forEach((div)=>{div.style.backgroundColor=div.id})}

function preparePixels(penColor){
    const pixels=document.querySelectorAll(".pixel");
    pixels.forEach((pixel)=>{pixel.addEventListener("mouseover", (e) => {
                                                    color(e.target, penColor);});})}

//ADD PREVENT RELOAD LATER
//ADD TOGGLE GRID BUTTON