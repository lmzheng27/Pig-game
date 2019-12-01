/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scoreCurrent, scoreTotal, diceDOM, gamePlaying;
diceDOM = document.querySelector(".dice");
newGame();

//Roll button event
document.querySelector(".btn-roll").addEventListener("click", function (){
    if (gamePlaying) {
        var dice = Math.floor(Math.random()*6+1);
        diceDOM.style.display = "inline";
        if (dice!==1){
            scoreCurrent[activePlayer] += dice;
            diceDOM.src = "./dice-img/dice-" + dice + ".png" ;
            document.getElementById("current-" + activePlayer).innerHTML = scoreCurrent[activePlayer];
        } else {
            diceDOM.src = "./dice-img/dice-" + dice + ".png" ;
            switchPlayer();
        }
    }
    
});
//Hold button event
document.querySelector(".btn-hold").addEventListener("click",function(){
    if (gamePlaying) {
        scoreTotal[activePlayer] += scoreCurrent[activePlayer];
        document.getElementById("score-" + activePlayer).innerHTML = scoreTotal[activePlayer];
        if (scoreTotal[activePlayer] >=20 ) {
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.getElementById("name-" + activePlayer).innerHTML = "Winner!!!";
            diceDOM.style.display = "none";
            gamePlaying = false;
        } else {
            switchPlayer();
        }
    }
});
//New game button event
document.querySelector(".btn-new").addEventListener("click", newGame);

function switchPlayer (){
    scoreCurrent[activePlayer] = 0;
    document.getElementById("current-" + activePlayer).innerHTML = scoreCurrent[activePlayer];
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
};

function newGame (){
    scoreCurrent = [0,0];
    scoreTotal = [0,0];
    activePlayer = 0;
    gamePlaying = true;
    diceDOM.style.display = "none";
    for (let i = 0; i < scoreTotal.length; i++) {
        document.getElementById("current-" + i).innerHTML = 0;
        document.getElementById("score-" + i).innerHTML = 0;
        document.querySelector(".player-" + i + "-panel").classList.remove("active");
        document.querySelector(".player-" + i + "-panel").classList.remove("winner");
        document.getElementById("name-" + i).innerHTML = "Player " + (i+1);
    }
    document.querySelector(".player-0-panel").classList.add("active");
    
};
