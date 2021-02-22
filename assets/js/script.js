/* incorrect answer penalties are firing upon button creation */

var timer;
var timerCount;
var score = 0;
var highscore = 0;
var highScoreDisplay = document.querySelector("#highscore");
var questionPrompt = document.querySelector("#question");
var choicesDisplay = document.querySelector("#choices");
var startButton = document.querySelector("#start");
var timerElement = document.querySelector("#timerCount");
var questionNumber = 0;
var body = document.querySelector("#body");
var yourName = document.querySelector("#yourName");

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
        choice.setAttribute("class", "btn-sm btn-primary px-4 mx-2")
        choicesDisplay.appendChild(choice);
    }
    var btns = document.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', checkAnswer) 
    }
};
  
function checkAnswer() {
    var question = questions[questionNumber];
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
    // timerCount -= 10;
    // body.style.opacity = "0.5";
    // choices.style = "transform: translate(200px, 0); transition-duration: 5s";
    }
};

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    // Tests if time has run out
    if (timerCount <= 0) {
      questionPrompt.removeChild(ask);
      while (choicesDisplay.firstChild) {
        choicesDisplay.removeChild(choicesDisplay.lastChild);
      }
      clearInterval(timer);
      timerCount = 0;
      timerElement.textContent = timerCount;
      gameOver();
    }
  }, 1000);
}

function startGame() {
    console.log(startButton.value);
    startButton.disabled = true;
    timerCount = 5;
    timerElement.textContent = timerCount;
    startTimer();
    askQuestion();
  };


  function gameOver() {
    body.style.opacity = "1";
    var target = document.querySelector('#yourName');
    var form = document.createElement('form');
    var div = document.createElement('div');
    var label = document.createElement('label');
    var field = document.createElement('input');
    var submit = document.createElement('button');
    label.textContent = "Please enter your name: ";
    form.id = "#form";
    label.for = "player";
    label.type = "text"
    submit.id = "submitName";
    field.id = "player";
    field.type = "text";
    field.name = "player";
    submit.textContent = "Submit";

    submit.setAttribute("class", "btn-sm btn-success px-4 mx-2");
    field.setAttribute("class", "form-control");
    div.setAttribute("class", "form-inline");
    // add elements to DOM
    target.appendChild(form);
    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(field);
    form.appendChild(submit);
    submit.addEventListener("click", submitNameLocal);
};

function submitNameLocal(event) {
    event.preventDefault();
    var playerName = player.value;
    console.log(score);
    console.log(playerName);
    if (score > highscore) {
        highscore = score;
        highScoreDisplay.textContent = playerName + " - " + score;
    }
    var target = document.querySelector('#yourName');
    var play = document.createElement('button');
    play.id = "play"
    play.textContent = "Play Again?"
    target.appendChild(play);
    play.addEventListener("click", playAgain);
};

function playAgain() {
    var form = document.getElementById('#form');
    startButton.disabled = false;
    yourName.removeChild(play);
    questionNumber = 0;
    timerCount = 0;
    score = 0;
    timerElement.textContent = timerCount;
    yourName.removeChild(form);
};