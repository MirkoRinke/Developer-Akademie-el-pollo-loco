// Load the MovableObject class from the movable-object-class.js file
import { MovableObject } from "./movable-object-class.js";

// Chicken class is a subclass of MovableObject
// It is used to create the chicken enemy in the game
export class Chicken extends MovableObject {
  height = 80; // height of the chicken
  width = 80; // width of the chicken
  y = 360; // y position of the chicken
  // Array of image paths for the chicken walking animation
  IMAGES_WALK = [
    "../../assets/images/enemies/chicken/chicken_normal/1_walk/1_w.png",
    "../../assets/images/enemies/chicken/chicken_normal/1_walk/2_w.png",
    "../../assets/images/enemies/chicken/chicken_normal/1_walk/3_w.png",
  ];
  constructor() {
    super().loadImage("../../assets/images/enemies/chicken/chicken_normal/1_walk/1_w.png"); // load the image of the chicken using the loadImage method from the MovableObject class
    this.loadImages(this.IMAGES_WALK); // load the images for the walking animation
    this.x = 500 + Math.random() * 1000; // set the x position of the chicken to a random value
    this.speed = 0.15 + Math.random() * 0.33; // set the speed of the chicken to a random value
    this.animate(); // animate the chicken
  }

  // Animate the chicken by managing the chicken movement and chicken animation
  animate() {
    this.manageChickenMovement();
    this.chickenAnimation();
  }

  // Manage the chicken movement by moving the chicken to the left
  manageChickenMovement() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  // Animate the chicken by playing the chicken walking animation
  chickenAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALK);
    }, 200);
  }
}
