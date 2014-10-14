/**
 * An engine
 * @param id
 * @param cfg
 * @constructor
 */
Njn.Engine = function (id, cfg) {

    cfg = cfg || {};

    var self = this;

    this._init();

    /** Engine's unique ID
     *  @type {string}
     */
    this.id = id;

    /** True once destroyed
     * @type {boolean}
     */
    this.destroyed = false;

    /**
     * Logging for this engine
     * @type {Njn.Objects}
     */
    this.log = new Njn.Log(this);

    /**
     * Configs for this engine
     * @type {Njn.Props}
     */
    this.props = new Njn.Props(this, cfg);

    /**
     * Asynch task tracking for this engine
     * @type {Njn.Tasks}
     */
    this.tasks = new Njn.Tasks(this);

    /**
     * The SceneJS scene graph for this engine
     * @type {Njn.Nodes}
     */
    this.nodes = new Njn.Nodes(this, cfg);

    // Publish scene ticks
    this.nodes.scene.on("tick", function(params) {
        self.set("tick", params);
    });

    /**
     * Asset libraries for this engine
     * @type {Njn.Libs}
     */
    this.libs = new Njn.Libs(this, cfg.libs);

    /**
     * The 3D scene for this engine
     * @type {Njn.Objects}
     */
    this.objects = new Njn.Objects(this, cfg.objects);

    /**
     * The camera for this engine
     * @type {Njn.Camera}
     */
    this.camera = new Njn.Camera(this, cfg.camera);

    /**
     * Modules in this engine
     * @type {Njn.Modules}
     */
    this.modules = new Njn.Modules(this, cfg.modules);

    /**
     * Picking subsystem for this engine
     * @type {Njn.Pick}
     */
    this.pick = new Njn.Pick(this);

    /**
     * Input handling subsystem for this engine
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

