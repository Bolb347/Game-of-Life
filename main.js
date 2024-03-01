const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

const tile_size = 16;

let tile_array = [];
const map_size = 50;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawLiveTile(x, y) {
    if (context.fillStyle != 'white') {
        changeColor('white');
    }
    context.fillRect(x, y, tile_size, tile_size);
}

function drawTiles() {
    for (let x = 0; x < map_size; x ++) {
        for (let y = 0; y < map_size; y ++) {
            if (tile_array[x][y]) {
                drawLiveTile(x * tile_size, y * tile_size);
            }
        }
    }
}

function generateBlankArray(size) {
    blank = []
    for (let r = 0; r < size; r ++) {
        blank.push(r % 2);
    }
    for (let r = 0; r < size; r ++) {
        tile_array.push(blank);
    }
}

function changeColor(color) {
    context.fillStyle = color;
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
        drawTiles();
        await sleep(100);
    }
}

main();
