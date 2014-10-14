Njn.Objects.Object = function (engine, parent, node, cfg, create) {

    this._init();

    this.engine = engine;

    this.parent = parent;

    this.id = cfg.id;

    this._create = create;

    var libs = engine.libs;
    var log = engine.log;

    // Create nodes

    // Pick namespace
    this._name = node = node.addNode({ type: "name", name: this.id });

    // Transforms, initialised later
    this._pos = node = node.addNode({ type: "translate" });
    this._rotate = node = node.addNode({ type: "rotate" });
    this._scale = node = node.addNode({ type: "scale" });

    // Appearance
    if (cfg.appearance) {
        var appearance;
        if (typeof cfg.appearance == "string") {
            appearance = libs.appearances.appearances[cfg.appearance];
            if (!appearance) {
                log.error("Appearance not found: '" + cfg, appearance + "'");
            }
        } else {
            appearance = engine.libs.appearances.create(cfg.appearance);
        }
        if (appearance) {
            if (appearance.material) {
                node = node.addNode({ type: "material", coreId: appearance.material.node.getCoreId() });
            }
            if (appearance.texture) {
                node = node.addNode({ type: "texture", coreId: appearance.texture.node.getCoreId() });
            }
            this.appearance = appearance;
        }
    }

    // Geometry
    if (cfg.geometry) {
        if (typeof cfg.geometry == "string") {
            var geometry = libs.geometries.geometries[cfg.geometry];
            if (!geometry) {
                log.error("Geometry not found: '" + cfg, geometry + "'");
            } else {
                node = node.addNode({ type: "geometry", coreId: geometry.node.getCoreId() });
            }
        }
    }

    this._leafNode = node;

    if (cfg.nodes) {
        this._leafNode.addNodes(cfg.nodes);
    }

    // Bind topics to nodes

    var self = this;

    this.on("pos", function (pos) {
        self._pos.setXYZ({x: pos[0], y: pos[1], z: pos[2] });
        self.pos = pos;
        this._boundaryDirty = true;
    });

    this.on("axis", function (axis) {
        self._rotate.setXYZ({x: axis[0], y: axis[1], z: axis[2] });
        self.axis = axis;
        this._boundaryDirty = true;
    });

    this.on("angle", function (angle) {
        self._rotate.setAngle(angle);
        self.angle = angle;
        this._boundaryDirty = true;
    });

    this.on("scale", function (scale) {
        self._scale.setXYZ({x: scale[0], y: scale[1], z: scale[2] });
        self.scale = scale;
        this._boundaryDirty = true;
    });

    // Initialise

    this.setPos(cfg.pos);
    this.setAxis(cfg.axis);
    this.setAngle(cfg.angle);
    this.setScale(cfg.scale);

    /**
     * Child objects, mapped to their IDs.
     * @type {{string: Njn.Objects.Object}}
     */
    this.objects = {};

    // Create child objects
    if (cfg.objects) {
        var object;
        for (var i = 0, len = cfg.objects.length; i < len; i++) {
            object = this._create(engine, this, this._leafNode, cfg.objects[i]);
            this.objects[object.id] = object;
            object.on("destroyed", function () {
                delete self.objects[object.id];
            });
        }
    }
};

Njn._extend(Njn.Objects.Object, Njn.Component);


/**
 *
 * @param pos
 */
Njn.Objects.Object.prototype.setPos = function (pos) {
    this.set("pos", pos || [0, 0, 0]);
};

/**
 *
 * @param axis
 */
Njn.Objects.Object.prototype.setAxis = function (axis) {
    this.set("axis", axis || [0, 1, 0]);
};

/**
 *
 * @param angle
 */
Njn.Objects.Object.prototype.setAngle = function (angle) {
    this.set("angle", angle || 0);
};

/**
 *
 * @param scale
 */
Njn.Objects.Object.prototype.setScale = function (scale) {
    this.set("scale", scale || [1, 1, 1]);
};

/**
 *
 * @param cfg
 */
Njn.Objects.Object.prototype.pick = function (pickInfo) {
    if (this.parent) {
        this.parent.set("picked", pickInfo, true);
    }
    this.set("picked", pickInfo, true);
};

/**
 *
 * @param cfg
 */
Njn.Objects.Object.prototype.getBoundary = function () {
    for (var parent = this; parent; parent = parent.parent) {
        if (parent._boundaryDirty) {
            // Recompute this object's World-space boundary
            // get extents and transform by matrices on path to root

            this._boundaryDirty = false;
            break;
        }
    }
    return this._boundary;
};

Njn.Objects.Object.prototype._rebuildBoundary = function () {

    if (!this._boundaryDirty) {
        return;
    }
    // Max inside-out boundary, ready to expand to fit geometry or sub-objects
    this._boundary = {
        xmin: Njn.math.MAX_DOUBLE,
        ymin: Njn.math.MAX_DOUBLE,
        zmin: Njn.math.MAX_DOUBLE,
        xmax: Njn.math.MIN_DOUBLE,
        ymax: Njn.math.MIN_DOUBLE,
        zmax: Njn.math.MIN_DOUBLE
    };

    // Rebuild asset xforms
    if (this._boundaryXFormDirty) {
        if (this._boundedAssets) {
            var matrix = this._transformNode.getWorldMatrix();
            var boundary;
            for (var i = 0, len = this._boundedAssets.length; i < len; i++) {
                boundary = this._boundedAssets[i].boundary;
                if (boundary) {
                    //boundary.setMatrix(matrix);
                }
            }
        }
        this._boundaryXFormDirty = false;
    }

    // Expand boundary to enclose assets
    if (this._boundedAssets) {
        var asset;
        for (var i = 0, len = this._boundedAssets.length; i < len; i++) {
            asset = this._boundedAssets[i];
            if (asset.boundary) {
                this._expandBoundary(this._boundary, asset.boundary);
            }
        }
    }

    // Expand boundary to enclose sub-objects
    var object;
    for (var i = 0, len = this.objects.length; i < len; i++) {
        object = this.objects[i];
        if (object._boundaryDirty) {
            object._rebuildBoundary();
        }
        this._expandBoundary(this._boundary, object._boundary);
    }

    // Find center of boundary
    this._center = [
        (this._boundary.xmax + this._boundary.xmin) * 0.5,
        (this._boundary.ymax + this._boundary.ymin) * 0.5,
        (this._boundary.zmax + this._boundary.zmin) * 0.5
    ];

    this._boundaryDirty = false;
};

Njn.Objects.Object.prototype._expandBoundary = function (a, b) {
    if (a.xmin > b.xmin) a.xmin = b.xmin;
    if (a.ymin > b.ymin) a.ymin = b.ymin;
    if (a.zmin > b.zmin) a.zmin = b.zmin;
    if (a.xmax < b.xmax) a.xmax = b.xmax;
    if (a.ymax < b.ymax) a.ymax = b.ymax;
    if (a.zmax < b.zmax) a.zmax = b.zmax;
};


/**
 *
 * @param cfg
 */
Njn.Objects.Object.prototype.create = function (cfg) {
    var object = this._create(this.engine, this._leafNode, cfg.objects[i]);
    this.objects.push(object);
    return object;
};

/**
 *
 * @param cfg
 */
Njn.Objects.Object.prototype.destroy = function () {
    for (var i = 0, len = this.objects.length; i < len; i++) {
        this.objects[i].destroy();
    }
    this.set("destroyed", this.destroyed = true);
};

