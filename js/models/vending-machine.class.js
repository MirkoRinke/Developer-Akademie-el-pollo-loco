// Load DrawableObject class from drawable-object.class.js
import { DrawableObject } from "./drawable-object.class.js";

// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

// Create StatusBar class that extends DrawableObject
// This class will be used to create a status bar for the player
export class VendingMachine extends DrawableObject {
  constructor() {
    super().loadImage("../../assets/images/ui/vending-machine/1.png"); // load the image of the character using the loadImage method from the MovableObject class
    this.width = 217; // Set the width of the status bar to 200
    this.height = 264; // Set the height of the status bar to 60
    this.x = canvasWidth * 2.53; // Set the x position of the status bar to 20
    this.y = canvasHeight - this.height - 50; // Set the y position of the status bar to 0
  }
}