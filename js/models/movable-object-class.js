// Load DrawableObject class from drawable-object-class.js
import { DrawableObject } from "./drawable-object.class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval } from "../script.js";

// Create MovableObject class that extends DrawableObject class
// This class will be used to create objects that can move
export class MovableObject extends DrawableObject {
  speed = 0.2; // Speed of the object
  otherDirection = false; // Direction of the object
  speedY = 0; // Speed of the object in Y direction
  acceleration = 2.5; // Acceleration of the object
  energy = 100; // Energy of the object
  lastHit = 0; // Time of the last hit

  // The applyGravity method will be used to apply gravity to the object
  applyGravity() {
    setStoppableInterval(() => {
      // If the object is in the air
      if (this.isInAir()) {
        this.y -= this.speedY; // Move the object in Y direction
        this.speedY -= this.acceleration; // Apply acceleration to the object in Y direction
      }
    }, 1000 / 25);
  }

  // The isInAir method will be used to check if the object is in the air
  isInAir() {
    return this.isAboveGround() || this.speedY > 0;
  }

  // The isAboveGround method will be used to check if the object is above the ground
  isAboveGround() {
    if (this.constructor.name === "ThrowableObject") {
      // If the object is a ThrowableObject
      return true; // Return true
    } else {
      return this.y < 150; // Return true if the object is above the ground level (150)
    }
  }

  // The isColliding method will be used to check if the object is colliding with another object
  isColliding(movableObject) {
    let buffer = 0; // Buffer for collision detection
    if (movableObject.constructor.name === "Chicken") buffer = 5; // Set buffer for Chicken object
    if (movableObject.constructor.name === "SalsaBottles") buffer = -30; // Set buffer for Character object
    return (
      this.x + this.width + buffer > movableObject.x - buffer &&
      this.y + this.height + buffer > movableObject.y - buffer &&
      this.x - buffer < movableObject.x + movableObject.width + buffer &&
      this.y - buffer < movableObject.y + movableObject.height + buffer
    );
  }

  // The hit method will be used to reduce the energy of the object
  hit(multiplier = 1) {
    const currentTime = new Date().getTime(); // Get the current time
    if (currentTime - this.lastHit < 1000) return; // If the time passed since the last hit is less than 1 second, return
    this.energy -= 2 * multiplier; // Reduce the energy of the object by 2
    if (this.energy <= 0) {
      // If the energy of the object is less than or equal to 0
      this.energy = 0; // Set the energy of the object to 0
    } else {
      this.lastHit = new Date().getTime(); // Set the time of the last hit to the current time
    }
  }

  // The isHurt method will be used to check if the object is hurt
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Calculate the time passed since the last hit
    timePassed = timePassed / 1000; // Convert the time passed to seconds
    return timePassed < 1; // Return true if the time passed is less than 1 second
  }

  // The isDead method will be used to check if the object is dead
  isDead() {
    return this.energy === 0; // Return true if the energy of the object is 0
  }

  // The playAnimation method will be used to play the animation of the object
  playAnimation(images) {
    let i = this.currentImage % images.length; // Get the current image index
    let path = images[i]; // Get the path of the current image
    this.img = this.imageCache[path]; // Set the image of the object to the current image
    this.currentImage++; // Increment the current image index by 1
  }

  // The moveRight method will be used to move the object to the right side
  moveRight() {
    this.x += this.speed;
  }

  // The moveLeft method will be used to move the object to the left side
  moveLeft() {
    this.x -= this.speed;
  }

  // The jump method will be used to make the object jump in the air
  jump() {
    this.speedY = 30;
  }
}
