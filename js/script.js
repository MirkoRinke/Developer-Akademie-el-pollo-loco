let intervalId = []; // variable to store the interval ID

// Load World and Keyboard classes from the models folder
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";

let canvas; // canvas element
let world; // world object
let keyboard = new Keyboard(); // keyboard object to handle key presses

// Function to set a stoppable interval
export function setStoppableInterval(callback, delay) {
  setTimeout(() => {
    // set a timeout to delay the execution of the interval by 0 milliseconds to allow the game to start
    let Id = setInterval(callback, delay);
    intervalId.push(Id);
  }, 0);
}

// Function to stop the game by clearing all intervals
export function stopGame() {
  intervalId.forEach((Id) => {
    clearInterval(Id);
  });
}
window.stopGame = stopGame; //! make the stopGame function available globally temporarily

// Initialize the world object
async function init() {
  canvas = document.getElementById("canvas"); // get the canvas element
  world = new World(canvas, keyboard); // create a new world object
}
init(); // call the init function

// Event listeners to handle key presses
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") keyboard.RIGHT = true; // set RIGHT to true if the right arrow key is pressed
  if (e.key === "ArrowLeft") keyboard.LEFT = true; // set LEFT to true if the left arrow key is pressed
  if (e.key === "ArrowUp") keyboard.UP = true; // set UP to true if the up arrow key is pressed
  if (e.key === "ArrowDown") keyboard.DOWN = true; // set DOWN to true if the down arrow key is pressed
  if (e.key === " ") keyboard.SPACE = true; // set SPACE to true if the space key is pressed
  if (e.key === "d") keyboard.D = true; // set D to true if the d key is pressed
});

// Event listeners to handle key releases
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") keyboard.RIGHT = false; // set RIGHT to false if the right arrow key is released
  if (e.key === "ArrowLeft") keyboard.LEFT = false; // set LEFT to false if the left arrow key is released
  if (e.key === "ArrowUp") keyboard.UP = false; // set UP to false if the up arrow key is released
  if (e.key === "ArrowDown") keyboard.DOWN = false; // set DOWN to false if the down arrow key is released
  if (e.key === " ") keyboard.SPACE = false; // set SPACE to false if the space key is released
  if (e.key === "d") keyboard.D = false; // set D to false if the d key is released
});
