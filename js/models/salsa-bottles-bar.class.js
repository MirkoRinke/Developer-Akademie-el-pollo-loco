// Load DrawableObject class from drawable-object.class.js
import { DrawableObject } from "./drawable-object.class.js";

// Create SalsaBottlesBar class that extends DrawableObject
// This class represents the salsa bottles bar in the game
export class SalsaBottlesBar extends DrawableObject {
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percentage = 100; // Default percentage

  constructor() {
    super(); // Call the super method of the parent class
    this.loadImages(this.IMAGES); // Load images for the salsa bottles bar
    this.x = 20; // Set x position
    this.y = 50; // Set y position
    this.width = 200; // Set width
    this.height = 60; // Set height
    this.setPercentage(0); // Set percentage to 0
  }

  // Set the percentage of the salsa bottles bar
  setPercentage(percentage) {
    this.percentage = percentage; // Set the percentage to the given percentage
    let path = this.IMAGES[this.resolveImageIndex()]; // Get the path of the image based on the percentage
    this.img = this.imageCache[path]; // Set the image of the salsa bottles bar
  }

  // Resolve the image index based on the percentage
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
