module TProject {

    export class Boot extends BaseState
    {
        public static readonly PATH_IMAGES: string = "./assets/images/";
        public static readonly PATH_FONTS: string = "./assets/fonts/";
        public static fontName:string = "russo_oneregular";
        public static symbolKeys:string[] = ["SYM1","SYM3","SYM4","SYM5","SYM6","SYM7"];
        public static balance:number = 100;
        public static symbolHeightOffset:number = 165;
        public static reelWidthOffset:number = 245;
        public static spinCost:number = 5;
        public static winAmount:number = 0;
        public static assetSheet:PIXI.Spritesheet;

        constructor(pixiapp:PIXI.Application)
        {
            super(pixiapp);
        }

        public init():void
        {
            console.log("Booted");
            GameEvent.changeState.dispatch("Preloader");
        }

        public static changeBalance(n:number):boolean
        {
            if(Boot.balance+n >= 0)
            {
                Boot.balance += n;
                return true;
            }
            return false;
        }

        public static addWin():void
        {
            Boot.winAmount++;
        }

    }

}