Njn.Modules.Module = function (modules, cfg) {

    this._init();

    /**
     * Modules subsystem that contains this module
     * @type {Njn.Modules}
     */
    this.modules = modules;

    /** Unique ID of this module
     *
     * @type {string}
     */
    this.id = cfg.id;

    /**
     * Appearances provided by this module.
     * @type {{string: Njn.Libs.Appearances.Appearance}}
     */
    this.appearances = {};

    /**
     * Geometries provided by this module.
     * @type {{string: Njn.Libs.Geometries.Geometry}}
     */
    this.geometries = {};

    /**
     * Roots of scene object trees provided by this module.
     * @type {{string: Njn.Objects.Object}}
     */
    this.objects = {};

    var engine = modules.engine;

    // Libraries
    if (cfg.libs) {
        if (cfg.libs.appearances) {
            var a = cfg.libs.appearances;
            for (var i = 0, len = a.length; i < len; i++) {
                var appearance = engine.libs.appearances.create(a[i]);
                this.appearances[appearance.id] = appearance;
            }
        }
        if (cfg.libs.geometries) {
            var a = cfg.libs.geometries;
            for (var i = 0, len = a.length; i < len; i++) {
                var geometry = engine.libs.geometries.create(a[i]);
                this.geometries[geometry.id] = geometry;
            }
        }
    }
    // Scene objects
    if (cfg.objects) {
        for (var i = 0, len = cfg.objects.length; i < len; i++) {
            var object = engine.objects.create(cfg.objects[i]);
            this.objects[object.id] = object;
        }
    }
    // Camera
    if (cfg.camera) {
        engine.camera.setEye(cfg.camera.eye);
        engine.camera.setLook(cfg.camera.look);
        engine.camera.setUp(cfg.camera.up);
    }
};

Njn._extend(Njn.Modules.Module, Njn.Component);


/**
 * Destroys this module.
 */
Njn.Modules.Module.prototype.destroy = function () {
    if (this.destroyed) {
        return;
    }
    for (var id in this.appearances) {
        if (this.appearances.hasOwnProperty(id)) {
            this.appearances[id].destroy();
        }
    }
    for (var id in this.geometries) {
        if (this.geometries.hasOwnProperty(id)) {
            this.geometries[id].destroy();
        }
    }
    for (var id in this.objects) {
        if (this.objects.hasOwnProperty(id)) {
            this.objects[id].destroy();
        }
    }
    this.set("destroyed", this.destroyed = true);
};

