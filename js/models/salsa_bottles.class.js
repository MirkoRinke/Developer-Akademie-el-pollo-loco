import { MovableObject } from "./movable-object-class.js";

export class SalsaBottles extends MovableObject {
  height = 60; // height of the chicken
  width = 60; // width of the chicken
  y = 380; // y position of the chicken

  constructor() {
    super().loadImage("../../assets/images/items/salsa_bottle/1_salsa_bottle_on_ground.png"); // Load the image of the throwable object (salsa bottle)
    this.x = 200 + Math.random() * 1800; // set the x position of the chicken to a random value
  }
}
