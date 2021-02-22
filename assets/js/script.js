// Currently not updating High Score after first onw
// Currently not removing submit form
// Possible to reload page on submit and pull highscore from memory?

var timer;
var timerCount;
var score = 0;
var highScore = 0;
var questionPrompt = document.querySelector("#question");
var choicesDisplay = document.querySelector("#choices");
var startButton = document.querySelector("#start");
var timerElement = document.querySelector("#timerCount");
var questionNumber = 0;
var body = document.querySelector("#body");

startButton.addEventListener("click", startGame);


var questions = [
{
    prompt: "The answer is yes",
    choices: ["yes", "no", "not", "ain't"],
    correct: "0",
},
{
    prompt: "The answer is also yes",
    choices: ["no", "yes", "not", "ain't"],
    correct: "1",
},
{
    prompt: "The answer might be yes",
    choices: ["no", "not", "yes", "ain't"],
    correct: "2",
},
{
    prompt: "The answer is definitely yes",
    choices: ["no", "ain't", "not", "yes"],
    correct: "3",
},
{
    prompt: "The answer is no",
    choices: ["yes", "no", "not", "ain't"],
    correct: "1",
},
{
    prompt: "The answer is also no",
    choices: ["no", "yes", "not", "ain't"],
    correct: "0",
},
{
    prompt: "The answer might be no",
    choices: ["no", "not", "yes", "ain't"],
    correct: "0",
},
{
    prompt: "The answer is definitely no",
    choices: ["no", "ain't", "not", "yes"],
    correct: "0",
},
{
    prompt: "The answer is not",
    choices: ["yes", "no", "not", "ain't"],
    correct: "2",
},
{
    prompt: "The answer is also not",
    choices: ["no", "yes", "not", "ain't"],
    correct: "2",
},
{
    prompt: "The answer might be not",
    choices: ["no", "not", "yes", "ain't"],
    correct: "1",
},
{
    prompt: "The answer is definitely not",
    choices: ["no", "ain't", "not", "yes"],
    correct: "2",
},
];

function askQuestion() {
    var question = questions[questionNumber];
    var ask = document.createElement('span');
    ask.textContent = questions[questionNumber].prompt;
    ask.id = "ask";
    questionPrompt.appendChild(ask);
    for (var i = 0; i < question.choices.length; i++) {
        var choice = document.createElement('button');
        choice.textContent = question.choices[i];
        choice.id = i;
        var id = choice.id;
        choicesDisplay.appendChild(choice);
    }
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function(event) {
            if (this.id == question.correct) {
                score++;
                console.log(this.id);
                console.log(score);
                questionNumber++;
                questionPrompt.removeChild(ask);
                for ( var i = 0; i < question.choices.length; i++) {
                    var elem = document.getElementById(i);
                    elem.parentNode.removeChild(elem);
                } 
                askQuestion();
            } else {
                // timerCount = (timerCount - 10); // CAUSING PERMANENT 
                // body.style.opacity = "0.5";
                // choices.style = "transform: translate(200px, 0); transition-duration: 5s";
            }
            
        })
    }
};

function startTimer() {
  // Sets timer
  console.log(timerCount);
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    console.log(timerCount);
    // Tests if time has run out
    if (timerCount <= 0) {
    //   var userName = prompt("What is your name?");
    //   localStorage.setItem("player", JSON.stringify(userName));
    //   localStorage.setItem("score", JSON.stringify(score));
    //   if (score > highScore) {
    //       highScore = userName + " - " + score;
    //       document.querySelector("#highscore").textContent = highScore;
    //   }
      questionPrompt.removeChild(ask);
      while (choicesDisplay.firstChild) {
        choicesDisplay.removeChild(choicesDisplay.lastChild);
      }
      clearInterval(timer);
      timerCount = 0;
      timerElement.textContent = timerCount;
      gameOver();
    //   loseGame();
    }
  }, 1000);
}

function startGame() {
    console.log(startButton.value);
    startButton.disabled = true;
    // isWin = false;
    timerCount = 5;
    timerElement.textContent = timerCount;
    console.log(timerCount);
    startTimer();
    askQuestion();
  };


  function gameOver() {
    console.log("WORKING");
    var target = document.querySelector('#yourName');
    
    var form = document.createElement('form');
    var label = document.createElement('label');
    var field = document.createElement('input');
    var submit = document.createElement('button');
    label.textContent = "Please enter your name: ";
    label.for = "player";
    label.type = "text"
    submit.id = "submitName";
    field.id = "player";
    field.type = "text";
    field.name = "player";
    submit.textContent = "Submit";
    
    // add elements to DOM
    target.appendChild(form);
    form.appendChild(label);
    form.appendChild(field);
    form.appendChild(submit);
    // submitBtn.addEventListener("click", gameOver);
    submit.addEventListener("click", submitNameLocal);
};

function submitNameLocal(event) {
    event.preventDefault();
    console.log("IT IS WORKING");
    console.log(player.value);
    player = player.value;
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("score", JSON.stringify(score));
    var target = document.querySelector('#yourName');
    var play = document.createElement('button');
    play.id = "play"
    play.textContent = "Play Again?"
    target.appendChild(play);
    play.addEventListener("click", playAgain);
    if (score > highScore) {
        highScore = player + " - " + score;
        document.querySelector("#highscore").textContent = highScore;
    }
};

function playAgain() {
    startButton.disabled = false;
    yourName.removeChild(play);
    questionNumber = 0;
    timerCount = 10;
    timerElement.textContent = timerCount;
};