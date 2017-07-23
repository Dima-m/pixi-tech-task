/**
 * @desc Pixi.js Tech Task Model
 */
class Model {
    /**
     * @desc Pixi.js Tech Task Model class constructor
     */
    constructor() {
        this.shapes = [];
        this.gravity = 1;
        this.area = 0;
        this.shapesPerSecond = 1;
    }

    /**
     * Adds given shapes to array
     * @param {object} shape - shape to add
     */
    addShape(shape) {
        this.shapes.push(shape);
    }

    /**
     * Removes given shapes from array
     * @param {object} shape - shape to remove
     */
    removeShape(shape) {
        this.shapes.splice(this.shapes.indexOf(shape), 1)
    }
}
