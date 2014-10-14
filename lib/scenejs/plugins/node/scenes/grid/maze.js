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
                    r: 0.1,
                    g: 0.1,
                    b: 0.2
                },
                specularColor: {
                    r: 1.0,
                    g: 1.0,
                    b: 1.0
                },
                emit: 0.5,
                specular: 0.3
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
                                    xSize: 70.0,
                                    ySize: 50.0,
                                    zSize: 70.0
                                }
                            ]
                        });
                    }
                }
            });
    }
});
