module TProject {

    export class GameEvent
    {
        public static changeState:signals.Signal = new signals.Signal();
        public static spinStart:signals.Signal = new signals.Signal();
        public static spinStop:signals.Signal = new signals.Signal();
        public static saveReelData:signals.Signal = new signals.Signal();
        public static showWinHints:signals.Signal = new signals.Signal();
    }

}