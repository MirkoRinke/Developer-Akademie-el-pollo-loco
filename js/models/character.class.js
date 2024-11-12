// Load the MovableObject class from the movable-object-class.js file
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval, playSound } from "../game.js";

// Load the resetAlert function from the endboss.class.js file
import { resetAlert } from "./endboss.class.js";

import { hurt_sound, snoring_sound, walking_sound } from "../sounds.js";

// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
export let characterPostion = 0;
export let characterDirection = "right";

// Character class is a subclass of MovableObject
// It is used to create the main character of the game
export class Character extends MovableObject {
  height = 300; // height of the character
  width = 200; // width of the character
  y = canvasHeight - this.height - 50; // y position of the character
  speed = 10; // speed of the character
  energy = 100; //! energy of the character
  idle_time = 0; // idle time of the character

  // Arrays of image paths for different animations of the character idling.
  IMAGES_IDLE = [
    "../../assets/images/player/pepe/1_idle/idle/I-1.png",
    "../../assets/images/player/pepe/1_idle/idle/I-2.png",
    "../../assets/images/player/pepe/1_idle/idle/I-3.png",
    "../../assets/images/player/pepe/1_idle/idle/I-4.png",
    "../../assets/images/player/pepe/1_idle/idle/I-5.png",
    "../../assets/images/player/pepe/1_idle/idle/I-6.png",
    "../../assets/images/player/pepe/1_idle/idle/I-7.png",
    "../../assets/images/player/pepe/1_idle/idle/I-8.png",
    "../../assets/images/player/pepe/1_idle/idle/I-9.png",
    "../../assets/images/player/pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "../../assets/images/player/pepe/1_idle//long_idle/I-11.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-12.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-13.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-14.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-15.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-16.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-17.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-18.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-19.png",
    "../../assets/images/player/pepe/1_idle//long_idle/I-20.png",
  ];

  // Arrays of image paths for different animations of the character walking.
  IMAGES_WALK = [
    "../../assets/images/player/pepe/2_walk/W-21.png",
    "../../assets/images/player/pepe/2_walk/W-22.png",
    "../../assets/images/player/pepe/2_walk/W-23.png",
    "../../assets/images/player/pepe/2_walk/W-24.png",
    "../../assets/images/player/pepe/2_walk/W-25.png",
    "../../assets/images/player/pepe/2_walk/W-26.png",
  ];
  // Arrays of image paths for different animations of the character jumping.
  IMAGES_JUMP = [
    "../../assets/images/player/pepe/3_jump/J-31.png",
    "../../assets/images/player/pepe/3_jump/J-32.png",
    "../../assets/images/player/pepe/3_jump/J-33.png",
    "../../assets/images/player/pepe/3_jump/J-34.png",
    "../../assets/images/player/pepe/3_jump/J-35.png",
    "../../assets/images/player/pepe/3_jump/J-36.png",
    "../../assets/images/player/pepe/3_jump/J-37.png",
    "../../assets/images/player/pepe/3_jump/J-38.png",
    "../../assets/images/player/pepe/3_jump/J-39.png",
  ];
  // Arrays of image paths for different animations of the character dying.
  IMAGES_DEAD = [
    "../../assets/images/player/pepe/5_dead/D-51.png",
    "../../assets/images/player/pepe/5_dead/D-52.png",
    "../../assets/images/player/pepe/5_dead/D-53.png",
    "../../assets/images/player/pepe/5_dead/D-54.png",
    "../../assets/images/player/pepe/5_dead/D-55.png",
    "../../assets/images/player/pepe/5_dead/D-56.png",
  ];
  IMAGES_REMOVE_CHARACTER = ["../../assets/images/player/pepe/5_dead/D-57.png"];

  // Arrays of image paths for different animations of the character being hurt.
  IMAGES_HURT = ["../../assets/images/player/pepe/4_hurt/H-41.png", "../../assets/images/player/pepe/4_hurt/H-42.png", "../../assets/images/player/pepe/4_hurt/H-43.png"];
  world; // world object
  constructor() {
    super().loadImage("../../assets/images/player/pepe/2_walk/W-21.png"); // load the image of the character using the loadImage method from the MovableObject class
    this.loadImages(this.IMAGES_IDLE); // load the images for the idle animation
    this.loadImages(this.IMAGES_IDLE_LONG); // load the images for the long idle animation
    this.loadImages(this.IMAGES_WALK); // load the images for the walking animation
    this.loadImages(this.IMAGES_JUMP); // load the images for the jumping animation
    this.loadImages(this.IMAGES_DEAD); // load the images for the dying animation
    this.loadImages(this.IMAGES_HURT); // load the images for the being hurt animation
    this.loadImages(this.IMAGES_REMOVE_CHARACTER); // load the images for the removing animation
    this.checkCharacterPosition(); // check the character position
    this.applyGravity(); // apply gravity to the character
    this.animate(); // animate the character
  }

  // Check the character position and reset the alert if the character is out of the screen
  checkCharacterPosition() {
    setStoppableInterval(() => {
      characterPostion = this.x;
      if (this.x > canvasWidth * 1.8) {
        resetAlert();
      }
    }, 200);
  }

  // Check if the character is above the ground by checking the y position of the character is less than the ground level
  isAbove(enemy) {
    if (enemy.constructor.name === "Endboss") return;
    if (enemy.constructor.name === "ChickenSmall" && this.playerMoving()) return true;
    return (
      this.y + this.height <= enemy.y + enemy.height && // check if the y position of the character is less than the y position of the enemy
      this.y + this.height > enemy.y && // check if the y position of the character is greater than the y position of the enemy
      this.x + this.width > enemy.x && // check if the x position of the character is greater than the x position of the enemy
      this.x < enemy.x + enemy.width && // check if the x position of the character is less than the x position of the enemy
      this.speedY < 0 // check if the character is moving downwards
    );
  }

  // Animate the character by managing the character movement and character animation
  animate() {
    this.manageCharacterMovement();
    this.characterAnimation();
  }

  // Manage the character movement by checking if the character can move right, left
  manageCharacterMovement() {
    setStoppableInterval(() => {
      if (this.canMoveRight()) this.characterMoveRight(); // check if the character can move right and move the character right
      if (this.canMoveLeft()) this.characterMoveLeft(); // check if the character can move left and move the character left
      if (this.canJump()) this.jump(); // check if the character can jump and make the character jump
      if (this.x < canvasWidth * 1.8) this.world.camera_x = -this.x + 100; // set the camera x position to follow the character
    }, 1000 / 60);
  }

  // Animate the character by playing different animations based on the character's state
  characterAnimation() {
    setStoppableInterval(this.checkDeadAnimation.bind(this), 100);
    setStoppableInterval(this.checkHurtAnimation.bind(this), 200);
    setStoppableInterval(this.checkJumpAnimation.bind(this), 250);
    setStoppableInterval(this.checkWalkAnimation.bind(this), 100);
    setStoppableInterval(this.checkIdleAnimation.bind(this), 250);
  }

  checkDeadAnimation() {
    if (this.deadAnimation) {
      this.playAnimation(this.IMAGES_REMOVE_CHARACTER);
    } else if (this.isDead() && !this.deadAnimation) {
      // check if the character is dead and play the dying animation
      this.playAnimation(this.IMAGES_DEAD);
      this.deadAnimation = true;
    }
  }

  checkHurtAnimation() {
    if (this.isHurt()) {
      // check if the character is hurt and play the being hurt animation
      this.playAnimation(this.IMAGES_HURT);
      playSound(hurt_sound, 0.1);
    }
  }

  checkJumpAnimation() {
    if (this.isAboveGround()) {
      // check if the character is above the ground and play the jumping animation
      this.playAnimation(this.IMAGES_JUMP);
      this.idle_time = new Date().getTime();
    }
  }

  checkWalkAnimation() {
    if (this.playerMoving() && !this.isAboveGround()) {
      // check if the character is moving right or left and play the walking animation
      this.playAnimation(this.IMAGES_WALK);
      this.idle_time = new Date().getTime();
    }
  }

  checkIdleAnimation() {
    if (!this.isDead() && !this.isHurt() && !this.isAboveGround() && !this.playerMoving()) {
      // play the default image of the character
      this.playAnimation(this.IMAGES_IDLE);
      if (new Date().getTime() - this.idle_time > 15000 && this.idle_time !== 0) {
        this.playSnoringSound();
        this.playAnimation(this.IMAGES_IDLE_LONG);
      }
    }
  }

  playSnoringSound() {
    playSound(snoring_sound, 0.1);
  }

  playerMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  // Check the character can move right or not by checking the RIGHT key is pressed and the x position of the character is less than the level_end_x
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  // Character move right and play the walking sound and set the otherDirection to false
  characterMoveRight() {
    if (!this.isDead()) {
      this.moveRight();
      snoring_sound.pause();
      playSound(walking_sound);
      this.otherDirection = false;
      characterDirection = "right";
    }
  }

  // Check the character can move left or not by checking the LEFT key is pressed and the x position of the character is greater than 0
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  // Character move left and play the walking sound and set the otherDirection to true
  characterMoveLeft() {
    if (!this.isDead()) {
      this.moveLeft();
      snoring_sound.pause();
      playSound(walking_sound);
      this.otherDirection = true;
      characterDirection = "left";
    }
  }

  // Check the character can jump or not by checking the SPACE key is pressed and the character is not above the ground
  canJump() {
    return this.world.keyboard.JUMP && !this.isAboveGround();
  }
}
