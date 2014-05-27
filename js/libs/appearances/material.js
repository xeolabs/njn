Njn.Libs.Appearances.Appearance.Material = function (appearance, node, cfg) {

    cfg = cfg || {};

    var self = this;

    this._init();

    /**
     * Appearance that contains this material.
     * @type {Njn.Libs.Appearances.Appearance}
     */
    this.appearance = appearance;

    /**
     * Material scene graph node.
     * @type {*}
     * @private
     */
    this.node = node.addNode(Njn._apply({ type: "material" }, cfg));

    this.on("color", function (color) {
        self.node.setColor({r: color[0], g: color[1], b: color[2] });
        this.color = color;
    });

    this.on("specularColor", function (specularColor) {
        self.node.setSpecularColor({r: specularColor[0], g: specularColor[1], b: specularColor[2] });
        this.specularColor = specularColor;
    });

    this.on("specular", function (specular) {
        self.node.setSpecular(specular);
        this.specular = specular;
    });

    this.on("shine", function (shine) {
        self.node.setShine(shine);
        this.shine = shine;
    });

    this.on("alpha", function (alpha) {
        self.node.setAlpha(alpha);
        this.alpha = alpha;
    });

    this.on("emit", function (emit) {
        self.node.setEmit(emit);
        this.emit = emit;
    });
};

Njn._extend(Njn.Libs.Appearances.Appearance.Material, Njn.Component);


Njn.Libs.Appearances.Appearance.Material.prototype.setColor = function (color) {
    this._set("color", color || [1, 1, 1]);
};

Njn.Libs.Appearances.Appearance.Material.prototype.setSpecularColor = function (specularColor) {
    this._set("specularColor", specularColor || [1, 1, 1]);
};

Njn.Libs.Appearances.Appearance.Material.prototype.setShine = function (shine) {
    this._set("shine", shine || 1.0);
};

Njn.Libs.Appearances.Appearance.Material.prototype.setAlpha = function (alpha) {
    this._set("alpha", alpha || 1.0);
};

Njn.Libs.Appearances.Appearance.Material.prototype.setEmit = function (emit) {
    this._set("emit", emit || 0.0);
};