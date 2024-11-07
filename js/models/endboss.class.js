// Load MovableObject class from movable-object-class.js
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval } from "../script.js";

// Create a variable to store the startAlert value
export let startAlert = 0; // set the initial value of the startAlert variable to

// Create a variable to store the alertInterval value for the end boss
let alertInterval = true; // set the initial value of the alertInterval variable to true

export function resetAlert() {
  if (alertInterval) {
    startAlert = 0; // reset the value of the startAlert variable to 0
  }
  alertInterval = false; // set the alertInterval variable to false
}

// Create Endboss class that extends MovableObject class
// It is used to create the end boss in the game
export class Endboss extends MovableObject {
  height = 400; // height of the end boss
  width = 350; // width of the end boss
  y = 50; // y position of the end boss
  energy = 10; // energy of the chicken

  // Array of images for the end boss walk animation
  IMAGES_WALK = [
    "../../assets/images/enemies/chicken_boss/1_walk/G1.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G2.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G3.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G4.png",
  ];
  // Array of images for the end boss walk animation
  IMAGES_ALERT = [
    "../../assets/images/enemies/chicken_boss/2_alert/G5.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G6.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G7.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G8.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G9.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G10.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G11.png",
    "../../assets/images/enemies/chicken_boss/2_alert/G12.png",
  ];
  // Array of images for the end boss attack animation
  IMAGES_ATTACK = [
    "../../assets/images/enemies/chicken_boss/3_attack/G13.png",
    "../../assets/images/enemies/chicken_boss/3_attack/G14.png",
    "../../assets/images/enemies/chicken_boss/3_attack/G15.png",
    "../../assets/images/enemies/chicken_boss/3_attack/G16.png",
    "../../assets/images/enemies/chicken_boss/3_attack/G17.png",
    "../../assets/images/enemies/chicken_boss/3_attack/G18.png",
    "../../assets/images/enemies/chicken_boss/3_attack/G19.png",
    "../../assets/images/enemies/chicken_boss/3_attack/G20.png",
  ];

  // Array of images for the end boss hurt animation
  IMAGES_HURT = ["../../assets/images/enemies/chicken_boss/4_hurt/G21.png", "../../assets/images/enemies/chicken_boss/4_hurt/G22.png", "../../assets/images/enemies/chicken_boss/4_hurt/G23.png"];

  // Array of images for the end boss dying animation
  IMAGES_DEAD = ["../../assets/images/enemies/chicken_boss/5_dead/G24.png", "../../assets/images/enemies/chicken_boss/5_dead/G25.png", "../../assets/images/enemies/chicken_boss/5_dead/G26.png"];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]); // load the first image of the end boss walk animation
    this.loadImages(this.IMAGES_WALK); // load all images of the end boss walk animation
    this.loadImages(this.IMAGES_ALERT); // load all images of the end boss walk animation
    this.loadImages(this.IMAGES_ATTACK); // load all images of the end boss attack animation
    this.loadImages(this.IMAGES_HURT); // load all images of the end boss hurt animation
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
      if (startAlert <= 10) {
        this.playAnimation(this.IMAGES_ALERT); // play the end boss walk animation
        startAlert++;
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); // play the dying animation if the chicken is dead
        this.y = 150; // set the y position of the end boss to 0
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT); // play the hurt animation if the chicken is hurt
      } else this.playAnimation(this.IMAGES_WALK); // play the end boss walk animation
    }, 200);
  }
}
