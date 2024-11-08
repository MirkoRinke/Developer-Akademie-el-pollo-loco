import { MovableObject } from "./movable-object-class.js";

export class Coins extends MovableObject {
  height = 80; // height of the chicken
  width = 80; // width of the chicken

  constructor() {
    super().loadImage("../../assets/images/items/coin/coin_2.png"); // Load the image of the throwable object (salsa bottle)
    this.x = 200 + Math.random() * 1800; // set the x position of the chicken to a random value
    this.y = 50 + Math.random() * 200; // set the y position of the chicken to a random value
  }
}
