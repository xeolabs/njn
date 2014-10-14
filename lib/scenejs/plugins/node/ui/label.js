/**

 Label pinned to 3D location

 @author xeolabs / http://xeolabs.com

 <p>Usage example:</p>

 <pre>
 someNode.addNode({
       type: "ui/ui/label"
   }, function(ui/label) {
        ui/label.create({
                id: "myAnnotation",
                title: "Hey look at this thing!",
                pos: { x: 100, y: 45, z: -234 }
            });
   });
 </pre>
 */
require([
        // Prefix routes to plugin support libs
            SceneJS.getConfigs("pluginPath") + "/lib/jquery-1.8.3.min.js"
    ],
    function () {

        require([
                // Prefix routes to plugin support libs
                "scenejsPluginDeps/ui/labels"
            ],
            function (layouts) {

                loadStyleSheet(SceneJS.getConfigs("pluginPath") + "/node/ui/style.css",
                    function () {

                        var Label = function (cfg) {

                            cfg = cfg || {};

                            var body = document.getElementsByTagName("body")[0];
                            this._div = document.createElement('div');
                            this._div.className = "ui_label_dot";

                            body.appendChild(this._div);

                            this._style = this._div.style;

                            //this.setText(cfg.text);
                        };

                        Label.prototype.setShown = function (shown) {
                            this._style.display = shown ? "" : "none";
                        };

                        Label.prototype.updatePos = function (viewPos, canvasPos) {
                            this._style.left = "" + (canvasPos.x - 15) + "px";
                            this._style.top = "" + (canvasPos.y - 15) + "px";
                        };

                        Label.prototype.setText = function (text) {
                            this.text = text;
                            this._div.innerHTML = "<span>" + text + "</span>";
                        };

                        SceneJS.Types.addType("ui/label", {

                            construct: function (params) {

                                // Get layout manager for this scene
                                this._layout = layouts.getLayout(this.getScene());

                                this._label = new Label(params);

                                this._flags = this.addNode({
                                    type: "flags",
                                    flags: {
                                        enabled: true,
                                        picking: false
                                    }});

                                var pos = params.pos || {x: 0, y: 0, z: 0 };

                                this._flags.addNode({
                                    type: "translate",
                                    x: pos.x,
                                    y: pos.y,
                                    z: pos.z,
                                    nodes: [
                                        { type: "scale",
                                            x: 0.01, y: 0.01, z: 0.01,
                                            nodes: [
                                                {
                                                    id: this.id + ".root",
                                                    nodes: [
                                                        {
                                                            type: "geometry/box"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                });

                                var self = this;

                                this.getScene().getNode(this.id + ".root",
                                    function (box) {
                                        box.on("rendered",
                                            function (event) {
                                                self._label.updatePos(event.getViewPos(), event.getCanvasPos());
                                            });
                                    });
                            },

                            setText: function (text) {
                                this._label.setText(text);
                            },

                            setShown: function (shown) {
                                this._label.setShown(shown);
                            },

                            destruct: function () {
                                if (this._bodyId) {
                                    this._layout.removeBody(this._bodyId);
                                }
                                layouts.putLayout(this._layout);
                            }
                        });
                    });

                function loadStyleSheet(path, fn, scope) {
                    var head = document.getElementsByTagName('head')[0], // reference to document.head for appending/ removing link nodes
                        link = document.createElement('link');           // create the link node
                    link.setAttribute('href', path);
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('type', 'text/css');
                    var sheet, cssRules;
                    // get the correct properties to check for depending on the browser
                    if ('sheet' in link) {
                        sheet = 'sheet';
                        cssRules = 'cssRules';
                    }
                    else {
                        sheet = 'styleSheet';
                        cssRules = 'rules';
                    }
                    var timeout_id = setInterval(function () {                     // start checking whether the style sheet has successfully loaded
                            try {
                                if (link[sheet] && link[sheet][cssRules].length) { // SUCCESS! our style sheet has loaded
                                    clearInterval(timeout_id);                      // clear the counters
                                    clearTimeout(timeout_id);
                                    fn.call(scope || window, true, link);           // fire the callback with success == true
                                }
                            } catch (e) {
                            } finally {
                            }
                        }, 10),                                                   // how often to check if the stylesheet is loaded
                        timeout_id = setTimeout(function () {       // start counting down till fail
                            clearInterval(timeout_id);             // clear the counters
                            clearTimeout(timeout_id);
                            head.removeChild(link);                // since the style sheet didn't load, remove the link node from the DOM
                            fn.call(scope || window, false, link); // fire the callback with success == false
                        }, 15000);                                 // how long to wait before failing

                    head.appendChild(link);  // insert the link node into the DOM and start loading the style sheet
                    return link; // return the link node;
                }

            });

    });
