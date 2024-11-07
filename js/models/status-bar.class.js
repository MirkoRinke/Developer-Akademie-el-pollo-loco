// Load DrawableObject class from drawable-object.class.js
import { DrawableObject } from "./drawable-object.class.js";

// Create StatusBar class that extends DrawableObject
// This class will be used to create a status bar for the player
export class StatusBarHealth extends DrawableObject {
  // Create an array of images for the status bar
  IMAGES = [
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "../../assets/images/ui/statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100; // Set the percentage to 100

  constructor() {
    super(); // Call the constructor of the parent class
    this.loadImages(this.IMAGES); // Load the images for the status bar from the IMAGES array
    this.x = 20; // Set the x position of the status bar to 20
    this.y = 0; // Set the y position of the status bar to 0
    this.width = 200; // Set the width of the status bar to 200
    this.height = 60; // Set the height of the status bar to 60
    this.setPercentage(100); // Set the percentage of the status bar to 100
  }

  // Set the percentage of the status bar and load the image from the image cache
  setPercentage(percentage) {
    this.percentage = percentage; // Set the percentage of the status bar to the given percentage
    let path = this.IMAGES[this.resolveImageIndex()]; // Get the path of the image from the return value of the resolveImageIndex method
    this.img = this.imageCache[path]; // Load the image from the image cache based on the path
  }

  // Resolve the image index based on the percentage of the status bar and return the index
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
