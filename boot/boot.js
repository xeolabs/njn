define(function () {
    return function (engine, params, ok, error) {

        engine.props.set("foo", 42);

        var task = engine.tasks.start({ description: "foo" });

        task.completed();

        var foob = engine.objects.create({
            id: "bar",
            objects: [
                {
                    id: "baz"
                }
            ]
        });

        foob.create({
            pos: [100, 0, 0],
            scale: [1, 1, 1],
            appearance: {
                color: [1, 0, 0]
            },
            geometry: "box"
        });

        foob.on("pos", function () {
        });

        foob.set("pos", [2, 4, 5]);

        foob.appearance.material.set("color", [2, 4, 5]);

        foob.libs.appearances.appearances["foob"].material.set("color", [2, 4, 5]);

        foob.on("destroyed", function () {
        });

        foob.on("visible", function (visible) {
            if (visible) {
            }
        });

        foob.on("enabled", function (enabled) {
            if (enabled) {
            }
        });

        var module = engine.modules.create({
            "id": "libs",
            "libs": {
                "appearances": [
                    {
                        "id": "brick",
                        "type": "appearance",
                        "material": {
                        },
                        "textures": [
                        ]
                    }
                ],
                "geometries": [
                    {
                        "id": "wall",
                        "positions": ["positions.bin", 0, 132],
                        "normals": ["normals.bin", 0, 132],
                        "indices": ["indices.bin", 0, 132],
                        "primitive": "triangles"
                    }
                ]
            }
        });

        var module = engine.modules.create({
            "id": "zorg",
            "libs": {
                "appearances": [
                    {
                        "id": "brick",
                        "type": "appearance",
                        "material": {
                        },
                        "textures": [
                        ]
                    }
                ],
                "geometries": [
                    {
                        "id": "wall",
                        "positions": ["positions.bin", 0, 132],
                        "normals": ["normals.bin", 0, 132],
                        "indices": ["indices.bin", 0, 132],
                        "primitive": "triangles"
                    }
                ]
            },
            "objects": [
                {
                    "id": "foo"
                },
                {
                    "id": "bar",
                    "appearance": "libs.brick",

                    "objects": [
                        {
                            "id": "baz",
                            "pos": [0, 23, 100],
                            "geometry": "libs.wall"
                        }
                    ]
                }
            ]
        });

        module.destroy();

        var zorg = engine.objects["zorg.foo"];

        zorg.on("picked", function (pick) {
            engine.modules.activate("blink", { objectId: foob.id });
        });

        engine.on("tick", function () {
        });

        engine.pick.on("picked", function (hit) {
        });

        ok();
    };
});
