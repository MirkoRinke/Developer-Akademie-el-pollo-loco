/**
 * @module "salsa-bottles-bar.class.js"
 */

/**
 * Import the StatusBar class from the status-bar.class.js module.
 */
import { StatusBar } from "./status-bar.class.js";

/**
 * Represents a status bar for salsa bottles.
 * @extends StatusBar
 */
export class SalsaBottlesBar extends StatusBar {
  IMAGES = [
    "./assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "./assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "./assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "./assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "./assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "./assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Creates an instance of the SalsaBottlesBar class.
   * Initializes the object by loading images, setting the y-coordinate, and setting the initial percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 50;
    this.setPercentage(0);
  }
}
