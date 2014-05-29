Njn.Pick = function (engine) {

    this._init();

    this.engine = engine;
};

Njn._extend(Njn.Pick, Njn.Component);

/**
 * Pick an object in the 3D view.
 * @param {Number} canvasX Canvas-space X-coordinate
 * @param {Number} canvasY Canvas-space Y-coordinate
 * @param {Boolean} rayPick Set true to perform a ray-pick and obtain the 3D World-space intersection with whatever is picked
 * @returns {*} The pick hit info, if something is picked
 */
Njn.Pick.prototype.pick = function (canvasX, canvasY, rayPick) {
    var hit = this.engine.nodes.scene.pick({ canvasX: canvasX, canvasY: canvasY, rayPick: rayPick });
    if (hit) {
        var objectId = hit.name;
        var object = this.engine.objects.objects[objectId];
        if (object) {
            var pickInfo = {
                objectId: objectId,
                canvasPos: [canvasX, canvasY]

                //..
            };
            object.pick(pickInfo);
            this.set("picked", pickInfo, true);
            return pickInfo;
        }
    } else {
        this.set("nothingPicked", hit, true);
        return null;
    }
};

