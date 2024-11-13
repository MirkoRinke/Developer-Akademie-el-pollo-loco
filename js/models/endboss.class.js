/**
 * @module "endboss.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 * Import the setStoppableInterval and playSound functions from the game.js module.
 * Import the chicken_attack_sound, chicken_sound, and fight_sound audio files from the sounds.js module.
 * Import the characterPostion constant from the character.class.js module.
 */
import { MovableObject } from "./movable-object-class.js";
import { setStoppableInterval, playSound } from "../game.js";
import { chicken_attack_sound, chicken_sound, fight_sound } from "../sounds.js";
import { characterPostion } from "../models/character.class.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
let startAlert = 0;
let firstContact = false;
let isColliding = false;

/**
 * Resets the alert status for the end boss.
 * If it's the first contact, it sets the start alert to 0.
 * Sets the first contact flag to true.
 */
export function resetAlert() {
  if (!firstContact) startAlert = 0;
  firstContact = true;
}

/**
 * Resets the first contact flag to false.
 */
export function resetFirstContact() {
  firstContact = false;
}

/**
 * Checks for collision with the Endboss character.
 *
 * @param {boolean} colliding - Indicates if a collision is occurring.
 * @param {string} enemy - The type of enemy to check collision against.
 */
export function checkCharacterCollision(colliding, enemy) {
  if (enemy === "Endboss") isColliding = colliding;
}

/**
 * Represents the Endboss character in the game.
 * @extends MovableObject
 */
export class Endboss extends MovableObject {
  height = 400;
  width = 350;
  y = canvasHeight - this.height - 25;
  energy = 10;
  multiplier = 20;

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

  IMAGES_WALK = [
    "../../assets/images/enemies/chicken_boss/1_walk/G1.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G2.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G3.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G4.png",
  ];

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

  IMAGES_HURT = ["../../assets/images/enemies/chicken_boss/4_hurt/G21.png", "../../assets/images/enemies/chicken_boss/4_hurt/G22.png", "../../assets/images/enemies/chicken_boss/4_hurt/G23.png"];

  IMAGES_DEAD = ["../../assets/images/enemies/chicken_boss/5_dead/G24.png", "../../assets/images/enemies/chicken_boss/5_dead/G25.png", "../../assets/images/enemies/chicken_boss/5_dead/G26.png"];

  /**
   * Constructs an instance of the EndBoss class.
   * Loads images for different states and sets the initial position.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = canvasWidth * 2.5;
    this.animate();
  }

  /**
   * Animates the end boss by managing its movement and triggering its animation.
   */
  animate() {
    this.manageEndbossMovement();
    this.endbossAnimation();
  }

  /**
   * Manages the movement of the end boss by setting an interval that checks for the first contact
   * and moves the end boss towards the character if contact is made.
   */
  manageEndbossMovement() {
    setStoppableInterval(() => {
      if (firstContact) this.moveTowardsCharacter();
    }, 1000 / 60);
  }

  /**
   * Moves the end boss towards the character's position.
   * Adjusts the position based on the distance and speed.
   * Changes direction if necessary.
   */
  moveTowardsCharacter() {
    const distance = Math.abs(this.x - characterPostion);
    if (distance > this.speed * this.multiplier) {
      this.x += (this.x > characterPostion ? -1 : 1) * this.speed * this.multiplier;
      this.otherDirection = this.x < characterPostion;
    } else {
      this.x = characterPostion;
    }
  }

  /**
   * Animates the end boss character based on its current state.
   * The animation changes depending on whether the end boss is alert, dead, hurt, or attacking.
   * If none of these states apply, the end boss will play its walking animation.
   */
  endbossAnimation() {
    setStoppableInterval(() => {
      if (startAlert <= 10) {
        this.animateAlert();
      } else if (this.isDead()) {
        this.animateDead();
      } else if (this.isHurt()) {
        this.animateHurt();
        this.hasBeenHit();
      } else if (isColliding) {
        this.animateAttack();
      } else this.playAnimation(this.IMAGES_WALK);
    }, 200);
  }

  /**
   * Handles the event when the end boss has been hit.
   * Sets an initial multiplier and then changes it after a delay.
   */
  hasBeenHit() {
    this.multiplier = 6;
    setStoppableInterval(() => {
      this.multiplier = 20;
    }, 2000);
  }

  /**
   * Triggers the alert animation and plays a sound on first contact.
   * Increments the alert counter after the first contact.
   */
  animateAlert() {
    this.playAnimation(this.IMAGES_ALERT);
    if (firstContact && startAlert < 1) playSound(fight_sound);
    startAlert++;
  }

  /**
   * Animates the end boss's death sequence by playing the dead animation
   * and adjusting its vertical position to the bottom of the canvas.
   */
  animateDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.y = canvasHeight - this.height;
  }

  /**
   * Animates the hurt state of the end boss by playing the hurt animation and sound.
   */
  animateHurt() {
    this.playAnimation(this.IMAGES_HURT);
    playSound(chicken_sound);
  }

  /**
   * Animates the attack sequence for the end boss.
   * Plays the attack animation and sound.
   */
  animateAttack() {
    this.playAnimation(this.IMAGES_ATTACK);
    playSound(chicken_attack_sound);
  }
}
