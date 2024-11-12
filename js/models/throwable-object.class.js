// Load MovableObject class from movable-object.class.js
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval } from "../game.js";

import { characterDirection } from "./character.class.js";

// ThrowableObject class extends MovableObject class
// ThrowableObject class is used to create throwable objects
export class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "../../assets/images/items/salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage("../../assets/images/items/salsa_bottle/salsa_bottle.png"); // Load the image of the throwable object (salsa bottle)
    this.loadImages(this.IMAGES_ROTATION); // Load the images for the rotation animation
    this.x = x; // Set the x-coordinate of the throwable object
    this.y = y; // Set the y-coordinate of the throwable object
    this.height = 60; // Set the height of the throwable object
    this.width = 50; // Set the width of the throwable object
    this.throw(); // Call the throw method to throw the throwable object
    // this.animate(); // Call the animate method to animate the throwable object
  }

  // animate() {
  //   this.throwableObjectAnimation();
  // }

  throwableObjectAnimation() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION); // Play the rotation animation
    }, 100);
  }

  // Method to apply gravity to the throwable object
  throw() {
    this.throwableObjectAnimation();
    this.speedY = 30; // Set the speed of the throwable object in the y-direction
    this.applyGravity(); // Call the applyGravity method to apply gravity to the throwable object
    const throwDirection = characterDirection;
    setStoppableInterval(() => {
      if (throwDirection === "right") this.x += 15; // Move the throwable object in the x-direction
      if (throwDirection === "left") this.x -= 15; // Move the throwable object in the x-direction
    }, 25);
  }
}
