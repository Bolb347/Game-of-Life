let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let tile_size = 16;

let tile_array = [];
let map_size = 50;

function generateBlankArray(size) {
    blank = []
    for (let r = 0; r < size; r ++) {
        blank.push(0);
    }
    for (let r = 0; r < size; r ++) {
        tile_array.push(blank);
    }
}

function changeColor(color) {
    context.fillStyle = color;
}

function drawLiveTile(x, y) {
    if (context.fillStyle != 'white') {
        changeColor('white');
    }
    context.fillRect(x, y, tile_size, tile_size);
}

function clearCanvas() {
    if (context.fillStyle != 'black') {
        changeColor('black');
    }
    context.fillRect(0, 0, 800, 800);
}

function main() {
    generateBlankArray(map_size);
    //while (true) {
        clearCanvas();
    //}
}

main();
