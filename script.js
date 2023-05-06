function initialize(){
    const canvasSize=16;//width and height in pixel elements
    const pixelSize=25; //width and height in actual pixels
    
    const canvas = document.querySelector("#canvas");
    for (var i=0; i<(canvasSize*canvasSize); i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        canvas.appendChild(pixel);
        pixel.addEventListener("mouseover", function (e) {color(e.target);});}
    
}
function color(thisDiv){
    thisDiv.style.backgroundColor="blue";
}