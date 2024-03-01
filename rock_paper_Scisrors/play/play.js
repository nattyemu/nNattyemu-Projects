let setintervalid;
let isautoplay = false;
function autoplay() {
  if (!isautoplay) {
    setintervalid = setInterval(function () {
      let auto = computer();
      play(auto);
    }, 2000);
    isautoplay = true;

    document.querySelector(".auto_play_button").innerHTML = "Stop playing";
  } else {
    clearInterval(setintervalid);
    isautoplay = false;
    document.querySelector(".auto_play_button").innerHTML = "Auto play";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  play("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  play("paper");
});
document.querySelector(".js-Scisrors-button").addEventListener("click", () => {
  play("Scisrors");
});
document.querySelector(".resetbutton").addEventListener("click", () => {
  reset();
});
document.querySelector(".auto_play_button").addEventListener("click", () => {
  autoplay();
});
document.body.addEventListener("keypress", (event) => {
  if (event.key === "r" || event.key === "R") play("rock");
  else if (event.key === "p" || event.key === "P") play("paper");
  else if (event.key === "s" || event.key === "S") play("Scisrors");
  else if (event.key === "a" || event.key === "A") autoplay();
});
var score = {
  wins: 0,
  loses: 0,
  ties: 0,
};
score = JSON.parse(localStorage.getItem("score"));
if (!score)
  score = {
    wins: 0,
    loses: 0,
    ties: 0,
  };
function update() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Win: ${score.wins} Lose: ${score.loses} Tie: ${score.ties}`;
}

function reset() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  update();
  localStorage.removeItem("score");
}
function computer() {
  const random = Math.random();
  if (random >= 0 && random < 1 / 3) {
    computerValue = "rock";
  } else if (random >= 1 / 3 && random < 2 / 3) {
    computerValue = "paper";
  } else if (random >= 2 / 3 && random < 1) {
    computerValue = "Scisrors";
  }
  return computerValue;
}

//main function
function play(game) {
  var computerValue = computer();
  var result = "";
  if (game === "rock") {
    if (computerValue === "rock") result = "Tie.";
    else if (computerValue === "paper") result = "You lose.";
    else if (computerValue === "Scisrors") result = "you win.";
  } else if (game === "paper") {
    if (computerValue === "rock") result = "you win.";
    else if (computerValue === "paper") result = "Tie.";
    else if (computerValue === "Scisrors") result = "You lose.";
  } else if (game === "Scisrors") {
    if (computerValue === "rock") result = "You lose.";
    else if (computerValue === "paper") result = "you win.";
    else if (computerValue === "Scisrors") result = "Tie.";
  }

  if (result === "you win.") {
    score.wins += 1;
  }
  if (result === "You lose.") {
    score.loses += 1;
  }
  if (result === "Tie.") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));
  update();

  document.querySelector(".js-choose").innerHTML = `${result}`;
  document.querySelector(
    ".js-choosebycomp"
  ).innerHTML = `You  <img class='resu-but' src="../image/${game}.jpg" id="score-emoji" alt="${game} emoji"/>    <img src="../image/${computerValue}.jpg" class='resu-but2' id="score-emoji" alt="${computerValue} emoji"/> computer`;
  if (result === "you win.") {
    document.querySelector(".resu-but2").classList.add("greencolor");
    document.querySelector(".resu-but").classList.add("greencolor");
  } else {
    document.querySelector(".resu-but2").classList.remove("greencolor");
    document.querySelector(".resu-but").classList.remove("greencolor");
  }
  if (result === "You lose.") {
    document.querySelector(".resu-but2").classList.add("redcolor");
    document.querySelector(".resu-but").classList.add("redcolor");
  } else {
    document.querySelector(".resu-but2").classList.remove("redcolor");
    document.querySelector(".resu-but").classList.remove("redcolor");
  }
  if (result === "Tie.") {
    document.querySelector(".resu-but2").classList.add("yellowcolor");
    document.querySelector(".resu-but").classList.add("yellowcolor");
  } else {
    document.querySelector(".resu-but2").classList.remove("yellowcolor");
    document.querySelector(".resu-but").classList.remove("yellowcolor");
  }
}
