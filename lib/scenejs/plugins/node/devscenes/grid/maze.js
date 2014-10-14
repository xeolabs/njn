/**
 * The Grid, SceneJS style
 *
 * @author xeolabs / http://xeolabs.com
 *
 * <p>Usage</p>
 * <pre>
 * someNode.addNode({
 *      type: "scenes/grid/maze"
 * });
 * </pre>
 */
SceneJS.Types.addType("scenes/grid/maze", {

    construct: function (params) {

        // Dark blue material
        this.addNode({
                type: "material",
                color: {
                    r: 0.2,
                    g: 0.2,
                    b: 0.4
                },
                specular: 1.0
            },
            function (material) {

                // Boxes
                for (var x = -1000.0; x <= 1000.0; x += 200.0) {
                    for (var z = -1000.0; z <= 1000.0; z += 200.0) {
                        material.addNode({
                            type: "translate",
                            x: x,
                            y: 0,
                            z: z,
                            nodes: [
                                {
                                    type: "geometry/box",
                                    xSize: 50.0,
                                    ySize: 20.0,
                                    zSize: 50.0
                                }
                            ]
                        });
                    }
                }
            });
    }
});
