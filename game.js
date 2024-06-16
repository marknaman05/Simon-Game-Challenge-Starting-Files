var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function playSound(Colour){
    var audio = new Audio("./sounds/" + Colour + ".mp3");
    audio.play();
}

var userClickedPattern = [];

var level = 0;

function nextSequence(){
    level = level + 1;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass('pressed');
    }, 100);
}


var game = false;
//When keyboard key is pressed for first time
$(document).on("keypress" , function(event){

    if(!game){
        $("#level-title").text("Level " + level);
        nextSequence();
        game = true;
    }
});


$(".btn").on( "click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);   
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

} );

function gameOver(){
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass('game-over');
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    level = 0;
    game = false;
    gamePattern = [];
    $(document).on("keypress" , function(event){

        if(!game){
            $("#level-title").text("Level " + level);
            nextSequence();
            game = true;
        }
    });

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        gameOver();
    }
}


