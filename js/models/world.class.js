/**
 * Importing necessary classes and functions for the World class.
 *
 * @module WorldDependencies
 */
import { Character } from "./character.class.js";
import { level1 } from "../Levels/level1.js";
import { StatusBarHealth } from "./status-bar-health.class.js";
import { SalsaBottlesBar } from "./salsa-bottles-bar.class.js";
import { CoinsBar } from "./coins-bar.class.js";
import { StatusBarEndbossHealth } from "./status-bar-endboss-health.class.js";
import { VendingMachine } from "./vending-machine.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { SalsaBottles } from "../models/salsa_bottles.class.js";
import { setStoppableInterval, stopGame, playSound } from "../game.js";
import { checkCharacterCollision } from "./endboss.class.js";
import { first_blood_sound, double_kill_sound, triple_kill_sound, rampage_sound, dominating_sound, kill_streak_sound, chicken_death_sound, coin_sound, win_sound, game_over_sound } from "../sounds.js";

export class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBarHealth();
  salsaBottlesBar = new SalsaBottlesBar();
  coinsBar = new CoinsBar();
  statusBarEndbossHealth = new StatusBarEndbossHealth();
  vendingMachine = new VendingMachine();
  throwableObjects = [];
  salsaBottles = [];
  coins = [];
  currentBottles = 0;
  currentCoins = 0;
  deadEnemyCount = 0;
  rampageCount = 0;
  isGameOver = false;
  playOnlyOnce = true;

  /**
   * Creates an instance of the World class.
   *
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
   * @param {Object} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world reference for the character.
   * This method assigns the current world instance to the character's world property.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game loop by setting up various intervals to check for game events.
   *
   * The following intervals are set:
   * - Every 1 millisecond: Checks for collisions.
   * - Every 1 millisecond: Checks for throwable objects.
   * - Every 250 milliseconds: Checks if the character is dead.
   * - Every 250 milliseconds: Checks if any enemy is dead.
   * - Every 250 milliseconds: Deletes dead enemies.
   * - Every 1000 milliseconds: Checks and spawns salsa bottles.
   */
  run() {
    setStoppableInterval(() => this.checkCollisions(), 1);
    setStoppableInterval(() => this.checkThrowableObjects(), 1);
    setStoppableInterval(() => this.checkCharacterIsDead(), 250);
    setStoppableInterval(() => this.checkEnemyIsDead(), 250);
    setStoppableInterval(() => this.deleteEnemy(), 250);
    // setStoppableInterval(() => this.checkAndSpawnSalsaBottles(), 1000);
  }

  checkCollisionsVendingMachine() {
    this.level.vendingMachine.forEach((machine) => {
      if (this.character.isColliding(machine)) {
        this.checkAndSpawnSalsaBottles();
      }
    });
  }

  /**
   * Checks if the current number of coins is greater than or equal to 5.
   * If true, spawns 50 new SalsaBottles and deducts 5 coins from the currentCoins.
   * Also updates the coinsBar percentage based on the remaining coins.
   */
  checkAndSpawnSalsaBottles() {
    if (this.currentCoins >= 5 && this.currentBottles == 0) {
      for (let i = 0; i <= 4; i++) {
        this.currentBottles++;
      }
      this.currentCoins -= 5;
      this.coinsBar.setPercentage(this.currentCoins * 10);
      this.salsaBottlesBar.setPercentage(this.currentBottles * 20);
    }
  }

  /**
   * Checks if the character is dead and triggers the game over sequence if true.
   */
  checkCharacterIsDead() {
    if (this.character.isDead()) this.gameOver(true);
  }

  /**
   * Checks if any enemies in the level are dead. If an enemy is dead, it stops the enemy's movement,
   * removes the dead enemies from the level, and plays kill sounds. If the dead enemy is the Endboss,
   * it triggers the game over sequence.
   *
   * @returns {boolean} - Returns true if an enemy is dead, otherwise undefined.
   */
  checkEnemyIsDead() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) {
        (enemy.speed = 0), this.removeDeadEnemies(), this.playKillSounds();
        if (enemy.constructor.name === "Endboss") this.gameOver();
        return true;
      }
    });
  }

  /**
   * Handles the game over logic.
   *
   * @param {boolean} [isPlayerDead=false] - Indicates whether the player is dead.
   */
  gameOver(isPlayerDead = false) {
    if (isPlayerDead && !this.isGameOver) {
      this.isGameOver = true;
      console.log("Game Over!");
      setTimeout(() => stopGame(), 500);
      playSound(game_over_sound);
    } else if (!this.isGameOver) {
      this.isGameOver = true;
      console.log("Gewonnen!");
      playSound(win_sound);
      setTimeout(() => this.removeAllEnemies(), 1000);
    }
  }

  /**
   * Removes all enemies from the current level.
   */
  removeAllEnemies() {
    this.level.enemies = [];
  }

  /**
   * Removes dead enemies from the level's enemies array.
   * Increments the deadEnemyCount and rampageCount for each removed enemy.
   * Does not remove enemies of type "Endboss".
   */
  removeDeadEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead() && enemy.constructor.name !== "Endboss") {
        this.deadEnemyCount++, this.rampageCount++, this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
      }
    });
  }

  /**
   * Deletes enemies from the level if their x-coordinate is less than 0.
   * If only one enemy remains after deletion, calls the dominating method.
   */
  deleteEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.x < 0) {
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        if (this.level.enemies.length === 1) this.dominating();
      }
    });
  }

  /**
   * Plays various kill sounds and resets the rampage count after a delay.
   *
   * This method triggers multiple sound effects related to different kill streaks
   * such as rampage, first blood, double kill, triple kill, kill streak, and dominating.
   * It also ensures that the sounds are played only once by resetting the `playOnlyOnce` flag.
   */
  playKillSounds() {
    setTimeout(() => (this.rampageCount = 0), 2000);
    this.rampage(), this.firstBlood(), this.doubleKill(), this.tripleKill(), this.killStreak(), this.dominating();
    if (this.playOnlyOnce) this.playOnlyOnce = false;
  }

  /**
   * Triggers a rampage sound if the rampage count is 6 or more.
   *
   * @method rampage
   */
  rampage() {
    if (this.rampageCount >= 6) {
      playSound(rampage_sound);
    }
  }

  /**
   * Plays a sound when the first enemy is killed.
   * If the enemy count is 1 or the sound has already been played once, it will play the appropriate sound.
   * Resets the dead enemy count after playing the sound.
   */
  firstBlood() {
    if (this.deadEnemyCount == 1 || this.playOnlyOnce) {
      this.playOnlyOnce ? playSound(first_blood_sound) : playSound(chicken_death_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Checks if two enemies have been killed and plays a double kill sound if true.
   * Resets the dead enemy count after playing the sound.
   *
   * @method doubleKill
   * @memberof World
   */
  doubleKill() {
    if (this.deadEnemyCount == 2 && !this.playOnlyOnce) {
      playSound(double_kill_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Checks if the number of dead enemies is exactly three and if the sound has not been played yet.
   * If both conditions are met, it plays the triple kill sound and resets the dead enemy count.
   */
  tripleKill() {
    if (this.deadEnemyCount == 3 && !this.playOnlyOnce) {
      playSound(triple_kill_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Checks the number of dead enemies and plays a kill streak sound if the count is between 4 and 5.
   * Resets the dead enemy count to 0 after playing the sound.
   *
   * @method killStreak
   */
  killStreak() {
    if (this.deadEnemyCount >= 4 && this.deadEnemyCount < 6 && !this.playOnlyOnce) {
      playSound(kill_streak_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Checks if there is only one enemy left in the level and if that enemy is the Endboss with energy greater than 0.
   * If these conditions are met, it plays the dominating sound.
   */
  dominating() {
    if (this.level.enemies.length == 1 && this.level.enemies[0].constructor.name === "Endboss" && this.level.enemies[0].energy > 0) {
      playSound(dominating_sound);
    }
  }

  /**
   * Checks if throwable objects can be thrown based on the current time and keyboard input.
   * If the time since the last hit is less than 1000 milliseconds, the function returns early.
   * If the 'THRO' key is pressed and there are bottles available, a new throwable object is created
   * and added to the throwableObjects array. The number of available bottles is then decremented,
   * and the salsaBottlesBar is updated to reflect the current number of bottles.
   * The lastHit time is updated to the current time.
   */
  checkThrowableObjects() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastHit < 1000) return;
    if (this.keyboard.THRO && this.currentBottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle), this.currentBottles--, this.salsaBottlesBar.setPercentage(this.currentBottles * 20);
      this.lastHit = currentTime;
    }
  }

  /**
   * Checks for various types of collisions in the game world.
   * This method checks for collisions with enemies, throwable objects,
   * salsa bottles, and coins.
   */
  checkCollisions() {
    this.checkCollisionsEnemy(), this.checkCollisionsThrowableObjects(), this.checkCollisionsSalasBottles(), this.checkCollisionsCoins(), this.checkCollisionsVendingMachine();
  }

  /**
   * Checks for collisions between the character and enemies in the level.
   * If the character collides with an enemy, appropriate actions are taken based on the type of enemy.
   *
   * - If the character is above the enemy, the enemy is hit with a damage of 4.
   * - If the character collides with the enemy from the side, the character is hit with damage:
   *   - 4 if the enemy is an Endboss
   *   - 1 if the enemy is any other type
   * - Updates the character's health status bar after a collision.
   *
   * @method checkCollisionsEnemy
   */
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

  /**
   * Checks for collisions between throwable objects and enemies in the game world.
   * If a collision is detected, the enemy is hit. If the enemy is the Endboss,
   * its health status bar is updated accordingly.
   */
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

  /**
   * Checks for collisions between the character and salsa bottles in the level.
   * If a collision is detected and the character has fewer than 5 bottles,
   * increments the current bottle count, removes the collided salsa bottle from the level,
   * and updates the salsa bottles bar percentage.
   */
  checkCollisionsSalasBottles() {
    this.level.salsaBottles.forEach((salsaBottle) => {
      if (this.character.isColliding(salsaBottle) && this.currentBottles < 5) {
        this.currentBottles++;
        this.level.salsaBottles.splice(this.level.salsaBottles.indexOf(salsaBottle), 1);
        this.salsaBottlesBar.setPercentage(this.currentBottles * 20);
      }
    });
  }

  /**
   * Checks for collisions between the character and coins in the level.
   * If a collision is detected and the current coin count is less than 10,
   * it plays a sound, increments the coin count, removes the coin from the level,
   * and updates the coin bar percentage.
   */
  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && this.currentCoins < 10) {
        playSound(coin_sound);
        this.currentCoins++;
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
        this.coinsBar.setPercentage(this.currentCoins * 10);
      }
    });
  }

  /**
   * Draws the game world on the canvas.
   * Clears the canvas, translates the context for camera movement,
   * and adds various game objects to the map in the correct order.
   * Uses requestAnimationFrame to continuously update the drawing.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.vendingMachine);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.salsaBottlesBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.statusBarEndbossHealth);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.salsaBottles);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds multiple objects to the map.
   *
   * @param {Array} objects - An array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  /**
   * Adds a movable object to the map, drawing it on the provided context.
   * If the object is facing the other direction, it flips the image before drawing
   * and flips it back after drawing.
   *
   * @param {Object} movableObject - The object to be added to the map.
   * @param {boolean} movableObject.otherDirection - Indicates if the object is facing the other direction.
   * @param {function} movableObject.draw - Method to draw the object on the canvas context.
   * @param {function} movableObject.drawFrame - Method to draw the object's frame on the canvas context.
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) this.flipImage(movableObject);
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);
    if (movableObject.otherDirection) this.flipImageBack(movableObject);
  }

  /**
   * Flips the given movable object's image horizontally.
   *
   * This method saves the current state of the canvas context, translates the context
   * to the width of the movable object, scales the context horizontally by -1 to flip
   * the image, and then adjusts the x-coordinate of the movable object to reflect the flip.
   *
   * @param {Object} movableObject - The object to be flipped.
   * @param {number} movableObject.width - The width of the movable object.
   * @param {number} movableObject.x - The x-coordinate of the movable object.
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Flips the image of the given movable object back to its original orientation.
   *
   * @param {Object} movableObject - The object whose image is to be flipped.
   * @param {number} movableObject.x - The x-coordinate of the movable object.
   */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
