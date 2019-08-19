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
