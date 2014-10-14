
Njn is another experimental 3D engine I built on SceneJS.

## Creating an engine

```javascript
var engine = Njn.createEngine({});
```

## Logging

```javascript
engine.log.info("All is well");
engine.log.warn("Something looks dodgy");
engine.log.error("All is lost!");
```
## Properties

Properties are any sort of configs you want the engine to manage for you. Manage them all in one place with
the ```properties``` component:

````javascript
//Subscribe to a property
engine.props.on("foo", function (value) {
    console.log("Property 'foo' updated: " + value);
});

// Set a property
engine.props.set("foo", 42);

// Get value of property we know already exists
var propValue = engine.props.props["foo"];
````

## Tasks

Tasks are any sort of process that happens in your engine. Track them all in one place with the ```tasks``` component:

```javascript
// Subscribe to tasks starting
engine.tasks.on("started", function (task) {
    console.log("Task started: '" + task.id + "'");
});

// Subscribe to tasks completing successfully
engine.tasks.on("completed", function (task) {
    console.log("Task completed: '" + task.id + "'");
});

// Subscribe to tasks failing
engine.tasks.on("failed", function (task) {
    console.log("Task failed: '" + task.id + "'");
});

// Start and complete a task
var task = engine.tasks.start({ description: "foo" });
task.complete();
```

## Libraries

Reuse appearances and geometries by managing them in libraries:

```javascript
// Create an appearance asset
engine.libs.appearances.create({
    "id": "red",
    material: {
        color: {r: 1, g: 0.3, b: 0.3},
        specularColor: { r: 1.0, g: 1.0, b: 1.0 }
    }
});

// Create a geometry asset
engine.libs.geometries.create({
    "id": "box",
    "primitive": "triangles",
    "positions": [
        1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1,
        1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1,
        1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1,
        -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1,
        -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1,
        1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1
    ],
    "normals": [
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1
    ],
    "uv": [
        1, 1, 0, 1, 0, 0, 1, 0,
        0, 1, 0, 0, 1, 0, 1, 1,
        1, 0, 1, 1, 0, 1, 0, 0,
        1, 1, 0, 1, 0, 0, 1, 0,
        0, 0, 1, 0, 1, 1, 0, 1,
        0, 0, 1, 0, 1, 1, 0, 1
    ],
    "indices": [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ]
});
```

## Objects

```javascript

// Create an object with a child
var myObject = engine.objects.create({
    "id": "myParentObject",
    "appearance": "red", // Use appearance added to library earlier
    "objects": [
        {
            "id": "myChildObject",
            axis: [1, 1, 0],
            angle: 0,
            scale: [2, 2, 2],
            pos: [0, 0, 0],
            "geometry": "box" // Use geometry added to library earlier
        },
        {
            "id": "myChildObject2",
            axis: [1, 1, 0],
            angle: 0,
            scale: [2, 2, 2],
            pos: [10, 0, 0],
            "appearance": "green", // Use appearance added to library earlier
            "geometry": "box" // Use geometry added to library earlier
        },
        {
            nodes: [
                {
                    type: "translate",
                    x: -15,
                    nodes: [
                        {
                            type: "models/vehicles/tank"
                        }
                    ]
                }
            ]
        }
    ]
});

// Create an object containing SceneJS nodes
var myObject = engine.objects.create({
    "id": "myOtherObject",
    pos: [0, 0, 20],
    nodes: [
        {
            type: "translate",
            x: 25,
            nodes: [
                {
                    type: "models/vehicles/tank"
                }
            ]
        }
    ]
});

// Subscribe to new objects
engine.objects.on("created", function (object) {
    console.log("Object created: '" + object.id + "'");
});

// Subscribe to deleted objects
engine.objects.on("destroyed", function (object) {
    console.log("Object destroyed: '" + object.id + "'");
});

// Subscribe to object's destruction
myObject.on("destroyed", function () {
    console.log("Object destroyed: '" + this.id + "'");
});

// Subscribe to object's translation
myObject.on("pos", function (pos) {
    console.log("Object translation updated: [" + pos[0] + ", " + pos[1] + ", " + pos[2] + "]");
});

// Subscribe to object's axis of rotation
myObject.on("axis", function (axis) {
    console.log("Object rotation axis updated: [" + axis[0] + ", " + axis[1] + ", " + axis[2] + "]");
});

// Subscribe to object's angle of rotation
myObject.on("angle", function (angle) {
    console.log("Object rotation angle updated: " + angle);
});

// Subscribe to object's scale
myObject.on("scale", function (scale) {
    console.log("Object scale updated: [" + scale[0] + ", " + scale[1] + ", " + scale[2] + "]");
});

// Subscribe to pick hits on the object
myObject.on("picked", function (hit) {
    alert("Object picked: " + JSON.stringify(hit));
});

// Destroy the object
// myObject.destroy();

// Rotate the object on each engine tick
var a = 0;
engine.on("tick", function () {
    //engine.objects.objects["myChildObject"].setAngle(a += 1.0);
});
```

//-----------------------------------------------------------------------
// Camera
//-----------------------------------------------------------------------

```javascript
// Subscribe to camera's eye position
engine.camera.on("eye", function (eye) {
    console.log("Camera eye updated: [" + eye[0] + ", " + eye[1] + ", " + eye[2] + "]");
});

// Subscribe to camera's point-of-interest
engine.camera.on("look", function (look) {
    console.log("Camera look updated: [" + look[0] + ", " + look[1] + ", " + look[2] + "]");
});

// Subscribe to camera's up vector
engine.camera.on("up", function (up) {
    console.log("Camera up updated: [" + up[0] + ", " + up[1] + ", " + up[2] + "]");
});

// Set camera eye
engine.camera.set("eye", [30, 50, 80]);

// Set camera up vector
engine.camera.set("up", [0, 1, 0]);

// Set camera point-of-interest
engine.camera.set("look", [0, 0, 0]);
```

//-----------------------------------------------------------------------
// Picking
//-----------------------------------------------------------------------

```javascript
// Pick whatever object is at the given canvas coords
// If picked, the object will publish the pick hit as shown above
engine.pick.pick(100, 234, true); // Do a 3D ray-pick
```

//-----------------------------------------------------------------------
// Content modules
//-----------------------------------------------------------------------

```javascript
// Create a module of content.
// This is essentially what we've done above, but as a module.
// You can have multiple modules - often you would have one module defining asset libraries,
// and other modules containing objects which reference those assets.
//var myModule = engine.modules.create({
//    "id": "myModule",
//    "libs": {
//        "appearance": [
//            {
//                "id": "red",
//                "type": "appearance",
//                "material": {
//                    "color": [1, 0, 0]
//                }
//            }
//        ],
//        "geometry": [
//            {
//                "id": "box",
//                "primitive": "triangles",
//                "positions": [
//                    1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1,
//                    1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1,
//                    1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1,
//                    -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1,
//                    -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1,
//                    1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1
//                ],
//                "normals": [
//                    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//                    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
//                    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
//                    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
//                    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
//                    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1
//                ],
//                "uv": [
//                    1, 1, 0, 1, 0, 0, 1, 0,
//                    0, 1, 0, 0, 1, 0, 1, 1,
//                    1, 0, 1, 1, 0, 1, 0, 0,
//                    1, 1, 0, 1, 0, 0, 1, 0,
//                    0, 0, 1, 0, 1, 1, 0, 1,
//                    0, 0, 1, 0, 1, 1, 0, 1
//                ],
//                "indices": [
//                    0, 1, 2, 0, 2, 3,
//                    4, 5, 6, 4, 6, 7,
//                    8, 9, 10, 8, 10, 11,
//                    12, 13, 14, 12, 14, 15,
//                    16, 17, 18, 16, 18, 19,
//                    20, 21, 22, 20, 22, 23
//                ]
//            }
//        ]
//    },
//
//    "objects": [
//        {
//            "id": "myParentObject",
//            "appearance": "red",
//            "objects": [
//                {
//                    "id": "myChildObject",
//                    axis: [1, 1, 0],
//                    angle: 0,
//                    scale: [2, 2, 2],
//                    pos: [10, 0, 0],
//                    "geometry": "box"
//                }
//            ]
//        }
//    ],
//
//    "camera": {
//        "eye": [0, 0, 1000 ],
//        "look": [0, 0, 0 ]
//    }
//});
//
//// Subscribe to content module creation
//engine.modules.on("created", function (module) {
//    console.log("Module created: '" + module.id + "'");
//});
//
//// Subscribe to content module destruction
//myModule.on("destroyed", function () {
//    console.log("Module destroyed: '" + this.id + "'");
//});
//
//// Destroy the module
//myModule.destroy();

```javascript
var yaw = 0;

engine.on("tick",
        function () {

            var left = engine.input.keyDown[engine.input.KEY_LEFT_ARROW];
            var right = engine.input.keyDown[engine.input.KEY_RIGHT_ARROW];

            if (left || right) {

                if (right) {
                    yaw += 0.3;
                } else if (left) {
                    yaw -= 0.3;
                }

                engine.objects.objects["myChildObject"].setAngle(yaw);
            }
        });
```
