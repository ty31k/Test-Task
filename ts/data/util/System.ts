module TProject {
    
    export class System {

        public static loadFonts(fonts: string[], fileName: string, cb?: Function): void {

            WebFont.load({
                custom: {
                            families: fonts,
                            urls: [
                                Boot.PATH_FONTS + fileName
                            ]},
                active: ()=>{
                                window.setTimeout(()=>{
                                    if (cb != null) {
                                        cb();
                                    }
                                }, 100);
                            }
                });
        }

    }

}