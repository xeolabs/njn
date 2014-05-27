/**
 * SceneJS text texture factory
 *
 */
SceneJS.Plugins.addPlugin(

    "texture",
    "label",

    new (function () {

        this.getSource = function (params) {

            var gl = params.gl;

            /* Text attributes
             */
            var attribs = {

                title:"",
                titleFont:"56px monospace",
                titleFillStyle:"#DE7B00", // The title colour, it can take a hex value or rgba value (e.g. rgba(255,0,0,0.5))

                description:"",
                descriptionFont:"56px monospace",
                descriptionFillStyle:"#FFFFFF", // The title colour, it can take a hex value or rgba value (e.g. rgba(255,0,0,0.5))

                bgFillStyle:"#3D3D3D",  // Background colour

                width:512,
                height:512
            };

            var texture = gl.createTexture();
            var publish;

            return {

                subscribe:function (fn) {
                    publish = fn;
                },

                configure:function (cfg) {
                    if (cfg.title != undefined) {
                        attribs.title = cfg.title;
                    }
                    if (cfg.description != undefined) {
                        attribs.description = cfg.description;
                    }
                    if (cfg.width != undefined) {
                        attribs.width = cfg.width;
                    }
                    if (cfg.height != undefined) {
                        attribs.height = cfg.height;
                    }
                    var canvas = drawLabel(attribs);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
                    if (publish) {
                        publish(texture);
                    }
                }
            };
        };

        /*----------------------------------------------------------------------------
         * Factory methods follow
         *---------------------------------------------------------------------------*/

        /**
         * Returns a canvas containing text
         *
         * @param attribs
         * @return {HTMLElement}
         */
        function drawLabel(attribs) {

            var canvas = document.createElement("canvas");

            canvas.width = attribs.width;
            canvas.height = attribs.height;

            var ctx = canvas.getContext("2d");

            /* Background
             */
            ctx.fillStyle = attribs.bgFillStyle;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            /* Title
             */
            ctx.fillStyle = attribs.titleFillStyle;
            ctx.textAlign = "left";
            ctx.textBaseline = attribs.textBaseline;
            ctx.font = attribs.titleFont;
            ctx.fillText(attribs.title, 3, 3);

            /* Description
             */
            ctx.fillStyle = attribs.descriptionFillStyle;
            ctx.textAlign = "left";
            ctx.textBaseline = attribs.textBaseline;
            ctx.font = attribs.descriptionFont;
            ctx.fillText(attribs.description, 3, 30);

            return canvas;
        }

        function ensureImageSizePowerOfTwo(image) {

            if (!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {

                var canvas = document.createElement("canvas");

                canvas.width = nextHighestPowerOfTwo(image.width);
                canvas.height = nextHighestPowerOfTwo(image.height);

                var ctx = canvas.getContext("2d");

                ctx.drawImage(image,
                    0, 0, image.width, image.height,
                    0, 0, canvas.width, canvas.height);

                image = canvas;
            }

            return image;
        }

        function isPowerOfTwo(x) {
            return (x & (x - 1)) == 0;
        }

        function nextHighestPowerOfTwo(x) {
            --x;
            for (var i = 1; i < 32; i <<= 1) {
                x = x | x >> i;
            }
            return x + 1;
        }

    })());

