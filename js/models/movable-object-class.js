/**
 * Import the DrawableObject class from the drawable-object.class.js module.
 * Import the setStoppableInterval and playSound functions from the game.js module.
 * Import the jump_sound and snoring_sound audio files from the sounds.js module.
 */
import { DrawableObject } from "./drawable-object.class.js";
import { setStoppableInterval, playSound } from "../game.js";
import { jump_sound, snoring_sound } from "../sounds.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;

/**
 * Represents a movable object that extends DrawableObject.
 * @class
 * @extends DrawableObject
 */
export class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * Applies gravity to the object by continuously adjusting its vertical position and speed.
   * Uses a stoppable interval to repeatedly check if the object is in the air and update its position and speed accordingly.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isInAir()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is in the air.
   *
   * @param {number} [currentY=0] - The current Y position to compare with the object's vertical speed.
   * @returns {boolean} - Returns true if the object is above ground or its vertical speed is greater than the current Y position.
   */
  isInAir(currentY = 0) {
    return this.isAboveGround() || this.speedY > currentY;
  }

  /**
   * Checks if the object is above the ground.
   * For ThrowableObject instances, it always returns true.
   * For other instances, it checks if the object's y position is above a certain threshold.
   *
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this.constructor.name === "ThrowableObject") {
      return true;
    } else {
      return this.y < canvasHeight - 349;
    }
  }

  /**
   * Checks if this object is colliding with another movable object.
   *
   * @param {Object} movableObject - The other movable object to check collision with.
   * @returns {boolean} - Returns true if there is a collision, otherwise false.
   */
  isColliding(movableObject) {
    const buffers = {
      Character: { top: -150, bottom: 0, left: -50, right: -50 },
      Chicken: { top: -25, bottom: -25, left: -25, right: -25 },
      ChickenSmall: { top: -12, bottom: -12, left: -12, right: -12 },
      SalsaBottles: { top: -30, bottom: -30, left: -30, right: -30 },
      Coin: { top: -20, bottom: -20, left: -20, right: -20 },
    };
    const bufferThis = buffers[this.constructor.name] || { top: 0, bottom: 0, left: 0, right: 0 };
    const bufferOther = buffers[movableObject.constructor.name] || { top: 0, bottom: 0, left: 0, right: 0 };
    const collisionX = this.x + this.width + bufferThis.right > movableObject.x - bufferOther.left && this.x - bufferThis.left < movableObject.x + movableObject.width + bufferOther.right;
    const collisionY = this.y + this.height + bufferThis.bottom > movableObject.y - bufferOther.top && this.y - bufferThis.top < movableObject.y + movableObject.height + bufferOther.bottom;
    return collisionX && collisionY;
  }

  /**
   * Reduces the energy of the object when hit.
   *
   * @param {number} [multiplier=1] - The multiplier for the energy reduction.
   * @param {boolean} [fromAbove=false] - Indicates if the hit is from above.
   */
  hit(multiplier = 1, fromAbove = false) {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastHit < 1000) return;
    if (this.energy <= 0) return;
    if (!fromAbove) {
      this.energy -= 2 * multiplier;
    }
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt.
   *
   * @returns {boolean} True if the object was hit within the last second, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead.
   *
   * @returns {boolean} True if the object's energy is zero, otherwise false.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Plays an animation by cycling through an array of image paths.
   *
   * @param {string[]} images - An array of image paths to be used in the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by increasing its x-coordinate by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting the vertical speed and playing the jump sound.
   */
  jump() {
    this.speedY = 30;
    snoring_sound.pause();
    snoring_sound.currentTime = 0;
    playSound(jump_sound, 0.1);
  }
}
