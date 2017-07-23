/**
 * @desc Pixi.js Tech Task Shape Class
 */
class Shape extends PIXI.Sprite {
    /**
     * @desc Pixi.js Tech Task Shape class constructor
     * @param {object} x - injection
     * @param {object} y - injection
     * @param {object} type - injection
     */
    constructor(x, y, type) {
        const shape = Shape.drawShape(type);
        const generateTexture = shape.generateCanvasTexture();

        super(generateTexture);

        Object.assign(this, { x, y });

        this.interactive = true;
        this.anchor.set(0.5);
    }

    /**
     * Draws a shape with a given type 
     * @param {string} type - type of shape
     * @returns {object} graphics - completed shape
     * @static
     */
    static drawShape(type) {
        let graphics = new PIXI.Graphics();

        let shapeColor = "0x" + Math.floor(0x1000000 * Math.random()).toString(16);
        let lineColor = "0x" + Math.floor(0x1000000 * Math.random()).toString(16);
        
        graphics.lineStyle(2, lineColor);
        graphics.beginFill(shapeColor, 1);

        switch (type) {
            case Shape.TRIANGLE: this.triangle(graphics);
                break;
            case Shape.RECT: this.rectangle(graphics);
                break;
            case Shape.CIRCLE: this.circle(graphics);
                break;
        }

        graphics.endFill();
        return graphics;
    }

    /**
     * Sets up a circular shape 
     * @param {object} graphics - shape
     * @static
     */
    static circle(graphics) {
        graphics.drawCircle(0, 0, 60);
    }

    /**
     * Sets up a triangular shape 
     * @param {object} graphics - shape
     * @static
     */
    static triangle(graphics) {
        let path = [0, 80, 160, 80, 80, 0];
        graphics.drawPolygon(path);
    }

    /**
     * Sets up a rectangular shape 
     * @param {object} graphics - shape
     * @static
     */
    static rectangle(graphics) {
        graphics.drawRect(50, 250, 100, 100);
    }
    
}

Shape.CIRCLE = 'CIRCLE';
Shape.RECT = 'RECT';
Shape.TRIANGLE = 'TRIANGLE';