// Load the parent class StatusBar from status-bar.class.js
import { StatusBar } from "./status-bar.class.js";

// Create CoinsBar class that extends StatusBar
// This class represents the coins bar in the game
export class CoinsBar extends StatusBar {
  // Create an array of images for the coins bar
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super(); // Call the super method of the parent class
    this.loadImages(this.IMAGES); // Load images for the coins bar
    this.y = 100; // Set y position
    this.setPercentage(0); // Set percentage to 0
  }
}
