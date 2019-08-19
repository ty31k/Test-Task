module TProject {

    import Sprite = PIXI.Sprite;

    export class Reel extends PIXI.Container
    {

        private _symbolsArray:Symbol[];

        public getSymbolKeyFromLine(line:number):string
        {
            return this._symbolsArray[line].frameName;
        }

        constructor()
        {
            super();
            Util.shuffleArray(Boot.symbolKeys);
            this.initSymbols();
        }

        private initSymbols():void
        {
            let symb:Symbol;
            this._symbolsArray = [];
            for(let i:number = 0; i<Boot.symbolKeys.length; i++)
            {
                // symb = new Sprite(0, -147*i, "gameAssets", Boot.symbolKeys[i]);
                symb = new Symbol(Boot.symbolKeys[i]);
                symb.position.set(0, -Boot.symbolHeightOffset*i);
                symb.anchor.set(0.5,0.5);
                this.addChild(symb);
                this._symbolsArray.push(symb);
            }
            for(let i:number = Boot.symbolKeys.length; i<Boot.symbolKeys.length+3; i++)
            {
                // symb = new Sprite(0, -147*i, "gameAssets", Boot.symbolKeys[i-Boot.symbolKeys.length]);
                symb = new Symbol(Boot.symbolKeys[i-Boot.symbolKeys.length]);
                symb.position.set(0, -Boot.symbolHeightOffset*i);
                symb.anchor.set(0.5,0.5);
                this.addChild(symb);
                this._symbolsArray.push(symb);
            }
        }

        public changeSymbolsToFixed(keyArray:string[]):void
        {
            for(let i:number = 0; i<keyArray.length; i++)
            {
                this._symbolsArray[i].frameName = keyArray[i];
            }
            for(let i:number = keyArray.length; i<keyArray.length+3; i++)
            {
                this._symbolsArray[i].frameName = keyArray[i-keyArray.length];
            }
        }

        public randomizeSymbols():void
        {
            Util.shuffleArray(Boot.symbolKeys);
            for(let i:number = 0; i<Boot.symbolKeys.length; i++)
            {
                this._symbolsArray[i].frameName = Boot.symbolKeys[i];
            }
            for(let i:number = Boot.symbolKeys.length; i<Boot.symbolKeys.length+3; i++)
            {
                this._symbolsArray[i].frameName = Boot.symbolKeys[i-Boot.symbolKeys.length];
            }
        }

    }

}