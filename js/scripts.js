'use strict';

const inputs = document.querySelector('.inputs'),
btnReset = document.querySelector('.btn-reset'),
hint = document.querySelector('.hint span'),
wrongLetter = document.querySelector('.wrong-letter span'),
guessLeft = document.querySelector('.guess-left span'),
typingInput = document.querySelector('.typing-input'),
popup = document.querySelector('.popup');


let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];  // Getting random object from wordList array
    word = ranObj.word; // Getting word of random object
    maxGuesses = 5;
    corrects = [];
    incorrects = [];
    
    hint.textContent = ranObj.hint;
    guessLeft.textContent = maxGuesses;
    wrongLetter.textContent = incorrects;

    inputs.innerHTML = '';
    for(let i = 0; i < word.length; i++) {
        inputs.insertAdjacentHTML('beforeend', "<input type='text' disabled>");
    }
    
}
randomWord();

const displayPopup = function(heading, msg) {
    popup.querySelector('h1').textContent = heading;
    popup.querySelector('p').textContent = msg;
    popup.classList.remove('hidden');
}

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key.toUpperCase()}`) && !corrects.includes(key)) {
        
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll('input')[i].value = key;
                }
            }
        } else {
            incorrects.push(` ${key.toUpperCase()}`);
            maxGuesses--;
        }
        guessLeft.textContent = maxGuesses;
        wrongLetter.textContent = incorrects;
    }
    
    typingInput.value = '';

    setTimeout(() => {
        if(corrects.length === word.length) {
            displayPopup('Congrats!', `You've found the word ${word.toUpperCase()}`);
            randomWord();

        } else if(maxGuesses < 1) {
            displayPopup('Game Over!', "You couldn't find all letters");

            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll('input')[i].value = word[i];
                typingInput.blur();
            }
        }
    });
}

popup.querySelector('.ok').addEventListener('click', () => popup.classList.add('hidden'));

btnReset.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
inputs.addEventListener('click', () => {
    if(maxGuesses > 0) typingInput.focus();
});
document.addEventListener('keydown', () => {
    if(maxGuesses > 0) typingInput.focus();
});