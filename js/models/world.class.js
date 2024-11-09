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
import { setStoppableInterval, stopGame } from "../script.js";

// import the checkCharacterCollision function from the endboss.class.js file
import { checkCharacterCollision } from "./endboss.class.js";

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
    setStoppableInterval(() => {
      this.checkCollisions(); // Call the checkCollisions method to check for collisions
      this.checkThrowableObjects(); // Call the checkThrowableObjects method to check for throwable objects
      this.checkCharacterIsDead(); // Call the checkCharacterIsDead method to check if the character is dead
      this.checkEnemyIsDead(); // Call the checkEnemyIsDead method to check if the enemy is dead
    }, 1); // Run the game loops every 1 millisecond
  }

  // Method to check if the character is dead
  checkCharacterIsDead() {
    if (this.character.isDead()) {
      this.gameOver();
    }
  }

  // Method to stop the game when the character is dead
  gameOver() {
    console.log("Game Over!"); //! Log "Game Over!" to the console when the game is over (character is dead)
    setTimeout(() => {
      // stopGame(); //! Call the stopGame function to stop the game
      this.removeAllEnemies(); //! Call the removeAllEnemies function to remove all enemies from the game
    }, 2000);
  }

  // Method to remove all enemies from the game world
  removeAllEnemies() {
    this.level.enemies = []; //! Set the enemies array of the level object to an empty array
  }

  // Method to check if the enemy is dead
  checkEnemyIsDead() {
    this.level.enemies.forEach((enemy) => {
      // For each enemy in the enemies array of the level object
      if (enemy.isDead()) {
        enemy.speed = 0; // Set the speed of the enemy to 0 if the enemy is dead
        // setTimeout(() => {
        //   this.removeDeadEnemies(); // Call the removeDeadEnemies method after 1 second
        // }, 4000);
        // If the enemy is an endboss, call the gameOver method
        if (enemy.constructor.name === "Endboss") this.gameOver();
        return true; // Return true
      }
    });
  }

  // Method to remove dead enemies from the game world
  removeDeadEnemies() {
    this.level.enemies.forEach((enemy) => {
      // For each enemy in the enemies array of the level object
      if (enemy.isDead()) {
        // If the enemy is dead
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1); // Remove the enemy from the enemies array
      }
    });
  }

  // Method to check for throwable objects in the game world
  checkThrowableObjects() {
    const currentTime = new Date().getTime(); // Get the current time
    if (currentTime - this.lastHit < 1000) return; // If the time passed since the last hit is less than 1 second, return
    if (this.keyboard.D && this.currentBottles > 0) {
      // If the D key is pressed on the keyboard
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100); // Create a new throwable object (bottle)
      this.throwableObjects.push(bottle); // Add the throwable object to the throwableObjects array of the world object
      this.currentBottles--; // Decrease the current number of bottles by 1
      this.salsaBottlesBar.setPercentage(this.currentBottles * 20); // Set the percentage of the salsa bottles bar
      this.lastHit = currentTime; // Set the time of the last hit to the current time
    }
  }

  // Method to check for collisions in the game world
  checkCollisions() {
    this.checkCollisionsEnemy(); // Call the checkCollisionsEnemy method to check for collisions with enemies
    this.checkCollisionsThrowableObjects(); // Call the checkCollisionsThrowableObjects method to check for collisions with throwable objects
    this.checkCollisionsSalasBottles(); // Call the checkCollisionsSalasBottles method to check for collisions with salsa bottles
    this.checkCollisionsCoins(); // Call the checkCollisionsCoins method to check for collisions with coins
  }

  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      // Für jeden Feind im enemies-Array des Level-Objekts
      if (this.character.isColliding(enemy) && enemy.energy > 0) {
        // Wenn der Charakter mit dem Feind kollidiert und die Energie des Feindes größer als 0 ist
        if (this.character.isAbove(enemy)) {
          // Überprüfen, ob der Charakter über dem Feind ist
          enemy.hit(4); // Rufe die hit-Methode des Feindobjekts auf
        } else if (enemy.constructor.name === "Endboss") {
          this.character.hit(4); // Rufe die hit-Methode des Charakterobjekts mit einem Multiplikator von 4 auf
        } else {
          this.character.hit(); // Rufe die hit-Methode des Charakterobjekts auf
        }
        this.statusBarHealth.setPercentage(this.character.energy); // Setze die Energie des Charakters in der Statusleiste
        checkCharacterCollision(true, enemy.constructor.name); // Rufe die checkCharacterCollision-Funktion mit dem Wert true auf
        return;
      }
      checkCharacterCollision(false, enemy.constructor.name); // Rufe die checkCharacterCollision-Funktion mit dem Wert false auf
    });
  }

  checkCollisionsThrowableObjects() {
    this.throwableObjects.forEach((throwableObject) => {
      // Für jedes Wurfobjekt im throwableObjects-Array
      this.level.enemies.forEach((enemy) => {
        if (throwableObject.isColliding(enemy)) {
          if (enemy.constructor.name === "Endboss") {
            enemy.hit(1); // Rufe die hit-Methode des Feindobjekts mit einem Multiplikator von 1 auf
            this.statusBarEndbossHealth.setPercentage(enemy.energy * 10); // Setze die Energie des Endbosses in der Statusleiste
          } else {
            enemy.hit(); // Rufe die hit-Methode des Feindobjekts auf
          }
        }
      });
    });
  }

  checkCollisionsSalasBottles() {
    this.level.salsaBottles.forEach((salsaBottle) => {
      // Für jede Salsa-Flasche im salsaBottles-Array des Level-Objekts
      if (this.character.isColliding(salsaBottle) && this.currentBottles < 5) {
        this.level.salsaBottles.splice(this.level.salsaBottles.indexOf(salsaBottle), 1); // Entferne die Salsa-Flasche aus dem salsaBottles-Array des Level-Objekts
        this.currentBottles++; // Erhöhe die aktuelle Anzahl der Flaschen um 1
        this.salsaBottlesBar.setPercentage(this.currentBottles * 20); // Setze den Prozentsatz der Salsa-Flaschen-Leiste
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin) => {
      // Für jede Münze im coins-Array des Level-Objekts
      if (this.character.isColliding(coin) && this.currentCoins < 10) {
        this.level.coins.splice(this.level.coins.indexOf(coin), 1); // Entferne die Münze aus dem coins-Array des Level-Objekts
        this.currentCoins++; // Erhöhe die aktuelle Anzahl der Münzen um 1
        this.coinsBar.setPercentage(this.currentCoins * 10); // Setze den Prozentsatz der Münzleiste
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
    objects.forEach((object) => {
      // For each object in the objects array
      this.addToMap(object); // Add the object to the map
    });
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
