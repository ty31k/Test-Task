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
