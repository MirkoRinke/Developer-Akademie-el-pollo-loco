// Load Chicken, Endboss, Cloud , BackgroundObjects and Level class from models folder
import { Chicken } from "../models/chicken.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObjects } from "../models/background-object.class.js";
import { Level } from "../models/level.class.js";

// Create a new Level with Chicken, Endboss, Cloud and BackgroundObjects
export const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [new Cloud()],
  [
    new BackgroundObjects("../../assets/images/background/layers/air.png", -719),
    new BackgroundObjects("../../assets/images/background/layers/3_third_layer/2.png", -719),
    new BackgroundObjects("../../assets/images/background/layers/2_second_layer/2.png", -719),
    new BackgroundObjects("../../assets/images/background/layers/1_first_layer/2.png", -719),

    new BackgroundObjects("../../assets/images/background/layers/air.png", 0),
    new BackgroundObjects("../../assets/images/background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("../../assets/images/background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("../../assets/images/background/layers/1_first_layer/1.png", 0),

    new BackgroundObjects("../../assets/images/background/layers/air.png", 719),
    new BackgroundObjects("../../assets/images/background/layers/3_third_layer/2.png", 719),
    new BackgroundObjects("../../assets/images/background/layers/2_second_layer/2.png", 719),
    new BackgroundObjects("../../assets/images/background/layers/1_first_layer/2.png", 719),

    new BackgroundObjects("../../assets/images/background/layers/air.png", 719 * 2),
    new BackgroundObjects("../../assets/images/background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObjects("../../assets/images/background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObjects("../../assets/images/background/layers/1_first_layer/1.png", 719 * 2),

    new BackgroundObjects("../../assets/images/background/layers/air.png", 719 * 3),
    new BackgroundObjects("../../assets/images/background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObjects("../../assets/images/background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObjects("../../assets/images/background/layers/1_first_layer/2.png", 719 * 3),
  ]
);
