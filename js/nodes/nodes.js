Njn.Nodes = function (engine, cfg) {

    cfg = cfg || {};

    this._init();

    this.engine = engine;

    /**
     * Scene graph root node.
     * @type {SceneJS.Scene}
     */
    this.scene = SceneJS.createScene({
        "id": cfg.sceneId,
        "canvasId": cfg.canvasId,
        nodes: [
            {
                "id": "__library",
                "type": "library"
            },
            {
                "id": "__camera",
                "type": "camera",
                "optics": {
                    "type": "perspective",
                    "fovy": 40,
                    "aspect": 1.47,
                    "near": 0.1,
                    "far": 10000
                },
                "nodes": [
                    {
                        "type": "lookAt",
                        "eye": {
                            "x": 0,
                            "y": 0,
                            "z": -1
                        },
                        "look": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "up": {
                            "x": 0,
                            "y": 1,
                            "z": 0
                        },
                        "nodes": [
                            {
                                "type": "lights",
                                "lights": [
                                    {
                                        "mode": "dir",
                                        "color": {
                                            "r": 1,
                                            "g": 1,
                                            "b": 1
                                        },
                                        "diffuse": true,
                                        "specular": true,
                                        "dir": {
                                            "x": 1,
                                            "y": -0.5,
                                            "z": -1
                                        },
                                        "scope": "world"
                                    },
                                    {
                                        "mode": "dir",
                                        "color": {
                                            "r": 1,
                                            "g": 1,
                                            "b": 1
                                        },
                                        "diffuse": true,
                                        "specular": true,
                                        "dir": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 1
                                        },
                                        "scope": "world"
                                    },
                                    {
                                        "mode": "dir",
                                        "color": {
                                            "r": 1,
                                            "g": 1,
                                            "b": 1
                                        },
                                        "diffuse": true,
                                        "specular": false,
                                        "dir": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 1
                                        },
                                        "scope": "world"
                                    }
                                ],
                                "nodes": [
                                    {
                                        "type": "material",
                                        "baseColor": {
                                            "r": 1,
                                            "g": 1,
                                            "b": 1
                                        },
                                        "emit": 2,
                                        "id": "__view"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "__lookat",
                        "type": "lookAt",
                        "eye": {
                            "x": 0,
                            "y": 0,
                            "z": -100
                        },
                        "look": {
                            "x": 0,
                            "y": 0,
                            "z": 0
                        },
                        "up": {
                            "x": 0,
                            "y": 1,
                            "z": 0
                        },
                        "nodes": [
                            {
                                "id": "__sky",
                                "type": "shader",
                                "shaders": [
                                    {
                                        "stage": "vertex",
                                        "code": [
                                            "mat4 myViewMatrix(mat4 m) {",
                                            "   m[3][0] =m[3][1] = m[3][2] = 0.0;",
                                            "return m;",
                                            "}"
                                        ],
                                        "hooks": {
                                            "viewMatrix": "myViewMatrix"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "__lights",
//                                "type": "lights",
                                "lights": cfg.lights || [
                                    {
                                        mode: "ambient",
                                        color: [0.6, 0.6, 0.6], // Core has arrays for WebGL loading
                                        diffuse: true,
                                        specular: false
                                    },
                                    {
                                        mode: "dir",
                                        color: [1.0, 1.0, 1.0 ],
                                        diffuse: true,
                                        specular: true,
                                        dir: [0.5, -1.0, -0.6 ]
                                    },
                                    {
                                        mode: "dir",
                                        color: [1.0, 1.0, 1.0 ],
                                        diffuse: true,
                                        specular: true,
                                        dir: [-1.0, 0.0, 0.0 ],
                                        space: "world"
                                    }
                                ],
                                "nodes": [
                                    {
                                        "id": "__world",
                                        "type": "material",
                                        "baseColor": {
                                            "r": 1,
                                            "g": 1,
                                            "b": 1
                                        },
                                        "emit": 2
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });

    /**
     * Library root node.
     * @type {SceneJS.Library}
     */
    this.library = this.scene.getNode("__library");

    /**
     * Camera node.
     * @type {SceneJS.Camera}
     */
    this.camera = this.scene.getNode("__camera");

    /**
     * LookAt node.
     * @type {SceneJS.LookAt}
     */
    this.lookat = this.scene.getNode("__lookat");

    /**
     * Lights node.
     * @type {SceneJS.Lights}
     */
    this.lights = this.scene.getNode("__lights");

    /**
     * Sky-space content root node.
     * @type {SceneJS.Node}
     */
    this.sky = this.scene.getNode("__sky");

    /**
     * World-space content root node.
     * @type {SceneJS.Node}
     */
    this.world = this.scene.getNode("__world");

    /**
     * View-space content root node.
     * @type {SceneJS.Node}
     */
    this.view = this.scene.getNode("__view");
};


Njn._extend(Njn.Nodes, Njn.Component);