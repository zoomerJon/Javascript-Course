/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixesRolled;

init();



document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1 Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        console.log(dice, diceTwo);
        // 1.5 Check if 6 was rolled
        if (dice === 6 && diceTwo === 6) {
            loseScore();
            return;
        } else if (dice === 6 || diceTwo === 6) {
            sixesRolled += 1;
            if (sixesRolled === 2) {
                loseScore();
                return;
            }    
        } else {
            sixesRolled = 0;
        }
        // 2 Display Result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceTwoDOM = document.querySelector('.diceSecond');
        diceTwoDOM.style.display = 'block';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';

        // 3 Update Round Score If the Rolled Number is Not a One 
        if (dice !== 1 && diceTwo !== 1) {
            // Add Score
            roundScore += dice;
            roundScore += diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
    } 
}); 



document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] >= document.getElementById('winScore').value) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            gamePlaying = false;
        } else {
        // Next Player
        nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next Player
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    sixesRolled = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceSecond').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    sixesRolled = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceSecond').style.display = 'none';

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

function loseScore() {
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = 0;
    sixesRolled = 0;
    nextPlayer();
}
// YEAH BABY


var x = 'ok dude';
console.log(typeof x.indexOf('o'));
console.log(document.getElementById('winScore').value)

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
