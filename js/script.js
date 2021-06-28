const grid = document.querySelector(".grid");
let currentInvestorIndex = 217;
let width = 15;
let direction = 1;
let investorId;
let goingRight = true;
const resultsDisplay = document.querySelector(".results");
let removed = [];
let score = 0;

let winMessage = "You won!";
let gameOverMessage = "Game Over :/";

for (var i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const spaceInvestor = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  for (let i = 0; i < spaceInvestor.length; i++) {
    if (!removed.includes(i)) {
      squares[spaceInvestor[i]].classList.add("investor");
    }
  }
}

draw();

function remove() {
  for (let i = 0; i < spaceInvestor.length; i++) {
    squares[spaceInvestor[i]].classList.remove("investor");
  }
}

squares[currentInvestorIndex].classList.add("doge-shooter");

function moveShooter(e) {
  squares[currentInvestorIndex].classList.remove("doge-shooter");
  switch (e.key) {
    case "a":
      if (currentInvestorIndex % width !== 0) currentInvestorIndex -= 1;
      break;
    case "d":
      if (currentInvestorIndex % width < width - 1) currentInvestorIndex += 1;
      break;
  }
  squares[currentInvestorIndex].classList.add("doge-shooter");
}

function moveShooterLeft() {
  squares[currentInvestorIndex].classList.remove("doge-shooter");
  if (currentInvestorIndex % width !== 0) currentInvestorIndex -= 1;
  squares[currentInvestorIndex].classList.add("doge-shooter");
}

function moveShooterRight() {
  squares[currentInvestorIndex].classList.remove("doge-shooter");
  if (currentInvestorIndex % width < width - 1) currentInvestorIndex += 1;
  squares[currentInvestorIndex].classList.add("doge-shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvestors() {
  const left = spaceInvestor[0] % width === 0;
  const right = spaceInvestor[spaceInvestor.length - 1] % width === width - 1;
  remove();

  if (right && goingRight) {
    for (let i = 0; i < spaceInvestor.length; i++) {
      spaceInvestor[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (left && !goingRight) {
    for (let i = 0; i < spaceInvestor.length; i++) {
      spaceInvestor[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < spaceInvestor.length; i++) {
    spaceInvestor[i] += direction;
  }

  draw();

  if (
    squares[currentInvestorIndex].classList.contains("investor", "doge-shooter")
  ) {
    resultsDisplay.innerHTML = gameOverMessage;
    clearInterval(investorId);
  }

  for (let i = 0; i < spaceInvestor.length; i++) {
    if (spaceInvestor[i] > squares.length) {
      resultsDisplay.innerHTML = gameOverMessage;
      clearInterval(investorId);
    }
  }

  if (removed.length === spaceInvestor.length) {
    resultsDisplay.innerHTML = winMessage;
    clearInterval(investorId);
  }
}

investorId = setInterval(moveInvestors, 300);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentInvestorIndex;

  function moveLaser() {
    if (currentLaserIndex >= 0) {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("investor")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("investor");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        const investorRemoved = spaceInvestor.indexOf(currentLaserIndex);
        removed.push(investorRemoved);
        score = score + 1;
        document.querySelector(".score").innerHTML =
          "<center> BTC Cashed: " + score + " btc</center>";
        //   console.log(score);
      }
    }
  }

  switch (e.key) {
    case "w":
      laserId = setInterval(moveLaser, 50);
  }
}

function shootTouch() {
  let laserId;
  let currentLaserIndex = currentInvestorIndex;

  function moveLaser() {
    if (currentLaserIndex >= 0) {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("investor")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("investor");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        const investorRemoved = spaceInvestor.indexOf(currentLaserIndex);
        removed.push(investorRemoved);
        score = score + 1;
        document.querySelector(".score").innerHTML =
          "<center> BTC Cashed: " + score + " btc</center>";
        //   console.log(score);
      }
    }
  }

  laserId = setInterval(moveLaser, 50);
}

document.addEventListener("keydown", shoot);
