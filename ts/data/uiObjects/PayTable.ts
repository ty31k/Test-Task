module TProject {

    export class PayTable extends PIXI.Sprite
    {
        public static ANYTHREEFRUIT:number = 0;
        public static FRUITANDWILD:number = 1;

        public static WINPRICES:number[] = [10,10];

        constructor(x:number, y:number)
        {
            super(Boot.assetSheet.textures["payTable"]);
            this.position.set(x,y);
            this.anchor.set(0.5, 0);
        }
    }

}