import Deck from "./Classes/Card Classes/Deck.js";
import GameDeck from "./Classes/Card Classes/GameDeck.js";
import Pile from "./Classes/Card Classes/Pile.js";
import PlayerHand from "./Classes/Card Classes/PlayerHand.js";

import Game from "./Classes/Game Classes/Game.js";
import Turn from "./Classes/Game Classes/Turn.js";
import Player from "./Classes/Game Classes/Player.js";

const startForm = document.getElementById("new-game-form");
const playingBoard = document.getElementById("playing-board");
let game;
let gameDeck;
let round;
//let turn;
let pile;
let activePlayer;
let yanivButton;
let markedCards = [];

startForm.addEventListener("submit", startGame, {
  once: false,
});

function startGame(event) {
  event.preventDefault();
  startForm.removeEventListener("submit", startGame);

  create_game: {
    const names = [];
    document.querySelectorAll(".player-name").forEach((input) => {
      if (input.value) {
        names.push(input.value);
        input.value = "";
      }
    });
    const maximumForYaniv = document.getElementById("maximum-for-yaniv").value;
    const maxPointForPlayer = document.getElementById(
      "maximum-points-for-player"
    ).value;
    const cardsAtStart = document.getElementById("cards-at-start").value;
    game = new Game(names, maximumForYaniv, maxPointForPlayer, cardsAtStart);
  }
  transition_to_playing_board: {
    startForm.style.display = "none";
    playingBoard.style.display = "grid";
  }
  startNewRound(game);
}
function startNewRound(game) {
  create_new_round: {
    round = game.newRound();
  }
  create_game_deck: {
    gameDeck = new GameDeck();
    gameDeck.shuffle();
    gameDeck.html = document.querySelector(".game-deck");
    pile = new Pile();
    pile.html = document.querySelector(".pile");
  }
  deal_cards: {
    round.players.forEach((player) => {
      for (let i = 0; i < game.cardsAtStart; i++) {
        player.hand.add(gameDeck.remove("top"), "top");
      }
    });
    pile.add(gameDeck.remove("top"));
  }
  init_pile_deck_graphics: {
    if (!pile.html.firstChild) {
      pile.html.append(createCardNode(pile.topCard));
      gameDeck.topCardHtml = createCardNode(null, "black");
      gameDeck.html.append(gameDeck.topCardHtml);
    }
  }
  let turn = round.newTurn();
  startNewTurn(turn);
}

function startNewTurn(turn) {
  let activePlayer = turn.player;
  alert(activePlayer.name);
  activePlayer.html = document.querySelector(".active-player");

  activateTurnGraphics();
  document.querySelector(".points-on-hand").innerText =
    "Points on hand: " + activePlayer.hand.points;
  activePlayer.html.addEventListener("click", markCards, {
    once: false,
  });

  function markCards(event) {
    let cardNode = event.target.closest("IMG");
    cardNode.card.isMarked = !cardNode.card.isMarked;
    cardNode.dataset.marked = cardNode.card.isMarked;
    markedCards = activePlayer.hand.updateMarkedCards(cardNode.card);
    document.querySelector(".points-of-marked").innerText = markedCards.length
      ? "Points of marked cards: " + activePlayer.hand.markedPoints
      : "";

    let legalCombo = activePlayer.hand.evaluateLegalCombination(markedCards);
    let throwButton = document.querySelector(".throw-button");
    throwButton.style.display = markedCards.length ? "block" : "none";
    if (legalCombo) {
      throwButton.innerText = "Throw cards";
      throwButton.dataset.legal = "true";
      throwButton.addEventListener("click", throwCardsFromHand, {
        once: false,
      });
    } else {
      throwButton.innerText = "Can't throw";
      throwButton.dataset.legal = "false";
      throwButton.removeEventListener("click", throwCardsFromHand);
    }
  }
  function throwCardsFromHand(event) {
    activePlayer.html.removeEventListener("click", markCards);
    event.target.style.display = "none";

    gameDeck.topCardHtml.dataset.clickAble = "true";
    pile.topCard.html.dataset.clickAble = "true";
    if (pile.lastAddedIsSequence) {
      pile.firstCardOfSequence.html.dataset.clickAble = "true";
    }

    gameDeck.html.addEventListener("click", drawCard, {
      once: false,
    });
    pile.topCard.html.addEventListener("click", drawCard, {
      once: false,
    });

    markedCards.forEach((card) => {
      card.isMarked = false;
      activePlayer.html.removeChild(card.html);
    });
    update_points: {
      document.querySelector(".points-of-marked").innerText = "";
    }
  }
  function drawCard(event) {
    gameDeck.topCardHtml.dataset.clickAble = "false";
    pile.topCard.html.dataset.clickAble = "false";
    if (pile.lastAddedIsSequence) {
      pile.firstCardOfSequence.html.dataset.clickAble = "false";
    }
    let target = event.target;

    if (pile.lastAddedIsSequence && target === pile.firstCardOfSequence.html) {
      activePlayer.html.append(target);
      activePlayer.hand.add(pile.remove(pile.firstCardOfSequence));
      pile.html.removeChild(pile.topCard.html);
    }

    if (target === pile.topCard.html) {
      activePlayer.html.append(target);
      activePlayer.hand.add(pile.remove("top"));
    } else {
      let cardArr = gameDeck.remove("top");

      activePlayer.hand.add(cardArr);
      cardArr.forEach((card) => activePlayer.html.append(createCardNode(card)));
      pile.html.removeChild(pile.topCard.html);
    }
    gameDeck.html.removeEventListener("click", drawCard);
    pile.topCard.html.removeEventListener("click", drawCard);
    addThrownCardToPile();
  }
  function addThrownCardToPile() {
    pile.add(activePlayer.hand.remove(markedCards));
    pile.topCard.html.dataset.clickAble = "false";
    pile.html.append(pile.topCard.html);
    if (pile.lastAddedIsSequence) {
      pile.firstCardOfSequence.html.dataset.clickAble = "false";
      pile.html.append(pile.firstCardOfSequence.html);
    }
    document.querySelector(".points-on-hand").innerText =
      "Points on hand: " + activePlayer.hand.points;
    markedCards.forEach((card) => markedCards.pop);
    finishTurn();
  }
  function finishTurn() {
    let nextButton = document.getElementById("next-turn");
    nextButton.style.display = "block";
    nextButton.addEventListener(
      "click",
      () => {
        nextButton.style.display = "none";
        startNewTurn(turn.nextTurn());
      },
      {
        once: false,
      }
    );
  }
}

function activateTurnGraphics() {
  const topPlayerDiv = document.querySelector(".top-player");
  const leftPlayerDiv = document.querySelector(".side-player.left");
  const rightPlayerDiv = document.querySelector(".side-player.right");

  deactivate_old_graphics: {
    while (activePlayer.html.firstChild) {
      activePlayer.html.removeChild(activePlayer.html.firstChild);
    }
    while (topPlayerDiv.firstChild) {
      topPlayerDiv.removeChild(topPlayerDiv.firstChild);
    }
    while (leftPlayerDiv.firstChild) {
      leftPlayerDiv.removeChild(leftPlayerDiv.firstChild);
    }
    while (rightPlayerDiv.firstChild) {
      rightPlayerDiv.removeChild(rightPlayerDiv.firstChild);
    }
  }
  player_hand_Graphics: {
    activePlayer.hand.cards.forEach((card) => {
      activePlayer.html.append(createCardNode(card));
      card.html.dataset.clickAble = "true";
    });

    switch (
      game.numberOfPlayers //set up non active players
    ) {
      case 2:
        initTopDiv(activePlayer.nextPlayer);
        break;
      case 3:
        initLeftDiv(activePlayer.nextPlayer);
        initRightDiv(activePlayer.nextPlayer.nextPlayer);

        break;
      case 4:
        initLeftDiv(activePlayer.nextPlayer);
        initTopDiv(activePlayer.nextPlayer.nextPlayer);
        initRightDiv(activePlayer.nextPlayer.nextPlayer.nextPlayer);
        break;
    }
  }

  yaniv_button: {
    if (activePlayer.canCallYaniv()) {
      yanivButton = document.getElementById("yaniv-button");
      yanivButton.style.display = "block";
      yanivButton.addEventListener("click", callYaniv, {
        once: false,
      });
      function callYaniv() {
        yanivButton.removeEventListener("click", callYaniv);
        alert("you called yaniv");
      }
    }
  }

  function initTopDiv(player) {
    const nextPlayerDiv = topPlayerDiv;
    player.hand.cards.forEach((card, index) => {
      nextPlayerDiv.append(
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black")
      );
    });
  }

  function initLeftDiv(player) {
    let nextPlayerDiv = leftPlayerDiv;
    player.hand.cards.forEach((card, index) => {
      let cardNode =
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black");
      nextPlayerDiv.append(cardNode);
      cardNode.style.transform = `rotate(90deg) scale(6) translateX(${
        4 * index
      }px) `;
    });
  }

  function initRightDiv(player) {
    let nextPlayerDiv = rightPlayerDiv;
    player.nextPlayer.hand.cards.forEach((card, index) => {
      let cardNode =
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black");
      nextPlayerDiv.append(cardNode);
      cardNode.style.transform = `rotate(90deg) scale(6) translateX(${
        4 * index
      }px) `;
    });
  }
}
function createCardNode(card, cardBack) {
  let cardNode = document.createElement("img");

  if (cardBack) {
    cardNode.setAttribute("src", `./Card Images/Back/${cardBack}.svg`);
    cardNode.setAttribute("alt", `${cardBack} back of card`);
  } else {
    cardNode.setAttribute("src", card.pictureSrc);
    cardNode.setAttribute("alt", `${card.rank} of ${card.suit}`);
    card.html = cardNode;
    cardNode.card = card;
    //  alert("card.html " + card.html);
    //  alert("cardNode.card " + cardNode.card);
  }

  return cardNode;
}
