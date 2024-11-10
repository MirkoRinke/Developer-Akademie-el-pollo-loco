// Load Chicken, Endboss, Cloud , BackgroundObjects and Level class from models folder
import { Chicken } from "../models/chicken.class.js";
import { ChickenSmall } from "../models/chicken-small.class.js";
import { Endboss } from "../models/endboss.class.js";
import { SalsaBottles } from "../models/salsa_bottles.class.js";
import { Coins } from "../models/coins.class.js";
import { Cloud } from "../models/cloud.class.js";
import { VendingMachine } from "../models/vending-machine.class.js";
import { BackgroundObjects } from "../models/background-object.class.js";
import { Level } from "../models/level.class.js";

// Reference to the canvas element
const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;

let currentEndboss = 1;
let currentChickens = 10;
let currentChickensSmall = 20;
let currentSalsaBottles = 10;
let currentCoins = 10;
let currentClouds = 10;
export let cloudsSpeed = 3;
let currentBackgroundObjects = 4;

const endboss = [];
for (let i = 0; i < currentEndboss; i++) {
  endboss.push(new Endboss());
}

// Create X Chicken and 4 ChickenSmall objects
const chickens = [];
for (let i = 0; i < currentChickens; i++) {
  chickens.push(new Chicken());
}

// Create X ChickenSmall objects
const chickensSmall = [];
for (let i = 0; i < currentChickensSmall; i++) {
  chickensSmall.push(new ChickenSmall());
}

// Create X SalsaBottles objects
const salsaBottles = [];
for (let i = 0; i < currentSalsaBottles; i++) {
  salsaBottles.push(new SalsaBottles());
}

// Create X Coins objects
const coins = [];
for (let i = 0; i < currentCoins; i++) {
  coins.push(new Coins());
}

// Create X Cloud objects
const clouds = [];
for (let i = 0; i < currentClouds; i++) {
  clouds.push(new Cloud());
}

// Create BackgroundObjects
const backgroundLayers = [
  "../../assets/images/background/layers/air.png",
  "../../assets/images/background/layers/3_third_layer/full.png",
  "../../assets/images/background/layers/2_second_layer/full.png",
  "../../assets/images/background/layers/1_first_layer/full.png",
];

// Create X BackgroundObjects objects
const backgroundObjects = [];
for (let i = -1; i <= currentBackgroundObjects; i++) {
  backgroundLayers.forEach((layer) => {
    backgroundObjects.push(new BackgroundObjects(layer, (canvasWidth - 1) * i));
  });
}

// Create a new Level with Chicken, Endboss, Cloud and BackgroundObjects
export const level1 = new Level([...chickens, ...chickensSmall, ...endboss], [...salsaBottles], [...coins], [...clouds], [new VendingMachine()], backgroundObjects);
