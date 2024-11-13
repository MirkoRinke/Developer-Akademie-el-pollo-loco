/**
 * @module "level1.js"
 */

/**
 * Import various game objects and classes for level 1.
 */
import { Chicken } from "../models/chicken.class.js";
import { ChickenSmall } from "../models/chicken-small.class.js";
import { Endboss, resetFirstContact } from "../models/endboss.class.js";
import { SalsaBottles } from "../models/salsa_bottles.class.js";
import { Coins } from "../models/coins.class.js";
import { Cloud } from "../models/cloud.class.js";
import { VendingMachine } from "../models/vending-machine.class.js";
import { BackgroundObjects } from "../models/background-object.class.js";
import { Level } from "../models/level.class.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;

let currentEndboss = 1;
let currentChickens = 10;
let currentChickensSmall = 20;
let currentSalsaBottles = 3;
let currentCoins = 20;
let currentClouds = 10;
export let cloudsSpeed = 3;
let currentBackgroundObjects = 4;
export let level1;

const backgroundLayers = [
  "../../assets/images/background/layers/air.png",
  "../../assets/images/background/layers/3_third_layer/full.png",
  "../../assets/images/background/layers/2_second_layer/full.png",
  "../../assets/images/background/layers/1_first_layer/full.png",
];

let endboss = [],
  chickens = [],
  chickensSmall = [],
  salsaBottles = [],
  coins = [],
  clouds = [],
  backgroundObjects = [];

/**
 * Initializes level 1 by resetting the first contact, creating game entities such as endboss, chickens, salsa bottles, coins, clouds, and background objects,
 * and then constructs a new Level instance with these entities.
 */
export function initLevel1() {
  resetFirstContact();
  createEndboss();
  createChickens();
  createChickensSmall();
  createSalsaBottles();
  createCoins();
  createClouds();
  createBackgroundObjects();
  level1 = new Level([...chickens, ...chickensSmall, ...endboss], [...salsaBottles], [...coins], [...clouds], [new VendingMachine()], backgroundObjects);
}

/**
 * Creates an array of Endboss instances and assigns it to the global `endboss` variable.
 * The number of Endboss instances created is determined by the `currentEndboss` variable.
 */
function createEndboss() {
  endboss = [];
  for (let i = 0; i < currentEndboss; i++) {
    endboss.push(new Endboss());
  }
}

/**
 * Creates an array of Chicken objects and assigns it to the global `chickens` variable.
 * The number of Chicken objects created is determined by the `currentChickens` variable.
 */
function createChickens() {
  chickens = [];
  for (let i = 0; i < currentChickens; i++) {
    chickens.push(new Chicken());
  }
}

/**
 * Creates an array of small chickens and populates it with instances of ChickenSmall.
 * The number of chickens created is determined by the value of currentChickensSmall.
 */
function createChickensSmall() {
  chickensSmall = [];
  for (let i = 0; i < currentChickensSmall; i++) {
    chickensSmall.push(new ChickenSmall());
  }
}

/**
 * Creates an array of SalsaBottles instances.
 * Initializes the array and populates it with the current number of salsa bottles.
 */
function createSalsaBottles() {
  salsaBottles = [];
  for (let i = 0; i < currentSalsaBottles; i++) {
    salsaBottles.push(new SalsaBottles());
  }
}

/**
 * Creates an array of coin objects and assigns it to the global `coins` variable.
 * The number of coins created is determined by the `currentCoins` variable.
 */
function createCoins() {
  coins = [];
  for (let i = 0; i < currentCoins; i++) {
    coins.push(new Coins());
  }
}

/**
 * Creates an array of cloud objects and populates it with a specified number of clouds.
 * The number of clouds is determined by the value of the `currentClouds` variable.
 */
function createClouds() {
  clouds = [];
  for (let i = 0; i < currentClouds; i++) {
    clouds.push(new Cloud());
  }
}

/**
 * Creates and populates the backgroundObjects array with instances of BackgroundObjects.
 * Iterates through the backgroundLayers and adds new BackgroundObjects to the array
 * based on the currentBackgroundObjects count and canvasWidth.
 */
function createBackgroundObjects() {
  backgroundObjects = [];
  for (let i = -1; i <= currentBackgroundObjects; i++) {
    backgroundLayers.forEach((layer) => {
      backgroundObjects.push(new BackgroundObjects(layer, (canvasWidth - 1) * i));
    });
  }
}
