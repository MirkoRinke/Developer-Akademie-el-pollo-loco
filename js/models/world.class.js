// Load Character, level1, StatusBar, ThrowableObject classes from their respective files
import { Character } from "./character.class.js";
import { level1 } from "../Levels/level1.js";
import { StatusBarHealth } from "./status-bar-health.class.js";
import { SalsaBottlesBar } from "./salsa-bottles-bar.class.js";
import { CoinsBar } from "./coins-bar.class.js";
import { StatusBarEndbossHealth } from "./status-bar-endboss-health.class.js";
import { VendingMachine } from "./vending-machine.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

// import the setStoppableInterval function from the script.js file
import { setStoppableInterval, stopGame, playSound } from "../game.js";

// import the checkCharacterCollision function from the endboss.class.js file
import { checkCharacterCollision } from "./endboss.class.js";

// Load the sounds from the script.js file
import {
  first_blood_sound,
  double_kill_sound,
  triple_kill_sound,
  rampage_sound,
  killshot_sound,
  dominating_sound,
  kill_streak_sound,
  chicken_death_sound,
  coin_sound,
  win_sound,
  game_over_sound,
} from "../sounds.js";

// World class is used to create the game world
export class World {
  character = new Character(); // Create a new character object
  level = level1; // Set the level of the game
  ctx; // Context
  canvas; // Canvas
  keyboard; // Keyboard
  camera_x = 0; // Camera x-coordinate
  statusBarHealth = new StatusBarHealth(); // Create a new status bar object.
  salsaBottlesBar = new SalsaBottlesBar(); // Create a new salsa bottles bar object
  coinsBar = new CoinsBar(); // Create a new coins bar object
  statusBarEndbossHealth = new StatusBarEndbossHealth(); // Create a new status bar endboss health object
  vendingMachine = new VendingMachine(); // Create a new vending machine object
  throwableObjects = []; // Array to store throwable objects
  salsaBottles = []; // Array to store salsa bottles
  coins = []; // Array to store coins
  currentBottles = 0; // Current number of salsa bottles
  currentCoins = 0; // Current number of coins
  deadEnemyCount = 0; // Number of dead enemies
  rampageCount = 0; // Number of rampages
  isGameOver = false; // Game over variable

  playOnlyOnce = true; // Set the playOnlyOnce variable to true

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // Get the context of the canvas
    this.canvas = canvas; // Set the canvas of the world object
    this.keyboard = keyboard; // Set the keyboard of the world object
    this.draw(); // Call the draw method to draw the game world
    this.setWorld(); // Call the setWorld method to set the world
    this.run(); // Call the run method to for the game loops
  }

  // Method to set the world object of the character object
  setWorld() {
    this.character.world = this;
  }

  // Method to run the game loops for the game world
  run() {
    setStoppableInterval(() => this.checkCollisions(), 1);
    setStoppableInterval(() => this.checkThrowableObjects(), 1);
    setStoppableInterval(() => this.checkCharacterIsDead(), 1);
    setStoppableInterval(() => this.checkEnemyIsDead(), 250);
    setStoppableInterval(() => this.deleteEnemy(), 250);
  }

  // Method to check if the character is dead
  checkCharacterIsDead() {
    if (this.character.isDead()) this.gameOver(true);
  }

  // Method to check if the enemy is dead
  checkEnemyIsDead() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) {
        (enemy.speed = 0), this.removeDeadEnemies(), this.playKillSounds();
        if (enemy.constructor.name === "Endboss") this.gameOver();
        return true;
      }
    });
  }

  // Method to stop the game when the character is dead
  gameOver(isPlayerDead = false) {
    if (isPlayerDead && !this.isGameOver) {
      console.log("Game Over!"); //! Log "Game Over!" to the console when the game is over (character is dead)
      setTimeout(() => stopGame(), 500); // Stop the game after 500 milliseconds
      this.isGameOver = true; // Set the gameOver variable to true
      playSound(game_over_sound);
    } else if (!this.isGameOver) {
      console.log("Gewonnen!"); //! Log "Game Over!" to the console when the game is over (character is dead)
      playSound(win_sound); //! Play the win sound when the game is over
      this.isGameOver = true; // Set the gameOver variable to true
      setTimeout(() => this.removeAllEnemies(), 1000);
    }
  }

  // Method to remove all enemies from the game world
  removeAllEnemies() {
    this.level.enemies = [];
  }

  // Method to remove dead enemies from the game world
  removeDeadEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead() && enemy.constructor.name !== "Endboss") {
        this.deadEnemyCount++, this.rampageCount++, this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
      }
    });
  }

  // Method to delete enemies from the game world
  deleteEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.x < 0) {
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        if (this.level.enemies.length === 1) this.dominating();
      }
    });
  }

  // Method to play kill sounds in the game world
  playKillSounds() {
    setTimeout(() => (this.rampageCount = 0), 2000);
    this.rampage(), this.firstBlood(), this.doubleKill(), this.tripleKill(), this.killStreak(), this.dominating();
    if (this.playOnlyOnce) this.playOnlyOnce = false;
  }

  // Method to play the rampage sound in the game world
  rampage() {
    if (this.rampageCount >= 6) {
      playSound(rampage_sound);
    }
  }

  // Method to play the first blood sound in the game world
  firstBlood() {
    if (this.deadEnemyCount == 1 || this.playOnlyOnce) {
      this.playOnlyOnce ? playSound(first_blood_sound) : playSound(chicken_death_sound), (this.deadEnemyCount = 0);
    }
  }

  // Method to play the double kill sound in the game world
  doubleKill() {
    if (this.deadEnemyCount == 2 && !this.playOnlyOnce) {
      playSound(double_kill_sound), (this.deadEnemyCount = 0);
    }
  }

  // Method to play the triple kill sound in the game world
  tripleKill() {
    if (this.deadEnemyCount == 3 && !this.playOnlyOnce) {
      playSound(triple_kill_sound), (this.deadEnemyCount = 0);
    }
  }

  // Method to play the kill streak sound in the game world
  killStreak() {
    if (this.deadEnemyCount >= 4 && this.deadEnemyCount < 6 && !this.playOnlyOnce) {
      playSound(kill_streak_sound), (this.deadEnemyCount = 0);
    }
  }

  // Method to play the dominating sound in the game world
  dominating() {
    if (this.level.enemies.length == 1 && this.level.enemies[0].constructor.name === "Endboss" && this.level.enemies[0].energy > 0) {
      playSound(dominating_sound);
    }
  }

  // Method to check for throwable objects in the game world
  checkThrowableObjects() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastHit < 1000) return;
    if (this.keyboard.THRO && this.currentBottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle), this.currentBottles--, this.salsaBottlesBar.setPercentage(this.currentBottles * 20);
      this.lastHit = currentTime;
    }
  }

  // Method to check for collisions in the game world
  checkCollisions() {
    this.checkCollisionsEnemy(), this.checkCollisionsThrowableObjects(), this.checkCollisionsSalasBottles(), this.checkCollisionsCoins();
  }

  // Method to check for collisions with enemies in the game world
  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (!this.character.isColliding(enemy) || enemy.energy <= 0) {
        checkCharacterCollision(false, enemy.constructor.name);
        return;
      }
      if (this.character.isAbove(enemy)) enemy.hit(4);
      else {
        this.character.hit(enemy.constructor.name === "Endboss" ? 4 : 1);
        checkCharacterCollision(true, enemy.constructor.name);
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  // Method to check for collisions with throwable objects in the game world
  checkCollisionsThrowableObjects() {
    this.throwableObjects.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          if (enemy.constructor.name === "Endboss") enemy.hit(1), this.statusBarEndbossHealth.setPercentage(enemy.energy * 10);
          else enemy.hit();
        }
      });
    });
  }

  // Method to check for collisions with salsa bottles in the game world
  checkCollisionsSalasBottles() {
    this.level.salsaBottles.forEach((salsaBottle) => {
      if (this.character.isColliding(salsaBottle) && this.currentBottles < 5) {
        this.level.salsaBottles.splice(this.level.salsaBottles.indexOf(salsaBottle), 1);
        this.currentBottles++, this.salsaBottlesBar.setPercentage(this.currentBottles * 20);
      }
    });
  }

  // Method to check for collisions with coins in the game world
  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && this.currentCoins < 10) {
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
        this.currentCoins++, playSound(coin_sound), this.coinsBar.setPercentage(this.currentCoins * 10);
      }
    });
  }

  // Method to draw the game world on the canvas
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
    this.ctx.translate(this.camera_x, 0); // Translate the context of the canvas to the camera x-coordinate
    this.addObjectsToMap(this.level.backgroundObjects); // Add the background objects to the map
    this.addToMap(this.vendingMachine); // Add the vending machine to the map

    this.ctx.translate(-this.camera_x, 0); // Translate the context of the canvas to the negative of the camera x-coordinate
    this.addToMap(this.statusBarHealth); // Add the status bar to the map
    this.addToMap(this.salsaBottlesBar); // Add the salsa bottles bar to the map
    this.addToMap(this.coinsBar); // Add the coins bar to the map
    this.addToMap(this.statusBarEndbossHealth); // Add the status bar endboss health to the map
    this.ctx.translate(this.camera_x, 0); // Translate the context of the canvas to the camera x-coordinate

    this.addObjectsToMap(this.level.salsaBottles); // Add the salsa bottles to the map
    this.addObjectsToMap(this.level.coins); // Add the coins to the map

    this.addToMap(this.character); // Add the character to the map
    this.addObjectsToMap(this.level.enemies); // Add the enemies to the map
    this.addObjectsToMap(this.level.clouds); // Add the clouds to the map
    this.addObjectsToMap(this.throwableObjects); // Add the throwable objects to the map

    this.ctx.translate(-this.camera_x, 0); // Translate the context of the canvas to the negative of the camera x-coordinate
    requestAnimationFrame(() => this.draw()); // Request the next frame to draw the game world
  }

  // Method to add objects to the map of the game world
  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  // Method to add an object to the map of the game world
  addToMap(movableObject) {
    if (movableObject.otherDirection) this.flipImage(movableObject); // Flip the image of the object if it is moving in the other direction
    movableObject.draw(this.ctx); // Draw the object on the canvas
    movableObject.drawFrame(this.ctx); // Draw the frame of the object on the canvas
    if (movableObject.otherDirection) this.flipImageBack(movableObject); // Flip the image of the object back if it was flipped
  }

  // Method to flip the image of the object in the game world
  flipImage(movableObject) {
    this.ctx.save(); // Save the context of the canvas
    this.ctx.translate(movableObject.width, 0); // Translate the context of the canvas to the width of the object
    this.ctx.scale(-1, 1); // Scale the context of the canvas
    movableObject.x = movableObject.x * -1; // Set the x-coordinate of the object to the negative of the x-coordinate
  }

  // Method to flip the image of the object back in the game world
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1; // Set the x-coordinate of the object back to the original x-coordinate
    this.ctx.restore(); // Restore the context of the canvas to the original state
  }
}
