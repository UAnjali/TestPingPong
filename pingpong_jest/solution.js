/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable func-names */
// variable initialization
const ball = document.getElementById('ball');
const rod1 = document.getElementById('rod1');
const rod2 = document.getElementById('rod2');


let score;
let maxScore;
let rod;
let move;
let ballSpeedX = 3;
let ballSpeedY = 3;
let gameStart = false;

const storeName = 'Name';
const storeScore = 'MaxScore';
const Rod1Name = 'Rod 1';
const Rod2Name = 'Rod 2';

// Resetting the board at the start and the end of the Game
function resetBoard(RodName) {
  rod1.style.left = `${(window.innerWidth - rod1.offsetWidth) / 2}px`;
  rod2.style.left = `${(window.innerWidth - rod2.offsetWidth) / 2}px`;
  ball.style.left = `${(window.innerWidth - ball.offsetWidth) / 2}px`;

  // Loosing player gets the ball for the next game
  if (RodName === Rod2Name) {
    ball.style.top = `${rod1.offsetTop + rod1.offsetHeight}px`;
    ballSpeedY = 3;
  } else if (RodName === Rod1Name) {
    ball.style.top = `${rod2.offsetTop - rod2.offsetHeight}px`;
    ballSpeedY = -3;
  }

  score = 0;
  gameStart = false;
}

// Throwing alert at the start of the game
(function () {
  rod = localStorage.getItem(storeName);
  maxScore = localStorage.getItem(storeScore);

  if (rod === null || maxScore === null) {
    alert("This is the first time you are playing this game. LET'S START");
    maxScore = 0;
    rod = 'Rod1';
  } else {
    alert(`${rod} has maximum score of ${maxScore * 100}`);
  }
  // Restting the board when the game ends
  resetBoard(rod);
}());

// Storing the MaxScore and the winner of the game: Game End
function storeWin(rod, score) {
  if (score > maxScore) {
    maxScore = score;
    localStorage.setItem(storeName, rod);
    localStorage.setItem(storeScore, maxScore);
  }

  clearInterval(move);
  resetBoard(rod);

  alert(
    `${rod
    } wins with a score of ${
      score * 100
    }. Max score is: ${
      maxScore * 100}`,
  );
}

// Defining the function of A and D, and the Enter key
window.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
  const rodSpeed = 50;
  const rodRect = rod1.getBoundingClientRect();

  if (event.code === 'KeyD' && rodRect.x + rodRect.width < window.innerWidth) {
    moveRodRight(rodSpeed, rodRect);
  } else if (event.code === "KeyA" && rodRect.x > 0) {
    moveRodLeft(rodSpeed, rodRect);
  } else if (event.code === "Enter") {
    handleEnterKey();
  }
}

// Handling the movement of the rod: Right
function moveRodRight(speed, rodRect) {
  const newLeft = rodRect.x + speed;
  rod1.style.left = `${newLeft}px`;
  rod2.style.left = rod1.style.left;
}

//Handling the movement of the rod: Left
function moveRodLeft(speed, rodRect) {
  const newLeft = rodRect.x - speed;
  rod1.style.left = `${newLeft}px`;
  rod2.style.left = rod1.style.left;
}

//Handling Enter keypress
function handleEnterKey() {
  if (!gameStart) {
    startGame();
  }
}

//Defining the Game after pressing the Enter Key
function startGame() {
  gameStart = true;

  let ballRect = ball.getBoundingClientRect();
  let ballX = ballRect.x;
  let ballY = ballRect.y;
  const ballDia = ballRect.width;

  let rod1Height = rod1.offsetHeight;
  let rod2Height = rod2.offsetHeight;
  let rod1Width = rod1.offsetWidth;
  let rod2Width = rod2.offsetWidth;

  move = setInterval(moveBall, 10);

  //Defining the movement of the ball
  function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    if (ballX + ballDia > window.innerWidth || ballX < 0) {
      reverseBallXDirection();
    }

    let ballPos = ballX + ballDia / 2;

    if (ballY <= rod1Height) {
      handleCollisionWithRod1(ballPos);
    } else if (ballY + ballDia >= window.innerHeight - rod2Height) {
      handleCollisionWithRod2(ballPos);
    }
  }

  // Reversing ball direction after hitting the side wall
  function reverseBallXDirection() {
    ballSpeedX = -ballSpeedX;
  }

  //Handling the collision of the ball with Rod1
  function handleCollisionWithRod1(ballPos) {
    ballSpeedY = -ballSpeedY;
    score++;

    let rod1X = rod1.getBoundingClientRect().x;
    if (ballPos < rod1X || ballPos > rod1X + rod1Width) {
      setTimeout(500);
      storeWin(Rod2Name, score); // Game Ends
    }
  }

  // Handling the collision of the ball with Rod2
  function handleCollisionWithRod2(ballPos) {
    ballSpeedY = -ballSpeedY;
    score += 1;

    const rod2X = rod2.getBoundingClientRect().x;
    if (ballPos < rod2X || ballPos > rod2X + rod2Width) {
      setTimeout(500);
      storeWin(Rod1Name, score); // Game Ends
    }
  }
}