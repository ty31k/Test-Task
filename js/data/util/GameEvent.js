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
