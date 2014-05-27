Njn.Libs.Appearances = function (libs, node, cfg) {

    cfg = cfg || [];

    this._init();

    this._node = node;

    /** Library set that contains this appearances library.
     * @type {Njn.Libs}
     */
    this.libs = libs;

    /**
     * Appearances in this library.
     * @type {{String:Njn.Libs.Appearance}}
     */
    this.appearances = {};

    // Create appearances
    for (var i = 0, len = cfg.length; i < len; i++) {
        this.create(cfg[i]);
    }
};

Njn._extend(Njn.Libs.Appearances, Njn.Component);

/**
 *
 * @param params
 * @returns {Njn.Libs.Appearances.Appearance}
 */
Njn.Libs.Appearances.prototype.create = function (params) {
    var appearance = new Njn.Libs.Appearances.Appearance(this, this._node, params);
    this.appearances[appearance.id] = appearance;
    var self = this;
    appearance.on("destroyed", function () {
        delete self.appearances[appearance.id];
        self.set("destroyed", appearance, true);
    });
    return appearance;
};