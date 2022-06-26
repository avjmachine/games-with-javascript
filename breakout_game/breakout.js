var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let ballRadius = 15;
let x = canvas.width / 2;
let y = canvas.height - 25;

let dx = 2;
let dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
    }

    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);

