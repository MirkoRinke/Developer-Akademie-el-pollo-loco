// Load MovableObject class from movable-object.class.js
import { MovableObject } from "./movable-object-class.js";

// ThrowableObject class extends MovableObject class
// ThrowableObject class is used to create throwable objects
export class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("../../assets/images/items/salsa_bottle/salsa_bottle.png"); // Load the image of the throwable object (salsa bottle)
    this.x = x; // Set the x-coordinate of the throwable object
    this.y = y; // Set the y-coordinate of the throwable object
    this.height = 60; // Set the height of the throwable object
    this.width = 50; // Set the width of the throwable object
    this.throw(); // Call the throw method to throw the throwable object
  }

  // Method to apply gravity to the throwable object
  throw() {
    this.speedY = 30; // Set the speed of the throwable object in the y-direction
    this.applyGravity(); // Call the applyGravity method to apply gravity to the throwable object
    setInterval(() => {
      this.x += 10; // Move the throwable object in the x-direction
    }, 25);
  }
}
