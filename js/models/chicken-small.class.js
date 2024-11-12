// Load the MovableObject class from the movable-object-class.js file
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval } from "../game.js";

// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

// Chicken class is a subclass of MovableObject
// It is used to create the chicken enemy in the game
export class ChickenSmall extends MovableObject {
  height = 40; // height of the chicken
  width = 40; // width of the chicken
  y = canvasHeight - this.height - 50; // y position of the chicken
  energy = 2; // energy of the chicken
  // Array of image paths for the chicken walking animation
  IMAGES_WALK = [
    "../../assets/images/enemies/chicken/chicken_small/1_walk/1_w.png",
    "../../assets/images/enemies/chicken/chicken_small/1_walk/2_w.png",
    "../../assets/images/enemies/chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["../../assets/images/enemies/chicken/chicken_small/2_dead/dead.png"];
  constructor() {
    super().loadImage("../../assets/images/enemies/chicken/chicken_small/1_walk/1_w.png"); // load the image of the chicken using the loadImage method from the MovableObject class
    this.loadImages(this.IMAGES_WALK); // load the images for the walking animation
    this.loadImages(this.IMAGES_DEAD); // load the images for the dying animation
    this.x = 500 + Math.random() * (canvasWidth * 2.3); // set the x position of the chicken to a random value
    this.speed = 0.3 + Math.random() * 0.33; // set the speed of the chicken to a random value
    this.animate(); // animate the chicken
  }

  // Animate the chicken by managing the chicken movement and chicken animation
  animate() {
    this.manageChickenMovement();
    this.chickenAnimation();
  }

  // Manage the chicken movement by moving the chicken to the left
  manageChickenMovement() {
    setStoppableInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  // Animate the chicken by playing the chicken walking animation
  chickenAnimation() {
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); // play the dying animation if the chicken is dead
      } else this.playAnimation(this.IMAGES_WALK); // play the walking animation if the chicken is alive
    }, 200);
  }
}
