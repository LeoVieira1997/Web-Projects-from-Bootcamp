var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"]; // the colors matches with the buttons's id's
var level = 0;
var started = false; // defines if the game is running -- head over to startOver() and the listener below it

 // Add an item to the game sequence

function nextSequence(){
  userClickedPattern = []; //in this point, the array is cleaned for the user to guess the sequence
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];   //choose a color according to the random result of "randomNumber"
  gamePattern.push(randomChosenColor);  // the game earn one more item in the sequence
  $("#" + randomChosenColor).fadeIn(250).fadeOut(250).fadeIn(250);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
  level++;
}

$(".btn").click(function(evt){
  var userChosenColor = evt.target.id; // userChosenColor now has the id of the pressed button, which means it has the color
  userClickedPattern.push(userChosenColor); // now the userClickedPattern has one more item to compare with gamePattern
  playSound(userChosenColor); //calls the function to play the sound corresponding with the id
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); // checks if the selected button corresponds to the game pattern
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3"); // uses the parameter (div's id) as part of the url to search for the file
  audio.play();
}

function animatePress(currentColor) { // adds a temporary animation to the selected button
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 80);
}

function checkAnswer(currentLevel) {  //runs the two arrays and checks if the guesses corresponded to the game pattern
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) { // checks if the user is already done with the guesses
      setTimeout(function(){
        nextSequence(); // calls another item to the game pattern, note that the user clicked pattern is reseted
                        // while the game pattern receives one more item, so that the user has to guess the incremented pattern
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){ // resets the game
  level = 0;
  gamePattern = [];
  started = false;  // essential for to satisfact the condition on the "keydown" listener
}

$(document).keydown(function() {
  if(!started){
    nextSequence();
    started = true;
  }
});
