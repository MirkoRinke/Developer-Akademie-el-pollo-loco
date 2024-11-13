import { MovableObject } from "./movable-object-class.js";

import { setStoppableInterval } from "../game.js";

const canvas = document.getElementById("canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

export class Coins extends MovableObject {
  height = 30;
  width = 30;

  IMAGES_ROTATE = [
    "../../assets/images/items/coin/coin_1.png",
    "../../assets/images/items/coin/coin_2.png",
    "../../assets/images/items/coin/coin_3.png",
    "../../assets/images/items/coin/coin_4.png",
    "../../assets/images/items/coin/coin_5.png",
    "../../assets/images/items/coin/coin_6.png",
  ];

  WIDTHS = [30, 20, 10, 10, 20, 30];

  constructor() {
    super().loadImage("../../assets/images/items/coin/coin_1.png");
    this.loadImages(this.IMAGES_ROTATE);
    this.x = 200 + Math.random() * (canvasWidth * 2);
    this.y = canvasHeight / 2.4 + Math.random() * 250;
    this.animate();
  }

  animate() {
    this.coinAnimation();
  }

  coinAnimation() {
    let currentImageIndex = 0;
    setStoppableInterval(() => {
      const previousWidth = this.width;
      this.width = this.WIDTHS[currentImageIndex];
      const widthDifference = this.width - previousWidth;
      this.x -= widthDifference / 2;
      this.playAnimation(this.IMAGES_ROTATE);
      currentImageIndex = (currentImageIndex + 1) % this.IMAGES_ROTATE.length;
    }, 250);
  }
}
