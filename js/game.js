let intervalId = []; // variable to store the interval ID

// Load World and Keyboard classes from the models folder
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { initLevel1 } from "./Levels/level1.js";

let canvas; // canvas element
let world; // world object
let keyboard = new Keyboard(); // keyboard object to handle key presses
let allSounds = []; // array to store all sounds
let muteSounds = false; // variable to mute all sounds
export let userInteracted = false;

const setUserInteracted = () => {
  userInteracted = true;
  ["click", "keydown", "touchstart"].forEach((event) => {
    document.removeEventListener(event, setUserInteracted);
  });
};

["click", "keydown", "touchstart"].forEach((event) => {
  document.addEventListener(event, setUserInteracted, { once: true });
});

// Function to set a stoppable interval
export function setStoppableInterval(callback, delay) {
  //! Only fix for the interval issue
  setTimeout(() => {
    // set a timeout to delay the execution of the interval by 0 milliseconds to allow the game to start
    let Id = setInterval(callback, delay);
    intervalId.push(Id);
  }, 0);
}

// Function to play a sound
export function playSound(sound, volume = 0.5) {
  if (userInteracted === true) {
    if (muteSounds) return;
    sound.volume = volume;
    sound.play();
    allSounds.push(sound);
  }
}

// Function to stop all sounds
export function toggleAllSounds() {
  allSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
  allSounds = [];
  muteSounds = !muteSounds;
}
window.toggleAllSounds = toggleAllSounds; //! make the stopAllSounds function available globally temporarily

// Function to stop the game by clearing all intervals
export function stopGame() {
  intervalId.forEach((Id) => {
    clearInterval(Id);
  });
}

// Initialize the world object
export async function loadGameWorld() {
  initLevel1(); // call the updateLevel1 function to update the level
  canvas = document.getElementById("canvas"); // get the canvas element
  world = new World(canvas, keyboard); // create a new world object
}

// Event listeners to handle key presses
document.addEventListener("keydown", (e) => {
  if (e.key === "d" || e.key == "ArrowRight") keyboard.RIGHT = true; // set RIGHT to true if the right arrow key is pressed
  if (e.key === "a" || e.key == "ArrowLeft") keyboard.LEFT = true; // set LEFT to true if the left arrow key is pressed
  if (e.key === " ") keyboard.JUMP = true; // set JUMP to true if the space key is pressed
  if (e.key === "f") keyboard.THRO = true; // set D to true if the d key is pressed
});

// Event listeners to handle key releases
document.addEventListener("keyup", (e) => {
  if (e.key === "d" || e.key == "ArrowRight") keyboard.RIGHT = false; // set RIGHT to false if the right arrow key is released
  if (e.key === "a" || e.key == "ArrowLeft") keyboard.LEFT = false; // set LEFT to false if the left arrow key is released
  if (e.key === " ") keyboard.JUMP = false; // set JUMP to false if the space key is released
  if (e.key === "f") keyboard.THRO = false; // set D to false if the d key is released
});
