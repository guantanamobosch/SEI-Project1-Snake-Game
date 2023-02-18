// ***Variables***

// let's store the squares in some variables
const squares = document.querySelectorAll('.square');
// console.log(squares[0].innerHTML);

let snake = 205;
let tail = [204, 203];
let apple = 214;

let failureNumber = 0;
let moveInterval;

// fail condition arrays
const topBoundaryFailConditions = [];
const rightBoundaryFailConditions = [];
const bottomBoundaryFailConditions = [];
const leftBoundaryFailConditions = [];

// for loops to populate fail condition arrays
for (let i = 0; i < 20; i++) {
    topBoundaryFailConditions.push(i);
}
for (let i = 19; i < 420; i += 20) {
    rightBoundaryFailConditions.push(i);
}
for (let i = 400; i < 420; i++) {
    bottomBoundaryFailConditions.push(i);
}
for (let i = 0; i < 401; i += 20) {
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
    squares[snake].classList.remove('green');
    for (let i = 0; i < tail.length; i++) {
        squares[tail[i]].classList.remove('green')
    }
    snake = 205;
    tail[0] = 204;
    tail[1] = 203;
    snakeStartingPoint(snake);
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

function checkForApple() {
    let appleAbove;
    let appleToTheRight;
    let appleBelow;
    let appleToTheLeft;


}

function MoveUp() {
    checkBoundary();
    if (failureNumber === 1 || failureNumber === 5 || failureNumber === 6) {
        clearInterval(moveInterval);
        resetSnake();
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        // console.log(snake);
        snake -= 20;
        // console.log(snake);
        squares[snake].classList.add('green');
        failureNumber = 0;
    }
}

function MoveRight() {
    checkBoundary();
    if (failureNumber === 2 || failureNumber === 6 || failureNumber === 7) {
        clearInterval(moveInterval);
        resetSnake();
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        snake += 1;
        squares[snake].classList.add('green');
        failureNumber = 0;
    }
}

function MoveDown() {
    checkBoundary();
    if (failureNumber === 3 || failureNumber === 7 || failureNumber === 8) {
        clearInterval(moveInterval);
        resetSnake();
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        snake += 20;
        squares[snake].classList.add('green');
        failureNumber = 0;
    }
}

function MoveLeft() {
    checkBoundary();
    if (failureNumber === 4 || failureNumber === 5 || failureNumber === 8) {
        clearInterval(moveInterval);
        resetSnake();
    } else {
        squares[snake].classList.remove('green');
        tailMove();
        snake -= 1;
        squares[snake].classList.add('green');
        failureNumber = 0;
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
    } else if (failureNumber === 1 && event.key === 'ArrowUp') {
        resetSnake()
    } else if (failureNumber === 2 && event.key === 'ArrowRight') {
        resetSnake()
    } else if (failureNumber === 3 && event.key === 'ArrowDown') {
        resetSnake()
    } else if (failureNumber === 4 && event.key === 'ArrowLeft') {
        resetSnake()
    } else if (event.key === 'ArrowUp') {
        moveInterval = setInterval(MoveUp, 75);
    } else if (event.key === 'ArrowRight') {
        moveInterval = setInterval(MoveRight, 75);
    } else if (event.key === 'ArrowDown') {
        moveInterval = setInterval(MoveDown, 75);
    } else if (event.key === 'ArrowLeft') {
        moveInterval = setInterval(MoveLeft, 75);
    }
})

// this method of 'keydown' did work, and I got it directly from https://css-tricks.com/snippets/javascript/javascript-keycodes/ --- yeehaw