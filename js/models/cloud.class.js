// Load the MovableObject class from the movable-object-class.js file
import { MovableObject } from "./movable-object-class.js";

// Cloud class is a subclass of MovableObject
// It is used to create the cloud background in the game
export class Cloud extends MovableObject {
  y = 20; // y position of the cloud
  height = 250; // height of the cloud
  width = 500; // width of the cloud
  constructor() {
    super().loadImage("../../assets/images/background/layers/4_clouds/1.png"); // load the image of the cloud using the loadImage method from the MovableObject class
    this.x = Math.random() * 500; // set the x position of the cloud to a random value
    this.animate(); // animate the cloud
  }

  // Animate the cloud by managing the cloud movement
  animate() {
    this.manageCloudMovement();
  }

  // Manage the cloud movement by moving the cloud to the left at a constant speed
  manageCloudMovement() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
