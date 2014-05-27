Njn.Objects = function (engine, cfg) {

    cfg = cfg || [];

    this._init();

    /**
     *
     * @type {Njn.Engine}
     */
    this.engine = engine;

    /**
     *
     * @type {{}}
     */
    this.objects = {};

    /**
     *
     * @type {{}}
     */
    this.roots = {};

    // Create objects
    for (var i = 0, len = cfg.length; i < len; i++) {
        this.create(cfg[i]);
    }
};

Njn._extend(Njn.Objects, Njn.Component);

Njn.Objects.prototype.create = function (params) {
    // Find SceneJS branch that we'll that create the object within
    var node;
    if (params.space) {
        var space = params.space;
        if (space == "world") {
            node = this.engine.scene.world;
        } else if (space == "view") {
            node = this.engine.scene.view;
        } else if (space == "sky") {
            node = this.engine.scene.sky;
        } else {
            Njn.log.error("Unsupported value for 'space': " + space);
            node = this.engine.scene.world;
        }
    } else {
        node = this.engine.scene.world;
    }

    //
    // Autogenerate params.id
    //

    // Create the object
    var object = this._create(this, null, node, params);
    this.roots[object.id] = object;
    return object;
};

Njn.Objects.prototype._create = function (objects, parent, node, params) {
    var self = this;
    var object = new Njn.Objects.Object(this, parent, node, params,
        function (objects, parent, node, params) {
            return self._create(objects, parent, node, params);
        });
    this.objects[object.id] = object;
    object.on("destroyed", function () {
        delete self.objects[object.id];
        delete self.roots[object.id];
        self.set("destroyed", object, true);
    });
    this.set("created", object, true);
    return object;
};
