let canvas = document.getElementById("canvas");
let context = canvas.getContext();

let tile_size = 16;

function changeColor(color) {
    context.fillStyle = color;
}

function drawTile(x, y) {
    context.fillRect(x, y, tile_size, tile_size);
}

function main() {
}
