import { MovableObject } from "./movable-object-class.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

export class Coins extends MovableObject {
  height = 80; // height of the chicken
  width = 80; // width of the chicken

  constructor() {
    super().loadImage("../../assets/images/items/coin/coin_2.png"); // Load the image of the throwable object (salsa bottle)
    this.x = 200 + Math.random() * (canvasWidth * 2); // set the x position of the chicken to a random value
    this.y = canvasHeight / 2.3 + Math.random() * 200; // set the y position of the chicken to a random value
  }
}
