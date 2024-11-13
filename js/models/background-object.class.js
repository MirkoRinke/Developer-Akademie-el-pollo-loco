/**
 * @module "background-object.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 */
import { MovableObject } from "./movable-object-class.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

/**
 * Class representing a background object in the game.
 * @extends MovableObject
 */
export class BackgroundObjects extends MovableObject {
  width = canvasWidth;
  height = canvasHeight;

  /**
   * Creates an instance of BackgroundObject.
   * @param {string} imagePath - The path to the image file.
   * @param {number} x - The x-coordinate position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = canvasHeight - this.height;
  }
}
