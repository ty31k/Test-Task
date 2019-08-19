module TProject {

    export class ActionUIButton extends PIXI.Sprite
    {
        protected callBack:Function;

        private _keyOn:string;
        private _keyOff:string;

        constructor(x:number, y:number, key:string, callback:Function, keyOff?:string)
        {
            super(Boot.assetSheet.textures[key]);
            this._keyOn = key;
            this._keyOff = keyOff;
            this.position.set(x,y);
            this.anchor.set(0.5,0.5);
            this.callBack = callback;
            this.interactive = true;
            this.buttonMode = true;
            this.on("click",this.onClickHandler, this);
            this.on("tap",this.onClickHandler, this);
        }

        protected onClickHandler():void
        {
            if(this.callBack != null)
            {
                this.callBack();
            }
        }

        public turnItOff():void
        {
            this.interactive = false;
            if(this._keyOff)
            {
                this.texture = Boot.assetSheet.textures[this._keyOff];
            }
        }

        public turnItOn():void
        {
            this.interactive = true;
            console.log("kek");
            this.texture = Boot.assetSheet.textures[this._keyOn];
        }

        public destroy():void
        {
            this.off("click",this.onClickHandler, this);
            this.off("tap",this.onClickHandler, this);
            this.callBack = null;
            super.destroy();
        }

    }

}