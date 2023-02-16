// ***Variables***

// let's store the squares in some variables
const squares = document.querySelectorAll('.square');
// console.log(squares[0].innerHTML);

let snake = Math.ceil(Math.random() * squares.length);

// fail condition arrays
const topBoundaryFailConditions = [];
const rightBoundaryFailConditions = [];
const bottomBoundaryFailConditions = [];
const leftBoundaryFailConditions = [];

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

// ***Event Listeners***
// document.defaultView.addEventListener('onkeydown', function (event) {
//     console.log("Hello world!");
// })
// Original attempt at logging a key press, did not work with 'onkeydown', which is probably older syntax


document.addEventListener("keydown", function (event) {
    // console.log(event.key);
    // console.log(checkForFailCondition());
    // **logic to make snake move around**
    // for (let i = 0; i < 20; i++) {
    // if ((snake === rightBoundaryFailConditions[i] && event.key === 'ArrowRight') || (snake === bottomBoundaryFailConditions[i] && event.key === 'ArrowDown') || (snake === leftBoundaryFailConditions[i] && event.key === 'ArrowLeft') || (snake === topBoundaryFailConditions[i] && event.key === 'ArrowUp')) {
    //     console.log("You lose!");
    //     startingPoint(snake);
    // }
    if (event.key === 'ArrowRight') {
        squares[snake].classList.remove('green');
        snake += 1;
        squares[snake].classList.add('green');
    } else if (event.key === 'ArrowLeft') {
        squares[snake].classList.remove('green');
        snake -= 1;
        squares[snake].classList.add('green');
    } else if (event.key === 'ArrowUp') {
        squares[snake].classList.remove('green');
        snake -= 20;
        squares[snake].classList.add('green');
    } else if (event.key === 'ArrowDown') {
        squares[snake].classList.remove('green');
        snake += 20;
        squares[snake].classList.add('green');
    } else console.log("youlose");
    // }
})

// this method of 'keydown' did work, and I got it directly from https://css-tricks.com/snippets/javascript/javascript-keycodes/ --- yeehaw