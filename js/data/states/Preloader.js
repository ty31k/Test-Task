var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TProject;
(function (TProject) {
    var Text = PIXI.Text;
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader(pixiapp) {
            var _this = _super.call(this, pixiapp) || this;
            _this._loadedAssets = false;
            _this._loadedFont = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this._loadedFont = true;
            this._loadedAssets = true;
            this.loading();
            PIXI.Loader.shared.onLoad.add(this.onLoadProgress, this);
            this._loadingText = new Text("Loading...", {
                font: "36px " + TProject.Boot.fontName,
                fill: "#ffffff"
            });
            this._loadingText.anchor.set(0.5, 0.5);
            this._loadingText.position.set(this.app.stage.width / 2, this.app.stage.width / 2);
            this.app.stage.addChild(this._loadingText);
            console.log("Start loading");
            this.resize();
        };
        Preloader.prototype.onLoadProgress = function (e, cacheKey) {
            console.log(e.progress);
            if (e.progress >= 100) {
                this._loadedAssets = true;
            }
        };
        Preloader.prototype.loading = function () {
            this.loadFonts([TProject.Boot.fontName]);
            this.loadAtlases(["gameAssets"]);
            PIXI.Loader.shared.load(this.setup);
        };
        Preloader.prototype.setup = function () {
            TProject.Boot.assetSheet = PIXI.Loader.shared.resources["gameAssetsAtlas"].spritesheet;
        };
        Preloader.prototype.update = function () {
            if (this._loadedAssets && this._loadedFont) {
                this._loadedAssets = false;
                console.log("Loaded");
                this.destroy();
                setTimeout(function () {
                    TProject.GameEvent.changeState.dispatch("Level");
                }, 400);
            }
        };
        Preloader.prototype.loadFonts = function (fonts, stylename, cb) {
            var _this = this;
            if (stylename === void 0) { stylename = "styles"; }
            if (fonts == null || fonts.length == 0) {
                return;
            }
            this._loadedFont = false;
            TProject.System.loadFonts(fonts, stylename + ".css", function () {
                _this._loadedFont = true;
                if (cb) {
                    cb();
                }
            });
        };
        Preloader.prototype.loadAtlases = function (names, format) {
            if (format === void 0) { format = "png"; }
            if (names == null || names.length == 0) {
                return;
            }
            var version = "?v=0";
            var arr;
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i].split("/").pop();
                var namepath = TProject.Boot.PATH_IMAGES + names[i];
                PIXI.Loader.shared.add(name_1 + "Atlas", namepath + ".json");
            }
            this._loadedAssets = false;
        };
        Preloader.prototype.resize = function () {
            this._loadingText.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        };
        Preloader.prototype.destroy = function () {
            this.app.stage.removeChild(this._loadingText);
            this._loadingText = null;
        };
        return Preloader;
    }(TProject.BaseState));
    TProject.Preloader = Preloader;
})(TProject || (TProject = {}));
