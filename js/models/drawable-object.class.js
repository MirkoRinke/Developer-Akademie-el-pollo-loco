// Class for all drawable objects in the game
export class DrawableObject {
  img; // Image object
  imageCache = {}; // Cache for images
  currentImage = 0; // Current image index
  x = 120; // X coordinate
  y = 330; // Y coordinate
  height = 100; // Height
  width = 100; // Width

  // This method is used to load an image from a path and store it in the img property
  loadImage(path) {
    this.img = new Image(); // Create new image object
    this.img.src = path; // Set the path of the image
  }

  // This method is used to draw the image on the canvas
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // This method is used to draw a frame around the object
  drawFrame(ctx) {
    if (this.constructor.name === "Character" || this.constructor.name === "Chicken" || this.constructor.name === "ThrowableObject" || this.constructor.name === "SalsaBottles") {
      // Check if the object is a character or a chicken
      ctx.beginPath(); // Start drawing
      ctx.lineWidth = "5"; // Set the line width
      ctx.strokeStyle = "blue"; // Set the line color
      ctx.rect(this.x, this.y, this.width, this.height); // Draw the rectangle around the object
      ctx.stroke(); // Finish drawing
    }
  }

  // This method is used load multiple images at once and store them in the imageCache property
  loadImages(arr) {
    arr.forEach((path) => {
      // Loop through the array of paths
      let img = new Image(); // Create new image object
      img.src = path; // Set the path of the image
      this.imageCache[path] = img; // Store the image in the cache object
    });
  }
}
