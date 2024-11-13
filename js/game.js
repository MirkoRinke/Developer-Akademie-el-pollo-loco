/**
 * @module "game.js"
 */

/**
 * Import necessary modules and assets for the game.
 */
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { initLevel1 } from "./Levels/level1.js";
import { bg_sound } from "./sounds.js";

let intervalId = [];
let canvas;
let world;
let keyboard = new Keyboard();
let allSounds = [];
let muteSounds = false;
export let userInteracted = false;

const setUserInteracted = () => {
  userInteracted = true;
  ["click", "keydown", "touchstart"].forEach((event) => {
    document.removeEventListener(event, setUserInteracted);
  });
};

/**
 * Adds event listeners for user interaction events to set the userInteracted flag.
 * The event listeners are removed after the first interaction.
 */
["click", "keydown", "touchstart"].forEach((event) => {
  document.addEventListener(event, setUserInteracted, { once: true });
});

/**
 * Sets an interval that can be stopped later by pushing the interval ID to an array.
 * This function is a workaround for an interval issue.
 *
 * @param {Function} callback - The function to be executed at each interval.
 * @param {number} delay - The time, in milliseconds, that the timer should delay between executions of the callback function.
 */
export function setStoppableInterval(callback, delay) {
  //! setTimeout only fix for the interval issue
  setTimeout(() => {
    let Id = setInterval(callback, delay);
    intervalId.push(Id);
  }, 0);
}

/**
 * Plays a sound if the user has interacted and sounds are not muted.
 *
 * @param {HTMLAudioElement} sound - The sound to be played.
 * @param {number} [volume=0.5] - The volume level of the sound (default is 0.5).
 * @param {boolean} [loop=false] - Whether the sound should loop (default is false).
 */
export function playSound(sound, volume = 0.5, loop = false) {
  if (userInteracted === true) {
    if (muteSounds) return;
    sound.volume = volume;
    sound.loop = loop;
    sound.play();
    allSounds.push(sound);
  }
}

/**
 * Toggles the mute state of all sounds in the game.
 *
 * This function switches the display of mute and unmute icons based on the current mute state.
 * It pauses and resets all sounds, clears the list of sounds, and toggles the mute state.
 * If the sounds are unmuted, it plays the background sound at a specified volume.
 */
export function toggleAllSounds() {
  const muteSoundRef = document.getElementById("mute_sound");
  const unmuteSoundRef = document.getElementById("unmute_sound");
  muteSoundRef.style.display = muteSounds ? "block" : "none";
  unmuteSoundRef.style.display = muteSounds ? "none" : "block";
  allSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
  allSounds = [];
  muteSounds = !muteSounds;
  if (!muteSounds) playSound(bg_sound, 0.05, true);
}
window.toggleAllSounds = toggleAllSounds;

/**
 * Stops the game by clearing all intervals stored in the intervalId array.
 *
 * @function
 */
export function stopGame() {
  intervalId.forEach((Id) => {
    clearInterval(Id);
  });
}

/**
 * Loads the game world by initializing the first level,
 * setting up the canvas element, and creating a new World instance.
 *
 * @async
 * @function loadGameWorld
 * @returns {Promise<void>} A promise that resolves when the game world is loaded.
 */
export async function loadGameWorld() {
  initLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * Event listener to handle key presses and update the keyboard state.
 */
document.addEventListener("keydown", (e) => {
  if (e.key === "d" || e.key == "ArrowRight") keyboard.RIGHT = true;
  if (e.key === "a" || e.key == "ArrowLeft") keyboard.LEFT = true;
  if (e.key === " " || e.key == "ArrowUp" || e.key == "w") keyboard.JUMP = true;
  if (e.key === "f") keyboard.THRO = true;
});

/**
 * Event listener to handle key releases and update the keyboard state.
 */
document.addEventListener("keyup", (e) => {
  if (e.key === "d" || e.key == "ArrowRight") keyboard.RIGHT = false;
  if (e.key === "a" || e.key == "ArrowLeft") keyboard.LEFT = false;
  if (e.key === " " || e.key == "ArrowUp" || e.key == "w") keyboard.JUMP = false;
  if (e.key === "f") keyboard.THRO = false;
});
