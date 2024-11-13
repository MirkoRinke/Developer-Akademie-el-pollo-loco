/**
 * @module "cloud.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 * Import the setStoppableInterval function from the game.js module.
 * Import the cloudsSpeed constant from the level1.js module.
 */
import { MovableObject } from "./movable-object-class.js";
import { setStoppableInterval } from "../game.js";
import { cloudsSpeed } from "../Levels/level1.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;

/**
 * Represents a cloud in the game.
 * @extends MovableObject
 */
export class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  /**
   * Creates an instance of the Cloud class.
   * Loads the cloud image and sets a random position for the cloud.
   */
  constructor() {
    super().loadImage("./assets/images/background/layers/4_clouds/1.png");
    this.x = Math.random() * (canvasWidth * 2.5);
    this.y = Math.random() * 100;
    this.animate();
  }

  /**
   * Animates the cloud by managing its movement.
   */
  animate() {
    this.manageCloudMovement();
  }

  /**
   * Manages the movement of the cloud by updating its position at regular intervals.
   * The cloud moves to the left based on its speed and a global cloudsSpeed variable.
   * When the cloud moves off the canvas, it reappears at a random position on the right.
   */
  manageCloudMovement() {
    setStoppableInterval(() => {
      this.x -= this.speed * cloudsSpeed;
      if (this.x < -this.width) {
        this.x = canvasWidth + Math.random() * (canvasWidth * 2.5);
      }
    }, 1000 / 60);
  }
}
