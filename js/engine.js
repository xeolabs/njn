Njn.Engine = function (id, cfg) {

    cfg = cfg || {};

    var self = this;

    this._init();

    this.id = id;
    this.destroyed = false;

    /**
     * Logging.
     * @type {Njn.Objects}
     */
    this.log = new Njn.Log(this);

    /**
     * Configuration.
     * @type {Njn.Props}
     */
    this.props = new Njn.Props(this, cfg);

    /**
     * Asynch task tracking.
     * @type {Njn.Tasks}
     */
    this.tasks = new Njn.Tasks(this);

    /**
     * The core SceneJS scene graph.
     * @type {Njn.Nodes}
     */
    this.nodes = new Njn.Nodes(this, cfg);

    // Publish scene ticks
    this.nodes.scene.on("tick", function(params) {
        self.set("tick", params);
    });

    /**
     * Asset libraries.
     * @type {Njn.Libs}
     */
    this.libs = new Njn.Libs(this, cfg.libs);

    /**
     * The 3D scene.
     * @type {Njn.Objects}
     */
    this.objects = new Njn.Objects(this, cfg.objects);

    /**
     * The camera.
     * @type {Njn.Camera}
     */
    this.camera = new Njn.Camera(this, cfg.camera);

    /**
     * Modules
     * @type {Njn.Modules}
     */
    this.modules = new Njn.Modules(this, cfg.modules);

    /**
     * Picking subsystem.
     * @type {Njn.Pick}
     */
    this.pick = new Njn.Pick(this);

    /**
     * Input handling subsystem.
     * @type {Njn.Input}
     */
    this.input = new Njn.Input(this);
};

Njn._extend(Njn.Engine, Njn.Component);


/**
 * Destroys this engine.
 * <p>Sets the "destroyed" property true.
 */
Njn.Engine.prototype.destroy = function () {
    this.set("destroyed", this.destroyed = true);
};

