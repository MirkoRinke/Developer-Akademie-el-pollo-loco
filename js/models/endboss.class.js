// Load MovableObject class from movable-object-class.js
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval, playSound } from "../script.js";

import { chicken_attack_sound, chicken_sound, fight_sound } from "../sounds.js";

import { characterPostion } from "../models/character.class.js";

// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

// Create a variable to store the startAlert value
let startAlert = 0; // set the initial value of the startAlert variable to

// Create a variable to store the alertInterval value for the end boss
let firstContact = false; // set the initial value of the alertInterval variable to true

// Create a variable to store the isColliding value for the end boss
let isColliding = false; // set the initial value of the isColliding variable to false

// Function to reset the alert for the end boss
export function resetAlert() {
  if (!firstContact) {
    startAlert = 0; // reset the value of the startAlert variable to 0
  }
  firstContact = true; // set the alertInterval variable to false
}

// Function to check character collision with the end boss
export function checkCharacterCollision(colliding, enemy) {
  if (enemy === "Endboss") isColliding = colliding;
}

// Create Endboss class that extends MovableObject class
// It is used to create the end boss in the game
export class Endboss extends MovableObject {
  height = 400; // height of the end boss
  width = 350; // width of the end boss
  y = canvasHeight - this.height - 25; // y position of the end boss
  energy = 10; // energy of the chicken

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

  // Array of images for the end boss walk animation
  IMAGES_WALK = [
    "../../assets/images/enemies/chicken_boss/1_walk/G1.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G2.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G3.png",
    "../../assets/images/enemies/chicken_boss/1_walk/G4.png",
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
    this.x = canvasWidth * 2.5; // set the x position of the end boss
    this.animate(); // animate the end boss
  }

  // Animate the end boss by playing the end boss walk animation
  animate() {
    this.manageEndbossMovement();
    this.endbossAnimation();
  }

  // Manage the end boss movement by moving the end boss to the left
  manageEndbossMovement() {
    setStoppableInterval(() => {
      if (firstContact) {
        if (this.x > characterPostion) {
          this.x -= this.speed * 5; // Bewegt sich nach links
          this.otherDirection = false;
        } else {
          this.x += this.speed * 5; // Bewegt sich nach rechts
          this.otherDirection = true;
        }
      }
    }, 1000 / 60);
  }

  // Animate the end boss by playing the end boss walk animation repeatedly at a certain interval
  endbossAnimation() {
    setStoppableInterval(() => {
      if (startAlert <= 10) {
        this.playAnimation(this.IMAGES_ALERT); // play the end boss walk animation
        if (firstContact && startAlert < 1) playSound(fight_sound); // play the chicken sound
        startAlert++; // increment the startAlert variable by 1
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); // play the dying animation if the chicken is dead
        this.y = canvasHeight - this.height; // set the y position of the end boss to 0
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT); // play the hurt animation if the chicken is hurt
        playSound(chicken_sound); // play the chicken sound
      } else if (isColliding) {
        this.playAnimation(this.IMAGES_ATTACK); // play the attack animation if the chicken is attacking
        playSound(chicken_attack_sound); // play the chicken attack sound
      } else this.playAnimation(this.IMAGES_WALK); // play the end boss walk animation
    }, 200);
  }
}
