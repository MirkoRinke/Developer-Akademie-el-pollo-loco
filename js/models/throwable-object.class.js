/**
 * @module "throwable-object.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 * Import the setStoppableInterval function from the game.js module.
 * Import the characterDirection constant from the character.class.js module.
 */
import { MovableObject } from "./movable-object-class.js";
import { setStoppableInterval } from "../game.js";
import { characterDirection } from "./character.class.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;

export class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "../../assets/images/items/salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "../../assets/images/items/salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../../assets/images/items/salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of a throwable object.
   *
   * @param {number} x - The x-coordinate of the object.
   * @param {number} y - The y-coordinate of the object.
   */
  constructor(x, y) {
    super().loadImage("../../assets/images/items/salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.groundY = canvasHeight - 160;
    this.throw();
  }

  /**
   * Throws the object with an initial upward speed and applies gravity.
   * The object moves horizontally based on the character's direction.
   * The movement stops when the object hits the ground.
   */
  throw() {
    this.throwableObjectAnimation();
    this.speedY = 30;
    this.applyGravity();
    const throwDirection = characterDirection;
    setStoppableInterval(() => {
      if (throwDirection === "right") this.x += 15;
      if (throwDirection === "left") this.x -= 15;
      this.checkIfOnGround();
    }, 25);
  }

  /**
   * Animates the throwable object by playing the rotation animation at a set interval.
   * Uses the `setStoppableInterval` function to repeatedly call `playAnimation` with `IMAGES_ROTATION`.
   */
  throwableObjectAnimation() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 100);
  }

  /**
   * Checks if the object has reached the ground level.
   * If the object is on the ground, it plays the splash animation.
   */
  checkIfOnGround() {
    if (this.y >= this.groundY) {
      this.playAnimation(this.IMAGES_SPLASH);
    }
  }
}
