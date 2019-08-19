module TProject {

    import Sprite = PIXI.Sprite;
    import Container = PIXI.Container;
    import Graphics = PIXI.Graphics;

    export class Reels extends Container
    {

        private _leftReel:Reel;
        private _midReel:Reel;
        private _rightReel:Reel;

        private _isSpinning:boolean = false;
        private _stopPosition:number[];

        private _leftReelTweenA:TWEEN.Tween;
        private _leftReelTweenB:TWEEN.Tween;
        private _leftReelTweenC:TWEEN.Tween;
        private _midReelTweenA:TWEEN.Tween;
        private _midReelTweenB:TWEEN.Tween;
        private _midReelTweenC:TWEEN.Tween;
        private _rightReelTweenA:TWEEN.Tween;
        private _rightReelTweenB:TWEEN.Tween;
        private _rightReelTweenC:TWEEN.Tween;

        private _reelsTweenGroup:TWEEN.Group;

        private _winnedLines:number = 0;

        public static TOPLINE:number = 0;
        public static MIDLINE:number = 1;
        public static BOTLINE:number = 2;

        constructor(x:number, y:number)
        {
            super();
            this.x = x;
            this.y = y;
            this._leftReel = new Reel();
            this._midReel = new Reel();
            this._rightReel = new Reel();
            this._leftReel.position.set(-Boot.reelWidthOffset, Boot.symbolHeightOffset);
            this._midReel.position.set(0, Boot.symbolHeightOffset);
            this._rightReel.position.set(Boot.reelWidthOffset, Boot.symbolHeightOffset);

            this.addChild(this._leftReel);
            this.addChild(this._midReel);
            this.addChild(this._rightReel);

            this._reelsTweenGroup = new TWEEN.Group();

            let reelMask:Graphics = new Graphics();
            reelMask.position.set(0,0);
            reelMask.beginFill(0xffffff);
            reelMask.drawRect(-360,-250,720, 500);

            this.addChild(reelMask);

            this._leftReel.mask = reelMask;
            this._midReel.mask = reelMask;
            this._rightReel.mask = reelMask;

            GameEvent.saveReelData.add(this.changeReelSymbols, this);

        }

        public spinUp():void
        {
            if(this._isSpinning)
            {
                return;
            }
            if(!Boot.changeBalance(-Boot.spinCost))
            {
                return;
            }
            GameEvent.spinStart.dispatch();
            this._isSpinning = true;


            /*if(this._leftReelTweenA != null)
            {
                this._reelsTweenGroup.removeAll();
            }
*/
            this._stopPosition = [Util.getRandomIntInclusive(2,6),Util.getRandomIntInclusive(2,6),Util.getRandomIntInclusive(2,6)];

            this._leftReelTweenA = new TWEEN.Tween(this._leftReel)
                .to({y:Boot.symbolHeightOffset*6}, Math.max((1-(this._leftReel.y-Boot.symbolHeightOffset)/Boot.symbolHeightOffset*5)*300, 1))
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(()=>{
                this._leftReel.y = Boot.symbolHeightOffset;
            this._leftReel.randomizeSymbols();});
            this._leftReelTweenB = new TWEEN.Tween(this._leftReel)
                .to({y:Boot.symbolHeightOffset*6}, 300)
                .repeat(6)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(()=>{this._leftReel.y = (this._stopPosition[0]-2)*Boot.symbolHeightOffset});
            this._leftReelTweenC = new TWEEN.Tween(this._leftReel)
                .to({y:this._stopPosition[0]*Boot.symbolHeightOffset}, 500)
                .easing(TWEEN.Easing.Elastic.Out);

            this._midReelTweenA = new TWEEN.Tween(this._midReel)
                .to({y:Boot.symbolHeightOffset*6}, Math.max((1-(this._leftReel.y-Boot.symbolHeightOffset)/Boot.symbolHeightOffset*5)*300, 1))
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(()=>{this._midReel.y = Boot.symbolHeightOffset;
            this._midReel.randomizeSymbols();});
            this._midReelTweenB = new TWEEN.Tween(this._midReel)
                .to({y:Boot.symbolHeightOffset*6}, 300)
                .repeat(7)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(()=>{this._midReel.y = (this._stopPosition[1]-2)*Boot.symbolHeightOffset});
            this._midReelTweenC = new TWEEN.Tween(this._midReel)
                .to({y:this._stopPosition[1]*Boot.symbolHeightOffset}, 500)
                .easing(TWEEN.Easing.Elastic.Out);

            this._rightReelTweenA = new TWEEN.Tween(this._rightReel)
                .to({y:Boot.symbolHeightOffset*6}, Math.max((1-(this._leftReel.y-Boot.symbolHeightOffset)/Boot.symbolHeightOffset*5)*300, 1))
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(()=>{this._rightReel.y = Boot.symbolHeightOffset;
            this._rightReel.randomizeSymbols();});
            this._rightReelTweenB = new TWEEN.Tween(this._rightReel)
                .to({y:Boot.symbolHeightOffset*6}, 300)
                .repeat(8)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(()=>{this._rightReel.y = (this._stopPosition[2]-2)*Boot.symbolHeightOffset});
            this._rightReelTweenC = new TWEEN.Tween(this._rightReel)
                .to({y:this._stopPosition[2]*Boot.symbolHeightOffset}, 500)
                .easing(TWEEN.Easing.Elastic.Out)
                .onComplete(()=>{
                    this.countWinLines();
                    setTimeout(()=>{this._isSpinning = false}, 1);
                });

            this._leftReelTweenB.chain(this._leftReelTweenC);
            this._leftReelTweenA.chain(this._leftReelTweenB);

            this._midReelTweenB.chain(this._midReelTweenC);
            this._midReelTweenA.chain(this._midReelTweenB);

            this._rightReelTweenB.chain(this._rightReelTweenC);
            this._rightReelTweenA.chain(this._rightReelTweenB);

            this._leftReelTweenA.start();
            this._midReelTweenA.start();
            this._rightReelTweenA.start();

            /*this.game.tweens.removeFrom(this._leftReel);
            this.game.tweens.removeFrom(this._midReel);
            this.game.tweens.removeFrom(this._rightReel);


            this.game.add.tween(this._leftReel).to({y:Boot.symbolHeightOffset*6}, Math.max((1-(this._leftReel.y-Boot.symbolHeightOffset)/Boot.symbolHeightOffset*5)*300, 1), Phaser.Easing.Linear.None, true, 0).onComplete.addOnce(()=>{
                this._leftReel.y = Boot.symbolHeightOffset;
                this.game.add.tween(this._leftReel).to({y:Boot.symbolHeightOffset*6}, 300, Phaser.Easing.Linear.None, true, 0, 6).onComplete.addOnce(()=>{
                    this.game.add.tween(this._leftReel).to({y:this._stopPosition[0]*Boot.symbolHeightOffset}, 500, Phaser.Easing.Elastic.Out, true);
                },this);
            },this);
            this.game.add.tween(this._midReel).to({y:Boot.symbolHeightOffset*6}, Math.max((1-(this._midReel.y-Boot.symbolHeightOffset)/Boot.symbolHeightOffset*5)*300, 1), Phaser.Easing.Linear.None, true, 0).onComplete.addOnce(()=>{
                this._midReel.y = Boot.symbolHeightOffset;
                this.game.add.tween(this._midReel).to({y:Boot.symbolHeightOffset*6}, 300, Phaser.Easing.Linear.None, true, 0, 7).onComplete.addOnce(()=>{
                    this.game.add.tween(this._midReel).to({y:this._stopPosition[1]*Boot.symbolHeightOffset}, 500, Phaser.Easing.Elastic.Out, true);
                },this);
            },this);
            this.game.add.tween(this._rightReel).to({y:Boot.symbolHeightOffset*6}, Math.max((1-(this._rightReel.y-Boot.symbolHeightOffset)/Boot.symbolHeightOffset*5)*300, 1), Phaser.Easing.Linear.None, true, 0).onComplete.addOnce(()=>{
                this._rightReel.y = Boot.symbolHeightOffset;
                this.game.add.tween(this._rightReel).to({y:Boot.symbolHeightOffset*6}, 300, Phaser.Easing.Linear.None, true, 0, 8).onComplete.addOnce(()=>{
                    this.game.add.tween(this._rightReel).to({y:this._stopPosition[2]*Boot.symbolHeightOffset}, 500, Phaser.Easing.Elastic.Out, true);
                    this.countWinLines();
                    this.game.time.events.add(1000, ()=>{
                        this._isSpinning = false;
                    }, this);
                },this);
            },this);*/
        }

        private countWinLines():void
        {
            this._winnedLines = 0;

            // let topLineArray:string[] = [this._leftReel.getSymbolKeyFromLine(this._stopPosition[0]+1), this._midReel.getSymbolKeyFromLine(this._stopPosition[1]+1), this._rightReel.getSymbolKeyFromLine(this._stopPosition[2]+1)];
            let midLineArray:string[] = [this._leftReel.getSymbolKeyFromLine(this._stopPosition[0]), this._midReel.getSymbolKeyFromLine(this._stopPosition[1]), this._rightReel.getSymbolKeyFromLine(this._stopPosition[2])];
            // let botLineArray:string[] = [this._leftReel.getSymbolKeyFromLine(this._stopPosition[0]-1), this._midReel.getSymbolKeyFromLine(this._stopPosition[1]-1), this._rightReel.getSymbolKeyFromLine(this._stopPosition[2]-1)];

            // let topLineCombo:number = Reels.checkLine(topLineArray, Reels.TOPLINE);
            let midLineCombo:number = Reels.checkLine(midLineArray, Reels.MIDLINE);
            // let botLineCombo:number = Reels.checkLine(botLineArray, Reels.BOTLINE);

            console.log(this._stopPosition);

            if(midLineCombo >= 0) this._winnedLines++;

            if(this._winnedLines > 0)
            {
                let tempArray:number[] = [];

                if(midLineCombo != -1)
                {
                    tempArray.push(midLineCombo);
                    Boot.changeBalance(PayTable.WINPRICES[midLineCombo]);
                    Boot.addWin();
                }
                GameEvent.showWinHints.dispatch(tempArray);
                tempArray = null;
            }

            GameEvent.spinStop.dispatch();

        }

        private static checkLine(lineArray:string[], type:number):number
        {
            if(lineArray[0] == lineArray[1] && lineArray[0] == lineArray[2])
            {
                if(lineArray[0] !== "SYM1")
                {
                    return PayTable.ANYTHREEFRUIT;
                }
            }
            else if(lineArray.indexOf("SYM1") != -1)
            {
                return PayTable.FRUITANDWILD;
            }
            return -1;
        }

        private changeReelSymbols():void
        {
            let index:number;
            let tempArray:string[] = Boot.symbolKeys.slice();
            Util.shuffleArray(tempArray);
            let finalArray:string[] = [];
            let currentReel:Reel;
            console.log(arguments[0]);
            switch (arguments[0][0])
            {
                case 1:
                    currentReel = this._leftReel;
                    break;
                case 2:
                    currentReel = this._midReel;
                    break;
                case 3:
                    currentReel = this._rightReel;
                    break;
            }

            if(arguments[1] != "question")
            {
                finalArray.push(arguments[1]);
                index = tempArray.indexOf(arguments[1]);
                if (index >= 0) {
                    tempArray.splice( index, 1 );
                }
            }
            else
            {
                finalArray.push(tempArray[0]);
                tempArray.splice( 0, 1 );
            }
            if(arguments[2] != "question")
            {
                finalArray.push(arguments[2]);
                index = tempArray.indexOf(arguments[2]);
                if (index >= 0) {
                    tempArray.splice( index, 1 );
                }
            }
            else
            {
                finalArray.push(tempArray[0]);
                tempArray.splice( 0, 1 );
            }
            if(arguments[3] != "question")
            {
                finalArray.push(arguments[3]);
                index = tempArray.indexOf(arguments[3]);
                if (index >= 0) {
                    tempArray.splice( index, 1 );
                }
            }
            else
            {
                finalArray.push(tempArray[0]);
                tempArray.splice( 0, 1 );
            }

            finalArray = finalArray.concat(tempArray);

            currentReel.changeSymbolsToFixed(finalArray);
        }

    }

}