/**
 * @module "status-bar-health.class.js"
 */

/**
 * Import the StatusBar class from the status-bar.class.js module.
 */
import { StatusBar } from "./status-bar.class.js";

/**
 * Class representing the health status bar.
 * @extends StatusBar
 */
export class StatusBarHealth extends StatusBar {
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Creates an instance of the StatusBarHealth class.
   * Initializes the health status bar with default values.
   * Loads the images and sets the initial health percentage to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 0;
    this.setPercentage(100);
  }

  /**
   * Determines the image index based on the current health percentage.
   *
   * @returns {number} The image index corresponding to the health percentage.
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
    } else if (this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
