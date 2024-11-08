// Load the parent class StatusBar from status-bar.class.js
import { StatusBar } from "./status-bar.class.js";

// Create StatusBarHealth class that extends StatusBar
// This class represents the health status bar in the game
export class StatusBarEndbossHealth extends StatusBar {
  // Create an array of images for the status bar health
  IMAGES = [
    "../../assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange0.png",
    "../../assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange20.png",
    "../../assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange40.png",
    "../../assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange60.png",
    "../../assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange80.png",
    "../../assets/images/ui/statusbars/2_statusbar_endboss/orange-mirrored/orange100.png",
  ];

  constructor() {
    super(); // Call the constructor of the parent class
    this.loadImages(this.IMAGES); // Load the images for the status bar from the IMAGES array
    this.x = 1050; // Set the x position of the status bar to 20
    this.y = 0; // Set the y position of the status bar to 0
    this.setPercentage(100); // Set the percentage of the status bar to 100
  }
}
