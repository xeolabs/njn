/**
 * A set of asset libraries for an engine.
 * @param engine
 * @param cfg
 * @constructor
 */
Njn.Libs = function (engine, cfg) {

    cfg = cfg || {};

    this._init();

    this.engine = engine;

    // Container node in scene graph for all libraries in this set
    var node = engine.scene.library.addNode();

    /**
     * Appearances library.
     * @type {Njn.Libs.Appearances}
     */
    this.appearances = new Njn.Libs.Appearances(this, node, cfg.appearances);

    /**
     * Geometries library.
     * @type {Njn.Libs,Geometries}
     */
    this.geometries = new Njn.Libs.Geometries(this, node, cfg.geometries);

    // Destroy library's container node in scene graph on destroy
    this.on("destroyed", function () {
        node.destroy();
    });
};

Njn._extend(Njn.Libs, Njn.Component);
