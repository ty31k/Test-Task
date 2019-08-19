module TProject {

    import Spritesheet = PIXI.Spritesheet;
    import Text = PIXI.Text;

    export class Preloader extends BaseState
    {
        private _loadedAssets: boolean = false;
        private _loadedFont: boolean = false;

        private _loadingText:Text;

        constructor(pixiapp:PIXI.Application)
        {
            super(pixiapp);

        }

        public preload()
        {
            this._loadedFont = true;
            this._loadedAssets = true;
            // this.game.load.crossOrigin = "anonymous";

            this.loading();
            PIXI.Loader.shared.onLoad.add(this.onLoadProgress, this);

            this._loadingText = new Text("Loading...", {
               font:"36px "+Boot.fontName,
               fill:"#ffffff"
            });
            this._loadingText.anchor.set(0.5,0.5);
            this._loadingText.position.set(this.app.stage.width/2, this.app.stage.width/2);

            this.app.stage.addChild(this._loadingText);
            // this.load.onFileComplete.add(this.onLoadProgress, this);
            console.log("Start loading");

            this.resize();
        }

        private onLoadProgress(e, cacheKey?):void
        {
            console.log(e.progress);
            if(e.progress>=100)
            {
                this._loadedAssets = true;
            }
        }

        public loading():void
        {
            this.loadFonts([Boot.fontName]);
            this.loadAtlases(["gameAssets"]);

            PIXI.Loader.shared.load(this.setup);
        }

        private setup():void
        {
            Boot.assetSheet = PIXI.Loader.shared.resources["gameAssetsAtlas"].spritesheet;
        }

        public update()
        {
            if (this._loadedAssets && this._loadedFont) {
                this._loadedAssets = false;

                console.log("Loaded");

                this.destroy();

                setTimeout(()=>{
                    GameEvent.changeState.dispatch("Level");
                }, 400);
            }
        }

        public loadFonts(fonts: string[], stylename: string = "styles", cb?: Function): void
        {
            if (fonts == null || fonts.length == 0) {
                return;
            }

            this._loadedFont = false;
            System.loadFonts(fonts, stylename + ".css", ()=>{
                this._loadedFont = true;
                if (cb) {
                    cb();
                }
            });
        }

        public loadAtlases(names: string[], format: string = "png"): void {

            if (names == null || names.length == 0) {
                return;
            }

            let version:string = "?v=0";

            let arr: any;
            for (let i: number = 0; i < names.length; i++) {
                let name: string = names[i].split("/").pop();
                let namepath: string = Boot.PATH_IMAGES + names[i];

                // PIXI.Loader.shared.add(name, namepath + "." + format + version).add(name+"Atlas", namepath + ".json" + version);
                PIXI.Loader.shared.add(name+"Atlas", namepath + ".json");
                // this.game.load.atlas(name, namepath + "." + format + version, namepath + ".json" + version, null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            }

            this._loadedAssets = false;
        }

        public resize():void
        {
            this._loadingText.position.set(this.app.screen.width/2, this.app.screen.height/2);
        }

        public destroy():void
        {
            this.app.stage.removeChild(this._loadingText);
            this._loadingText = null;
        }

    }

}