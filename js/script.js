// Load World and Keyboard classes from the models folder
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";

// export let canvasWidth = 720;
// export let canvasHeight = 480;

let canvas; // canvas element
let world; // world object
let keyboard = new Keyboard(); // keyboard object to handle key presses

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
