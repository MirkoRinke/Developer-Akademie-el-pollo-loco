// Load the MovableObject class from the movable-object-class.js file
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval } from "../game.js";

import { cloudsSpeed } from "../Levels/level1.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;

// Cloud class is a subclass of MovableObject
// It is used to create the cloud background in the game
export class Cloud extends MovableObject {
  y = 20; // y position of the cloud
  height = 250; // height of the cloud
  width = 500; // width of the cloud
  constructor() {
    super().loadImage("../../assets/images/background/layers/4_clouds/1.png"); // load the image of the cloud using the loadImage method from the MovableObject class
    this.x = Math.random() * (canvasWidth * 2.5); // set the x position of the cloud to a random value
    this.y = Math.random() * 100; // set the y position of the cloud to a random value
    this.animate(); // animate the cloud
  }

  // Animate the cloud by managing the cloud movement
  animate() {
    this.manageCloudMovement();
  }

  // Manage the cloud movement by moving the cloud to the left at a constant speed
  manageCloudMovement() {
    setStoppableInterval(() => {
      this.x -= this.speed * cloudsSpeed;
      if (this.x < -this.width) {
        this.x = canvasWidth + Math.random() * (canvasWidth * 2.5);
      }
    }, 1000 / 60);
  }
}
