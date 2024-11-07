// Load the MovableObject class from the movable-object-class.js file
import { MovableObject } from "./movable-object-class.js";

// BackgroundObjects class is a subclass of MovableObject
// It is used to create background objects
export class BackgroundObjects extends MovableObject {
  width = 720; // width of the background object
  height = 480; // height of the background object
  constructor(imagePath, x) {
    // constructor takes the path to the image and the x position of the object
    super().loadImage(imagePath); // load the image from the path using the loadImage method from the MovableObject class
    this.x = x; // set the x position of the object
    this.y = 480 - this.height; // set the y position of the object
  }
}
