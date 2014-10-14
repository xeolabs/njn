/**
 * The Grid, SceneJS style
 *
 * @author xeolabs / http://xeolabs.com
 *
 * <p>Usage</p>
 * <pre>
 * someNode.addNode({
 *      type: "scenes/grid"
 * });
 * </pre>
 */
SceneJS.Types.addType("scenes/grid", {

    construct: function (params) {

        this.addNode({
            type: "scenes/grid/maze"
        });

//        this.addNode({
//            type: "scenes/grid/tanks"
//        });

        this._tick = this.getScene().on("tick",
            function () {
                //  update();
            });
    },

    destruct: function () {
        this.getScene().off(this.tick);
        // TODO: remove mouse handlers
    }
});
