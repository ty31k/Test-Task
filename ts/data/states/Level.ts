module TProject {

    import Sprite = PIXI.Sprite;
    import Text = PIXI.Text;
    import Graphics = PIXI.Graphics;

    export class Level extends BaseState
    {
        private _background:Sprite;
        private _blackFilter:Graphics;
        private _payTable:PayTable;
        private _reels:Reels;
        private _balanceAmountText:Text;
        private _winAmountText:Text;
        private _balanceTextBox:Graphics;
        private _spinButton:ActionUIButton;

        private _winScreen:Graphics;
        private _winText:Text;
        private _winScreenAmountText:Text;

        constructor(pixiapp:PIXI.Application)
        {
            super(pixiapp);
        }

        public init():void
        {
            Boot.assetSheet = PIXI.Loader.shared.resources["gameAssetsAtlas"].spritesheet;
            this.create();
        }

        public create():void
        {
            this._background = new Sprite(Boot.assetSheet.textures["BG"]);
            this._background.anchor.set(0.5,0.5);

            this.app.stage.addChild(this._background);

            this._winScreen = new Graphics();
            this._winScreen.beginFill(0x1a3633, 0.7);
            this._winScreen.drawRect(-360,-200,720, 400);
            this._winScreen.interactive = true;
            this._winScreen.visible = false;

            this._winText = new Text("YOU WON!", {
                fontFamily: Boot.fontName,
                fontSize: 60,
                fill: '#f7ff31'
            });
            this._winText.y = -70;
            this._winText.anchor.set(0.5,0.5);

            this._winScreenAmountText = new Text("Prize amount: $10", {
                fontFamily: Boot.fontName,
                fontSize: 48,
                fill: '#f7ff31'
            });
            this._winScreenAmountText.y = 50;
            this._winScreenAmountText.anchor.set(0.5,0.5);

            this._winScreen.addChild(this._winText);
            this._winScreen.addChild(this._winScreenAmountText);

            this._reels = new Reels(this.app.stage.width/2, this.app.stage.height/2);

            this._spinButton = new ActionUIButton(0, 0, "BTN_Spin", this.onSpinHandler.bind(this), "BTN_Spin_d");

            this._balanceTextBox = new Graphics();
            this._balanceTextBox.clear();
            this._balanceTextBox.beginFill(0x000000, 0.5);
            this._balanceTextBox.moveTo(0,0);
            this._balanceTextBox.drawRect(-80,-40,160,80);
            this._balanceTextBox.position.set(450,170);

            this._balanceAmountText = new Text("MONEY:", {
                fontFamily: Boot.fontName,
                fontSize: 20,
                fill: '#f7ff31'
            });
            this._balanceAmountText.position.set(5-this._balanceTextBox.width/2, -20);
            this._balanceAmountText.anchor.set(0,0.5);

            this._winAmountText = new Text("WIN:", {
                fontFamily: Boot.fontName,
                fontSize: 20,
                fill: '#f7ff31'
            });
            this._winAmountText.position.set(5-this._balanceTextBox.width/2, 20);
            this._winAmountText.anchor.set(0,0.5);

            this._balanceTextBox.addChild(this._winAmountText);
            this._balanceTextBox.addChild(this._balanceAmountText);

            this._reels.addChild(this._balanceTextBox);

            this.app.stage.addChild(this._reels);
            this.app.stage.addChild(this._spinButton);

            this.app.stage.addChild(this._winScreen);

            GameEvent.showWinHints.add(this.checkWin, this);
            GameEvent.spinStop.add(this.onSpinStop, this);

            this.resize();

            this.updateStats();
        }

        private checkWin():void
        {
            this.updateStats();
            this.showWinScreen();
        }

        private onSpinStop():void
        {
            this._spinButton.turnItOn();
        }

        private showWinScreen():void
        {
            this._winScreen.visible = true;
        }

        private hideWinScreen():void
        {
            if(this._winScreen.visible)
            {
                this._winScreen.visible = false;
            }
        }

        private updateStats():void
        {
            this._balanceAmountText.text = "MONEY: $"+Boot.balance+"";
            this._winAmountText.text = "WIN: "+Boot.winAmount+"";
        }

        private onSpinHandler():void
        {
            this._reels.spinUp();
            this._spinButton.turnItOff();
            this.updateStats();
            this.hideWinScreen();
        }

        public resize():void
        {
            let scaleFactor:number = this.app.screen.width/960;
            if(this.app.screen.height/this.app.screen.width <= 536/960)
            {
                scaleFactor = this.app.screen.height/536;
            }

            this._background.position.set(this.app.screen.width/2, this.app.screen.height/2);
            this._background.scale.set(scaleFactor, scaleFactor);

            this._reels.position.set(this.app.screen.width/2-52*scaleFactor, this.app.screen.height/2+20*scaleFactor);
            this._reels.scale.set(scaleFactor, scaleFactor);

            this._spinButton.position.set(this.app.screen.width/2+393*scaleFactor, this.app.screen.height/2);
            this._spinButton.scale.set(scaleFactor, scaleFactor);

            this._winScreen.position.set(this._reels.x, this._reels.y);
            this._winScreen.scale.set(scaleFactor, scaleFactor);
        }

    }

}