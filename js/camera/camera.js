/**
 * The camera.
 * @param engine
 * @param cfg
 * @constructor
 */
Njn.Camera = function (engine, cfg) {

    cfg = cfg || {};

    this._init();

    this.engine = engine;

    var lookat = engine.scene.lookat;

    this.on("eye", function (eye) {
        lookat.setEye({x: eye[0], y: eye[1], z: eye[2] });
        self.eye = eye;
    });

    this.on("look", function (look) {
        lookat.setLook({x: look[0], y: look[1], z: look[2] });
        self.look = look;
    });

    this.on("up", function (up) {
        lookat.setUp({x: up[0], y: up[1], z: up[2] });
        self.up = up;
    });

    this.setEye(cfg.eye);
    this.setLook(cfg.look);
    this.setUp(cfg.up);
};

Njn._extend(Njn.Camera, Njn.Component);

/**
 * Sets this camera's eye position.
 *
 * <p>Publishes the eye position via an 'eye' property on this camera.
 *
 * @param {[number, number, number]} eye Eye position
 * @return {@link Njn.Camera} This camera
 */
Njn.Camera.prototype.setEye = function (eye) {
    this.set("eye", eye || [0, 0, 100]);
    return this;
};

/**
 * Sets the point that this camera is looking at.
 *
 * <p>Publishes the point via a 'look' property on this camera.
 *
 * @param {[number, number, number]} look Look position
 * @return {@link Njn.Camera} This camera
 */
Njn.Camera.prototype.setLook = function (look) {
    this.set("look", look || [0, 0, 0]);
};

/**
 * Sets this camera's 'up' vector.
 *
 * <p>Publishes the vector via an 'up' property on this camera.
 *
 * @param {[number, number, number]} up Up vector
 * @return {@link Njn.Camera} This camera
 */
Njn.Camera.prototype.setUp = function (up) {
    this.set("up", up || [0, 1, 0]);
};
