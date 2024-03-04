const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

let mouseDown = 0;

let tile_array = [];
const map_size = 200;

const tile_size = canvas.width/map_size;

const density = 0.5;
/*
function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { x: x, y: y };
}

function getRelativeNums(x, y) {
    if (Math.round(x/tile_size) !== undefined) {
        return { x: Math.round(x/tile_size), y: Math.round(y/tile_size) };
    } else {
        return undefined;
    }
}

function checkClickedItem(event) {
    if (mouseDown) {
        const cursorPos = getCursorPosition(event);
        const cursorHoveredNums = getRelativeNums(cursorPos.x, cursorPos.y);
        if (cursorHoveredNums !== undefined) {
            tile_array[cursorHoveredNums.x][cursorHoveredNums.y] = 1;
        }
    }
}

canvas.addEventListener('mousemove', checkClickedItem); //allows dragging
canvas.addEventListener('mousedown', () => mouseDown = 1);
canvas.addEventListener('mouseup', () => mouseDown = 0);
*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); //makes a promise with a timeout (pauses the code for some time)
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
            if (tile_array[x] && tile_array[x][y]) {
                drawLiveTile(x * tile_size, y * tile_size);
            }
        }
    }
}

function testNeighbors(new_tile_array, x, y) {
    let neighbor_count = 0
    if (tile_array[x + 1] && tile_array[x + 1][y]) {
        neighbor_count ++;
    }
    if (tile_array[x + 1] && tile_array[x + 1][y + 1]) {
        neighbor_count ++;
    }
    if (tile_array[x + 1] && tile_array[x + 1][y - 1]) {
        neighbor_count ++;
    }
    if (tile_array[x] && tile_array[x][y + 1]) {
        neighbor_count ++;
    }
    if (tile_array[x] && tile_array[x][y - 1]) {
        neighbor_count ++;
    }
    if (tile_array[x - 1] && tile_array[x - 1][y]) {
        neighbor_count ++;
    }
    if (tile_array[x - 1] && tile_array[x - 1][y + 1]) {
        neighbor_count ++;
    }
    if (tile_array[x - 1] && tile_array[x - 1][y - 1]) {
        neighbor_count ++;
    }
    if (tile_array[x][y]) {
        if (neighbor_count < 2) {
            new_tile_array[x][y] = 0;
        }
        if (neighbor_count > 3) {
            new_tile_array[x][y] = 0;
        }
    } else {
        if (neighbor_count === 3) {
            new_tile_array[x][y] = 1;
        }
    }
}

function generateBlankArray(size) {
    for (let r = 0; r < size; r ++) {
        let blank = [];
        for (let r = 0; r < size; r ++) {
            blank.push(Math.random() * density); //generates a random array
        }
        tile_array.push(blank.slice(0).map((e) => Math.round(e + Math.random() * density))); //generates a random array
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
        let new_tile_array = tile_array.slice(0).map((e) => e.slice(0)); //duplicates the array
        for (let x = 0; x < map_size; x ++) {
            for (let y = 0; y < map_size; y ++) {
                testNeighbors(new_tile_array, x, y);
            }
        }
        tile_array = new_tile_array;
        await sleep(100); //defines the framerate
    }
}

main();
