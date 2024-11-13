/**
 * @module "salsa-bottles.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 */
import { MovableObject } from "./movable-object-class.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

/**
 * Represents a salsa bottle object in the game.
 * @extends MovableObject
 * @property {number} height - The height of the salsa bottle.
 * @property {number} width - The width of the salsa bottle.
 * @property {number} y - The y-coordinate of the salsa bottle.
 * @constructor
 */
export class SalsaBottles extends MovableObject {
  height = 60;
  width = 60;
  y = canvasHeight - this.height - 60;

  /**
   * Creates an instance of the SalsaBottle class.
   * Loads the image of the salsa bottle and sets its initial position.
   */
  constructor() {
    super().loadImage("./assets/images/items/salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * (canvasWidth * 1.5);
    this.y = this.y + Math.random() * 40;
  }
}
