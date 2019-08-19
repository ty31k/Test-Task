module TProject {

    export class BaseState
    {
        protected app:PIXI.Application;

        constructor(pixiapp:PIXI.Application)
        {
            this.app = pixiapp;
        }

        public init():void
        {

            this.preload();
        }

        public preload():void
        {

        }

        public create():void
        {

        }

        public update():void
        {

        }

        public destroy():void
        {

        }

        public resize():void
        {

        }

    }

}