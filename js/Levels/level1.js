// Load Chicken, Endboss, Cloud , BackgroundObjects and Level class from models folder
import { Chicken } from "../models/chicken.class.js";
import { ChickenSmall } from "../models/chicken-small.class.js";
import { Endboss, resetFirstContact } from "../models/endboss.class.js";
import { SalsaBottles } from "../models/salsa_bottles.class.js";
import { Coins } from "../models/coins.class.js";
import { Cloud } from "../models/cloud.class.js";
import { VendingMachine } from "../models/vending-machine.class.js";
import { BackgroundObjects } from "../models/background-object.class.js";
import { Level } from "../models/level.class.js";

// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;

let currentEndboss = 0;
let currentChickens = 0;
let currentChickensSmall = 0;
let currentSalsaBottles = 10;
let currentCoins = 10;
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

// Create X Endboss objects
function createEndboss() {
  endboss = [];
  for (let i = 0; i < currentEndboss; i++) {
    endboss.push(new Endboss());
  }
}

// Create X Chicken objects
function createChickens() {
  chickens = [];
  for (let i = 0; i < currentChickens; i++) {
    chickens.push(new Chicken());
  }
}

// Create X ChickenSmall objects
function createChickensSmall() {
  chickensSmall = [];
  for (let i = 0; i < currentChickensSmall; i++) {
    chickensSmall.push(new ChickenSmall());
  }
}

// Create X SalsaBottles objects
function createSalsaBottles() {
  salsaBottles = [];
  for (let i = 0; i < currentSalsaBottles; i++) {
    salsaBottles.push(new SalsaBottles());
  }
}

// Create X Coins objects
function createCoins() {
  coins = [];
  for (let i = 0; i < currentCoins; i++) {
    coins.push(new Coins());
  }
}

// Create X Cloud objects
function createClouds() {
  clouds = [];
  for (let i = 0; i < currentClouds; i++) {
    clouds.push(new Cloud());
  }
}

// Create X BackgroundObjects objects
function createBackgroundObjects() {
  backgroundObjects = [];
  for (let i = -1; i <= currentBackgroundObjects; i++) {
    backgroundLayers.forEach((layer) => {
      backgroundObjects.push(new BackgroundObjects(layer, (canvasWidth - 1) * i));
    });
  }
}
