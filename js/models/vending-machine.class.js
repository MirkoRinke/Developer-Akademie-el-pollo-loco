/**
 * @module "vending-machine.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 */
import { MovableObject } from "./movable-object-class.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;

/**
 * Represents a vending machine object in the game.
 * @extends MovableObject
 * @class
 */
export class VendingMachine extends MovableObject {
  /**
   * Creates an instance of the VendingMachine class.
   * Initializes the vending machine image, dimensions, and position.
   */
  constructor() {
    super().loadImage("../../assets/images/ui/vending-machine/2.png");
    this.width = 217;
    this.height = 264;
    this.x = 0 - this.width / 2;
    this.y = canvasHeight - this.height - 45;
  }
}
