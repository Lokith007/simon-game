var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ['red','blue','green','yellow'];

var level = 0;

var started = false;

$(document).keydown(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        newSequence();
        started = true;
        $('#start').addClass('disappear');
    }
});

$('#start').click(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        newSequence();
        started = true;
        $('#start').addClass('disappear');
    }
});

$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    } else {
        console.log('wrong');
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();

        $('body').addClass('game-over');

        $('#level-title').text('Game over, Press any key or PLAY AGAIN to restart!');
        $('#start').removeClass('disappear');
        $('#start').text('PLAY AGAIN');

        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);

        startOver();
    }
}


function newSequence() {
userClickedPattern=[];
level++;
$('#level-title').text('Level '+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');

    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
  },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started = false;
}
