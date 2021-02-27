/*
import GameDeck from "./Classes/Card Classes/GameDeck.js";
import Pile from "./Classes/Card Classes/Pile.js";
import PlayerHand from "./Classes/Card Classes/PlayerHand.js";
*/
import Game from "./Classes/Game Classes/Game.js";

const startForm = document.getElementById("new-game-form");
const playingBoard = document.getElementById("playing-board");

let game =startForm.addEventListener("submit", startGame);

 function startGame(event) {
  event.preventDefault();
  const names = [];
  document.querySelectorAll(".player-name").forEach((input) => {
    if (input.value) {
      names.push(input.value);
      input.value = "";
    }
  });

  const maximumForYaniv = document.getElementById("maximum-for-yaniv").value;
  const maxPointForPlayer = document.getElementById("maximum-points-for-player")
    .value;
  const cardsAtStart = document.getElementById("cards-at-start");
  startForm.style.display = "none";
  playingBoard.style.display = "grid";
  return new Game(names, maximumForYaniv, maxPointForPlayer, cardsAtStart);

  //setTimeout(()=>startForm.style.display = "initial",1000)
};
