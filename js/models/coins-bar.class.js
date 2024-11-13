/**
 * @module "coins.bar.class.js"
 */

/**
 * Import the StatusBar class from the status-bar.class.js module.
 */
import { StatusBar } from "./status-bar.class.js";

/**
 * Class representing a CoinsBar, which extends the StatusBar class.
 * Displays the coin status bar with different images based on the percentage of coins collected.
 */
export class CoinsBar extends StatusBar {
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Creates an instance of the CoinsBar class.
   * Initializes the position and percentage of the coins bar.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 100;
    this.setPercentage(0);
  }
}
