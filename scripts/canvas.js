const bottomToolbar = document.getElementById('bottomToolbar');
const saveButton = document.getElementById('saveButton')
var points = [];
var mouseDown = false;
var prevMouseX;
var prevMouseY;
init();

async function init() {
    await fetch("./config.json")
    .then(response => response.json())
    .then(data => {
        main(data);
    });
}

function main(config) {
    setup();
    saveButton.onclick = function(){saveCanvas()};
};

function setup() {
    var canvas = createCanvas(100, 100);
    frameRate(1000);
    canvas.parent('canvas');
    windowResized();
    canvas.mousePressed(function() {
        mouseDown = true;
    });
    canvas.mouseReleased(function() {
        mouseDown = false;
    });
    prevMouseX = mouseX;
    prevMouseY = mouseY;
};

function draw() {
    if (mouseDown && mouseIsPressed) {
        if (prevMouseX) {
            line(prevMouseX, prevMouseY, mouseX, mouseY);
        } else {
            line(mouseX, mouseY, mouseX, mouseY);
        }
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    } else {
        prevMouseX = null;
    } 
};

function heightCalc() {
    return window.innerHeight - parseInt(window.getComputedStyle(bottomToolbar).getPropertyValue('height')) - parseInt(window.getComputedStyle(bottomToolbar).getPropertyValue('--bottom-inset'));
}

function windowResized() {
    resizeCanvas(windowWidth, heightCalc());
};

function resizeCanvasToPage() {
    canvasElement.width = window.innerWidth;
    canvasElement.height = heightCalc;
};