/// <reference path="../lib/pixi.js.d.ts"/>

/*declare var kongregateAPI:any;
declare var kongregate:any;*/

module TProject {

    export class Main
    {

        private app : PIXI.Application;
        private state : BaseState;

        private bootState:Boot;
        private preloaderState:Boot;
        private levelState:Boot;

        private cfg:Object =
            {
                width: 960,
                height: 536,
                autoResize: true,
                resolution: devicePixelRatio || 1,
                backgroundColor:0x2D3647,
                antialias: true
            };

        constructor()
        {
            this.app = new PIXI.Application(this.cfg);

            document.getElementById('game').appendChild(this.app.view);

            window.addEventListener('resize', this.resize.bind(this));

            GameEvent.changeState.add(this.changeState, this);

            this.bootState = new Boot(this.app);
            this.preloaderState = new Preloader(this.app);
            this.levelState = new Level(this.app);

            this.state = this.bootState;
            this.state.init();

            this.resize();

            this.gameLoop();
        }

        private gameLoop():void
        {
            requestAnimationFrame(this.gameLoop.bind(this));

            this.state.update();
            TWEEN.update();
        }

        private changeState():void
        {
            if(arguments[0] == "Preloader")
            {
                this.state = this.preloaderState;
            }
            else if(arguments[0] == "Level")
            {
                this.state = this.levelState;
            }

            this.state.init();
        }

        private resize():void
        {
            // Resize the renderer
            this.app.renderer.resize(window.innerWidth, window.innerHeight);

            this.state.resize();
        }

    }

}

window.onload = function () {
    let game = new TProject.Main();

    setTimeout("window.scrollTo(0, 1)", 10);
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);
};