/**
 * @class Generic map of IDs to items - can generate own IDs or accept given IDs. IDs should be strings in order to not
 * clash with internally generated IDs, which are numbers.
 * @private
 */
Njn.Map = function (items, _baseId) {

    /**
     * @property Items in this map
     */
    this.items = items || [];

    var baseId = _baseId || 0;
    var lastUniqueId = baseId + 1;

    /**
     * Adds an item to the map and returns the ID of the item in the map. If an ID is given, the item is
     * mapped to that ID. Otherwise, the map automatically generates the ID and maps to that.
     *
     * id = myMap.addItem("foo") // ID internally generated
     *
     * id = myMap.addItem("foo", "bar") // ID is "foo"
     *
     */
    this.addItem = function () {
        var item;
        if (arguments.length == 2) {
            var id = arguments[0];
            item = arguments[1];
            if (this.items[id]) { // Won't happen if given ID is string
                throw "ID clash: '" + id + "'";
            }
            this.items[id] = item;
            return id;

        } else {
            while (true) {
                item = arguments[0];
                var findId = lastUniqueId++;
                if (!this.items[findId]) {
                    this.items[findId] = item;
                    return findId;
                }
            }
        }
    };

    /**
     * Removes the item of the given ID from the map and returns it
     */
    this.removeItem = function (id) {
        var item = this.items[id];
        delete this.items[id];
        return item;
    };
};