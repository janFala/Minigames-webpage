const userStats = JSON.parse(localStorage.getItem("userStats")) || {
  rockPaperScissors: {
    wins: 0,
    ties: 0,
    losses: 0,
  },
  coinflip: {
    wins: 0,
    losses: 0,
  },
};

// Rock paper scissors game
function rockPaperScissors(choice) {
  const userChoice = choice;
  const computerChoice = pickRandomElement();

  const gameOutcome = evaluateRockPaperScissors(userChoice, computerChoice);
  updateUserStats(gameOutcome, "rockPaperScissors");

  // display gameResult
  const computerPickDisplay = document.getElementById("computerPick");
  const userPickDisplay = document.getElementById("userPick");
  displayGameResult(userChoice, computerChoice, computerPickDisplay, userPickDisplay);

  // store stats in local storage
  storeUserStats();

  alertGameResult(gameOutcome, "rockPaperScissors");
  resetUi(computerPickDisplay, userPickDisplay);
}

function resetUi(element1, element2) {
  setTimeout(() => {
    element1.textContent = "";
    element2.textContent = "";
  }, 2000);
}

// let computer picks rock paper or scissor
function pickRandomElement() {
  const randomVal = Math.random();
  if (randomVal < 0.33) {
    return "rock";
  } else if (randomVal < 0.66) {
    return "paper";
  } else {
    return "scissors";
  }
}

// calculate result of game; cpChoice = computerChoice
function evaluateRockPaperScissors(userChoice, cpChoice) {
  if (userChoice === cpChoice) {
    return "tie";
  }

  let result = undefined;
  switch (userChoice) {
    case "rock":
      cpChoice === "paper" ? (result = "lose") : (result = "win");
      break;
    case "paper":
      cpChoice === "scissors" ? (result = "lose") : (result = "win");
      break;
    case "scissors":
      cpChoice === "rock" ? (result = "lose") : (result = "win");
  }
  return result;
}

function updateUserStats(gameResult, gamemode) {
  switch (gameResult) {
    case "win":
      userStats[gamemode].wins++;
      break;
    case "tie":
      userStats[gamemode].ties++;
      break;
    case "lose":
      userStats[gamemode].losses++;
  }
}

function storeUserStats() {
  localStorage.setItem("userStats", JSON.stringify(userStats));
}

function displayGameResult(userChoice, computerChoice, computerPickElement, userPickElement) {
  userPickElement.textContent = userChoice;

  setTimeout(() => {
    computerPickElement.textContent = computerChoice;
  }, 1250);
}

function alertGameResult(gameOutcome, gamemode) {
  let message = "";
  switch (gameOutcome) {
    case "win":
      message = "You Won!";
      break;
    case "lose":
      message = "You Lost :(";
      break;
    case "tie":
      message = "You Tied!";
  }
  if (gamemode === "rockPaperScissors") {
    message = `3. Get the result: \n${message}\nYour stats for this gamemode:\nW: ${userStats.rockPaperScissors.wins}, L: ${userStats.rockPaperScissors.losses}, T: ${userStats.rockPaperScissors.ties}`;
  } else {
    message = `3. Get the result: \n${message}\nYour stats for this gamemode:\nW: ${userStats.coinflip.wins}, L: ${userStats.coinflip.losses}`;
  }
  setTimeout(() => {
    alert(message);
  }, 2000);
}

// coinflip game
function playCoinflip(userChoice) {
  let coinResult = flipCoin(userChoice);
  updateUserStats(coinResult[1], "coinflip");

  // display game info's
  const computerDisplay = document.getElementById("computerPick2");
  const userDisplay = document.getElementById("userPick2");
  displayGameResult(userChoice, coinResult[0], computerDisplay, userDisplay);

  storeUserStats(coinResult[1], "coinflip");

  alertGameResult(coinResult[1], "coinflip");

  resetUi(computerDisplay, userDisplay);
}

// returns [Winning coinside; result]
function flipCoin(userChoice) {
  let coinResult = ["", ""];
  Math.random() < 0.5 ? (coinResult[0] = "tails") : (coinResult[0] = "heads");

  coinResult[0] === userChoice ? (coinResult[1] = "win") : (coinResult[1] = "lose");
  return coinResult;
}

function resetRockPaperScissors() {
  userStats.rockPaperScissors.wins = 0;
  userStats.rockPaperScissors.losses = 0;
  userStats.rockPaperScissors.ties = 0;
}

function resetCoinflip() {
  userStats.coinflip.wins = 0;
  userStats.coinflip.losses = 0;
}

function resetAll() {
  resetRockPaperScissors();
  resetCoinflip();
}
