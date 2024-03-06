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

function generateBlankArray(size, x, y) {
    tile_array = [];
    for (let r = 0; r < size; r ++) {
        let blank = [];
        for (let c = 0; c < size; c ++) {
            blank.push(Math.random() * density); //generates a random array
        }
        tile_array.push(blank.slice(0).map((e) => Math.round(e + Math.random() * density))); //generates a random array
    }
    chunk_array.push( { tiles: copy(tile_array), x: x, y: y } );
    return copy(tile_array);
}

function getChunk(x, y) {
    for (let i; i < chunk_array.length; i ++) {
        if (chunk_array[i].x == x && chunk_array[i].y == y) {
            return chunk_array[i];
        }
    }
    return generateBlankArray(x, y, map_size);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); //makes a promise with a timeout (pauses the code for some time)
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
    if (array[x + 1] && array[x + 1][y]) {
        neighbor_count ++;
    }
    if (array[x + 1] && array[x + 1][y + 1]) {
        neighbor_count ++;
    }
    if (array[x + 1] && array[x + 1][y - 1]) {
        neighbor_count ++;
    }
    if (array[x] && array[x][y + 1]) {
        neighbor_count ++;
    }
    if (array[x] && array[x][y - 1]) {
        neighbor_count ++;
    }
    if (array[x - 1] && array[x - 1][y]) {
        neighbor_count ++;
    }
    if (array[x - 1] && array[x - 1][y + 1]) {
        neighbor_count ++;
    }
    if (array[x - 1] && array[x - 1][y - 1]) {
        neighbor_count ++;
    }
    if (array[x][y]) {
        if (neighbor_count < 2) {
            new_array[x][y] = 0;
        }
        if (neighbor_count > 3) {
            new_array[x][y] = 0;
        }
    } else {
        if (neighbor_count === 3) {
            new_array[x][y] = 1;
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
    tile_array = generateBlankArray(map_size, 0, 0);
    while (true) {
        clearCanvas();
        drawTiles(tile_array);
        let new_tile_array = copy(tile_array);
        for (let x = 0; x < map_size; x ++) {
            for (let y = 0; y < map_size; y ++) {
                testNeighbors(tile_array, new_tile_array, x, y);
            }
        }
        tile_array = new_tile_array;
        await sleep(100); //defines the framerate
    }
}

main();
