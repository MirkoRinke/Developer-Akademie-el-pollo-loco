import { loadGameWorld } from "./game.js";

function startGame() {
  const startScreenRef = document.getElementById("start_screen");
  const gameOverScreenRef = document.getElementById("game_over_screen");
  const winScreenRef = document.getElementById("win_screen");
  startScreenRef.style.display = "none";
  gameOverScreenRef.style.display = "none";
  winScreenRef.style.display = "none";
  loadGameWorld();
}
window.startGame = startGame; // make the startGame function available globally temporarily
