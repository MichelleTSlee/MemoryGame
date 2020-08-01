var tileAnimals = ["cat", "fox", "sparrow", "tiger"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$("img").click(function () {
  var userChosenAnimal = $(this).attr("id");
  userPattern.push(userChosenAnimal);

  playSound(userChosenAnimal);
  animatePress(userChosenAnimal);

  checkAnswer(userPattern.length - 1);
});

function checkAnswer(level) {
  if (gamePattern[level] === userPattern[level]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level").text("Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userPattern = [];
  level++;
  $("#level").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenAnimal = tileAnimals[randomNumber];
  gamePattern.push(randomChosenAnimal);

  $("#" + randomChosenAnimal)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenAnimal);
}

function animatePress(currentAnimal) {
  $("#" + currentAnimal).addClass("pressed");
  setTimeout(function () {
    $("#" + currentAnimal).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
