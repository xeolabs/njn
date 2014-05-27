Njn.Libs.Appearances.Appearance.Texture = function (appearance, node, cfg) {

    cfg = cfg || {};

    this._init();

    /**
     * Appearance that contains this texture.
     * @type {Njn.Libs.Appearances.Appearance}
     */
    this.appearance = appearance;

    /**
     * Texture scene graph node.
     * @type {*}
     * @private
     */
    this.node = node.addNode(Njn._apply({ type: "texture" }, cfg));
};

Njn._extend(Njn.Libs.Appearances.Appearance.Texture, Njn.Component);

