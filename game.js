var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "yellow", "green"];
var started = false;
var level = 0;

/* Start game on a keydown by calling nextSquence()*/
$(document).keydown(function(){
    if(!started){
        // $("#level-title").text("Level " + level);
        nextSquence();
        started = true;
    }
});

/* Detect user's button press and check the answer*/
$(".btn").click(function(){
    if(started){
        var userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);
        animateBtnPress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userPattern.length-1);
    }
});

/* Check each button press against game's generated pattern */
function checkAnswer(i){
    if(userPattern[i]===gamePattern[i]){
        // If user has completed the total number of button presses and got them all right, then wait 1 second before starting next level sequence
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSquence();
            }, 1000);
        }
    } else {
        // If any button press is wrong, display game over and refresh game.
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Play Again");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


/* Produce the next random button in the sequence */
function nextSquence(){
    // Clear user's click pattern at the start of each level
    userPattern = [];
    // Display level
    level++;
    $("#level-title").text("Level " + level);

    // Generate a random color and add it to gamePattern array
    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    // Animate the randomly chosen button with a flash and a sound
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

/* Animate the button pressed based on color */
function animateBtnPress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100);
}

/* Play sound based on color of button pressed */
function playSound(color){
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

/* Clear the board for a new game */
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
