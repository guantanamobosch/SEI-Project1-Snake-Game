// ***Variables***

// let's store the squares in some variables
const squares = document.querySelectorAll('.square');
// console.log(squares[0].innerHTML);

let snake = 205;
let tail = [204, 203];
let apple = 214;
let score = 0;
let highScore = 0;

// console.log(squares[apple].id);
// console.log(squares[apple].classList.value);

let failureNumber = 0;
let moveInterval;

let appleAbove = false;
let appleToTheRight = false;
let appleBelow = false;
let appleToTheLeft = false;

let tailAbove = false;
let tailRight = false;
let tailBelow = false;
let tailLeft = false;

// fail condition arrays
const topBoundaryFailConditions = [];
const rightBoundaryFailConditions = [];
const bottomBoundaryFailConditions = [];
const leftBoundaryFailConditions = [];

// for loops to populate fail condition arrays
for (let i = 0; i < 20; i++) {
    topBoundaryFailConditions.push(i);
}
for (let i = 19; i < 400; i += 20) {
    rightBoundaryFailConditions.push(i);
}
for (let i = 380; i < 400; i++) {
    bottomBoundaryFailConditions.push(i);
}
for (let i = 0; i < 381; i += 20) {
    leftBoundaryFailConditions.push(i);
}
// console.log(topBoundaryFailConditions);
// console.log(rightBoundaryFailConditions);
// console.log(bottomBoundaryFailConditions);
// console.log(leftBoundaryFailConditions);

// ***Functions***
// function myFunction(event) {
//     let key = event.key;
//     console.log(key);
// }
// This one also didn't work for logging key presses

function appleStartingPoint(apple) {
    squares[apple].classList.add('red');
}
appleStartingPoint(apple);
// console.log(squares[apple].classList[1]);

function snakeStartingPoint(snake) {
    squares[snake].classList.add('green');
    for (let i = 0; i < tail.length; i++) {
        squares[tail[i]].classList.add('green');
    }
    failureNumber = 0;
}
snakeStartingPoint(snake);

function resetSnake() {
    console.log("You Lose");
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.remove('green')
        squares[i].classList.remove('red')
    }
    for (let i = tail.length; i > 2; i--) {
        tail.pop();
    }
    // console.log(tail);
    snake = 205;
    tail[0] = 204;
    tail[1] = 203;
    apple = 214;
    snakeStartingPoint(snake);
    appleStartingPoint(apple);
}

function resetApple() {
    console.log("Yum yum!");
    let apple = Math.floor(Math.random() * 400);
    squares[apple].classList.add('red');
}

function checkBoundary() {
    for (let i = 0; i < rightBoundaryFailConditions.length; i++) {
        if (snake === topBoundaryFailConditions[0]) {
            failureNumber = 5;
        } else if (snake === topBoundaryFailConditions[19]) {
            failureNumber = 6;
        } else if (snake === bottomBoundaryFailConditions[19]) {
            failureNumber = 7;
        } else if (snake === bottomBoundaryFailConditions[0]) {
            failureNumber = 8;
        } else if (snake === topBoundaryFailConditions[i]) {
            failureNumber = 1;
        } else if (snake === rightBoundaryFailConditions[i]) {
            failureNumber = 2;
        } else if (snake === bottomBoundaryFailConditions[i]) {
            failureNumber = 3;
        } else if (snake === leftBoundaryFailConditions[i]) {
            failureNumber = 4;
        }
    }
}

// console.log(squares[snake - 20]);
function checkForApple() {
    if (snake > 19 && squares[snake - 20].classList[1] === "red") {
        appleAbove = true;
        // console.log("There's an apple above my head!")
        return;
    } else if (snake < 399 && squares[snake + 1].classList[1] === "red") {
        appleToTheRight = true;
        // console.log("There's an apple to the right!")
        return;
    } else if (snake < 380 && squares[snake + 20].classList[1] === "red") {
        appleBelow = true;
        // console.log("There's an apple below me!")
        return;
    } else if (snake > 0 && squares[snake - 1].classList[1] === "red") {
        appleToTheLeft = true;
        // console.log("There's an apple to the left!")
        return;
    } else {
        // console.log("There's nothing there")
        appleAbove = false;
        appleToTheRight = false;
        appleBelow = false;
        appleToTheLeft = false;
    }
}

// function checkForTail() {
//     if (snake > 19 && squares[snake - 20].classList[1] === "green") {
//         tailAbove = true;
//         console.log("My tail is above my head!")
//         tailRight = false;
//         tailBelow = false;
//         tailLeft = false;
//         return;
//     } else if (snake < 399 && squares[snake + 1].classList[1] === "green") {
//         tailRight = true;
//         console.log("My tail is to the right!")
//         tailAbove = false;
//         tailBelow = false;
//         tailLeft = false;
//         return;
//     } else if (snake < 380 && squares[snake + 20].classList[1] === "green") {
//         tailBelow = true;
//         console.log("My tail is below me!")
//         tailAbove = false;
//         tailRight = false;
//         tailLeft = false;
//         return;
//     } else if (snake > 0 && squares[snake - 1].classList[1] === "green") {
//         tailLeft = true;
//         console.log("My tail is to the left!")
//         tailAbove = false;
//         tailRight = false;
//         tailBelow = false;
//         return;
//     } else {
//         // console.log("There's nothing there")
//         tailAbove = false;
//         tailRight = false;
//         tailBelow = false;
//         tailLeft = false;
//     }
// }

function checkForTail() {
    tailAbove = false;
    tailRight = false;
    tailBelow = false;
    tailLeft = false;
    for (let i = 2; i < tail.length; i++) {
        if (snake > 19 && tail[i] === (snake - 20)) {
            tailAbove = true;
        } else if (snake < 399 && tail[i] === (snake + 1)) {
            tailRight = true;
        } else if (snake < 380 && tail[i] === (snake + 20)) {
            tailBelow = true;
        } else if (snake > 0 && tail[i] === (snake - 1)) {
            tailLeft = true;
        } else return;
    }
}

function MoveUp() {
    checkBoundary();
    checkForApple();
    checkForTail();
    if (failureNumber === 1 || failureNumber === 5 || failureNumber === 6) {
        clearInterval(moveInterval);
        resetSnake();
        return;
    } else if (appleAbove === true) {
        squares[snake - 20].classList.remove('red');
        resetApple();
        tail.push(tail[tail.length - 1])
        squares[snake].classList.remove('green');
        tailMove();
        // console.log(snake);
        snake -= 20;
        // console.log(snake);
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        snake -= 20;
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    }
}

function MoveRight() {
    checkBoundary();
    checkForApple();
    checkForTail();
    if (failureNumber === 2 || failureNumber === 6 || failureNumber === 7) {
        clearInterval(moveInterval);
        resetSnake();
        return;
    } else if (appleToTheRight === true) {
        squares[snake + 1].classList.remove('red');
        resetApple();
        tail.push(tail[tail.length - 1])
        squares[snake].classList.remove('green');
        tailMove();
        snake += 1;
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        snake += 1;
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    }
}

function MoveDown() {
    checkBoundary();
    checkForApple();
    checkForTail();
    if (failureNumber === 3 || failureNumber === 7 || failureNumber === 8 || tailBelow === true) {
        clearInterval(moveInterval);
        resetSnake();
        return;
    } else if (appleBelow === true) {
        squares[snake + 20].classList.remove('red');
        resetApple();
        tail.push(tail[tail.length - 1])
        squares[snake].classList.remove('green');
        tailMove();
        snake += 20;
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        snake += 20;
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    }
}

function MoveLeft() {
    checkBoundary();
    checkForApple();
    checkForTail();
    if (failureNumber === 4 || failureNumber === 5 || failureNumber === 8) {
        clearInterval(moveInterval);
        resetSnake();
        return;
    } else if (appleToTheLeft === true) {
        squares[snake - 1].classList.remove('red');
        resetApple();
        tail.push(tail[tail.length - 1])
        squares[snake].classList.remove('green');
        tailMove();
        snake -= 1;
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        snake -= 1;
        squares[snake].classList.add('green');
        failureNumber = 0;
        return;
    }
}

// function tailMoveUp() {
//     squares[tail[0]].classList.remove('green');
//     for (let i = 1; i < tail.length; i++) {
//         squares[tail[i]].classList.remove('green');
//         tail[i] -= 20;
//         // console.log(tail[i]);
//         squares[tail[i]].classList.add('green');

//     }
//     tail[0] = snake;
//     // console.log(tail[0]);
//     squares[tail[0]].classList.add('green');
// }
// function tailMoveRight() {
//     squares[tail[0]].classList.remove('green');
//     for (let i = 1; i < tail.length; i++) {
//         squares[tail[i]].classList.remove('green');
//         tail[i] += 1;
//         // console.log(tail[i]);
//         squares[tail[i]].classList.add('green');

//     }
//     tail[0] = snake;
//     // console.log(tail[0]);
//     squares[tail[0]].classList.add('green');
// }
// function tailMoveDown() {
//     squares[tail[0]].classList.remove('green');
//     for (let i = 1; i < tail.length; i++) {
//         squares[tail[i]].classList.remove('green');
//         tail[i] += 20;
//         // console.log(tail[i]);
//         squares[tail[i]].classList.add('green');

//     }
//     tail[0] = snake;
//     // console.log(tail[0]);
//     squares[tail[0]].classList.add('green');
// }
// function tailMoveLeft() {
//     squares[tail[0]].classList.remove('green');
//     for (let i = 1; i < tail.length; i++) {
//         squares[tail[i]].classList.remove('green');
//         tail[i] -= 1;
//         // console.log(tail[i]);
//         squares[tail[i]].classList.add('green');

//     }
//     tail[0] = snake;
//     // console.log(tail[0]);
//     squares[tail[0]].classList.add('green');
// }

// saving original tailMove function just in case
function tailMove() {
    squares[tail[0]].classList.remove('green');
    // console.log(tail.length - 1);
    let tailLength = tail.length - 1;
    for (let i = tailLength; i > 0; i--) {

        // console.log(i);
        if (i === tailLength) {
            squares[tail[i]].classList.remove('green');
            tail[i] = tail[i - 1];
            squares[tail[i]].classList.add('green');
            continue;
        } else {
            tail[i] = tail[i - 1];
            squares[tail[i]].classList.add('green');
            continue;
        }

        // console.log(tail[i]);
    }
    tail[0] = snake;
    // console.log(tail[0]);
    squares[tail[0]].classList.add('green');
}

// ***Event Listeners***
// document.defaultView.addEventListener('onkeydown', function (event) {
//     console.log("Hello world!");
// })
// Original attempt at logging a key press, did not work with 'onkeydown', which is probably older syntax


document.addEventListener("keydown", function (event) {
    // console.log(failureNumber);
    checkBoundary();
    clearInterval(moveInterval);
    if (failureNumber === 5 && (event.key === 'ArrowUp' || event.key === 'ArrowLeft')) {
        resetSnake()
    } else if (failureNumber === 6 && (event.key === 'ArrowUp' || event.key === 'ArrowRight')) {
        resetSnake()
    } else if (failureNumber === 7 && (event.key === 'ArrowRight' || event.key === 'ArrowDown')) {
        resetSnake()
    } else if (failureNumber === 8 && (event.key === 'ArrowDown' || event.key === 'ArrowLeft')) {
        resetSnake()
    } else if (failureNumber === 1 && event.key === 'ArrowUp' || tailAbove === true && event.key === 'ArrowUp') {
        resetSnake()
    } else if (failureNumber === 2 && event.key === 'ArrowRight' || tailRight === true && event.key === 'ArrowRight') {
        resetSnake()
    } else if (failureNumber === 3 && event.key === 'ArrowDown' || tailBelow === true && event.key === 'ArrowDown') {
        resetSnake()
    } else if (failureNumber === 4 && event.key === 'ArrowLeft' || tailLeft === true && event.key === 'ArrowLeft') {
        resetSnake()
    } else if (event.key === 'ArrowUp' && squares[snake - 20].classList[1] !== "green") {
        moveInterval = setInterval(MoveUp, 75);
        // MoveUp();
    } else if (event.key === 'ArrowRight' && squares[snake + 1].classList[1] !== "green") {
        moveInterval = setInterval(MoveRight, 75);
        // MoveRight();
    } else if (event.key === 'ArrowDown' && squares[snake + 20].classList[1] !== "green") {
        moveInterval = setInterval(MoveDown, 75);
        // MoveDown();
    } else if (event.key === 'ArrowLeft' && squares[snake - 1].classList[1] !== "green") {
        moveInterval = setInterval(MoveLeft, 75);
        // MoveLeft();
    }
    checkForApple();
    checkForTail();
})

// this method of 'keydown' did work, and I got it directly from https://css-tricks.com/snippets/javascript/javascript-keycodes/ --- yeehaw