/**
 * @module "chicken-small.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 * Import the setStoppableInterval function from the game.js module.
 */
import { MovableObject } from "./movable-object-class.js";
import { setStoppableInterval } from "../game.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

/**
 * Represents a small chicken enemy in the game.
 * @extends MovableObject
 */
export class ChickenSmall extends MovableObject {
  height = 40;
  width = 40;
  y = canvasHeight - this.height - 50;
  energy = 2;

  IMAGES_WALK = [
    "./assets/images/enemies/chicken/chicken_small/1_walk/1_w.png",
    "./assets/images/enemies/chicken/chicken_small/1_walk/2_w.png",
    "./assets/images/enemies/chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["./assets/images/enemies/chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates an instance of a small chicken enemy.
   * Loads images for walking and dead states.
   * Sets initial position and speed.
   */
  constructor() {
    super().loadImage("./assets/images/enemies/chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * (canvasWidth * 2.3);
    this.speed = 0.3 + Math.random() * 0.33;
    this.animate();
  }

  /**
   * Animates the small chicken by managing its movement and triggering the chicken animation.
   */
  animate() {
    this.manageChickenMovement();
    this.chickenAnimation();
  }

  /**
   * Manages the movement of the chicken by decrementing its x-coordinate
   * based on its speed at a regular interval.
   */
  manageChickenMovement() {
    setStoppableInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Animates the chicken by switching between walking and dead images.
   * Uses a stoppable interval to periodically update the animation.
   * If the chicken is dead, it plays the dead animation; otherwise, it plays the walking animation.
   */
  chickenAnimation() {
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else this.playAnimation(this.IMAGES_WALK);
    }, 200);
  }
}
