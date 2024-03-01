const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const tile_size = 16;

let tile_array = [];
const map_size = 50;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function main() {
    generateBlankArray(map_size);
    while (true) {
        clearCanvas();
        await sleep(100);
    }
}

main();
