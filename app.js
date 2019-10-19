/*  GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- If the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game (this value can be changed)

*/

var scores, roundScore, activePlayer, gamePlaying, diceDOM;

init();

/* ################################### 
   ######### EVENT LISTENERS ######### 
   ################################### */

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Random number
        var diceNumbers = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

        // Display the result
        dice0DOM.style.display = 'block';
        dice1DOM.style.display = 'block';
        dice0DOM.src = 'dice-' + diceNumbers[0] + '.png';
        dice1DOM.src = 'dice-' + diceNumbers[1] + '.png';
        
        // Update the round score
        if (diceNumbers[0] !== 1 && diceNumbers[1] !== 1) {
            // Add score
            roundScore += diceNumbers[0] + diceNumbers[1];
            document.getElementById('current-' + activePlayer).textContent = roundScore;  
        } else {
            // Reset round score and switch player
            resetRoundScore();
            nextPlayer();
        }
    }   
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        var winningScore;
        var input = document.querySelector('.final-score').value;
        
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // Add current score to global score
        scores[activePlayer] += roundScore;
        
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            resetRoundScore();
        } else {
            // Reset round score and switch player
            resetRoundScore();
            nextPlayer(); 
        }
        hideDice();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

/* ################################### 
   ############ FUNCTIONS ############ 
   ################################### */

function init () {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    dice0DOM = document.getElementById('dice-0');
    dice1DOM = document.getElementById('dice-1');
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
    hideDice();
}

function resetRoundScore() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function hideDice() {
    dice0DOM.style.display = 'none';
    dice1DOM.style.display = 'none';
}