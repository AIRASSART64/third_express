const express = require('express');
const router = express.Router();

let gameState = {
  playerScore: 0,
  computerScore: 0,
  gameOver: false,
  result: "",
  playerCards: [],
  computerCards: []
};

// 4 symboles de cartes possibles 
const suits = ["♠️", "♥️", "♦️", "♣️"];
// lancement de la distribution de cartes et return d'un tableau associant valeur et symbole des carte
function drawCard() {
  const value = Math.floor(Math.random() * 11) + 1;
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return { value, suit, label: `${value}${suit}` };
}
// situation du jeu au départ ou reset 
router.post('/blackjack/reset', (req, res) => {
    gameState = {
    playerScore: 0,
    computerScore: 0,
    gameOver: false,
    result: "",
    playerCards: [],
    computerCards: []
  };
  res.json(gameState);
});
// lancement et déroulement du jeu 
router.post('/blackjack/play', (req, res) => {
  if (gameState.gameOver) return res.json(gameState);
// quand le jeu est lancé les cartes s'affichent et les scores s'incrémentent
  const playerCard = drawCard();
  gameState.playerCards.push(playerCard);
  gameState.playerScore += playerCard.value;
// pour l'ordi dés qu'il atteint ou dépasse 16 il ne peut plus piocher
  if (gameState.computerScore < 16) {
    const computerCard = drawCard();
    gameState.computerCards.push(computerCard);
    gameState.computerScore += computerCard.value;
  }
 // les différents cas de fgure de conclusion du jeu : les deux gagants et deux perdants
  if (gameState.playerScore > 21) {
    gameState.gameOver = true;
    gameState.result = " Perdu! Tu as dépassé 21.";
  } else if (gameState.computerScore === 21) {
    gameState.gameOver = true;
    gameState.result = " Perdu! L'ordi a atteint 21!";
  }else if (gameState.playerScore === 21) {
    gameState.gameOver = true;
    gameState.result = " Gagné! Tu as atteint 21!";
  } else if (gameState.computerScore > 21) {
    gameState.gameOver = true;
    gameState.result = " Gagné! L'ordi a dépassé 21.";
  }

  res.json(gameState);
});
// Fonction pour stopper le jeu
router.post('/blackjack/stand', (req, res) => {
  if (gameState.gameOver) return res.json(gameState);

  if (gameState.computerScore < 16) {
    const computerCard = drawCard();
    gameState.computerCards.push(computerCard);
    gameState.computerScore += computerCard.value;
  }
// les differents cas de figure de conclusion du jeu
  if (gameState.computerScore > 21) {
    gameState.result = " Gagné! L'ordi a dépassé 21.";
  } else if (gameState.computerScore >= gameState.playerScore) {
    gameState.result = " Perdu! L'ordi a battu ou égalé ton score.";
  }else if (gameState.computerScore === 21) {
    gameState.result = " Perdu! L'ordi a atteint 21.";
  }
  // si les cas de figures ne se sont pas produits 
  else {
    gameState.result = " Gagné! Ton score est supérieur à celui de l'ordi.";
  }

  gameState.gameOver = true;
  res.json(gameState);
});

module.exports = router;