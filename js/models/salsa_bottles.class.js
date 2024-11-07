// import { DrawableObject } from "./drawable-object.class.js";
import { MovableObject } from "./movable-object-class.js";

export class SalsaBottles extends MovableObject {
  IMAGES = ["../../assets/images/items/salsa_bottle/1_salsa_bottle_on_ground.png", "../../assets/images/items/salsa_bottle/2_salsa_bottle_on_ground.png"];

  constructor() {
    super().loadImage("../../assets/images/items/salsa_bottle/1_salsa_bottle_on_ground.png"); // Load the image of the throwable object (salsa bottle)
    // this.loadImages(this.IMAGES); // Load the images of the throwable object (salsa bottle)
    this.x = 200 + Math.random() * 1800; // set the x position of the chicken to a random value
  }
}
