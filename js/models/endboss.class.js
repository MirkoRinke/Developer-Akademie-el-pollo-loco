// Load MovableObject class from movable-object-class.js
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval } from "../script.js";

// Create Endboss class that extends MovableObject class
// It is used to create the end boss in the game
export class Endboss extends MovableObject {
  height = 400; // height of the end boss
  width = 350; // width of the end boss
  y = 50; // y position of the end boss
  energy = 10; // energy of the chicken

  // Array of images for the end boss walk animation
  IMAGES_WALK = [
    "../../assets/images/enemies/chicken_boss/2_alert/G5.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G6.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G7.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G8.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G9.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G10.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G11.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G12.png",
  ];

  IMAGES_DEAD = ["../../assets/images/enemies/chicken_boss/5_dead/G24.png", "../../assets/images/enemies/chicken_boss/5_dead/G25.png", "../../assets/images/enemies/chicken_boss/5_dead/G26.png"];

  constructor() {
    super().loadImage(this.IMAGES_WALK[0]); // load the first image of the end boss walk animation
    this.loadImages(this.IMAGES_WALK); // load all images of the end boss walk animation
    this.loadImages(this.IMAGES_DEAD); // load all images of the end boss dying animation
    this.x = 2600; // set the x position of the end boss
    this.animate(); // animate the end boss
  }

  // Animate the end boss by playing the end boss walk animation
  animate() {
    this.endbossAnimation();
  }

  // Animate the end boss by playing the end boss walk animation repeatedly at a certain interval
  endbossAnimation() {
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); // play the dying animation if the chicken is dead
        this.y = 150; // set the y position of the end boss to 0
      } else this.playAnimation(this.IMAGES_WALK); // play the end boss walk animation
    }, 200);
  }
}
