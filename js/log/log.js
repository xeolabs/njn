Njn.Log = function (engine) {
    this._init();
    this.engine = engine;
};

Njn._extend(Njn.Log, Njn.Component);

Njn.Log.prototype.log = function(msg) {
    console.log("LOG: " + msg);
};

Njn.Log.prototype.info = function(msg) {
    console.log("INFO: " + msg);
};

Njn.Log.prototype.warn = function(msg) {
    console.warn("WARN: " + msg);
};

Njn.Log.prototype.error = function(msg) {
    console.error("ERROR: " + msg);
};

