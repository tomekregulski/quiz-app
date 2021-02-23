var score = 10;
var scoreText = document.querySelector("#score");
var submitBtn = document.querySelector("#submit");
var nameInput = document.querySelector("#name");
var leaderList = document.querySelector("#leaders");
var leaderboard = [];

submitBtn.addEventListener("click", saveUser);

scoreText.textContent = `Your score is ${score}`;

// function saveUser(event) {
//     event.preventDefault();

//     var user = {
//         name: nameInput.value.trim(),
//         score: score,
//     }

//     // localStorage.setItem((Math.floor(Math.random() * Math.floor(10))).toString(), JSON.stringify(user));
//     localStorage.setItem(nameInput.value, JSON.stringify(user));
// };

function saveUser(event) {
    event.preventDefault();

    var user = {
        name: nameInput.value.trim(),
        score: score,
    }

    leaderboard.push(user);
    console.log(leaderboard);
};

console.log(leaderboard);

function createBoard() {
    for (var i = 0; i < leaderboard.length; i++) {
        var list = document.createElement('li');
        list.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        leaderList.appendChild(list);
    }
};