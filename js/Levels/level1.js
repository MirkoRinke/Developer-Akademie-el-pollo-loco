// Load Chicken, Endboss, Cloud , BackgroundObjects and Level class from models folder
import { Chicken } from "../models/chicken.class.js";
import { ChickenSmall } from "../models/chicken_small.class.js";
import { Endboss } from "../models/endboss.class.js";
import { SalsaBottles } from "../models/salsa_bottles.class.js";
import { Coins } from "../models/coins.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObjects } from "../models/background-object.class.js";
import { Level } from "../models/level.class.js";

// Create X Chicken and 4 ChickenSmall objects
const chickens = [];
for (let i = 0; i < 4; i++) {
  chickens.push(new Chicken());
}

// Create X ChickenSmall objects
const chickensSmall = [];
for (let i = 0; i < 4; i++) {
  chickensSmall.push(new ChickenSmall());
}

// Create X SalsaBottles objects
const salsaBottles = [];
for (let i = 0; i < 10; i++) {
  salsaBottles.push(new SalsaBottles());
}

// Create X Coins objects
const coins = [];
for (let i = 0; i < 10; i++) {
  coins.push(new Coins());
}

// Create X Cloud objects
const clouds = [];
for (let i = 0; i < 1; i++) {
  clouds.push(new Cloud());
}

// Create BackgroundObjects
const backgroundLayers = [
  "../../assets/images/background/layers/air.png",
  "../../assets/images/background/layers/3_third_layer/2.png",
  "../../assets/images/background/layers/2_second_layer/2.png",
  "../../assets/images/background/layers/1_first_layer/2.png",
  "../../assets/images/background/layers/3_third_layer/1.png",
  "../../assets/images/background/layers/2_second_layer/1.png",
  "../../assets/images/background/layers/1_first_layer/1.png",
];

// Create X BackgroundObjects objects
const backgroundObjects = [];
for (let i = -1; i <= 4; i++) {
  backgroundLayers.forEach((layer) => {
    backgroundObjects.push(new BackgroundObjects(layer, 719 * i));
  });
}

// Create a new Level with Chicken, Endboss, Cloud and BackgroundObjects
export const level1 = new Level([...chickens, ...chickensSmall, new Endboss()], [...salsaBottles], [...coins], [...clouds], backgroundObjects);
