/**
 * @module "status-bar-endboss-health.class.js"
 */

/**
 * Import the StatusBar class from the status-bar.class.js module.
 */
import { StatusBar } from "./status-bar.class.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;

/**
 * Class representing the status bar for the end boss's health.
 * @extends StatusBar
 */
export class StatusBarEndbossHealth extends StatusBar {
  IMAGES = [
    "./assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange0.png",
    "./assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange20.png",
    "./assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange40.png",
    "./assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange60.png",
    "./assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange80.png",
    "./assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange100.png",
  ];

  /**
   * Constructs the status bar for the end boss's health.
   * Initializes the position and sets the health percentage to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = canvasWidth - (this.width + 20);
    this.y = 0;
    this.setPercentage(100);
  }
}
