// Load Character, level1, StatusBar, ThrowableObject classes from their respective files
import { Character } from "./character.class.js";
import { level1 } from "../Levels/level1.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

// World class is used to create the game world
export class World {
  character = new Character(); // Create a new character object
  level = level1; // Set the level of the game
  ctx; // Context
  canvas; // Canvas
  keyboard; // Keyboard
  camera_x = 0; // Camera x-coordinate
  statusBar = new StatusBar(); // Create a new status bar object.
  throwableObjects = []; // Array to store throwable objects

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // Get the context of the canvas
    this.canvas = canvas; // Set the canvas of the world object
    this.keyboard = keyboard; // Set the keyboard of the world object
    this.draw(); // Call the draw method to draw the game world
    this.setWorld(); // Call the setWorld method to set the world
    this.run(); // Call the run method to for the game loops
  }

  // Method to set the world object of the character object
  setWorld() {
    this.character.world = this;
  }

  // Method to run the game loops for the game world
  run() {
    setInterval(() => {
      this.checkCollisions(); // Call the checkCollisions method to check for collisions
      this.checkThrowableObjects(); // Call the checkThrowableObjects method to check for throwable objects
      if (this.character.isDead()) this.die(); // Call the die method of the character object if the character is dead
    }, 200);
  }

  // Method to end the game temporarily
  die() {
    console.log("Game Over!");
  }

  // Method to check for throwable objects in the game world
  checkThrowableObjects() {
    if (this.keyboard.D) {
      // If the D key is pressed on the keyboard
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100); // Create a new throwable object (bottle)
      this.throwableObjects.push(bottle); // Add the throwable object to the throwableObjects array of the world object
    }
  }

  // Method to check for collisions in the game world
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      // For each enemy in the enemies array of the level object
      if (this.character.isColliding(enemy)) {
        // If the character is colliding with the enemy
        this.character.hit(); // Call the hit method of the character object
        this.statusBar.setPercentage(this.character.energy); // Set the character energy in the status bar
      }
      this.throwableObjects.forEach((throwableObject) => {
        // For each throwable object in the throwableObjects array
        if (throwableObject.isColliding(enemy)) {
          // If the throwable object is colliding with the enemy
          enemy.hit(); // Call the hit method of the enemy object
        }
      });
    });
  }

  // Method to draw the game world on the canvas
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.translate(this.camera_x, 0); // Translate the context of the canvas to the camera x-coordinate
    this.addObjectsToMap(this.level.backgroundObjects); // Add the background objects to the map

    this.ctx.translate(-this.camera_x, 0); // Translate the context of the canvas to the negative of the camera x-coordinate
    this.addToMap(this.statusBar); // Add the status bar to the map
    this.ctx.translate(this.camera_x, 0); // Translate the context of the canvas to the camera x-coordinate

    this.addToMap(this.character); // Add the character to the map
    this.addObjectsToMap(this.level.enemies); // Add the enemies to the map
    this.addObjectsToMap(this.level.clouds); // Add the clouds to the map
    this.addObjectsToMap(this.throwableObjects); // Add the throwable objects to the map

    this.ctx.translate(-this.camera_x, 0); // Translate the context of the canvas to the negative of the camera x-coordinate
    requestAnimationFrame(() => this.draw()); // Request the next frame to draw the game world
  }

  // Method to add objects to the map of the game world
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      // For each object in the objects array
      this.addToMap(object); // Add the object to the map
    });
  }

  // Method to add an object to the map of the game world
  addToMap(movableObject) {
    if (movableObject.otherDirection) this.flipImage(movableObject); // Flip the image of the object if it is moving in the other direction
    movableObject.draw(this.ctx); // Draw the object on the canvas
    movableObject.drawFrame(this.ctx); // Draw the frame of the object on the canvas
    if (movableObject.otherDirection) this.flipImageBack(movableObject); // Flip the image of the object back if it was flipped
  }

  // Method to flip the image of the object in the game world
  flipImage(movableObject) {
    this.ctx.save(); // Save the context of the canvas
    this.ctx.translate(movableObject.width, 0); // Translate the context of the canvas to the width of the object
    this.ctx.scale(-1, 1); // Scale the context of the canvas
    movableObject.x = movableObject.x * -1; // Set the x-coordinate of the object to the negative of the x-coordinate
  }

  // Method to flip the image of the object back in the game world
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1; // Set the x-coordinate of the object back to the original x-coordinate
    this.ctx.restore(); // Restore the context of the canvas to the original state
  }
}
