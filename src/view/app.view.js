/**
 * @desc Pixi.js Tech Task View
 */
class View {
    /**
     * @desc Pixi.js Tech Task View class constructor
     * @param {object} model - injection
     * @param {object} app - injection
     */
    constructor(model, app) {
        Object.assign(this, { model, app })
        
        let appArea = new PIXI.Graphics();
        appArea.drawRect(0, 0, APP_WIDTH, APP_HEIGHT);
        this.appAreaSprite = new PIXI.Sprite(appArea.generateCanvasTexture());
        this.appAreaSprite.interactive = true;
        this.appAreaSprite.name = 'appArea';
        this.app.stage.addChild(this.appAreaSprite);

        this.getElements();
    }

    /**
     * Gets all DOM-elements by their id
     */
    getElements() {
        this.gravityMinus = document.getElementById('gravityMin');
        this.gravityPlus = document.getElementById('gravityPlus');
        this.shapeSpeedMinus = document.getElementById('shapeSpeedMin');
        this.shapeSpeedPlus = document.getElementById('shapeSpeedPlus');

        this.shapeCounter = document.getElementById('shapeCount');
        this.shapeAreaCounter = document.getElementById('area');
        this.gravityCounter = document.getElementById('gravity');
        this.shapeSpeedCounter = document.getElementById('shapeSpeed');
    }

    /**
     * Ticker method for view
     * Sets up falling motion with gravity value
     */
    tick() {
        _.each(this.model.shapes, shape => shape.y += 0.5 * this.model.gravity);
    }

    /**
     * Adds shape to DOM
     */
    addShape(shape) {
        this.app.stage.addChild(shape);
    }

    /**
     * Removes shape from DOM
     */
    removeShape(shape) {
        this.app.stage.removeChild(shape);
    }
}
