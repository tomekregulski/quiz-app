var score = 20;

document.querySelector("#yourScore").textContent = score;

var submitBtn = document.querySelector("#trigger");

submitBtn.addEventListener("click", gameOver);

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
    // var submitName = document.querySelector("#submitName");
    
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
};

function playAgain() {
    console.log("PLAY AGAIN");
};
