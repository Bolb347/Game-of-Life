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

function testNeighbors(x, y) {
    let neighbor_count = 0
    if (tile_array[x + 1][y]) {
        neighbor_count ++;
    }
    if (tile_array[x + 1][y + 1]) {
        neighbor_count ++;
    }
    if (tile_array[x + 1][y - 1]) {
        neighbor_count ++;
    }
    if (tile_array[x][y + 1]) {
        neighbor_count ++;
    }
    if (tile_array[x][y - 1]) {
        neighbor_count ++;
    }
    if (tile_array[x - 1][y]) {
        neighbor_count ++;
    }
    if (tile_array[x - 1][y + 1]) {
        neighbor_count ++;
    }
    if (tile_array[x - 1][y - 1]) {
        neighbor_count ++;
    }
    if (tile_array[x][y]) {
        if (neighbor_count < 2) {
            tile_array[x][y] = 0;
        }
        if (neighbor_count === 2 || neighbor_count === 3) {
            tile_array[x][y] = 1;
        }
        if (neighbor_count < 3) {
            tile_array[x][y] = 0;
        }
    } else if (tile_array[x][y] === 0) {
        if (neighbor_count === 3) {
            tile_array[x][y] = 1;
        }
    }
}

function generateBlankArray(size) {
    blank = []
    for (let r = 0; r < size; r ++) {
        blank.push(r % 2);
    }
    for (let r = 0; r < size; r ++) {
        tile_array.push(blank.slice(0));
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
