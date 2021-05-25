//Define global variables
var score = 0;
var questionPrompt = document.querySelector("#question");
var choicesDisplay = document.querySelector("#choices");
var startButton = document.querySelector("#start");
var questionNumber = 0;
var body = document.querySelector("#body");
var yourName = document.querySelector("#yourName");
var correctText = document.querySelector("#correctText");
var wrongText = document.querySelector("#wrongText");
var ask;
var btn1;
var btn2;
var btn3;
var btn4;
var choice;
var question;
var playBtn;

// Event listener for start button
startButton.addEventListener("click", startQuiz);

// Questions array
var questions = [
  {
    prompt: " What is a demo?",
    choices: [
      "When you tear down a house",
      "A an event where you score free stuff",
      "An event where you hand out free product randomly",
      "A tasting event held at grocery stores",
    ],
    correct: "3",
  },
  {
    prompt:
      "There are generally two possible shifts that you can be scheduled for.  What are the times of these shifts?",
    choices: [
      "9am-12pm, 12pm-3pm",
      "11am-2pm, 3pm-6pm",
      "9am-12pm, 3pm-6pm",
      "3pm-6pm, 6pm-7pm",
    ],
    correct: "1",
  },
  // {
  //     prompt: "What are the two most important goals of a successful demo?",
  //     choices: ["Generate sales, positive customer experiences ", "Eat snacks, make friends", "Check your e-mail, chat with people", "Sell out, leave early"],
  //     correct: "0",
  // },
  // {
  //     prompt: "When does Phoodie need your availability for the upcoming month?",
  //     choices: ["On the first of each month", "On the 12th of the month prior", "On the 20th of the month prior ", "No need to send this"],
  //     correct: "1",
  // },
  // {
  //     prompt: "Your shift starts at 3pm, when should you arrive at the store?",
  //     choices: ["3pm", "2:45pm", "2pm", "2:30pm"],
  //     correct: "1",
  // },
  // {
  //     prompt: "How long does Phoodie need to fulfill a supply request?",
  //     choices: ["1 week", "1 month", "2 weeks", "10 days"],
  //     correct: "2",
  // },
  // {
  //     prompt: "What do you do if you can't find the answers you need in the Knowledge Base?",
  //     choices: ["Call Phoodie Management", "Send e-mail to all Phoodie management", "Send an e-mail to Help@phoodiemktg.com", "Send Phoodie a Facebook message "],
  //     correct: "2",
  // },
  // {
  //     prompt: "What do you do if you have an urgent need or emergency?",
  //     choices: ["Call the Brand you are demoing for", "Text the Phoodie SOS line and we will get in touch ASAP", "Call your RBA until they pick up", "Call a fellow brand ambassador "],
  //     correct: "1",
  // },
];

// Start the quiz
function startQuiz() {
  startButton.disabled = true;
  startButton.setAttribute("class", "start-hide");
  askQuestion();
}

// Ask questions
function askQuestion() {
  // for questions 2 and onward, "Correct!" will display for a moment before being hidden
  setTimeout(function () {
    correctText.setAttribute("id", "correctText");
  }, 500);
  question = questions[questionNumber];
  // pull question info from the array, creates span and button elements
  ask = document.createElement("span");
  ask.setAttribute("class", "h4");
  ask.textContent = questions[questionNumber].prompt;
  ask.id = "ask";
  questionPrompt.appendChild(ask);
  for (var i = 0; i < question.choices.length; i++) {
    choice = document.createElement("button");
    choice.textContent = question.choices[i];
    choice.id = "button" + (i + 1);
    choice.value = i;
    choice.setAttribute("class", "btn-sm btn-primary px-3 mx-2 mb-3");
    choicesDisplay.appendChild(choice);
  }
  // create event listeners for the answer buttons so answer selection can be checked for correct/incorrect
  btn1 = document.querySelector("#button1");
  btn2 = document.querySelector("#button2");
  btn3 = document.querySelector("#button3");
  btn4 = document.querySelector("#button4");
  btn1.addEventListener("click", checkAnswer);
  btn2.addEventListener("click", checkAnswer);
  btn3.addEventListener("click", checkAnswer);
  btn4.addEventListener("click", checkAnswer);
}

// Check for answer correct/incorrect
function checkAnswer() {
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
    if (questionNumber < questions.length) {
      askQuestion();
    }
  } else {
    wrongText.setAttribute("id", "wrongText.show");
    setTimeout(function () {
      wrongText.setAttribute("id", "wrongText");
    }, 500);
  }
  checkDone();
}

function checkDone() {
  if (questionNumber == questions.length) {
    target = choicesDisplay;
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    gameOver();
  }
}

// End game, submit name
function gameOver() {
  setTimeout(function () {
    correctText.setAttribute("id", "correctText");
  }, 500);
  var target = document.querySelector("#yourName");
  var form = document.createElement("form");
  var div = document.createElement("div");
  var label = document.createElement("label");
  var field = document.createElement("input");
  var submit = document.createElement("button");
  label.textContent = "Please enter your name: ";
  label.setAttribute("class", "mr-2");
  form.id = "#form";
  label.for = "player";
  label.type = "text";
  submit.id = "submitName";
  field.id = "player";
  field.type = "text";
  field.name = "player";
  form.setAttribute("class", "pl-5 pt-4 pr-5");
  submit.textContent = "Submit";
  submit.setAttribute("class", "btn-sm btn-success mt-2 mb-4 ml-5");
  field.setAttribute("class", "form-control mr-4");
  div.setAttribute("class", "form-inline");
  target.appendChild(form);
  form.appendChild(div);
  div.appendChild(label);
  div.appendChild(field);
  target.appendChild(submit);
  submit.addEventListener("click", saveName);
}

// User records name. Ideally this would get sent to a database for assessment
function saveName(event) {
  event.preventDefault();
  // Remove form elements
  var target = document.querySelector("#yourName");
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
  thankYou();
}

// Display 'thank you' message
function thankYou() {
  var target = document.querySelector("#question");
  var thanks = document.createElement("p");
  thanks.setAttribute("class", "h6");
  thanks.id = "thankYou";
  thanks.innerHTML = `<br>Thank you for taking this quiz!" <br><br> Your score was ${score}. <br><br> An onboarding representative will be in touch if any feedback is necessary. Meanwhile. please proceed to the next segment once you are ready.`;
  target.appendChild(thanks);
};
