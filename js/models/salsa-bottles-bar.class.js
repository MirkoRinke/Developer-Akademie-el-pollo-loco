// Load the parent class StatusBar from status-bar.class.js
import { StatusBar } from "./status-bar.class.js";

// Create SalsaBottlesBar class that extends StatusBar
// This class represents the salsa bottles bar in the games
export class SalsaBottlesBar extends StatusBar {
  // Create an array of images for the salsa bottles bar
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  constructor() {
    super(); // Call the super method of the parent class
    this.loadImages(this.IMAGES); // Load images for the salsa bottles bar
    this.y = 50; // Set y position
    this.setPercentage(0); // Set percentage to 0
  }
}
