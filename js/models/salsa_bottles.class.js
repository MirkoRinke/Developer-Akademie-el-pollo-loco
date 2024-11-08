import { MovableObject } from "./movable-object-class.js";

// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;

export class SalsaBottles extends MovableObject {
  height = 60; // height of the throwable object (salsa bottle)
  width = 60; // width of the throwable object  (salsa bottle)
  y = canvasHeight - this.height - 50; // y position of the throwable object (salsa bottle)

  constructor() {
    super().loadImage("../../assets/images/items/salsa_bottle/1_salsa_bottle_on_ground.png"); // Load the image of the throwable object (salsa bottle)
    this.x = 200 + Math.random() * 1800; // Set the x position of the throwable object (salsa bottle) to a random value
  }
}
