var mouseDown=false;
function main(){   
    //width and height of the canvas in actual pixels
    const canvasSizePixels=430;
    //width and height of the canvas in pixel elements
    var canvasSizePseudoPixels=18;
    //width and height of pixel elements in actual pixels
    var pixelSize=canvasSizePixels/canvasSizePseudoPixels;
    var canvasColor="white";
    var penColor="#ff595e";
    var gridOn=false;

    const canvas = document.querySelector("#canvas");
    createCanvas(canvas, canvasSizePseudoPixels, pixelSize);
    preparePixels(penColor, mouseDown);
    generateColors();
    
    canvas.addEventListener("mousedown", (e)=>{
        if (e.buttons==1){mouseDown=true;
                        console.log("md true");}})
        
    canvas.addEventListener("mouseup", (e)=>{mouseDown=false;
                                                    console.log("md false");})
        
    
    const sizePresetBtns=document.querySelectorAll(".size-preset");
    sizePresetBtns.forEach(button=>{button.addEventListener("click", () => {
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
    
    const colorDivs=document.querySelectorAll(".color");
    colorDivs.forEach(color=>{color.addEventListener("click", ()=>{
        if (color.id=="eraser"){
            penColor=canvasColor;}
        else{
            penColor=color.id;}
        preparePixels(penColor);})});
    
    const colorPicker=document.querySelector(".color-picker");
    colorPicker.addEventListener("close", () =>{
        penColor=colorPicker.value;
        preparePixels(penColor);});
    Coloris({themeMode:'dark', alpha:false})
    
    const toggleGridBtn=document.querySelector("#toggle-grid");
    toggleGridBtn.addEventListener("click", () => {gridOn=toggleGrid(gridOn)})
    
    const clearBtn=document.querySelector("#clear-button");
    clearBtn.addEventListener("click", clearCanvas);
    
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
        pixel.style.width=`${pixelSize}px`;
        pixel.setAttribute("draggable", false);}}

function color(thisPixel, penColor){
    if (penColor!="rainbow"){
        thisPixel.style.backgroundColor=penColor}
    else{
        thisPixel.style.backgroundColor=`hsl(${getRandomHue()}, 100%, 67%)`;}}

function clearCanvas() {
    const pixels=document.querySelectorAll(".pixel");
    pixels.forEach(pixel=>{pixel.style.backgroundColor="white";})}

function generateColors(){
    const colorDivs=document.querySelectorAll(".color");
    colorDivs.forEach((div)=>{div.style.backgroundColor=div.id})}

function preparePixels(penColor){
    const canvas = document.querySelector("#canvas");
    const pixels=document.querySelectorAll(".pixel");
    canvas.addEventListener("mouseover", (e) => {
        if(mouseDown==true){
        color(e.target, penColor)}});}

function getRandomHue(){
    return (Math.floor(Math.random() * 357));}

function toggleGrid(gridOn){
    const pixels=document.querySelectorAll(".pixel");
    if (gridOn==false){
        pixels.forEach(pixel=>{pixel.classList.add("grid")});
        gridOn=true;}
    else{
        pixels.forEach(pixel=>{pixel.classList.remove("grid")});
        gridOn=false;}
    
    return gridOn;}

//ADD PREVENT RELOAD LATER