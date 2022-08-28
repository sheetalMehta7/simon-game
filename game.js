var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = 1;
    }
});

//function to create sequence
function nextSequence() {
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    for (var i = 0; i < gamePattern.length; i++) {
        playSound(gamePattern[i]);
    }
}

//when a user click a button
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // console.log(userClickedPattern+" got clicked");

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// //function to check answer
// function checkAnswer(currentLevel) {
//     if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
//         gameOver();
//         level = 0;
//         $("#level-title").text("Game Over. Press Any Key to Restart");
//         gamePattern.length = 0;
//         userClickedPattern = 0;
//     } else {
//         setTimeout(nextSequence(), 1000);
//     }
// }


//function to check answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        //check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () { nextSequence(); }, 1000);
        }
    } else {
        gameOver();
        startOver();
    }
}

//function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function to animate button
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//function when game gets over
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

//function to startOver
function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = 0;
}