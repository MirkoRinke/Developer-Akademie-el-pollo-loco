/**
 * @module "coins.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 * Import the setStoppableInterval function from the game.js module.
 */
import { MovableObject } from "./movable-object-class.js";
import { setStoppableInterval } from "../game.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

/**
 * Represents a coin object that can be animated.
 * @extends MovableObject
 */
export class Coins extends MovableObject {
  height = 30;
  width = 30;

  IMAGES_ROTATE = [
    "./assets/images/items/coin/coin_1.png",
    "./assets/images/items/coin/coin_2.png",
    "./assets/images/items/coin/coin_3.png",
    "./assets/images/items/coin/coin_4.png",
    "./assets/images/items/coin/coin_5.png",
    "./assets/images/items/coin/coin_6.png",
  ];

  WIDTHS = [30, 20, 10, 10, 20, 30];

  /**
   * Initializes a new instance of the Coin class.
   * Loads the initial coin image and sets the position of the coin on the canvas.
   * Starts the coin animation.
   */
  constructor() {
    super().loadImage("./assets/images/items/coin/coin_1.png");
    this.loadImages(this.IMAGES_ROTATE);
    this.x = 200 + Math.random() * (canvasWidth * 1.5);
    this.y = canvasHeight / 2.3 + Math.random() * 100;
    this.animate();
  }

  /**
   * Triggers the coin animation.
   */
  animate() {
    this.coinAnimation();
  }

  /**
   * Animates the coin by cycling through its rotation images.
   * Adjusts the coin's width and position based on the current image.
   * Uses a stoppable interval to update the animation every 250 milliseconds.
   */
  coinAnimation() {
    let currentImageIndex = 0;
    setStoppableInterval(() => {
      const previousWidth = this.width;
      this.width = this.WIDTHS[currentImageIndex];
      const widthDifference = this.width - previousWidth;
      this.x -= widthDifference / 2;
      this.playAnimation(this.IMAGES_ROTATE);
      currentImageIndex = (currentImageIndex + 1) % this.IMAGES_ROTATE.length;
    }, 250);
  }
}
