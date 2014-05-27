Njn.Libs.Appearances.Appearance = function (appearances, node, cfg) {

    cfg = cfg || {};

    this._init();

    /**
     * Library that contains this appearance.
     * @type {Njn.Libs.Appearances}
     */
    this.appearances = appearances;

    /**
     * Unique ID for this appearance within its {@link Njn.libs.Appearances}
     * @type {string}
     */
    this.id = cfg.id;

    /**
     * Appearance material properties.
     * @type {Njn.Material}
     */
    if (cfg.material) {
        this.material = new Njn.Libs.Appearances.Appearance.Material(this, node, cfg.material);
    }

    /** Appearance texture
     * @type {Njn.Texture}
     */
    if (cfg.texture) {
        this.texture = new Njn.Libs.Appearances.Appearance.Texture(this, node, cfg.texture);
    }

    /**
     *
     * @type {boolean}
     */
    this.set("destroyed", this.destroyed = false);
};

Njn._extend(Njn.Libs.Appearances.Appearance, Njn.Component);

/**
 *
 * @param cfg
 */
Njn.Libs.Appearances.Appearance.prototype.destroy = function () {
    if (this.destroyed) {
        return;
    }
    this.material.destroy();
    this.texture.destroy();
    this.set("destroyed", this.destroyed = true);
};