var BLOCK_SIZE = 20;
var COLS = 40;
var ROWS = 30;
var snakes = [];
var c = null;
var toGo = 3;
var snakecount = 7;
var interval = null;
var foodX = 0;
var foodY = 0;
var oMark = null;
var isPause = false;

function init() {

}

function draw() {
    c.clearRect(0, 0, BLOCK_SIZE * COLS, BLOCK_SIZE * ROWS);
    for (var i = 1; i <= ROWS; i++) {
        c.beginPath();
        c.moveTo(0, i * BLOCK_SIZE);
        c.lineTo(BLOCK_SIZE * COLS, i * BLOCK_SIZE);
        c.strokeStyle = "gray";
        c.stroke();
    }
    for (var i = 1; i <= COLS; i++) {
        c.beginPath();
        c.moveTo(i * BLOCK_SIZE, 0);
        c.lineTo(i * BLOCK_SIZE, BLOCK_SIZE * ROWS);
        c.stroke();
    }
    for (var i = 0; i < snakes.length; i++) {
        c.beginPath();
        c.fillStyle = "blue";
        c.fillRect(snakes[i].x, snakes[i].y, BLOCK_SIZE, BLOCK_SIZE);
        c.moveTo(snakes[i].x, snakes[i].y);
        c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y);
        c.lineTo(snakes[i].x + BLOCK_SIZE, snakes[i].y + BLOCK_SIZE);
        c.lineTo(snakes[i].x, snakes[i].y + BLOCK_SIZE);
        c.closePath();
        c.strokeStyle = 'white';
        c.stroke();
    }
    c.beginPath();
    c.fillStyle = 'red';
    c.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE);
    c.moveTo(foodX, foodY);
    c.lineTo(foodX + BLOCK_SIZE, foodY);
    c.lineTo(foodX + BLOCK_SIZE, foodY + BLOCK_SIZE);
    c.lineTo(foodX, foodY + BLOCK_SIZE);
    c.closePath();
    c.stroke();
}

function addSnake() {
    snakecount++;
    snakes.unshift({ x: BLOCK_SIZE * COLS, y: BLOCK_SIZE * ROWS });
}

function keydown(keyCode) {
    switch (keyCode) {
        case 37:
            if (toGo != 1 && toGo != 3)
                toGo = 1;
            break;
        case 38:
            if (toGo != 2 && toGo != 4)
                toGo = 2;
            break;
        case 39:
            if (toGo != 3 && toGo != 1)
                toGo = 3;
            break;
        case 40:
            if (toGo != 4 && toGo != 2)
                toGo = 4;
            break;
        case 80:
            if (isPause) {
                interval = setInterval(move, 100);
                isPause = false;
                document.getElementById('pause').innerHTML = "Pause";
            } else {
                clearInterval(interval);
                isPause = true;
                document.getElementById('pause').innerHTML = "Start";
            }
            break;
    }
}

function addFood() {
    foodX = Math.floor(Math.random() * (COLS - 1)) * BLOCK_SIZE;
    foodY = Math.floor(Math.random() * (ROWS - 1)) * BLOCK_SIZE;
}

function isDie() {
    if (snakes[snakecount - 1].x == -20 || snakes[snakecount - 1].x == BLOCK_SIZE * COLS
        || snakes[snakecount - 1].y == -20 || snakes[snakecount - 1].y == BLOCK_SIZE * ROWS) {
        alert('Game Over!');
        clearInterval(interval);
    }
    for (var i = 0; i < snakecount - 1; i++) {
        if (snakes[snakecount - 1].x == snakes[i].x && snakes[snakecount - 1].y == snakes[i].y) {
            clearInterval(interval);
            alert("Game Over!");
        }
    }
}

function isEat() {
    if (snakes[snakecount - 1].x == foodX && snakes[snakecount - 1].y == foodY) {
        oMark.innerHTML = (parseInt(oMark.innerHTML) + 1).toString();
        addFood();
        addSnake();
    }
}

function start() {
    for (var i = 0; i < snakecount; i++) {
        snakes[i] = { x: i * BLOCK_SIZE, y: 0 };
    }
    addFood();
    draw();
    oMark.innerHTML = 0;
}
function move() {
    switch (toGo) {
        case 1:
            snakes.push({ x: snakes[snakecount - 1].x - BLOCK_SIZE, y: snakes[snakecount - 1].y });
            break;
        case 2:
            snakes.push({ x: snakes[snakecount - 1].x, y: snakes[snakecount - 1].y - BLOCK_SIZE });
            break;
        case 3:
            snakes.push({ x: snakes[snakecount - 1].x + BLOCK_SIZE, y: snakes[snakecount - 1].y });
            break;
        case 4:
            snakes.push({ x: snakes[snakecount - 1].x, y: snakes[snakecount - 1].y + BLOCK_SIZE });
            break;
        default: ;
    }
    snakes.shift();
    isEat();
    isDie();
    draw();
}

window.onload = function () {
    c = document.getElementById('canvas').getContext('2d');
    oMark = document.getElementById('mark_con');
    start();
    interval = setInterval(move, 120);//速度调节，数字越小，速度越快
    document.onkeydown = function (event) {
        var event = event || window.event;
        keydown(event.keyCode);
    }
}