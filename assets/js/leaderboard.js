var leaderboard = [
{
    player: "Tomek",
    score: 7,
},
{
    player: "Anna",
    score: 14,
},
{
    player: "Sean",
    score: 3,
},
{
    player: "Joe",
    score: 9,
},
{
    player: "Carla",
    score: 5,
}
]

// leaderboard.sort(function(a, b){
//     return b.score - a.score;
// });

// for (var i = 0; i < leaderboard.length; i++) {
//   // increase rank only if current score less than previous
//   if (i > 0 && leaderboard[i].score < leaderboard[i - 1].score) {
//     rank++;
//   }
//   console.log(leaderboard[i].rank);
//   leaderboard[i].rank = rank;
// }

// function print(element) {
//     console.log(element.score);
// }

// leaderboard.forEach(print);

leaderboard.sort((a, b) => b.score - a.score);

leaderboard.forEach((e) => {
    console.log(`${e.player} ${e.score}`);
});
