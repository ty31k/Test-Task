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
