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
