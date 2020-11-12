"use strict";

const cards = document.querySelectorAll('.card');
const bord = {
  firstActive: null,
  secondActive: null,
  isLock: false,
  hasFlippedCard: false,
  reset() {
    this.isLock = false;
    this.hasFlippedCard = false;
    this.firstActive = null;
    this.secondActive = null;
  }
};

(function shuffle() {
  cards.forEach(item => {
    let position = Math.floor(Math.random() * 12);
    item.style.order = position;
  })
})();

cards.forEach(item => item.addEventListener('click', flipCard));

function flipCard() {
  if (bord.isLock || (this === bord.firstActive)) return;
  this.classList.add('flip');

  if (!bord.hasFlippedCard) {
    bord.hasFlippedCard = true;
    bord.firstActive = this;
    return;
  }

  bord.secondActive = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = bord.firstActive.querySelector('.card-fface').src === bord.secondActive.querySelector('.card-fface').src;
  isMatch ? disableCard() : unflipCard();
}

function disableCard() {
  bord.firstActive.removeEventListener('click', flipCard);
  bord.secondActive.removeEventListener('click', flipCard);
  bord.reset();
}

function unflipCard() {
  bord.isLock = true;
  setTimeout(() => {
    bord.firstActive.classList.remove('flip');
    bord.secondActive.classList.remove('flip');
    bord.reset();
  }, 600);
}
