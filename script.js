function initialize(){
    const canvasSize=16;
    const canvas = document.querySelector("#canvas");
    
    
    for (var i=0; i<(canvasSize*canvasSize); i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        canvas.appendChild(pixel);}    
}