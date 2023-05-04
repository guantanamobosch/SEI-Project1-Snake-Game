// ***Variables***

// let's store the squares in some variables
const squares = document.querySelectorAll(".square");

// variables storing the array index for the squares which represent the snake and the apple
let snake = 205;
let tail = [204, 203];
let apple = 214;

// pulling the HTML elements where the scores will be displayed into variables
let yourScoreHTML = document.getElementById("yourscorenumber");
let highScoreHTML = document.getElementById("highscorenumber");

// score variables
let currentScore = 0;
let highestScore = 0;

// a variable to store different numbers which represent different fail conditions (1-4 are the sides of the grid, 5-8 are the corners)
let failureNumber = 0;

// variables to store the setInterval() for movements so that clearInterval() can be used
let moveInterval;
let timeoutIntervalOne;
let timeoutIntervalTwo;
let timeoutIntervalThree;
let timeoutIntervalFour;

// variable to store snake's current movement direction
let snakeDirection = "rightstart";

// boolean variables for the snake to check for apples
let appleAbove = false;
let appleToTheRight = false;
let appleBelow = false;
let appleToTheLeft = false;

// boolean variables for the snake to check for its tail
let tailAbove = false;
let tailRight = false;
let tailBelow = false;
let tailLeft = false;

// fail condition arrays to hold the indices of the grid squares at the boundary
const topBoundaryFailConditions = [];
const rightBoundaryFailConditions = [];
const bottomBoundaryFailConditions = [];
const leftBoundaryFailConditions = [];

// for loops to populate fail condition arrays with the boundary indices
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

// ***Functions***

// this function is called when the snake enters a red square (eats an apple) and lengthens the snake by one square
function eat() {
    tail.push(tail[tail.length - 1]);
    currentScore++;
    yourScoreHTML.innerHTML = currentScore;
}

// This function clears the move interval, displays a message on the webpage that says "ow!", then sets a timeout for the reset function
function loseGame() {
    clearInterval(moveInterval);
    yourScoreHTML.innerHTML = "OW!";
    document.getElementById("yourscorenumber").id = "youlose";
    setTimeout(resetSnake, 1000);
}

// this function sets a new high score if you beat the current high score, and resets current score
function logAndResetScore() {
    if (currentScore > highestScore) {
        highestScore = currentScore;
    }
    highScoreHTML.innerHTML = highestScore;
    currentScore = 0;
    yourScoreHTML.innerHTML = currentScore;
    document.getElementById("youlose").id = "yourscorenumber";
}

// apple always starts in the same place, squares[214] to start, makes it red
function appleStartingPoint(apple) {
    squares[apple].classList.add("red");
}
appleStartingPoint(apple);

// makes the respective squares of the snake's head and tail green upon startup
function snakeStartingPoint(snake) {
    squares[snake].classList.add("green");
    for (let i = 0; i < tail.length; i++) {
        squares[tail[i]].classList.add("green");
    }
    failureNumber = 0;
}
snakeStartingPoint(snake);

// reset function for lose conditions
function resetSnake() {
    // remove color from all squares on the grid
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.remove("green");
        squares[i].classList.remove("red");
    }
    // remove all array elements from the snake's tail except 2 at indices 0, 1
    tail.splice(2, tail.length - 2);
    // initial values for snake, tail, apple, and direction
    snake = 205;
    tail[0] = 204;
    tail[1] = 203;
    apple = 214;
    snakeDirection = "rightstart";
    // makes the initial snake/tail and apples values green and red respectively
    snakeStartingPoint(snake);
    appleStartingPoint(apple);
    logAndResetScore();
}

// called each time the snake eats the apple, it moves the apple to a new location - this function is recursive and prevents the apple from respawning in one of the squares inhabited by the snake
function resetApple() {
    apple = Math.floor(Math.random() * 400);
    if (squares[apple].classList[1] === "green") {
        resetApple();
    } else {
        squares[apple].classList.add("red");
        return;
    }
}

// this function resets the timeouts that are set in each movement function so the player can change directions without the snake zigzagging into oblivion
function resetTimeouts() {
    clearTimeout(timeoutIntervalOne);
    clearTimeout(timeoutIntervalTwo);
    clearTimeout(timeoutIntervalThree);
    clearTimeout(timeoutIntervalFour);
}

// this function checks whether the head of the snake is in/on one of the squares around the boundary of the grid and adjusts the failure number accordingly (special conditions for the corners)
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

// this function checks adjacent squares (above, below, to the left or right of) the snake's head for whether they are red and adjusts global boleans if they are, otherwise sets the booleans to false
function checkForApple() {
    if (snake > 19 && squares[snake - 20].classList[1] === "red") {
        appleAbove = true;
        return;
    } else if (snake < 399 && squares[snake + 1].classList[1] === "red") {
        appleToTheRight = true;
        return;
    } else if (snake < 380 && squares[snake + 20].classList[1] === "red") {
        appleBelow = true;
        return;
    } else if (snake > 0 && squares[snake - 1].classList[1] === "red") {
        appleToTheLeft = true;
        return;
    } else {
        appleAbove = false;
        appleToTheRight = false;
        appleBelow = false;
        appleToTheLeft = false;
    }
}

// this function sets global booleans (re: tail proximity) to false before it loops through indices of the tail array after the first two items (impossible for snake head to hit the first two items in its tail) and sets global booleans depending on whether the tail is adjacent to the snake's head or not
function checkForTail() {
    tailAbove = false;
    tailRight = false;
    tailBelow = false;
    tailLeft = false;
    for (let i = 2; i < tail.length; i++) {
        if (snake > 19 && tail[i] === snake - 20) {
            return (tailAbove = true);
        } else if (snake < 399 && tail[i] === snake + 1) {
            return (tailRight = true);
        } else if (snake < 380 && tail[i] === snake + 20) {
            return (tailBelow = true);
        } else if (snake > 0 && tail[i] === snake - 1) {
            return (tailLeft = true);
        } else continue;
    }
    return;
}

// this function move the snake head up
function upMove() {
    snake -= 20;
    squares[snake].classList.remove("red");
    squares[snake].classList.add("green");
    snakeDirection = "up";
}

// this function move the snake head right
function rightMove() {
    snake += 1;
    squares[snake].classList.remove("red");
    squares[snake].classList.add("green");
    snakeDirection = "right";
}

// this function move the snake head down
function downMove() {
    snake += 20;
    squares[snake].classList.remove("red");
    squares[snake].classList.add("green");
    snakeDirection = "down";
}

// this function move the snake head left
function leftMove() {
    snake -= 1;
    squares[snake].classList.remove("red");
    squares[snake].classList.add("green");
    snakeDirection = "left";
}

// this function makes the tail follow the head and is called in each movement function
function tailMove() {
    squares[tail[0]].classList.remove("green");
    let tailLength = tail.length - 1;
    for (let i = tailLength; i > 0; i--) {
        if (i === tailLength) {
            squares[tail[i]].classList.remove("green");
            tail[i] = tail[i - 1];
            squares[tail[i]].classList.add("green");
            continue;
        } else {
            tail[i] = tail[i - 1];
            squares[tail[i]].classList.add("green");
            continue;
        }
    }
    tail[0] = snake;
    squares[tail[0]].classList.add("green");
}

// this function resets timeouts, checks boundaries, apple and tail proximity, and conducts movement upwards accordingly
function MoveUp() {
    resetTimeouts();
    checkBoundary();
    checkForApple();
    checkForTail();
    if (
        failureNumber === 1 ||
        failureNumber === 5 ||
        failureNumber === 6 ||
        tailAbove === true
    ) {
        failureNumber = 9;
        loseGame();
        return;
    } else if (appleAbove === true) {
        eat();
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(upMove, 50);
        timeoutIntervalFour = setTimeout(resetApple, 55);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveUp, 70);
    } else {
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(upMove, 50);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveUp, 70);
    }
}

// this function resets timeouts, checks boundaries, apple and tail proximity, and conducts movement to the right accordingly
function MoveRight() {
    resetTimeouts();
    checkBoundary();
    checkForApple();
    checkForTail();
    if (
        failureNumber === 2 ||
        failureNumber === 6 ||
        failureNumber === 7 ||
        tailRight === true
    ) {
        failureNumber = 9;
        loseGame();
        return;
    } else if (appleToTheRight === true) {
        eat();
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(rightMove, 50);
        timeoutIntervalFour = setTimeout(resetApple, 55);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveRight, 70);
    } else {
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(rightMove, 50);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveRight, 70);
    }
}

// this function resets timeouts, checks boundaries, apple and tail proximity, and conducts movement downwards accordingly
function MoveDown() {
    resetTimeouts();
    checkBoundary();
    checkForApple();
    checkForTail();
    if (
        failureNumber === 3 ||
        failureNumber === 7 ||
        failureNumber === 8 ||
        tailBelow === true
    ) {
        failureNumber = 9;
        loseGame();
        return;
    } else if (appleBelow === true) {
        eat();
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(downMove, 50);
        timeoutIntervalFour = setTimeout(resetApple, 55);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveDown, 70);
    } else {
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(downMove, 50);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveDown, 70);
    }
}

// this function resets timeouts, checks boundaries, apple and tail proximity, and conducts movement to the left accordingly
function MoveLeft() {
    resetTimeouts();
    checkBoundary();
    checkForApple();
    checkForTail();
    if (
        failureNumber === 4 ||
        failureNumber === 5 ||
        failureNumber === 8 ||
        tailLeft === true
    ) {
        failureNumber = 9;
        loseGame();
        return;
    } else if (appleToTheLeft === true) {
        eat();
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(leftMove, 50);
        timeoutIntervalFour = setTimeout(resetApple, 55);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveLeft, 70);
    } else {
        timeoutIntervalOne = setTimeout(tailMove, 40);
        timeoutIntervalTwo = setTimeout(leftMove, 50);
        failureNumber = 0;
        timeoutIntervalThree = setTimeout(MoveLeft, 70);
    }
}

// ***Event Listener***

// this event listener only fires off if the keypress is an arrow key, if the arrow key is not opposite or equal to the snake's current direction, and only if the player did not have a game over within the last second
document.addEventListener("keydown", function (event) {
    if (
        failureNumber !== 9 &&
        event.key === "ArrowUp" &&
        snakeDirection !== "down" &&
        snakeDirection !== "up"
    ) {
        MoveUp();
    } else if (
        failureNumber !== 9 &&
        event.key === "ArrowRight" &&
        snakeDirection !== "left" &&
        snakeDirection !== "right"
    ) {
        MoveRight();
    } else if (
        failureNumber !== 9 &&
        event.key === "ArrowDown" &&
        snakeDirection !== "up" &&
        snakeDirection !== "down"
    ) {
        MoveDown();
    } else if (
        failureNumber !== 9 &&
        event.key === "ArrowLeft" &&
        snakeDirection !== "right" &&
        snakeDirection !== "left" &&
        snakeDirection !== "rightstart"
    ) {
        MoveLeft();
    }
    checkForApple();
    checkForTail();
});
