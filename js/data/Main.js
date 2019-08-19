var TProject;
(function (TProject) {
    var Main = (function () {
        function Main() {
            this.cfg = {
                width: 960,
                height: 536,
                autoResize: true,
                resolution: devicePixelRatio || 1,
                backgroundColor: 0x2D3647,
                antialias: true
            };
            this.app = new PIXI.Application(this.cfg);
            document.getElementById('game').appendChild(this.app.view);
            window.addEventListener('resize', this.resize.bind(this));
            TProject.GameEvent.changeState.add(this.changeState, this);
            this.bootState = new TProject.Boot(this.app);
            this.preloaderState = new TProject.Preloader(this.app);
            this.levelState = new TProject.Level(this.app);
            this.state = this.bootState;
            this.state.init();
            this.resize();
            this.gameLoop();
        }
        Main.prototype.gameLoop = function () {
            requestAnimationFrame(this.gameLoop.bind(this));
            this.state.update();
            TWEEN.update();
        };
        Main.prototype.changeState = function () {
            if (arguments[0] == "Preloader") {
                this.state = this.preloaderState;
            }
            else if (arguments[0] == "Level") {
                this.state = this.levelState;
            }
            this.state.init();
        };
        Main.prototype.resize = function () {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
            this.state.resize();
        };
        return Main;
    }());
    TProject.Main = Main;
})(TProject || (TProject = {}));
window.onload = function () {
    var game = new TProject.Main();
    setTimeout("window.scrollTo(0, 1)", 10);
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
};
