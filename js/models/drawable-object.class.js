/**
 * @module "drawable-object.class.js"
 */

/**
 * Class representing a drawable object.
 */
export class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 330;
  height = 100;
  width = 100;

  /**
   * Loads an image from the specified path and assigns it to the img property.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on the canvas context at the specified position and size.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a red frame around the object if it belongs to certain drawable classes.
   *
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  drawFrame(ctx) {
    const drawableClasses = ["Character", "Chicken", "ChickenSmall", "ThrowableObject", "SalsaBottles", "VendingMachine"];
    if (drawableClasses.includes(this.constructor.name)) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "transparent";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Loads an array of image paths into the image cache.
   *
   * @param {string[]} arr - An array of image paths to be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
