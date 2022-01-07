const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false
let lockBoard = false
let firtCard, secondCard; 

function flipCard(){
    if (lockBoard) return; 
    if (this === firtCard) return;
    
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
    
}

function checkForMatch() {
    let isMatch = firtCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firtCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));