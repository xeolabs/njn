/**
 * Labels layout manager pool
 *
 * @author xeolabs / http://xeolabs.com
 *
 */
define(
    function () {

        // Layout managers
        var items = {};

        return  {

            /**
             * Acquire a Layout manager for the given SceneJS scene, creating first if not existing
             * @param {SceneJS.Scene} scene
             */
            getLayout:function (scene) {
                var layoutId = scene.getId();
                var item = items[layoutId];
                if (item) {
                    item.useCount++;
                    return item.layout;
                }
                var layout = new Layout(layoutId);
                items[layoutId] = {
                    useCount:1,
                    layout:layout,
                    scene:scene,
                    tick:scene.on("tick", // Start integrating the layout on scene tick
                        function () {
                            layout.integrate();
                        })
                };
                return layout;
            },

            /**
             * Release a Layout manager, destroying it if no more users
             * @param {Layout} layout
             */
            putLayout:function (layout) {
                var item = items[layout.layoutId];
                if (item) {
                    if (item.useCount-- <= 0) {
                        item.layout.destroy();
                        item.scene.off(item.tick); // Stop integrating the layout
                        delete items[layout.layoutId];
                    }
                }
            }
        };

        /**
         * A Layout manager
         */
        function Layout(layoutId) {

            this.layoutId = layoutId;

            // Maximum number of bodies supported
            var maxBodies = 10000;

            var bodies = [];
            var map = new Map(bodies);

            // Layout is integrating only when this true
            var enabled = true;

            /**
             * Configures this Layout manager
             * @param params Values for configs
             */
            this.setConfigs = function (params) {
            };

            /**
             * Enable or disable this Layout manager.
             * To save on CPU, you would typically disable the layout when its not in view.
             * @param enable
             */
            this.setEnabled = function (enable) {
                enabled = enable;
            };

            /**
             * Creates a layout body, returns it's unique ID
             * @param params Body params
             * @param callback Callback fired whenever body updated
             * @return Body ID
             */
            this.createBody = function (params, callback) {
                var bodyId = map.add({
                    callback:callback
                });
                worker.postMessage({ cmd:"createBody", bodyId:bodyId, bodyCfg:params });
                return bodyId;
            };

            /**
             * Updates an existing layout body
             * @param bodyId Body ID
             * @param params Body params
             */
            this.updateBody = function (bodyId, params) {
            };

            /**
             * Removes a layout body from this layout manager
             */
            this.removeBody = function (bodyId) {
                map.remove(bodyId);
            };

            /**
             * Integrates this layout manager
             * Does nothing when layout is disabled with {@link Layout#setEnabled}
             */
            this.integrate = function () {
            };

            /**
             * Destroys this layout
             */
            this.destroy = function () {
            };
        }

        /**
         * Uniquely ID'd map of items
         * @param items Array that will contain the items
         */
        function Map(items) {
            this.add = function (item) {

                // Start looking from the beginning of the array
                // because we don't want an infinitely-expanding
                // sparse array as we remove then add nodes.

                // We're trading insertion overhead for the benefit
                // of a nicely packed array that's fast to traverse
                // when posting updates back to the layout body nodes.

                var i = 0;
                while (true) {
                    if (!items[i]) {
                        items[i] = item;
                        return i;
                    }
                    i++;
                }
            };
            this.remove = function (id) {
                delete items[id];
            };
        }
    });
