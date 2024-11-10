// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

// The Level class is used to store all the information about a level, such as the enemies, clouds, and background objects.
export class Level {
  enemies; // An array of enemy objects
  salsaBottles; // An array of salsa bottle objects
  coins; // An array of coin objects
  clouds; // An array of cloud objects
  vendingMachine; // An array of vending machine objects
  backgroundObjects; // An array of background objects
  level_end_x = canvasWidth * 2.5; // The x-coordinate of the end of the level

  constructor(enemies, salsaBottles, coins, clouds, vendingMachine, backgroundObjects) {
    // The constructor takes in an array of enemies, clouds, and background objects
    this.enemies = enemies; // Set the enemies array to the passed in enemies array
    this.salsaBottles = salsaBottles; // Set the salsa bottles array to the passed in salsa bottles array
    this.coins = coins; // Set the coins array to the passed in coins array
    this.clouds = clouds; // Set the clouds array to the passed in clouds array
    this.vendingMachine = vendingMachine; // Set the vending machine array to the passed in vending machine
    this.backgroundObjects = backgroundObjects; // Set the background objects array to the passed in background objects array
  }
}
