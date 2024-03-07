const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

let mouseDown = 0;

let chunk_array = [];
let tile_array = [];

const map_size = 200;

const tile_size = canvas.width/map_size;

const density = 0.5;

function copy(array) {
    return array.map((e) => e.slice(0));
}

function generateBlankArray(x, y) {
    let tile_array = [];
    for (let r = 0; r < map_size; r ++) {
        let blank = [];
        for (let c = 0; c < map_size; c ++) {
            blank.push(Math.random() * density);
        }
        tile_array.push(blank.slice(0).map((e) => Math.round(e + Math.random() * density)));
    }
    chunk_array.push( { tiles: tile_array, x: x, y: y } );
    return tile_array;
}

function getChunk(x, y) {
    for (let i = 0; i < chunk_array.length; i ++) {
        if (chunk_array[i].x == x && chunk_array[i].y == y) {
            return chunk_array[i].tiles;
        }
    }
    return generateBlankArray(x, y);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawLiveTile(x, y) {
    if (context.fillStyle != 'white') {
        changeColor('white');
    }
    context.fillRect(x, y, tile_size, tile_size);
}

function drawTiles(array) {
    for (let x = 0; x < map_size; x ++) {
        for (let y = 0; y < map_size; y ++) {
            if (array[x] && array[x][y]) {
                drawLiveTile(x * tile_size, y * tile_size);
            }
        }
    }
}

function testNeighbors(array, new_array, x, y) {
    let neighbor_count = 0;
    if (new_array[x + 1] && new_array[x + 1][y]) {
        neighbor_count ++;
    }
    if (new_array[x + 1] && new_array[x + 1][y + 1]) {
        neighbor_count ++;
    }
    if (new_array[x + 1] && new_array[x + 1][y - 1]) {
        neighbor_count ++;
    }
    if (new_array[x] && new_array[x][y + 1]) {
        neighbor_count ++;
    }
    if (new_array[x] && new_array[x][y - 1]) {
        neighbor_count ++;
    }
    if (new_array[x - 1] && new_array[x - 1][y]) {
        neighbor_count ++;
    }
    if (new_array[x - 1] && new_array[x - 1][y + 1]) {
        neighbor_count ++;
    }
    if (new_array[x - 1] && new_array[x - 1][y - 1]) {
        neighbor_count ++;
    }
    if (new_array[x][y]) {
        if (neighbor_count < 2) {
            array[x][y] = 0;
        }
        if (neighbor_count > 3) {
            array[x][y] = 0;
        }
    } else {
        if (neighbor_count === 3) {
            array[x][y] = 1;
        }
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
    while (true) {
        tile_array = getChunk(0, 0);
        clearCanvas();
        drawTiles(tile_array);
        let new_tile_array = copy(tile_array);
        for (let x = 0; x < map_size; x ++) {
            for (let y = 0; y < map_size; y ++) {
                testNeighbors(tile_array, new_tile_array, x, y);
            }
        }
        await sleep(100); //defines the framerate
    }
}

main();
