var TProject;
(function (TProject) {
    var System = (function () {
        function System() {
        }
        System.loadFonts = function (fonts, fileName, cb) {
            WebFont.load({
                custom: {
                    families: fonts,
                    urls: [
                        TProject.Boot.PATH_FONTS + fileName
                    ]
                },
                active: function () {
                    window.setTimeout(function () {
                        if (cb != null) {
                            cb();
                        }
                    }, 100);
                }
            });
        };
        return System;
    }());
    TProject.System = System;
})(TProject || (TProject = {}));
