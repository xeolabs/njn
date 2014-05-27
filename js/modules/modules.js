Njn.Modules = function (engine) {
    this._init();
    this.engine = engine;
    this.modules = {};
};

Njn._extend(Njn.Modules, Njn.Component);

/**
 *
 * @param moduleId
 * @param index
 */
Njn.Modules.create = function (params) {

    var module = new Njn.Modules.Module(this, params);
    var id = params.id;

    this.modules[id] = module;

    var self = this;

    module.once("destroyed", function () {
        delete self.modules[id];
        self._set("destroyed", module, true);
    });

    this._set("created", module, true);
};
