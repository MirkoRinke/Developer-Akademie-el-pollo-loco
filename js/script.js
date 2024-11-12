import { loadGameWorld, playSound } from "./game.js";
import { bg_sound } from "./sounds.js";

function playBgSound() {
  setTimeout(() => playSound(bg_sound, 0.05), 1); // play the background music
}

document.addEventListener("click", function playOnFirstClick() {
  playBgSound();
  document.removeEventListener("click", playOnFirstClick);
});

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

document.addEventListener("DOMContentLoaded", () => {
  const buttons = [
    { id: "move_left", key: "ArrowLeft" },
    { id: "move_right", key: "ArrowRight" },
    { id: "jump", key: " " },
    { id: "throw", key: "f" },
  ];

  buttons.forEach(({ id, key }) => {
    const button = document.getElementById(id);
    button.addEventListener("touchstart", () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key }));
    });
    button.addEventListener("touchend", () => {
      document.dispatchEvent(new KeyboardEvent("keyup", { key }));
    });
  });
});

function toggleFullscreen() {
  const canvas = document.getElementById("canvas");
  canvas.requestFullscreen();
}

window.toggleFullscreen = toggleFullscreen; // make the toggleFullscreen function available globally temporarily
