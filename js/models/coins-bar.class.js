// Load DrawableObject class from drawable-object.class.js
import { DrawableObject } from "./drawable-object.class.js";

// Create CoinsBar class that extends DrawableObject
// This class represents the coins bar in the game
export class CoinsBar extends DrawableObject {
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 100; // Default percentage

  constructor() {
    super(); // Call the super method of the parent class
    this.loadImages(this.IMAGES); // Load images for the coins bar
    this.x = 20; // Set x position
    this.y = 100; // Set y position
    this.width = 200; // Set width
    this.height = 60; // Set height
    this.setPercentage(0); // Set percentage to 0
  }

  // Set the percentage of the coins bar
  setPercentage(percentage) {
    this.percentage = percentage; // Set the percentage to the given percentage
    let path = this.IMAGES[this.resolveImageIndex()]; // Get the path of the image based on the percentage
    this.img = this.imageCache[path]; // Set the image of the coins bar to the image at the given path
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
