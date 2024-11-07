// The Level class is used to store all the information about a level, such as the enemies, clouds, and background objects.
export class Level {
  enemies; // An array of enemy objects
  salsaBottles; // An array of salsa bottle objects
  clouds; // An array of cloud objects
  backgroundObjects; // An array of background objects
  level_end_x = 2250; // The x-coordinate of the end of the level

  constructor(enemies, salsaBottles, clouds, backgroundObjects) {
    // The constructor takes in an array of enemies, clouds, and background objects
    this.enemies = enemies; // Set the enemies array to the passed in enemies array
    this.salsaBottles = salsaBottles; // Set the salsa bottles array to the passed in salsa bottles array
    this.clouds = clouds; // Set the clouds array to the passed in clouds array
    this.backgroundObjects = backgroundObjects; // Set the background objects array to the passed in background objects array
  }
}
