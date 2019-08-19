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
    var Reel = (function (_super) {
        __extends(Reel, _super);
        function Reel() {
            var _this = _super.call(this) || this;
            TProject.Util.shuffleArray(TProject.Boot.symbolKeys);
            _this.initSymbols();
            return _this;
        }
        Reel.prototype.getSymbolKeyFromLine = function (line) {
            return this._symbolsArray[line].frameName;
        };
        Reel.prototype.initSymbols = function () {
            var symb;
            this._symbolsArray = [];
            for (var i = 0; i < TProject.Boot.symbolKeys.length; i++) {
                symb = new TProject.Symbol(TProject.Boot.symbolKeys[i]);
                symb.position.set(0, -TProject.Boot.symbolHeightOffset * i);
                symb.anchor.set(0.5, 0.5);
                this.addChild(symb);
                this._symbolsArray.push(symb);
            }
            for (var i = TProject.Boot.symbolKeys.length; i < TProject.Boot.symbolKeys.length + 3; i++) {
                symb = new TProject.Symbol(TProject.Boot.symbolKeys[i - TProject.Boot.symbolKeys.length]);
                symb.position.set(0, -TProject.Boot.symbolHeightOffset * i);
                symb.anchor.set(0.5, 0.5);
                this.addChild(symb);
                this._symbolsArray.push(symb);
            }
        };
        Reel.prototype.changeSymbolsToFixed = function (keyArray) {
            for (var i = 0; i < keyArray.length; i++) {
                this._symbolsArray[i].frameName = keyArray[i];
            }
            for (var i = keyArray.length; i < keyArray.length + 3; i++) {
                this._symbolsArray[i].frameName = keyArray[i - keyArray.length];
            }
        };
        Reel.prototype.randomizeSymbols = function () {
            TProject.Util.shuffleArray(TProject.Boot.symbolKeys);
            for (var i = 0; i < TProject.Boot.symbolKeys.length; i++) {
                this._symbolsArray[i].frameName = TProject.Boot.symbolKeys[i];
            }
            for (var i = TProject.Boot.symbolKeys.length; i < TProject.Boot.symbolKeys.length + 3; i++) {
                this._symbolsArray[i].frameName = TProject.Boot.symbolKeys[i - TProject.Boot.symbolKeys.length];
            }
        };
        return Reel;
    }(PIXI.Container));
    TProject.Reel = Reel;
})(TProject || (TProject = {}));

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
    var Container = PIXI.Container;
    var Graphics = PIXI.Graphics;
    var Reels = (function (_super) {
        __extends(Reels, _super);
        function Reels(x, y) {
            var _this = _super.call(this) || this;
            _this._isSpinning = false;
            _this._winnedLines = 0;
            _this.x = x;
            _this.y = y;
            _this._leftReel = new TProject.Reel();
            _this._midReel = new TProject.Reel();
            _this._rightReel = new TProject.Reel();
            _this._leftReel.position.set(-TProject.Boot.reelWidthOffset, TProject.Boot.symbolHeightOffset);
            _this._midReel.position.set(0, TProject.Boot.symbolHeightOffset);
            _this._rightReel.position.set(TProject.Boot.reelWidthOffset, TProject.Boot.symbolHeightOffset);
            _this.addChild(_this._leftReel);
            _this.addChild(_this._midReel);
            _this.addChild(_this._rightReel);
            _this._reelsTweenGroup = new TWEEN.Group();
            var reelMask = new Graphics();
            reelMask.position.set(0, 0);
            reelMask.beginFill(0xffffff);
            reelMask.drawRect(-360, -250, 720, 500);
            _this.addChild(reelMask);
            _this._leftReel.mask = reelMask;
            _this._midReel.mask = reelMask;
            _this._rightReel.mask = reelMask;
            TProject.GameEvent.saveReelData.add(_this.changeReelSymbols, _this);
            return _this;
        }
        Reels.prototype.spinUp = function () {
            var _this = this;
            if (this._isSpinning) {
                return;
            }
            if (!TProject.Boot.changeBalance(-TProject.Boot.spinCost)) {
                return;
            }
            TProject.GameEvent.spinStart.dispatch();
            this._isSpinning = true;
            this._stopPosition = [TProject.Util.getRandomIntInclusive(2, 6), TProject.Util.getRandomIntInclusive(2, 6), TProject.Util.getRandomIntInclusive(2, 6)];
            this._leftReelTweenA = new TWEEN.Tween(this._leftReel)
                .to({ y: TProject.Boot.symbolHeightOffset * 6 }, Math.max((1 - (this._leftReel.y - TProject.Boot.symbolHeightOffset) / TProject.Boot.symbolHeightOffset * 5) * 300, 1))
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () {
                _this._leftReel.y = TProject.Boot.symbolHeightOffset;
                _this._leftReel.randomizeSymbols();
            });
            this._leftReelTweenB = new TWEEN.Tween(this._leftReel)
                .to({ y: TProject.Boot.symbolHeightOffset * 6 }, 300)
                .repeat(6)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () { _this._leftReel.y = (_this._stopPosition[0] - 2) * TProject.Boot.symbolHeightOffset; });
            this._leftReelTweenC = new TWEEN.Tween(this._leftReel)
                .to({ y: this._stopPosition[0] * TProject.Boot.symbolHeightOffset }, 500)
                .easing(TWEEN.Easing.Elastic.Out);
            this._midReelTweenA = new TWEEN.Tween(this._midReel)
                .to({ y: TProject.Boot.symbolHeightOffset * 6 }, Math.max((1 - (this._leftReel.y - TProject.Boot.symbolHeightOffset) / TProject.Boot.symbolHeightOffset * 5) * 300, 1))
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () {
                _this._midReel.y = TProject.Boot.symbolHeightOffset;
                _this._midReel.randomizeSymbols();
            });
            this._midReelTweenB = new TWEEN.Tween(this._midReel)
                .to({ y: TProject.Boot.symbolHeightOffset * 6 }, 300)
                .repeat(7)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () { _this._midReel.y = (_this._stopPosition[1] - 2) * TProject.Boot.symbolHeightOffset; });
            this._midReelTweenC = new TWEEN.Tween(this._midReel)
                .to({ y: this._stopPosition[1] * TProject.Boot.symbolHeightOffset }, 500)
                .easing(TWEEN.Easing.Elastic.Out);
            this._rightReelTweenA = new TWEEN.Tween(this._rightReel)
                .to({ y: TProject.Boot.symbolHeightOffset * 6 }, Math.max((1 - (this._leftReel.y - TProject.Boot.symbolHeightOffset) / TProject.Boot.symbolHeightOffset * 5) * 300, 1))
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () {
                _this._rightReel.y = TProject.Boot.symbolHeightOffset;
                _this._rightReel.randomizeSymbols();
            });
            this._rightReelTweenB = new TWEEN.Tween(this._rightReel)
                .to({ y: TProject.Boot.symbolHeightOffset * 6 }, 300)
                .repeat(8)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(function () { _this._rightReel.y = (_this._stopPosition[2] - 2) * TProject.Boot.symbolHeightOffset; });
            this._rightReelTweenC = new TWEEN.Tween(this._rightReel)
                .to({ y: this._stopPosition[2] * TProject.Boot.symbolHeightOffset }, 500)
                .easing(TWEEN.Easing.Elastic.Out)
                .onComplete(function () {
                _this.countWinLines();
                setTimeout(function () { _this._isSpinning = false; }, 1);
            });
            this._leftReelTweenB.chain(this._leftReelTweenC);
            this._leftReelTweenA.chain(this._leftReelTweenB);
            this._midReelTweenB.chain(this._midReelTweenC);
            this._midReelTweenA.chain(this._midReelTweenB);
            this._rightReelTweenB.chain(this._rightReelTweenC);
            this._rightReelTweenA.chain(this._rightReelTweenB);
            this._leftReelTweenA.start();
            this._midReelTweenA.start();
            this._rightReelTweenA.start();
        };
        Reels.prototype.countWinLines = function () {
            this._winnedLines = 0;
            var midLineArray = [this._leftReel.getSymbolKeyFromLine(this._stopPosition[0]), this._midReel.getSymbolKeyFromLine(this._stopPosition[1]), this._rightReel.getSymbolKeyFromLine(this._stopPosition[2])];
            var midLineCombo = Reels.checkLine(midLineArray, Reels.MIDLINE);
            console.log(this._stopPosition);
            if (midLineCombo >= 0)
                this._winnedLines++;
            if (this._winnedLines > 0) {
                var tempArray = [];
                if (midLineCombo != -1) {
                    tempArray.push(midLineCombo);
                    TProject.Boot.changeBalance(TProject.PayTable.WINPRICES[midLineCombo]);
                    TProject.Boot.addWin();
                }
                TProject.GameEvent.showWinHints.dispatch(tempArray);
                tempArray = null;
            }
            TProject.GameEvent.spinStop.dispatch();
        };
        Reels.checkLine = function (lineArray, type) {
            if (lineArray[0] == lineArray[1] && lineArray[0] == lineArray[2]) {
                if (lineArray[0] !== "SYM1") {
                    return TProject.PayTable.ANYTHREEFRUIT;
                }
            }
            else if (lineArray.indexOf("SYM1") != -1) {
                return TProject.PayTable.FRUITANDWILD;
            }
            return -1;
        };
        Reels.prototype.changeReelSymbols = function () {
            var index;
            var tempArray = TProject.Boot.symbolKeys.slice();
            TProject.Util.shuffleArray(tempArray);
            var finalArray = [];
            var currentReel;
            console.log(arguments[0]);
            switch (arguments[0][0]) {
                case 1:
                    currentReel = this._leftReel;
                    break;
                case 2:
                    currentReel = this._midReel;
                    break;
                case 3:
                    currentReel = this._rightReel;
                    break;
            }
            if (arguments[1] != "question") {
                finalArray.push(arguments[1]);
                index = tempArray.indexOf(arguments[1]);
                if (index >= 0) {
                    tempArray.splice(index, 1);
                }
            }
            else {
                finalArray.push(tempArray[0]);
                tempArray.splice(0, 1);
            }
            if (arguments[2] != "question") {
                finalArray.push(arguments[2]);
                index = tempArray.indexOf(arguments[2]);
                if (index >= 0) {
                    tempArray.splice(index, 1);
                }
            }
            else {
                finalArray.push(tempArray[0]);
                tempArray.splice(0, 1);
            }
            if (arguments[3] != "question") {
                finalArray.push(arguments[3]);
                index = tempArray.indexOf(arguments[3]);
                if (index >= 0) {
                    tempArray.splice(index, 1);
                }
            }
            else {
                finalArray.push(tempArray[0]);
                tempArray.splice(0, 1);
            }
            finalArray = finalArray.concat(tempArray);
            currentReel.changeSymbolsToFixed(finalArray);
        };
        Reels.TOPLINE = 0;
        Reels.MIDLINE = 1;
        Reels.BOTLINE = 2;
        return Reels;
    }(Container));
    TProject.Reels = Reels;
})(TProject || (TProject = {}));

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
    var Symbol = (function (_super) {
        __extends(Symbol, _super);
        function Symbol(frameName) {
            var _this = _super.call(this, TProject.Boot.assetSheet.textures[frameName]) || this;
            _this._frameName = "";
            _this._frameName = frameName;
            _this.scale.set(0.93, 0.93);
            return _this;
        }
        Object.defineProperty(Symbol.prototype, "frameName", {
            get: function () { return this._frameName; },
            set: function (s) {
                this._frameName = s;
                this.texture = TProject.Boot.assetSheet.textures[this._frameName];
            },
            enumerable: true,
            configurable: true
        });
        return Symbol;
    }(PIXI.Sprite));
    TProject.Symbol = Symbol;
})(TProject || (TProject = {}));

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

var TProject;
(function (TProject) {
    var BaseState = (function () {
        function BaseState(pixiapp) {
            this.app = pixiapp;
        }
        BaseState.prototype.init = function () {
            this.preload();
        };
        BaseState.prototype.preload = function () {
        };
        BaseState.prototype.create = function () {
        };
        BaseState.prototype.update = function () {
        };
        BaseState.prototype.destroy = function () {
        };
        BaseState.prototype.resize = function () {
        };
        return BaseState;
    }());
    TProject.BaseState = BaseState;
})(TProject || (TProject = {}));

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
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot(pixiapp) {
            return _super.call(this, pixiapp) || this;
        }
        Boot.prototype.init = function () {
            console.log("Booted");
            TProject.GameEvent.changeState.dispatch("Preloader");
        };
        Boot.changeBalance = function (n) {
            if (Boot.balance + n >= 0) {
                Boot.balance += n;
                return true;
            }
            return false;
        };
        Boot.addWin = function () {
            Boot.winAmount++;
        };
        Boot.PATH_IMAGES = "./assets/images/";
        Boot.PATH_FONTS = "./assets/fonts/";
        Boot.fontName = "russo_oneregular";
        Boot.symbolKeys = ["SYM1", "SYM3", "SYM4", "SYM5", "SYM6", "SYM7"];
        Boot.balance = 100;
        Boot.symbolHeightOffset = 165;
        Boot.reelWidthOffset = 245;
        Boot.spinCost = 5;
        Boot.winAmount = 0;
        return Boot;
    }(TProject.BaseState));
    TProject.Boot = Boot;
})(TProject || (TProject = {}));

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
    var Sprite = PIXI.Sprite;
    var Text = PIXI.Text;
    var Graphics = PIXI.Graphics;
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level(pixiapp) {
            return _super.call(this, pixiapp) || this;
        }
        Level.prototype.init = function () {
            TProject.Boot.assetSheet = PIXI.Loader.shared.resources["gameAssetsAtlas"].spritesheet;
            this.create();
        };
        Level.prototype.create = function () {
            this._background = new Sprite(TProject.Boot.assetSheet.textures["BG"]);
            this._background.anchor.set(0.5, 0.5);
            this.app.stage.addChild(this._background);
            this._winScreen = new Graphics();
            this._winScreen.beginFill(0x1a3633, 0.7);
            this._winScreen.drawRect(-360, -200, 720, 400);
            this._winScreen.interactive = true;
            this._winScreen.visible = false;
            this._winText = new Text("YOU WON!", {
                fontFamily: TProject.Boot.fontName,
                fontSize: 60,
                fill: '#f7ff31'
            });
            this._winText.y = -70;
            this._winText.anchor.set(0.5, 0.5);
            this._winScreenAmountText = new Text("Prize amount: $10", {
                fontFamily: TProject.Boot.fontName,
                fontSize: 48,
                fill: '#f7ff31'
            });
            this._winScreenAmountText.y = 50;
            this._winScreenAmountText.anchor.set(0.5, 0.5);
            this._winScreen.addChild(this._winText);
            this._winScreen.addChild(this._winScreenAmountText);
            this._reels = new TProject.Reels(this.app.stage.width / 2, this.app.stage.height / 2);
            this._spinButton = new TProject.ActionUIButton(0, 0, "BTN_Spin", this.onSpinHandler.bind(this), "BTN_Spin_d");
            this._balanceTextBox = new Graphics();
            this._balanceTextBox.clear();
            this._balanceTextBox.beginFill(0x000000, 0.5);
            this._balanceTextBox.moveTo(0, 0);
            this._balanceTextBox.drawRect(-80, -40, 160, 80);
            this._balanceTextBox.position.set(450, 170);
            this._balanceAmountText = new Text("MONEY:", {
                fontFamily: TProject.Boot.fontName,
                fontSize: 20,
                fill: '#f7ff31'
            });
            this._balanceAmountText.position.set(5 - this._balanceTextBox.width / 2, -20);
            this._balanceAmountText.anchor.set(0, 0.5);
            this._winAmountText = new Text("WIN:", {
                fontFamily: TProject.Boot.fontName,
                fontSize: 20,
                fill: '#f7ff31'
            });
            this._winAmountText.position.set(5 - this._balanceTextBox.width / 2, 20);
            this._winAmountText.anchor.set(0, 0.5);
            this._balanceTextBox.addChild(this._winAmountText);
            this._balanceTextBox.addChild(this._balanceAmountText);
            this._reels.addChild(this._balanceTextBox);
            this.app.stage.addChild(this._reels);
            this.app.stage.addChild(this._spinButton);
            this.app.stage.addChild(this._winScreen);
            TProject.GameEvent.showWinHints.add(this.checkWin, this);
            TProject.GameEvent.spinStop.add(this.onSpinStop, this);
            this.resize();
            this.updateStats();
        };
        Level.prototype.checkWin = function () {
            this.updateStats();
            this.showWinScreen();
        };
        Level.prototype.onSpinStop = function () {
            this._spinButton.turnItOn();
        };
        Level.prototype.showWinScreen = function () {
            this._winScreen.visible = true;
        };
        Level.prototype.hideWinScreen = function () {
            if (this._winScreen.visible) {
                this._winScreen.visible = false;
            }
        };
        Level.prototype.updateStats = function () {
            this._balanceAmountText.text = "MONEY: $" + TProject.Boot.balance + "";
            this._winAmountText.text = "WIN: " + TProject.Boot.winAmount + "";
        };
        Level.prototype.onSpinHandler = function () {
            this._reels.spinUp();
            this._spinButton.turnItOff();
            this.updateStats();
            this.hideWinScreen();
        };
        Level.prototype.resize = function () {
            var scaleFactor = this.app.screen.width / 960;
            if (this.app.screen.height / this.app.screen.width <= 536 / 960) {
                scaleFactor = this.app.screen.height / 536;
            }
            this._background.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
            this._background.scale.set(scaleFactor, scaleFactor);
            this._reels.position.set(this.app.screen.width / 2 - 52 * scaleFactor, this.app.screen.height / 2 + 20 * scaleFactor);
            this._reels.scale.set(scaleFactor, scaleFactor);
            this._spinButton.position.set(this.app.screen.width / 2 + 393 * scaleFactor, this.app.screen.height / 2);
            this._spinButton.scale.set(scaleFactor, scaleFactor);
            this._winScreen.position.set(this._reels.x, this._reels.y);
            this._winScreen.scale.set(scaleFactor, scaleFactor);
        };
        return Level;
    }(TProject.BaseState));
    TProject.Level = Level;
})(TProject || (TProject = {}));

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

var TProject;
(function (TProject) {
    var System = (function () {
        function System() {
        }
        System.loadFonts = function (fonts, fileName, cb) {
            WebFont.load({
                custom: {
                    families: fonts,
                    urls: [
                        "" + fileName
                    ]
                },
                active: function () {
                    window.setTimeout(function () {
                        if (cb != null) {
                            cb();
                        }
                    }, 100);
                }
            });
        };
        return System;
    }());
    TProject.System = System;
})(TProject || (TProject = {}));

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
    var ActionUIButton = (function (_super) {
        __extends(ActionUIButton, _super);
        function ActionUIButton(x, y, key, callback, keyOff) {
            var _this = _super.call(this, TProject.Boot.assetSheet.textures[key]) || this;
            _this._keyOn = key;
            _this._keyOff = keyOff;
            _this.position.set(x, y);
            _this.anchor.set(0.5, 0.5);
            _this.callBack = callback;
            _this.interactive = true;
            _this.buttonMode = true;
            _this.on("click", _this.onClickHandler, _this);
            _this.on("tap", _this.onClickHandler, _this);
            return _this;
        }
        ActionUIButton.prototype.onClickHandler = function () {
            if (this.callBack != null) {
                this.callBack();
            }
        };
        ActionUIButton.prototype.turnItOff = function () {
            this.interactive = false;
            if (this._keyOff) {
                this.texture = TProject.Boot.assetSheet.textures[this._keyOff];
            }
        };
        ActionUIButton.prototype.turnItOn = function () {
            this.interactive = true;
            console.log("kek");
            this.texture = TProject.Boot.assetSheet.textures[this._keyOn];
        };
        ActionUIButton.prototype.destroy = function () {
            this.off("click", this.onClickHandler, this);
            this.off("tap", this.onClickHandler, this);
            this.callBack = null;
            _super.prototype.destroy.call(this);
        };
        return ActionUIButton;
    }(PIXI.Sprite));
    TProject.ActionUIButton = ActionUIButton;
})(TProject || (TProject = {}));

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
    var PayTable = (function (_super) {
        __extends(PayTable, _super);
        function PayTable(x, y) {
            var _this = _super.call(this, TProject.Boot.assetSheet.textures["payTable"]) || this;
            _this.position.set(x, y);
            _this.anchor.set(0.5, 0);
            return _this;
        }
        PayTable.ANYTHREEFRUIT = 0;
        PayTable.FRUITANDWILD = 1;
        PayTable.WINPRICES = [10, 10];
        return PayTable;
    }(PIXI.Sprite));
    TProject.PayTable = PayTable;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var GameEvent = (function () {
        function GameEvent() {
        }
        GameEvent.changeState = new signals.Signal();
        GameEvent.spinStart = new signals.Signal();
        GameEvent.spinStop = new signals.Signal();
        GameEvent.saveReelData = new signals.Signal();
        GameEvent.showWinHints = new signals.Signal();
        return GameEvent;
    }());
    TProject.GameEvent = GameEvent;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Signal = (function () {
        function Signal() {
            this._bindings = [];
            this._prevParams = null;
            this.memorize = false;
            this._shouldPropagate = true;
            this.active = true;
        }
        Signal.prototype.validateListener = function (listener, fnName) {
            if (typeof listener !== 'function') {
                throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
            }
        };
        Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
            var prevIndex = this._indexOfListener(listener, listenerContext);
            var binding;
            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            }
            else {
                binding = new TProject.SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }
            if (this.memorize && this._prevParams) {
                binding.execute(this._prevParams);
            }
            return binding;
        };
        Signal.prototype._addBinding = function (binding) {
            var n = this._bindings.length;
            do {
                --n;
            } while (this._bindings[n] && binding.priority <= this._bindings[n].priority);
            this._bindings.splice(n + 1, 0, binding);
        };
        Signal.prototype._indexOfListener = function (listener, context) {
            var n = this._bindings.length;
            var cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur.getListener() === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        };
        Signal.prototype.has = function (listener, context) {
            if (context === void 0) { context = null; }
            return this._indexOfListener(listener, context) !== -1;
        };
        Signal.prototype.add = function (listener, listenerContext, priority) {
            if (listenerContext === void 0) { listenerContext = null; }
            if (priority === void 0) { priority = 0; }
            this.validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        };
        Signal.prototype.addOnce = function (listener, listenerContext, priority) {
            if (listenerContext === void 0) { listenerContext = null; }
            if (priority === void 0) { priority = 0; }
            this.validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        };
        Signal.prototype.remove = function (listener, context) {
            if (context === void 0) { context = null; }
            this.validateListener(listener, 'remove');
            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy();
                this._bindings.splice(i, 1);
            }
            return listener;
        };
        Signal.prototype.removeAll = function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        };
        Signal.prototype.getNumListeners = function () {
            return this._bindings.length;
        };
        Signal.prototype.halt = function () {
            this._shouldPropagate = false;
        };
        Signal.prototype.dispatch = function () {
            var paramsArr = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paramsArr[_i] = arguments[_i];
            }
            if (!this.active) {
                return;
            }
            var n = this._bindings.length;
            var bindings;
            if (this.memorize) {
                this._prevParams = paramsArr;
            }
            if (!n) {
                return;
            }
            bindings = this._bindings.slice(0);
            this._shouldPropagate = true;
            do {
                n--;
            } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        };
        Signal.prototype.forget = function () {
            this._prevParams = null;
        };
        Signal.prototype.dispose = function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        };
        Signal.prototype.toString = function () {
            return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        };
        Signal.VERSION = '1.0.0';
        return Signal;
    }());
    TProject.Signal = Signal;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var SignalBinding = (function () {
        function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
            if (priority === void 0) { priority = 0; }
            this.active = true;
            this.params = null;
            this._listener = listener;
            this._isOnce = isOnce;
            this.context = listenerContext;
            this._signal = signal;
            this.priority = priority || 0;
        }
        SignalBinding.prototype.execute = function (paramsArr) {
            var handlerReturn;
            var params;
            if (this.active && !!this._listener) {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        };
        SignalBinding.prototype.detach = function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
        };
        SignalBinding.prototype.isBound = function () {
            return (!!this._signal && !!this._listener);
        };
        SignalBinding.prototype.isOnce = function () {
            return this._isOnce;
        };
        SignalBinding.prototype.getListener = function () {
            return this._listener;
        };
        SignalBinding.prototype.getSignal = function () {
            return this._signal;
        };
        SignalBinding.prototype._destroy = function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        };
        SignalBinding.prototype.toString = function () {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
        };
        return SignalBinding;
    }());
    TProject.SignalBinding = SignalBinding;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var System = (function () {
        function System() {
        }
        System.loadFonts = function (fonts, fileName, cb) {
            WebFont.load({
                custom: {
                    families: fonts,
                    urls: [
                        TProject.Boot.PATH_FONTS + fileName
                    ]
                },
                active: function () {
                    window.setTimeout(function () {
                        if (cb != null) {
                            cb();
                        }
                    }, 100);
                }
            });
        };
        return System;
    }());
    TProject.System = System;
})(TProject || (TProject = {}));

var TProject;
(function (TProject) {
    var Util = (function () {
        function Util() {
        }
        Util.shuffleArray = function (array) {
            var _a;
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
            }
        };
        Util.getRandomIntInclusive = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        return Util;
    }());
    TProject.Util = Util;
})(TProject || (TProject = {}));

var Signal = (function () {
    function Signal() {
        this._bindings = [];
        this._prevParams = null;
        this.memorize = false;
        this._shouldPropagate = true;
        this.active = true;
    }
    Signal.prototype.validateListener = function (listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
        }
    };
    Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
        var prevIndex = this._indexOfListener(listener, listenerContext);
        var binding;
        if (prevIndex !== -1) {
            binding = this._bindings[prevIndex];
            if (binding.isOnce() !== isOnce) {
                throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
            }
        }
        else {
            binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
            this._addBinding(binding);
        }
        if (this.memorize && this._prevParams) {
            binding.execute(this._prevParams);
        }
        return binding;
    };
    Signal.prototype._addBinding = function (binding) {
        var n = this._bindings.length;
        do {
            --n;
        } while (this._bindings[n] && binding.priority <= this._bindings[n].priority);
        this._bindings.splice(n + 1, 0, binding);
    };
    Signal.prototype._indexOfListener = function (listener, context) {
        var n = this._bindings.length;
        var cur;
        while (n--) {
            cur = this._bindings[n];
            if (cur.getListener() === listener && cur.context === context) {
                return n;
            }
        }
        return -1;
    };
    Signal.prototype.has = function (listener, context) {
        if (context === void 0) { context = null; }
        return this._indexOfListener(listener, context) !== -1;
    };
    Signal.prototype.add = function (listener, listenerContext, priority) {
        if (listenerContext === void 0) { listenerContext = null; }
        if (priority === void 0) { priority = 0; }
        this.validateListener(listener, 'add');
        return this._registerListener(listener, false, listenerContext, priority);
    };
    Signal.prototype.addOnce = function (listener, listenerContext, priority) {
        if (listenerContext === void 0) { listenerContext = null; }
        if (priority === void 0) { priority = 0; }
        this.validateListener(listener, 'addOnce');
        return this._registerListener(listener, true, listenerContext, priority);
    };
    Signal.prototype.remove = function (listener, context) {
        if (context === void 0) { context = null; }
        this.validateListener(listener, 'remove');
        var i = this._indexOfListener(listener, context);
        if (i !== -1) {
            this._bindings[i]._destroy();
            this._bindings.splice(i, 1);
        }
        return listener;
    };
    Signal.prototype.removeAll = function () {
        var n = this._bindings.length;
        while (n--) {
            this._bindings[n]._destroy();
        }
        this._bindings.length = 0;
    };
    Signal.prototype.getNumListeners = function () {
        return this._bindings.length;
    };
    Signal.prototype.halt = function () {
        this._shouldPropagate = false;
    };
    Signal.prototype.dispatch = function () {
        var paramsArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paramsArr[_i] = arguments[_i];
        }
        if (!this.active) {
            return;
        }
        var n = this._bindings.length;
        var bindings;
        if (this.memorize) {
            this._prevParams = paramsArr;
        }
        if (!n) {
            return;
        }
        bindings = this._bindings.slice(0);
        this._shouldPropagate = true;
        do {
            n--;
        } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
    };
    Signal.prototype.forget = function () {
        this._prevParams = null;
    };
    Signal.prototype.dispose = function () {
        this.removeAll();
        delete this._bindings;
        delete this._prevParams;
    };
    Signal.prototype.toString = function () {
        return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
    };
    Signal.VERSION = '1.0.0';
    return Signal;
}());

var SignalBinding = (function () {
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
        if (priority === void 0) { priority = 0; }
        this.active = true;
        this.params = null;
        this._listener = listener;
        this._isOnce = isOnce;
        this.context = listenerContext;
        this._signal = signal;
        this.priority = priority || 0;
    }
    SignalBinding.prototype.execute = function (paramsArr) {
        var handlerReturn;
        var params;
        if (this.active && !!this._listener) {
            params = this.params ? this.params.concat(paramsArr) : paramsArr;
            handlerReturn = this._listener.apply(this.context, params);
            if (this._isOnce) {
                this.detach();
            }
        }
        return handlerReturn;
    };
    SignalBinding.prototype.detach = function () {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    };
    SignalBinding.prototype.isBound = function () {
        return (!!this._signal && !!this._listener);
    };
    SignalBinding.prototype.isOnce = function () {
        return this._isOnce;
    };
    SignalBinding.prototype.getListener = function () {
        return this._listener;
    };
    SignalBinding.prototype.getSignal = function () {
        return this._signal;
    };
    SignalBinding.prototype._destroy = function () {
        delete this._signal;
        delete this._listener;
        delete this.context;
    };
    SignalBinding.prototype.toString = function () {
        return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
    };
    return SignalBinding;
}());
