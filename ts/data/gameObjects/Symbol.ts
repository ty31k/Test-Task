module TProject
{

    export class Symbol extends PIXI.Sprite
    {
        private _frameName:string = "";

        public get frameName():string{return this._frameName;}
        public set frameName(s:string)
        {
            this._frameName = s;
            this.texture = Boot.assetSheet.textures[this._frameName];
        }

        constructor(frameName:string)
        {
            super(Boot.assetSheet.textures[frameName]);
            this._frameName = frameName;
            this.scale.set(0.93,0.93);
        }

    }

}