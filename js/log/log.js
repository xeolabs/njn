Njn.Log = function (engine) {
    this._init();
    this.engine = engine;
};

Njn._extend(Njn.Log, Njn.Component);

Njn.Log.prototype.log = function(msg) {
};

Njn.Log.prototype.info = function(msg) {
};

Njn.Log.prototype.warn = function(msg) {
};

Njn.Log.prototype.error = function(msg) {
};

