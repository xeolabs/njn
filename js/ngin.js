/**
 * @namespace Namespace for the Njn Scene Development Kit (SDK).
 *
 * @private
 */
var Njn = new (function () {

    var idMap;

    this.engines = {};

    /**
     * Creates a new engine.
     */
    this.createEngine = function (cfg) {
        idMap = idMap || new Njn.Map();
        cfg = cfg || {};
        // Unique scene ID
        var id = cfg.id;
        if (id) {
            if (this.engines[id]) {
                throw "An engine with this ID already exists: " + id;
            }
        } else {
            id = idMap.addItem({});
        }
        var engine = this.engines[id] = new Njn.Engine(id, cfg);
        var self = this;
        engine.on("destroyed",
            function () {
                delete self.engines[id];
                idMap.removeItem(id);
            });
        return engine;
    };

    /**
     * Tests if the given object is an array
     * @private
     */
    this._isArray = function (testObject) {
        return testObject && !(testObject.propertyIsEnumerable('length'))
            && typeof testObject === 'object' && typeof testObject.length === 'number';
    };

    /**
     * @private
     * @param childObj
     * @param parentObj
     */
    this._extend = function (childObj, parentObj) {
        var tmpObj = function () {
        };
        tmpObj.prototype = parentObj.prototype;
        childObj.prototype = new tmpObj();
        childObj.prototype.constructor = childObj;
    };

    /** Add properties of o to o2, overwriting them on o2 if already there
     */
    this._apply = function (o, o2) {
        for (var name in o) {
            if (o.hasOwnProperty(name)) {
                o2[name] = o[name];
            }
        }
        return o2;
    };

    /**
     * Add properties of o to o2 where undefined or null on o2
     * @private
     */
    this._applyIf = function (o, o2) {
        for (var name in o) {
            if (o.hasOwnProperty(name)) {
                if (o2[name] == undefined || o2[name] == null) {
                    o2[name] = o[name];
                }
            }
        }
        return o2;
    };

    this._objectXYZToArray = function(o) {
        return [o.x || 0, o.y || 0, o.z || 0];
    };

    this._arraytXYZToObject = function(a) {
        return { x: a[0], y: a[1], z: a[2] };
    };

})();