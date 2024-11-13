/**
 * @module "chicken.class.js"
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
 * Represents a Chicken enemy in the game.
 * @extends MovableObject
 */
export class Chicken extends MovableObject {
  height = 80;
  width = 80;
  y = canvasHeight - this.height - 50;
  energy = 2;

  IMAGES_WALK = [
    "../../assets/images/enemies/chicken/chicken_normal/1_walk/1_w.png",
    "../../assets/images/enemies/chicken/chicken_normal/1_walk/2_w.png",
    "../../assets/images/enemies/chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["../../assets/images/enemies/chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Constructs a new Chicken instance.
   * Loads the chicken image and animations, sets the initial position and speed, and starts the animation.
   */
  constructor() {
    super().loadImage("../../assets/images/enemies/chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * (canvasWidth * 2.3);
    this.speed = 0.15 + Math.random() * 0.33;
    this.animate();
  }

  /**
   * Animates the chicken by managing its movement and triggering the chicken animation.
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
   * Animates the chicken by switching between walking and dead animations.
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
