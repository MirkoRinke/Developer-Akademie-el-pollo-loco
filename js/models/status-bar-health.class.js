// Load the parent class StatusBar from status-bar.class.js
import { StatusBar } from "./status-bar.class.js";

// Create StatusBarHealth class that extends StatusBar
// This class represents the health status bar in the game
export class StatusBarHealth extends StatusBar {
  // Create an array of images for the status bar health
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super(); // Call the constructor of the parent class
    this.loadImages(this.IMAGES); // Load the images for the status bar from the IMAGES array
    this.y = 0; // Set the y position of the status bar to 0
    this.setPercentage(100); // Set the percentage of the status bar to 100
  }

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
