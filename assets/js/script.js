/*
1) Start Button -> Starts timer and shows the first question 
2) Correct answer -> new question, score ++
3) Wrong answer -> deduct time
4) Timer = 0 \\ All questions answered -> Game Over
5) Game Over -> Save initials and score

a) [need an array of questions]
b) need loop to have questions -> li

*/

var timer;
var score = 0;
var highScore = 0;
var questionPrompt = document.querySelector("#question");
var choicesDisplay = document.querySelector("#choices");
var startButton = document.querySelector("#start");
var timerElement = document.querySelector("#timerCount");
var timerCount;
var questionNumber = 0;

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()



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
                timerCount = timerCount- 10;
            }
            
        })
    }
};

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      var userName = prompt("What is your name?");
      localStorage.setItem("player", JSON.stringify(userName));
      localStorage.setItem("score", JSON.stringify(score));
      if (score > highScore) {
          highScore = userName + " - " + score;
          document.querySelector("#highscore").textContent = highScore;
      }
      questionNumber = 0;
      console.log(questionNumber);
      questionPrompt.removeChild(ask);
      while (choicesDisplay.firstChild) {
        choicesDisplay.removeChild(choicesDisplay.lastChild);
      }
      startButton.disabled = false;
      clearInterval(timer);
    //   loseGame();
    }
  }, 1000);
}

function startGame() {
    console.log(startButton.value);
    startButton.disabled = true;
    // isWin = false;
    timerCount = 100;
    // // Prevents start button from being clicked when round is in progress
    // startButton.disabled = true;
    // renderBlanks()
    startTimer();
    askQuestion();
  };

