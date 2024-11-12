import { MovableObject } from "./movable-object-class.js";

const canvas = document.getElementById("canvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

export class DangerShield extends MovableObject {
  constructor() {
    super().loadImage("../../assets/images/ui/shield/danger.png");
    this.width = 108;
    this.height = 132;
    this.x = canvasWidth * 1.7;
    this.y = canvasHeight - this.height - 70;
  }
}
