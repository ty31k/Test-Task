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
