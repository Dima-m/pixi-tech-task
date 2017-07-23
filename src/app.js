window.onload = () => {
   const app = new PIXI.Application(APP_WIDTH, APP_HEIGHT, APP_CONFIG);

   const model = new Model();
   const view = new View(model, app);
   const controller = new Controller(model, view, app);

   let appArea = document.getElementById('appArea')
   appArea.appendChild(app.view);

   app.ticker.add(() => {
       view.tick();
       controller.tick();
    });
};
