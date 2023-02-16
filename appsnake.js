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

function startingPoint() {
    let snake = Math.ceil(Math.random() * squares.length);
    squares[snake].classList.add('green');
}
startingPoint()

// ***Event Listeners***
// document.defaultView.addEventListener('onkeydown', function (event) {
//     console.log("Hello world!");
// })
// Original attempt at logging a key press, did not work with 'onkeydown', which is probably older syntax


document.addEventListener("keydown", function (event) {
    // console.log(event.key);
    if (event.key === 'ArrowRight') {
        squares[snake].classList.remove('green');
        snake += 1;
        squares[snake].classList.add('green');
    }
})

// this method of 'keydown' did work, and I got it directly from https://css-tricks.com/snippets/javascript/javascript-keycodes/ --- yeehaw