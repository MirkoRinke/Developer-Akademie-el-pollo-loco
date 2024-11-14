/**
 * @module "world.class.js"
 */

/**
 * Importing necessary classes and functions for the World class.
 * @module WorldDependencies
 */
import { Character } from "./character.class.js";
import { level1 } from "../Levels/level1.js";
import { StatusBarHealth } from "./status-bar-health.class.js";
import { SalsaBottlesBar } from "./salsa-bottles-bar.class.js";
import { CoinsBar } from "./coins-bar.class.js";
import { StatusBarEndbossHealth } from "./status-bar-endboss-health.class.js";
import { VendingMachine } from "./vending-machine.class.js";
import { DangerShield } from "./danger_shield.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { setStoppableInterval, stopGame, playSound } from "../game.js";
import { checkCharacterCollision } from "./endboss.class.js";
import {
  first_blood_sound,
  double_kill_sound,
  triple_kill_sound,
  rampage_sound,
  dominating_sound,
  kill_streak_sound,
  chicken_death_sound,
  coin_sound,
  win_sound,
  game_over_sound,
  bottle_looting_sound,
  bottle_break_sound,
} from "../sounds.js";

/**
 * Represents the game world.
 */
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
  dangerShield = new DangerShield();
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
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
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
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop by setting up intervals to check various game conditions.
   * - Checks for collisions every 1 millisecond.
   * - Checks for throwable objects every 1 millisecond.
   * - Checks if the character is dead every 250 milliseconds.
   * - Checks if the end boss is dead every 250 milliseconds.
   * - Deletes enemies every 250 milliseconds.
   */
  run() {
    setStoppableInterval(() => this.checkCollisions(), 1);
    setStoppableInterval(() => this.checkThrowableObjects(), 1);
    setStoppableInterval(() => this.checkCharacterIsDead(), 250);
    setStoppableInterval(() => this.checkEndbossIsDead(), 250);
    setStoppableInterval(() => this.deleteEnemy(), 250);
  }

  /**
   * Checks for collisions between the character and vending machines in the level.
   * If a collision is detected, it triggers the spawning of salsa bottles.
   */
  checkCollisionsVendingMachine() {
    this.level.vendingMachine.forEach((machine) => {
      if (this.character.isColliding(machine)) this.checkAndSpawnSalsaBottles();
    });
  }

  /**
   * Checks if the player has enough coins to spawn a salsa bottle.
   * If conditions are met, it increments the number of salsa bottles,
   * decrements the number of coins, plays a sound, and updates the UI bars.
   */
  checkAndSpawnSalsaBottles() {
    if (this.currentCoins >= 1 && this.currentBottles <= 4) {
      (this.currentBottles += 1), (this.currentCoins -= 1);
      playSound(bottle_looting_sound, 0.1);
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
   * Checks if the Endboss is dead among the enemies in the level.
   * If an enemy is dead, it stops the enemy's movement, removes dead enemies,
   * and plays kill sounds. If the dead enemy is the Endboss, it removes the
   * Endboss from the enemies list after a delay and triggers the game over sequence.
   * @returns {boolean} True if an enemy is dead, otherwise false.
   */
  checkEndbossIsDead() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) {
        (enemy.speed = 0), this.removeDeadEnemies(), this.playKillSounds();
        if (enemy.constructor.name === "Endboss") {
          setTimeout(() => this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1), 2000);
          setTimeout(() => this.gameOver(), 3000);
        }
        return true;
      }
    });
  }

  /**
   * Handles the game over logic by displaying the appropriate screen based on the game outcome.
   * @param {boolean} [isPlayerDead=false] - Indicates if the player is dead. If true, the game over screen for player death is shown. Otherwise, the win screen is shown.
   */
  gameOver(isPlayerDead = false) {
    const gameOverScreenRef = document.getElementById("game_over_screen");
    const winScreenRef = document.getElementById("win_screen");
    const startScreenRef = document.getElementById("start_screen");
    if (!this.isGameOver) {
      isPlayerDead ? this.gameOverPlayerDead(gameOverScreenRef, startScreenRef) : this.gameOverEndbossDead(winScreenRef, startScreenRef);
    }
  }

  /**
   * Handles the game over sequence when the player is dead.
   * Displays the game over screen, plays the game over sound, and then returns to the start screen.
   *
   * @param {HTMLElement} gameOverScreenRef - Reference to the game over screen element.
   * @param {HTMLElement} startScreenRef - Reference to the start screen element.
   */
  gameOverPlayerDead(gameOverScreenRef, startScreenRef) {
    this.isGameOver = true;
    setTimeout(() => stopGame(), 100);
    setTimeout(() => ((gameOverScreenRef.style.display = "block"), playSound(game_over_sound)), 2000);
    setTimeout(() => ((gameOverScreenRef.style.display = "none"), (startScreenRef.style.display = "block")), 6000);
  }

  /**
   * Handles the game over sequence when the player is dead.
   *
   * @param {HTMLElement} gameOverScreenRef - Reference to the game over screen element.
   * @param {HTMLElement} startScreenRef - Reference to the start screen element.
   */
  gameOverEndbossDead(winScreenRef, startScreenRef) {
    this.isGameOver = true;
    stopGame();
    playSound(win_sound);
    winScreenRef.style.display = "block";
    setTimeout(() => ((winScreenRef.style.display = "none"), (startScreenRef.style.display = "block")), 3000);
  }

  /**
   * Removes dead enemies from the level's enemies array, excluding the Endboss.
   * Increments the deadEnemyCount and rampageCount for each removed enemy.
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
   * Calls methods to handle different kill streaks.
   * Resets the playOnlyOnce flag if it is set.
   */
  playKillSounds() {
    setTimeout(() => (this.rampageCount = 0), 2000);
    this.rampage(), this.firstBlood(), this.doubleKill(), this.tripleKill(), this.killStreak(), this.dominating();
    if (this.playOnlyOnce) this.playOnlyOnce = false;
  }

  /**
   * Triggers a rampage sound if the rampage count is 6 or more.
   */
  rampage() {
    if (this.rampageCount >= 6) playSound(rampage_sound);
  }

  /**
   * Plays a sound when the first enemy is killed.
   * If the enemy count is 1 or the sound has already been played once, it plays a specific sound.
   * Resets the dead enemy count after playing the sound.
   */
  firstBlood() {
    if (this.deadEnemyCount == 1 || this.playOnlyOnce) {
      this.playOnlyOnce ? playSound(first_blood_sound) : playSound(chicken_death_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Checks if two enemies have been killed and plays a sound if true.
   * Resets the dead enemy count after playing the sound.
   */
  doubleKill() {
    if (this.deadEnemyCount == 2 && !this.playOnlyOnce) {
      playSound(double_kill_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Plays a sound when three enemies are killed and resets the dead enemy count.
   * Ensures the sound is played only once.
   */
  tripleKill() {
    if (this.deadEnemyCount == 3 && !this.playOnlyOnce) {
      playSound(triple_kill_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Checks the number of dead enemies and plays a kill streak sound if the count is between 4 and 5.
   * Resets the dead enemy count after playing the sound.
   */
  killStreak() {
    if (this.deadEnemyCount >= 4 && this.deadEnemyCount < 6 && !this.playOnlyOnce) {
      playSound(kill_streak_sound), (this.deadEnemyCount = 0);
    }
  }

  /**
   * Plays a sound if there is only one enemy left in the level and it is the Endboss with energy greater than 0.
   */
  dominating() {
    if (this.level.enemies.length == 1 && this.level.enemies[0].constructor.name === "Endboss" && this.level.enemies[0].energy > 0) {
      playSound(dominating_sound);
    }
  }

  /**
   * Checks if throwable objects can be thrown based on the current time and keyboard input.
   * If the conditions are met, creates a new throwable object, updates the bottle count,
   * updates the salsa bottles bar, and plays a sound after a delay.
   */
  checkThrowableObjects() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastHit < 1000) return;
    if (this.keyboard.THRO && this.currentBottles > 0) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle), this.currentBottles--, this.salsaBottlesBar.setPercentage(this.currentBottles * 20);
      this.lastHit = currentTime;
      setTimeout(() => playSound(bottle_break_sound, 0.1), 1100);
    }
  }

  /**
   * Checks for various types of collisions in the game world.
   * This includes collisions with enemies, throwable objects,
   * salsa bottles, coins, and the vending machine.
   */
  checkCollisions() {
    this.checkCollisionsEnemy(), this.checkCollisionsThrowableObjects(), this.checkCollisionsSalasBottles(), this.checkCollisionsCoins(), this.checkCollisionsVendingMachine();
  }

  /**
   * Checks for collisions between the character and enemies in the level.
   * If a collision is detected, it handles the collision effects such as
   * reducing health and updating the status bar.
   */
  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (!this.character.isColliding(enemy) || enemy.energy <= 0) {
        checkCharacterCollision(false, enemy.constructor.name);
        return;
      }
      if (this.character.isAbove(enemy)) enemy.hit(4);
      else {
        this.character.hit(enemy.constructor.name === "Endboss" ? 10 : 2); //! 10 damage for Endboss, 5 for other enemies
        checkCharacterCollision(true, enemy.constructor.name);
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks for collisions between throwable objects and enemies in the game.
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
   * increments the bottle count, plays a looting sound, removes the bottle
   * from the level, and updates the salsa bottles bar percentage.
   */
  checkCollisionsSalasBottles() {
    this.level.salsaBottles.forEach((salsaBottle) => {
      if (this.character.isColliding(salsaBottle) && this.currentBottles < 5) {
        this.currentBottles++;
        playSound(bottle_looting_sound, 0.1);
        this.level.salsaBottles.splice(this.level.salsaBottles.indexOf(salsaBottle), 1);
        this.salsaBottlesBar.setPercentage(this.currentBottles * 20);
      }
    });
  }

  /**
   * Checks for collisions between the character and coins in the level.
   * If a collision is detected and the current coin count is less than 20,
   * plays a sound, increments the coin count, removes the coin from the level,
   * and updates the coin bar percentage.
   */
  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && this.currentCoins < 20) {
        playSound(coin_sound, 0.3);
        this.currentCoins++;
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
        this.coinsBar.setPercentage(this.currentCoins * 5);
      }
    });
  }

  /**
   * Draws the game world on the canvas.
   * Clears the canvas, translates the context for camera movement,
   * and adds various game objects to the map.
   * Continuously calls itself using requestAnimationFrame for animation.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.vendingMachine);
    this.addToMap(this.dangerShield);
    this.addObjectsToMap(this.level.clouds);
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
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - The objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  /**
   * Adds a movable object to the map, drawing it on the canvas context.
   * If the object is facing the other direction, it flips the image before drawing and flips it back after drawing.
   * @param {Object} movableObject - The object to be added to the map.
   * @param {boolean} movableObject.otherDirection - Indicates if the object is facing the other direction.
   * @param {CanvasRenderingContext2D} movableObject.ctx - The canvas rendering context.
   * @param {function} movableObject.draw - Method to draw the object on the canvas.
   * @param {function} movableObject.drawFrame - Method to draw the object's frame on the canvas.
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) this.flipImage(movableObject);
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);
    if (movableObject.otherDirection) this.flipImageBack(movableObject);
  }

  /**
   * Flips the image of a movable object horizontally.
   * @param {Object} movableObject - The object to be flipped.
   * @param {number} movableObject.width - The width of the object.
   * @param {number} movableObject.x - The x-coordinate of the object.
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Flips the image of the given movable object back to its original orientation.
   * @param {Object} movableObject - The object whose image is to be flipped.
   */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
