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
