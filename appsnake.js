// ***Variables***

// let's store the squares in some variables
const squares = document.querySelectorAll('.square');
// console.log(squares[0].innerHTML);

// ***Functions***
// function myFunction(event) {
//     let key = event.key;
//     console.log(key);
// }
// This one also didn't work for logging key presses

function makeSquareGreen() {
    let snake = Math.ceil(Math.random() * squares.length);
    squares[snake].classList.add('green');
}
makeSquareGreen()

// ***Event Listeners***
// document.defaultView.addEventListener('onkeydown', function (event) {
//     console.log("Hello world!");
// })
// Original attempt at logging a key press, did not work with 'onkeydown', which is probably older syntax


document.addEventListener("keydown", function (event) {
    console.log(event.key);
})

// this method of 'keydown' did work, and I got it directly from https://css-tricks.com/snippets/javascript/javascript-keycodes/ --- yeehaw