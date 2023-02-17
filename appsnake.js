// ***Variables***

// let's store the squares in some variables
const squares = document.querySelectorAll('.square');
// console.log(squares[0].innerHTML);

let snake = Math.ceil(Math.random() * squares.length);

let failureNumber;

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

function startingPoint(snake) {
    squares[snake].classList.add('green');
}
startingPoint(snake);



// testing the fail condition for loop - I think I need to change the terminating condition to i < 20
// for (let i = 0; i < 20; i++) {
//     console.log(topBoundaryFailConditions[i]);
// }

// function checkForFailCondition() {
//     // for loop to test keyboard input against fail conditions
//     for (let i = 0; i < 20; i++) {
//         if (squares[snake] === rightBoundaryFailConditions[i]) {
//             return "crashRight";
//         }
//         //     || (squares[snake] === bottomBoundaryFailConditions[i] && event.key === 'ArrowDown') || (squares[snake] === leftBoundaryFailConditions[i] && event.key === 'ArrowLeft') || (squares[snake] === topBoundaryFailConditions[i] && event.key === 'ArrowUp')) {
//         //     console.log("You lose!");
//         //     startingPoint(snake);
//         // }
//     }
// }

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

function MoveRight() {
    squares[snake].classList.remove('green');
    snake += 1;
    squares[snake].classList.add('green');
}

function MoveLeft() {
    squares[snake].classList.remove('green');
    snake -= 1;
    squares[snake].classList.add('green');
}

function MoveUp() {
    squares[snake].classList.remove('green');
    snake -= 20;
    squares[snake].classList.add('green');
}

function MoveDown() {
    squares[snake].classList.remove('green');
    snake += 20;
    squares[snake].classList.add('green');
}

// ***Event Listeners***
// document.defaultView.addEventListener('onkeydown', function (event) {
//     console.log("Hello world!");
// })
// Original attempt at logging a key press, did not work with 'onkeydown', which is probably older syntax


document.addEventListener("keydown", function (event) {
    if (event.key === 'ArrowRight') {
        MoveRight();
    } else if (event.key === 'ArrowLeft') {
        MoveLeft();
    } else if (event.key === 'ArrowUp') {
        MoveUp();
    } else if (event.key === 'ArrowDown') {
        MoveDown();
    }
})

// this method of 'keydown' did work, and I got it directly from https://css-tricks.com/snippets/javascript/javascript-keycodes/ --- yeehaw