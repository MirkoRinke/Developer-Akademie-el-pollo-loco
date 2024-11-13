/**
 * Import the DrawableObject class from the drawable-object.class.js module.
 */
import { DrawableObject } from "./drawable-object.class.js";

export class StatusBar extends DrawableObject {
  IMAGES = [];
  percentage = 100;

  /**
   * Creates an instance of the StatusBar class.
   * Initializes the status bar with default properties and sets the initial percentage to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage and updates the image based on the resolved image index.
   *
   * @param {number} percentage - The percentage to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on the current percentage.
   *
   * @returns {number} The image index corresponding to the percentage.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
