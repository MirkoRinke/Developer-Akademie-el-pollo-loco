/**
 * @module "level.class.js"
 */

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;

/**
 * Represents a level in the game.
 */
export class Level {
  enemies;
  salsaBottles;
  coins;
  clouds;
  vendingMachine;
  backgroundObjects;
  level_end_x = canvasWidth * 2.5;

  /**
   * Creates an instance of the Level class.
   *
   * @constructor
   * @param {Array} enemies - The enemies in the level.
   * @param {Array} salsaBottles - The salsa bottles in the level.
   * @param {Array} coins - The coins in the level.
   * @param {Array} clouds - The clouds in the level.
   * @param {Object} vendingMachine - The vending machine in the level.
   * @param {Array} backgroundObjects - The background objects in the level.
   */
  constructor(enemies, salsaBottles, coins, clouds, vendingMachine, backgroundObjects) {
    this.enemies = enemies;
    this.salsaBottles = salsaBottles;
    this.coins = coins;
    this.clouds = clouds;
    this.vendingMachine = vendingMachine;
    this.backgroundObjects = backgroundObjects;
  }
}
