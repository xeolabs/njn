Njn.Libs.Geometries.Geometry = function (geometries, node, cfg) {

    cfg = cfg || {};

    this._init();

    /**
     * Library that contains this geometry.
     * @type {Njn.Libs.Geometries}
     */
    this.geometries = geometries;

    /**
     * Unique ID for this geometry within its {@link Njn.libs.Geometries}
     * @type {string}
     */
    this.id = cfg.id;

    /**
     * Geometry scene graph node.
     * @type {*}
     * @private
     */
    this.node = node.addNode(Njn._apply({ type: "geometry" }, cfg));
};

Njn._extend(Njn.Libs.Geometries.Geometry, Njn.Component);

/**
 *
 * @param cfg
 */
Njn.Libs.Geometries.Geometry.prototype.destroy = function () {
    if (this.destroyed) {
        return;
    }
    this.geometry.destroy();
    this.set("destroyed", this.destroyed = true);
};