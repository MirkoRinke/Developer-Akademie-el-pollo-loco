/**
 * @module "danger-shield.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 */
import { MovableObject } from "./movable-object-class.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

/**
 * Class representing a DangerShield.
 * @extends MovableObject
 */
export class DangerShield extends MovableObject {
  /**
   * Constructs a DangerShield object, loads its image, and sets its dimensions and position.
   */
  constructor() {
    super().loadImage("../../assets/images/ui/shield/danger.png");
    this.width = 108;
    this.height = 132;
    this.x = canvasWidth * 1.7;
    this.y = canvasHeight - this.height - 70;
  }
}
