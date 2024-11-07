// Load the MovableObject class from the movable-object-class.js file
import { MovableObject } from "./movable-object-class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval } from "../script.js";

import { resetAlert } from "./endboss.class.js";

// Character class is a subclass of MovableObject
// It is used to create the main character of the game
export class Character extends MovableObject {
  height = 300; // height of the character
  width = 200; // width of the character
  y = 150; // y position of the character
  speed = 10; // speed of the character
  energy = 10000; //! energy of the character
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
  walking_sound = new Audio("../../assets/sounds/sfx/running.mp3"); // sound for walking
  constructor() {
    super().loadImage("../../assets/images/player/pepe/2_walk/W-21.png"); // load the image of the character using the loadImage method from the MovableObject class
    this.loadImages(this.IMAGES_WALK); // load the images for the walking animation
    this.loadImages(this.IMAGES_JUMP); // load the images for the jumping animation
    this.loadImages(this.IMAGES_DEAD); // load the images for the dying animation
    this.loadImages(this.IMAGES_HURT); // load the images for the being hurt animation
    this.loadImages(this.IMAGES_REMOVE_CHARACTER); // load the images for the removing animation
    this.checkCharacterPosition(); // check the character position
    this.applyGravity(); // apply gravity to the character
    this.animate(); // animate the character
  }

  checkCharacterPosition() {
    setStoppableInterval(() => {
      if (this.x > 2000) {
        resetAlert();
      }
    }, 200);
  }

  // Animate the character by managing the character movement and character animation
  animate() {
    this.manageCharacterMovement();
    this.characterAnimation();
  }

  // Manage the character movement by checking if the character can move right, left
  manageCharacterMovement() {
    setStoppableInterval(() => {
      this.walking_sound.pause();
      if (this.canMoveRight()) this.characterMoveRight(); // check if the character can move right and move the character right
      if (this.canMoveLeft()) this.characterMoveLeft(); // check if the character can move left and move the character left
      if (this.canJump()) this.jump(); // check if the character can jump and make the character jump
      this.world.camera_x = -this.x + 100; // set the camera x position to follow the character
    }, 1000 / 60);
  }

  // Animate the character by playing different animations based on the character's state
  characterAnimation() {
    let deadAnimation = false; // set deadAnimation to false
    setStoppableInterval(() => {
      if (deadAnimation) {
        this.playAnimation(this.IMAGES_REMOVE_CHARACTER);
      } else if (this.isDead() && !deadAnimation) {
        // check if the character is dead and play the dying animation
        this.playAnimation(this.IMAGES_DEAD);
        deadAnimation = true;
      } else if (this.isHurt()) {
        // check if the character is hurt and play the being hurt animation
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        // check if the character is above the ground and play the jumping animation
        this.playAnimation(this.IMAGES_JUMP);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // check if the character is moving right or left and play the walking animation
        this.playAnimation(this.IMAGES_WALK);
      }
    }, 50);
  }

  // Check the character can move right or not by checking the RIGHT key is pressed and the x position of the character is less than the level_end_x
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  // Character move right and play the walking sound and set the otherDirection to false
  characterMoveRight() {
    if (!this.isDead()) {
      this.moveRight();
      this.walking_sound.play();
      this.otherDirection = false;
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
      this.walking_sound.play();
      this.otherDirection = true;
    }
  }

  // Check the character can jump or not by checking the SPACE key is pressed and the character is not above the ground
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }
}
