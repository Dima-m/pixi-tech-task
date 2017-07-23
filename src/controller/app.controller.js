/**
 * @desc Pixi.js Tech Task Controller
 */
class Controller {
    /**
     * @desc Pixi.js Tech Task Controller class constructor
     * @param {object} model - injection
     * @param {object} view - injection
     */
    constructor(model, view) {
        Object.assign(this, { model, view })

        this.shapes = SHAPES;
        this.view.app.stage.interactive = true;

        this.appHeight = this.view.app._options.height;
        this.addListeners();
        this.initializeCounters();
        this.onClickAction();
        this.startShapes();
    }

    /**
     * Sets up listeners for click events
     */
    addListeners() {
        this.view.gravityMinus.addEventListener('click', () => this.decreaseGravity());
        this.view.gravityPlus.addEventListener('click', () => this.increaseGravity());
        this.view.shapeSpeedMinus.addEventListener('click', () => this.decreaseNumOfShapes());
        this.view.shapeSpeedPlus.addEventListener('click', () => this.increaseNumOfShapes());
    }

    /**
     * Initializes counters for various model props
     */
    initializeCounters() {
        this.updateCounters(this.model.shapes.length, 'shape');
        this.updateCounters(this.model.gravity, 'gravity');
        this.updateCounters(this.model.shapesPerSecond, 'speed');
        this.updateCounters(this.model.area, 'square');
    }

    /**
     * Updates counters depending on value type
     * @param {string} value - value to be set
     * @param {string} type - type of the value
     */
    updateCounters(value, type) {
        switch (type) {
            case 'speed': this.view.shapeSpeedCounter.textContent = value;
                break;
            case 'shape': this.view.shapeCounter.textContent = value;
                break;
            case 'gravity': this.view.gravityCounter.textContent = value;
                break;
            case 'square': this.view.shapeAreaCounter.textContent = value;
                break;
        }
    }

    /**
     * Ticker method for controller
     * Removes shapes when they're not on the app stage
     */
    tick() {
        _.each(this.model.shapes, shape => {
            if (shape) {
                if (shape.y > this.appHeight + 150) {
                    this.removeShape(shape);
                }
            }
        })
    }

    /**
     * Starts shape generation depending on shapesPerSecond value
     */
    startShapes() {
        setInterval(() => {
            for (let i = 0; i < this.model.shapesPerSecond; i++) {
                this.generateShapes();
            }
        }, 1000);
    }

    /**
     * Generates random coordinates for shape
     */
    generateShapes() {
        const x = Math.floor(Math.random() * APP_WIDTH);
        const y =  this.appHeight - 450;
        this.createRandomShape(x, y);
    }

    /**
     * Creates random shape with given coords
     * and adds it to model and view
     * @param {string} x - x axis
     * @param {string} y - y xis
     */
    createRandomShape(x, y) {
        let shape = new Shape(x, y, _.sample(this.shapes));
        this.model.addShape(shape);
        this.view.addShape(shape);
        this.updateCounters(this.model.shapes.length, 'shape');
        this.calcSurfaceArea(shape.width, shape.height);
    }

    /**
     * Removes given shape from model and view
     * @param {object} shape - shape to remove
     */
    removeShape(shape) {
        this.model.removeShape(shape);
        this.view.removeShape(shape);
        this.updateCounters(this.model.shapes.length, 'shape');        
    }

    /**
     * Calculates the surface area occupied by the shapes
     * @param {string} width - width of the shape
     * @param {string} height - height of the shape
     */
    calcSurfaceArea(width, height) {
        let shapeArea = width * height;
        let result = shapeArea * this.model.shapes.length;
        this.updateCounters(result, 'square');
    }

    /**
     * Click handler for shapes
     */
    onClickAction() {
        this.view.app.stage.on('click', e => {
            const { x, y } = e.data.global;
            e.target.name === 'appArea' ? this.createRandomShape(x, y) : this.removeShape(e.target);
            e.stopPropagation();
        });
    }

    /**
     * Increases gravity value in model
     */
    increaseGravity() {
        this.model.gravity++;
        this.updateCounters(this.model.gravity, 'gravity');
    }

    /**
     * Decreases gravity value in model
     */
    decreaseGravity() {
        this.model.gravity--;
        this.updateCounters(this.model.gravity, 'gravity');
    }

    /**
     * Increases shapesPerSecond value in model
     */
    increaseNumOfShapes() {
        this.model.shapesPerSecond++;
        this.updateCounters(this.model.shapesPerSecond, 'speed');
    }

    /**
     * Decreases shapesPerSecond value in model
     */
    decreaseNumOfShapes() {
        this.model.shapesPerSecond--;
        this.updateCounters(this.model.shapesPerSecond, 'speed');
    }
}
