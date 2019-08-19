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
