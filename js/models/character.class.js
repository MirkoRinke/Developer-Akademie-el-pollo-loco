/**
 * @module "character.class.js"
 */

/**
 * Import the MovableObject class from the movable-object-class.js module.
 * Import the setStoppableInterval and playSound functions from the game.js module.
 * Import the resetAlert function from the endboss.class.js module.
 * Import the hurt_sound, snoring_sound, and walking_sound audio files from the sounds.js module.
 */
import { MovableObject } from "./movable-object-class.js";
import { setStoppableInterval, playSound } from "../game.js";
import { resetAlert } from "./endboss.class.js";
import { hurt_sound, snoring_sound, walking_sound } from "../sounds.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
export let characterPostion = 0;
export let characterDirection = "right";

/**
 * Represents a character in the game.
 * @extends MovableObject
 */
export class Character extends MovableObject {
  height = 300;
  width = 200;
  y = canvasHeight - this.height - 50;
  speed = 10;
  energy = 100;
  idle_time = 0;

  IMAGES_IDLE = [
    "./assets/images/player/pepe/1_idle/idle/I-1.png",
    "./assets/images/player/pepe/1_idle/idle/I-2.png",
    "./assets/images/player/pepe/1_idle/idle/I-3.png",
    "./assets/images/player/pepe/1_idle/idle/I-4.png",
    "./assets/images/player/pepe/1_idle/idle/I-5.png",
    "./assets/images/player/pepe/1_idle/idle/I-6.png",
    "./assets/images/player/pepe/1_idle/idle/I-7.png",
    "./assets/images/player/pepe/1_idle/idle/I-8.png",
    "./assets/images/player/pepe/1_idle/idle/I-9.png",
    "./assets/images/player/pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "./assets/images/player/pepe/1_idle//long_idle/I-11.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-12.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-13.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-14.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-15.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-16.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-17.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-18.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-19.png",
    "./assets/images/player/pepe/1_idle//long_idle/I-20.png",
  ];

  IMAGES_WALK = [
    "./assets/images/player/pepe/2_walk/W-21.png",
    "./assets/images/player/pepe/2_walk/W-22.png",
    "./assets/images/player/pepe/2_walk/W-23.png",
    "./assets/images/player/pepe/2_walk/W-24.png",
    "./assets/images/player/pepe/2_walk/W-25.png",
    "./assets/images/player/pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMP = [
    "./assets/images/player/pepe/3_jump/J-31.png",
    "./assets/images/player/pepe/3_jump/J-32.png",
    "./assets/images/player/pepe/3_jump/J-33.png",
    "./assets/images/player/pepe/3_jump/J-34.png",
    "./assets/images/player/pepe/3_jump/J-35.png",
    "./assets/images/player/pepe/3_jump/J-36.png",
    "./assets/images/player/pepe/3_jump/J-37.png",
    "./assets/images/player/pepe/3_jump/J-38.png",
    "./assets/images/player/pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "./assets/images/player/pepe/5_dead/D-51.png",
    "./assets/images/player/pepe/5_dead/D-52.png",
    "./assets/images/player/pepe/5_dead/D-53.png",
    "./assets/images/player/pepe/5_dead/D-54.png",
    "./assets/images/player/pepe/5_dead/D-55.png",
    "./assets/images/player/pepe/5_dead/D-56.png",
  ];
  IMAGES_REMOVE_CHARACTER = ["./assets/images/player/pepe/5_dead/D-57.png"];

  IMAGES_HURT = ["./assets/images/player/pepe/4_hurt/H-41.png", "./assets/images/player/pepe/4_hurt/H-42.png", "./assets/images/player/pepe/4_hurt/H-43.png"];

  world;

  /**
   * Initializes a new character instance by loading images for various states,
   * checking the character's position, applying gravity, and starting animations.
   */
  constructor() {
    super().loadImage("./assets/images/player/pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_REMOVE_CHARACTER);
    this.checkCharacterPosition();
    this.applyGravity();
    this.animate();
  }

  /**
   * Periodically checks the character's position and triggers an alert reset if the character moves beyond a certain point.
   * Uses a stoppable interval to repeatedly check the character's x-coordinate.
   */
  checkCharacterPosition() {
    setStoppableInterval(() => {
      characterPostion = this.x;
      if (this.x > canvasWidth * 1.7) {
        resetAlert();
      }
    }, 200);
  }

  /**
   * Checks if the character is above the given enemy.
   *
   * @param {Object} enemy - The enemy object to check against.
   * @param {string} enemy.constructor.name - The name of the enemy's constructor.
   * @param {number} enemy.y - The y-coordinate of the enemy.
   * @param {number} enemy.height - The height of the enemy.
   * @param {number} enemy.x - The x-coordinate of the enemy.
   * @param {number} enemy.width - The width of the enemy.
   * @returns {boolean} - Returns true if the character is above the enemy, otherwise false.
   */
  isAbove(enemy) {
    if (enemy.constructor.name === "Endboss") return;
    if (enemy.constructor.name === "ChickenSmall" && this.playerMoving()) return true;
    return this.y + this.height <= enemy.y + enemy.height && this.y + this.height > enemy.y && this.x + this.width > enemy.x && this.x < enemy.x + enemy.width && this.speedY < 0;
  }

  /**
   * Animates the character by managing its movement and triggering character-specific animations.
   */
  animate() {
    this.manageCharacterMovement();
    this.characterAnimation();
  }

  /**
   * Manages the character's movement by setting intervals to check and execute movement actions.
   * - Moves the character to the right if possible.
   * - Moves the character to the left if possible.
   * - Makes the character jump if possible.
   * - Adjusts the camera position based on the character's x-coordinate.
   */
  manageCharacterMovement() {
    setStoppableInterval(() => {
      if (this.canMoveRight()) this.characterMoveRight();
      if (this.canMoveLeft()) this.characterMoveLeft();
      if (this.canJump()) this.jump();
      if (this.x < canvasWidth * 1.8) this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Animates the character by setting up intervals for various animations.
   * Each animation is checked at a specified interval.
   *
   * - Dead animation is checked every 100ms.
   * - Hurt animation is checked every 200ms.
   * - Jump animation is checked every 250ms.
   * - Walk animation is checked every 100ms.
   * - Idle animation is checked every 250ms.
   */
  characterAnimation() {
    setStoppableInterval(this.checkDeadAnimation.bind(this), 250);
    setStoppableInterval(this.checkHurtAnimation.bind(this), 200);
    setStoppableInterval(this.checkJumpAnimation.bind(this), 250);
    setStoppableInterval(this.checkWalkAnimation.bind(this), 100);
    setStoppableInterval(this.checkIdleAnimation.bind(this), 250);
  }

  /**
   * Checks and plays the appropriate dead animation for the character.
   * If the character is already in the dead animation state, it plays the removal animation.
   * Otherwise, if the character is dead and not yet in the dead animation state, it plays the dead animation and sets the deadAnimation flag to true.
   */
  checkDeadAnimation() {
    if (this.deadAnimation) {
      this.playAnimation(this.IMAGES_REMOVE_CHARACTER);
    } else if (this.isDead() && !this.deadAnimation) {
      this.playAnimation(this.IMAGES_DEAD);
      this.deadAnimation = true;
    }
  }

  /**
   * Checks if the character is hurt and plays the hurt animation and sound if true.
   * Pauses and resets the snoring sound, then plays the hurt sound.
   */
  checkHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      snoring_sound.pause();
      snoring_sound.currentTime = 0;
      playSound(hurt_sound, 0.1);
    }
  }

  /**
   * Checks if the character is above the ground and plays the jump animation if true.
   * Updates the idle time to the current time.
   */
  checkJumpAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMP);
      this.idle_time = new Date().getTime();
    }
  }

  /**
   * Checks if the player is moving and not above ground, then plays the walking animation.
   * Updates the idle time to the current time.
   */
  checkWalkAnimation() {
    if (this.playerMoving() && !this.isAboveGround()) {
      this.playAnimation(this.IMAGES_WALK);
      this.idle_time = new Date().getTime();
    }
  }

  /**
   * Checks the character's idle state and plays the appropriate animation.
   * If the character is idle for more than 15 seconds, it plays a snoring sound and a long idle animation.
   * Conditions for idle state:
   * - Character is not dead
   * - Character is not hurt
   * - Character is not above ground
   * - Character is not moving
   */
  checkIdleAnimation() {
    if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !this.playerMoving()) {
      this.playAnimation(this.IMAGES_IDLE);
      if (new Date().getTime() - this.idle_time > 15000 && this.idle_time !== 0) {
        this.playSnoringSound();
        this.playAnimation(this.IMAGES_IDLE_LONG);
      }
    }
  }

  /**
   * Plays the snoring sound effect at a low volume.
   */
  playSnoringSound() {
    playSound(snoring_sound, 0.1);
  }

  /**
   * Checks if the player is moving.
   * @returns {boolean} True if the player is moving, otherwise false.
   */
  playerMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character can move to the right.
   *
   * @returns {boolean} True if the character can move right, otherwise false.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Moves the character to the right if not dead.
   * Pauses and resets the snoring sound, then plays the walking sound.
   * Sets the character's direction to right.
   */
  characterMoveRight() {
    if (!this.isDead()) {
      this.moveRight();
      snoring_sound.pause();
      snoring_sound.currentTime = 0;
      playSound(walking_sound);
      this.otherDirection = false;
      characterDirection = "right";
    }
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean} True if the character can move left, otherwise false.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Moves the character to the left if not dead.
   * Pauses the snoring sound and resets its time.
   * Plays the walking sound.
   * Sets the character's direction to left.
   */
  characterMoveLeft() {
    if (!this.isDead()) {
      this.moveLeft();
      snoring_sound.pause();
      snoring_sound.currentTime = 0;
      playSound(walking_sound);
      this.otherDirection = true;
      characterDirection = "left";
    }
  }

  /**
   * Determines if the character can jump.
   *
   * @returns {boolean} True if the character can jump, otherwise false.
   */
  canJump() {
    return this.world.keyboard.JUMP && !this.isAboveGround();
  }
}
