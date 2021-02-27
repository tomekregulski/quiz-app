//Define global variables
var timer;
var timerCount;
var currentScore = document.querySelector("#score");
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
var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
var ask;
var btn1;
var btn2;
var btn3;
var btn4;
var choice;
var question;
var playBtn;

//Event listener for start button
startButton.addEventListener("click", startGame);

// Questions array
var questions = [
{
    prompt: "Which HTML tag is used to link a javascript file?",
    choices: ["<javascript>", "<scripted>", "<script>", "<js>"],
    correct: "2",
},
{
    prompt: "What is the correct full syntax for linking script.js to an HTML file?",
    choices: ["<script src=”geek.js”>", " <script href=”geek.js”>", " <script ref=”geek.js”>", "<script name=”geek.js”>"],
    correct: "0",
},
{
    prompt: "Which symbols are used to enclose an array?",
    choices: ["{}", "[]", "<>", "()"],
    correct: "1",
},
{
    prompt: "Which of the following is not a reserved word in JavaScript?",
    choices: ["interface", "throws", "program", "short"],
    correct: "2",
},
{
    prompt: "Which is a way of allowing JavaScript objects to be easily communicated with other languages?",
    choices: ["JSON", "AJAX", "API", "MongoDB"],
    correct: "0",
},
{
    prompt: "What is one of the most popular JavaScript libraries?",
    choices: ["JSON", "jFetch", "querySelect", "jQuery"],
    correct: "3",
},
{
    prompt: "Which of the following allows for the local storage of data?",
    choices: ["MongoDB", "localStorage", "clientStorage", "clientData"],
    correct: "1",
},
{
    prompt: "What is the name for a JavaScript structure that holds key:value pairs?",
    choices: ["Object", "Array", "Function", "Boolean"],
    correct: "0",
},
]

// trigger init function, which loads the highscore upon page load, if there is one in localStorage
init();

function init() {
    getHighscore();
}

// Loads the current high score to be displayed on the page
function getHighscore() {
    if (JSON.parse(localStorage.getItem("leaderboard"))) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
        leaderboard.sort((a, b) => b.score - a.score);
        for (var i = 0; (i < 1); i++) {
            highScoreDisplay.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        }
    }
};

// Start the game
function startGame() {
    startButton.disabled = true;
    startTimer();
    askQuestion();
};

// Start the timer, set trigger for the end of game
function startTimer() {
    startButton.setAttribute("class", "d-none");
    timerCount = 50;
    timerElement.textContent = timerCount;
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      // Tests if time has run out. If so, clear out the question and choices and initiate end game sequence
      if (timerCount <= 0 || questionNumber == questions.length) {
        correctText.setAttribute("id", "correctText");
        if (questionNumber < questions.length) {
            questionPrompt.removeChild(ask);
            target = choicesDisplay;
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
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
    question = questions[questionNumber]; 
    // pulls question info from the array, creates span and button elements
    ask = document.createElement('span');
    ask.setAttribute("class", "mt-4");
    ask.textContent = questions[questionNumber].prompt;
    ask.setAttribute("style", "font-size: .5em");
    ask.id = "ask";
    questionPrompt.appendChild(ask);
    for (var i = 0; i < question.choices.length; i++) {
        choice = document.createElement('button');
        choice.textContent = question.choices[i];
        choice.id = "button" + (i + 1);
        choice.value = i;
        choice.setAttribute("class", "btn-sm btn-primary px-2 mx-2 mt-1");
        choicesDisplay.appendChild(choice);
    }
    // create event listeners for the answer buttons so answer selection can be checked for correct/incorrect
    btn1 = document.querySelector("#button1");
    btn2 = document.querySelector("#button2");
    btn3 = document.querySelector("#button3");
    btn4 = document.querySelector("#button4");
    btn1.addEventListener('click', checkAnswer);
    btn2.addEventListener('click', checkAnswer);
    btn3.addEventListener('click', checkAnswer);
    btn4.addEventListener('click', checkAnswer);
};

// Check for answer correct/incorrect  
function checkAnswer() {
    // if correct answer, increase score, advance to next question number, remove previous question span and answer buttons, ask new question
    if (this.value == question.correct) {
        correctText.setAttribute("id", "correctText.show");
        score++;
        currentScore.textContent = score;
        questionNumber++;
        questionPrompt.removeChild(ask);
        choicesDisplay.removeChild(btn1);
        choicesDisplay.removeChild(btn2);
        choicesDisplay.removeChild(btn3);
        choicesDisplay.removeChild(btn4);
        if (questionNumber < questions.length){
            askQuestion();
        }
    // if incorrect answer, deduct time, display "Wrong!" for 50 milliseconds
    } else {
        wrongText.setAttribute("id", "wrongText.show");
        timerCount -= 3;
        setTimeout(function() { wrongText.setAttribute("id", "wrongText"); }, 500);
    }
};

// End game, submit name
function gameOver() {
    // define and create name submit form elements
    var target = document.querySelector('#yourName');
    var form = document.createElement('form');
    var div = document.createElement('div');
    // var scoreText = document.createElement('p');
    var label = document.createElement('label');
    var field = document.createElement('input');
    var submit = document.createElement('button');
    label.textContent = "Please enter your name: ";
    label.setAttribute("class", "mr-2")
    // div.setAttribute("class", "row d-flex flex-column justify-content-center")
    form.id = "#form";
    label.for = "player";
    label.type = "text"
    // scoreText.textContent = `Your final score is ${score}`;
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
    // div.appendChild(scoreText);
    div.appendChild(label);
    div.appendChild(field);
    target.appendChild(submit);
    submit.addEventListener("click", saveName);
};

// Save name if a new high score
function saveName(event) {
    event.preventDefault();
    var playerName = player.value.trim();
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
    leaderboard.sort((a, b) => b.score - a.score);
    var leader = document.createElement('ol');
    leader.setAttribute("class", "text-left");
    questionPrompt.appendChild(leader);
    for (var i = 0; (i < leaderboard.length) && (i <4); i++) {
        var list = document.createElement('li');
        list.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        list.style = "font-size: .7em";
        leader.appendChild(list);
    }
    // Create "Play Again?" button
    var play = document.createElement('button');
    play.id = "play"
    play.textContent = "Play Again?"
    playBtn = document.querySelector("#playAgain")
    playBtn.appendChild(play);
    play.setAttribute("class", "btn btn-primary px-4");
    play.addEventListener("click", playAgain);
};

// Offer user a chance to play again and call functions to reset game to pre-start status
function playAgain() {
    startButton.disabled = false;
    startButton.setAttribute("class", "btn btn-primary px-4 mt-5");
    playBtn.removeChild(play);
    var target = document.querySelector('#question');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    questionNumber = 0;
    timerCount = 0;
    score = 0;
    timerElement.textContent = timerCount;
    getHighscore();
};