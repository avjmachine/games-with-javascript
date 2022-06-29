var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ball variables
let ballRadius = 12;
let x = canvas.width / 2;
let y = canvas.height - 25;

let dx = 2;
let dy = -2;

// paddle variables
var paddleHeight = 15;
var paddleWidth = 80;
var paddleX = (canvas.width - paddleWidth) / 2;

// brick variables
var brickNRows = 4;
var brickNColumns = 7;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 10;
var brickTopOffset = 25;
var brickLeftOffset = 35;

var bricks = [];
for (var i=0; i<brickNColumns; i++) {
    bricks[i] = [];
    for (var j=0; j<brickNRows; j++) {
        bricks[i][j] = {x: 0, y: 0};
    }
}


var rightPressed = false;
var leftPressed = false;


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var i=0; i<brickNColumns; i++){
        for (var j=0; j<brickNRows; j++){
            bricks[i][j].x = i*(brickWidth + brickPadding) + brickLeftOffset;
            bricks[i][j].y = j*(brickHeight + brickPadding) + brickTopOffset;
            ctx.beginPath();
            ctx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
            ctx.fillStyle = "green";
            ctx.fill();
            ctx.closePath();
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawBall();
    drawPaddle();

    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius){
        if((x + dx > paddleX) && (x + dx < paddleX + paddleWidth)){
            dy = -dy;
        }
        else{
        alert("Game Over!");
        document.location.reload();
        clearInterval(interval);
        }
    }

    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }

    x += dx;
    y += dy;

    if (rightPressed) {
        paddleX += 5;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 5;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

var interval = setInterval(draw, 10);


