//Define global variables
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
var correctText = document.querySelector("#correctText");
var wrongText = document.querySelector("#wrongText");
var leaderboard = [];

//Event listener for start button
startButton.addEventListener("click", startGame);

//Sets innerHTML of corrent/incorrect messages
correctText.innerHTML = "&nbsp;&nbsp;&nbsp;Correct!&nbsp;&nbsp;&nbsp;";
wrongText.innerHTML = "&nbsp;&nbsp;&nbsp;Wrong!&nbsp;&nbsp;&nbsp;";

// Questions array
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
{
    prompt: "The answer is ain't",
    choices: ["yes", "no", "not", "ain't"],
    correct: "2",
},
{
    prompt: "The answer is also ain't",
    choices: ["no", "yes", "ain't", "not"],
    correct: "2",
},
{
    prompt: "The answer might be ain't",
    choices: ["ain't", "not", "yes", "no"],
    correct: "1",
},
{
    prompt: "The answer is definitely ain't",
    choices: ["no", "ain't", "not", "yes"],
    correct: "2",
},
];

// Start the game
function startGame() {
    console.log(startButton.value);
    startButton.disabled = true;
    timerCount = 10;
    timerElement.textContent = timerCount;
    startTimer();
    askQuestion();
  };

// Start the Timer, set trigger for the end of game
function startTimer() {
    startButton.setAttribute("class", "d-none");
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      // Tests if time has run out. If so, clear out the question and choices and initiate end game sequence
      if (timerCount <= 0 || questionNumber == questions.length) {
        correctText.setAttribute("id", "correctText");
        if (questionNumber < questions.length) {
          var ask = document.querySelector("#ask");
          var btn1 = document.querySelector("#button1");
          var btn2 = document.querySelector("#button2");
          var btn3 = document.querySelector("#button3");
          var btn4 = document.querySelector("#button4");
          questionPrompt.removeChild(ask);
          choicesDisplay.removeChild(btn1);
          choicesDisplay.removeChild(btn2);
          choicesDisplay.removeChild(btn3);
          choicesDisplay.removeChild(btn4);
        }
        clearInterval(timer);
        timerCount = 0;
        timerElement.textContent = timerCount;
        gameOver();
      }
    }, 1000);
  };

// Ask questions
function askQuestion() {
    // for questions 2 and onward, "Correct!" will display for a moment before being hidden
    setTimeout(function() { correctText.setAttribute("id", "correctText"); }, 500);
    var question = questions[questionNumber]; 
    // pulls question info from the array, creates span and button elements
    var ask = document.createElement('span');
    ask.setAttribute("class", "mt-4");
    ask.textContent = questions[questionNumber].prompt;
    ask.id = "ask";
    questionPrompt.appendChild(ask);
    for (var i = 0; i < question.choices.length; i++) {
        var choice = document.createElement('button');
        choice.textContent = question.choices[i];
        choice.id = "button" + (i + 1);
        choice.value = i;
        choice.setAttribute("class", "btn-sm btn-primary px-4 mx-2");
        choicesDisplay.appendChild(choice);
    }
    // create event listeners for the answer buttons so answer selection can be checked for correct/incorrect
    var btn1 = document.querySelector("#button1");
    var btn2 = document.querySelector("#button2");
    var btn3 = document.querySelector("#button3");
    var btn4 = document.querySelector("#button4");
    btn1.addEventListener('click', checkAnswer);
    btn2.addEventListener('click', checkAnswer);
    btn3.addEventListener('click', checkAnswer);
    btn4.addEventListener('click', checkAnswer);
};

// Check for answer correct/incorrect  
function checkAnswer() {
    // redefine question and button variables locally
    var ask = document.querySelector("#ask");
    var question = questions[questionNumber];
    var btn1 = document.querySelector("#button1");
    var btn2 = document.querySelector("#button2");
    var btn3 = document.querySelector("#button3");
    var btn4 = document.querySelector("#button4");
    // if correct answer, increase score, advance to next question number, remove previous question span and answer buttons, ask new question
    if (this.value == question.correct) {
        correctText.setAttribute("id", "correctText.show");
        score++;
        questionNumber++;
        questionPrompt.removeChild(ask);
        choicesDisplay.removeChild(btn1);
        choicesDisplay.removeChild(btn2);
        choicesDisplay.removeChild(btn3);
        choicesDisplay.removeChild(btn4);
        if (questionNumber < questions.length){
            askQuestion();
        }
    // if incorrect answer, deduct time, display "Wrong!" for 50 milliseconds, possibly increment visual distortion elements
    } else {
        wrongText.setAttribute("id", "wrongText.show");
        timerCount -= 3;
        setTimeout(function() { wrongText.setAttribute("id", "wrongText"); }, 500);
        // body.style.opacity = "0.5";
        // choices.style = "transform: translate(200px, 0); transition-duration: 5s";
    }
};

// End game, submit name
function gameOver() {
    // body.style.opacity = "1";
    // define and create name submit form elements
    var target = document.querySelector('#yourName');
    var form = document.createElement('form');
    var div = document.createElement('div');
    var label = document.createElement('label');
    var field = document.createElement('input');
    var submit = document.createElement('button');
    label.textContent = "Please enter your name: ";
    label.setAttribute("class", "mr-2")
    form.id = "#form";
    label.for = "player";
    label.type = "text"
    submit.id = "submitName";
    field.id = "player";
    field.type = "text";
    field.name = "player";
    submit.textContent = "Submit";
    submit.setAttribute("class", "btn-sm btn-success px-4 mt-2");
    field.setAttribute("class", "form-control");
    div.setAttribute("class", "form-inline");
    target.appendChild(form);
    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(field);
    target.appendChild(submit);
    submit.addEventListener("click", saveName);
};

// Save name if a new high score
function saveName(event) {
    event.preventDefault();
    var playerName = player.value.trim();
    // if score is higher than previous value of highscore, replace as new value and save new high score
    if (score > highscore) {
        highscore = score;
        highScoreDisplay.textContent = playerName + ", " + score;
    }
    var user = {
        name: playerName,
        score: score,
    }
    leaderboard.push(user);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    //clear all form elements
    var target = document.querySelector('#yourName');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    buildLeaderboard();
};

function buildLeaderboard() {
    // Retrieve leaderboard array from local storage, sort it in descending order based on score value, and create a list with the top 4 scores
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    var target = document.querySelector('#yourName');
    leaderboard.sort((a, b) => b.score - a.score);

    for (var i = 0; (i < leaderboard.length) && (i <4); i++) {
        var list = document.createElement('li');
        list.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        list.style = "font-size: .5em";
        questionPrompt.appendChild(list);
    }
    // Create "Play Again?" button
    var play = document.createElement('button');
    play.id = "play"
    play.textContent = "Play Again?"
    target.appendChild(play);
    play.setAttribute("class", "btn btn-primary px-4 mt-4");
    play.addEventListener("click", playAgain);
};

// Offer user a chance to play again
function playAgain() {
    var form = document.getElementById('#form');
    startButton.disabled = false;
    startButton.setAttribute("class", "btn btn-primary px-4 mt-5");
    yourName.removeChild(play);
    var target = document.querySelector('#question');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    questionNumber = 0;
    timerCount = 0;
    score = 0;
    timerElement.textContent = timerCount;
};