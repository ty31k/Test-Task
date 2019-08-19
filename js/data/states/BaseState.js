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
