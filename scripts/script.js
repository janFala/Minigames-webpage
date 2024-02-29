const userStats = JSON.parse(localStorage.getItem("userStats")) || {
  rockPaperScissors: {
    wins: 0,
    ties: 0,
    losses: 0,
  },
  coinflip: {
    wins: 0,
    ties: 0,
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
  displayGameResult(userChoice, computerChoice, gameOutcome);

  // store stats in local storage
  storeUserStats();
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

function displayGameResult(userChoice, computerChoice, gameOutcome) {
  const computerPick = document.getElementById("computerPick");
  const userPick = document.getElementById("userPick");

  userPick.textContent = userChoice;
  setTimeout(() => {
    computerPick.textContent = computerChoice;
  }, 1250);
  alertGameResult(gameOutcome);
}

function alertGameResult(gameOutcome) {
  let message = "";
  switch (gameOutcome) {
    case "win":
      message = "You Won!";
      break;
    case "lose":
      message = "You lost :(";
      break;
    case "tie":
      message = "You tied!";
  }
  message = `3. Get the result: \n${message}\nYour stats for this gamemode:\nW: ${userStats.rockPaperScissors.wins}, L: ${userStats.rockPaperScissors.losses}, T: ${userStats.rockPaperScissors.ties}`;
  setTimeout(() => {
    alert(message);
  }, 2000);
}
