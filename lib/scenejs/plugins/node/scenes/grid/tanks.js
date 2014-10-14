/**
 * The Grid, SceneJS style
 *
 * @author xeolabs / http://xeolabs.com
 *
 * <p>Usage</p>
 * <pre>
 * someNode.addNode({
 *      type: "scenes/grid/tanks"
 * });
 * </pre>
 */
SceneJS.Types.addType("scenes/grid/tanks", {

    construct: function (params) {

        for (var x = -1000.0; x <= 1000.0; x += 200.0) {
            for (var z = -1000.0; z <= 1000.0; z += 200.0) {
                this.addNode({
                    type: "models/vehicles/tank",
                    pos: { x: x, y: 0, z: z }
                });
            }
        }

    }
});
