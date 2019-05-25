var randomNumber1 = getRandomInt(1, 6);
var randomNumber2 = getRandomInt(1, 6);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var diceNumber1 = ("images/dice" + randomNumber1 + ".png");
var diceNumber2 = ("images/dice" + randomNumber2 + ".png");

document.querySelector(".img1").setAttribute("src", diceNumber1);
document.querySelector(".img2").setAttribute("src", diceNumber2);

if (diceNumber1 > diceNumber2) {
  document.querySelector(".container h1").innerText = "🚩Player 1 Wins!";
} else if (diceNumber2 > diceNumber1) {
  document.querySelector(".container h1").innerText = "Player 2 Wins!🚩";
} else {
  document.querySelector(".container h1").innerText = "Draw!";
}
