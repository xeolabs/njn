Njn.Props = function (engine, cfg) {
    this._init();

    this.engine = engine;

    if (cfg) {
        for (var key in cfg) {
            if (cfg.hasOwnProperty(key)) {
                this.set(key, cfg[key]);
            }
        }
    }
};

Njn._extend(Njn.Props, Njn.Component);


