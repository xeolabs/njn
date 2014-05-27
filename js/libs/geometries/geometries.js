Njn.Libs.Geometries = function (libs, node, cfg) {

    cfg = cfg || [];

    this._init();

    this._node = node;

    this.libs = libs;

    this.geometries = {};

    // Create geometries
    for (var i = 0, len = cfg.length; i < len; i++) {
        this.create(cfg[i]);
    }
};

Njn._extend(Njn.Libs.Geometries, Njn.Component);

/**
 *
 * @param params
 * @returns {Njn.Libs.Geometries.Geometry}
 */
Njn.Libs.Geometries.prototype.create = function (params) {
    var geometry = new Njn.Libs.Geometries.Geometry(this, this._node, params);
    this.geometries[geometry.id] = geometry;
    var self = this;
    geometry.on("destroyed", function () {
        delete self.geometries[geometry.id];
        self.set("destroyed", geometry, true);
    });
    return geometry;
};
