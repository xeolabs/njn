/**
 *
 * @param engine
 * @constructor
 */
Njn.Input = function (engine) {

    this._init();

    this.engine = engine;

    var self = this;

    var canvas = $(engine.nodes.scene.getCanvas());

    // True when ALT down
    this.altDown = false;

    /** True whenever CTRL is down
     *
     * @type {boolean}
     */
    this.ctrlDown = false;

    /** True whenever left mouse button is down
     *
     * @type {boolean}
     */
    this.mouseDownLeft = false;

    /** True whenever middle mouse button is down
     *
     * @type {boolean}
     */
    this.mouseDownMiddle = false;

    /** True whenever right mouse button is down
     *
     * @type {boolean}
     */
    this.mouseDownRight = false;

    /** Flag for each key that's down
     *
     * @type {boolean}
     */
    this.keyDown = [];

    /** True while input enabled
     *
     * @type {boolean}
     */
    this.enabled = true;


    jQuery(document).ready(function () {
        jQuery("body").bind(
            (jQuery.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection",
            function (event) {
                if (event.target.tagName.toLowerCase() != "input" &&
                    event.target.tagName.toLowerCase() != "email" &&
                    event.target.tagName.toLowerCase() != "text" &&
                    event.target.tagName.toLowerCase() != "textarea") {
                    event.preventDefault();
                }
            });

        // Disable context menu throughout document.
        jQuery(document).bind("contextmenu", function (event) {
            if (event.target.type !== "input" &&
                event.target.type !== "email" &&
                event.target.type !== "text" &&
                event.target.type !== "textarea") {
                return false;
            }
        });
    });

    // Capture input events and publish them on this component

    document.addEventListener("keydown",
        function (e) {
            if (!self.enabled) {
                return;
            }
            if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                if (e.ctrlKey) {
                    self.ctrlDown = true;
                } else if (e.altKey) {
                    self.altDown = true;
                } else {
                    self.keyDown[e.keyCode] = true;
                    self.set("keydown", e.keyCode, true);
                }
            }
        }, true);


    document.addEventListener("keyup",
        function (e) {
            if (!self.enabled) {
                return;
            }
            if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                if (e.ctrlKey) {
                    self.ctrlDown = false;
                } else if (e.altKey) {
                    self.altDown = false;
                } else {
                    self.keyDown[e.keyCode] = false;
                    self.set("keyup", e.keyCode, true);
                }
            }
        });

    canvas.mousedown(
        function (e) {
            if (!self.enabled) {
                return;
            }
            switch (e.which) {
                case 1:// Left button
                    self.mouseDownLeft = true;
                    break;
                case 2:// Middle/both buttons
                    self.mouseDownMiddle = true;
                    break;
                case 3:// Right button
                    self.mouseDownRight = true;
                    break;
                default:
                    break;
            }
            var coords = getClickCoordsWithinElement(e);
            self.set("mousedown", coords, true);
        });

    canvas.mouseup(
        function (e) {
            if (!self.enabled) {
                return;
            }
            switch (e.which) {
                case 1:// Left button
                    self.mouseDownLeft = false;
                    break;
                case 2:// Middle/both buttons
                    self.mouseDownMiddle = false;
                    break;
                case 3:// Right button
                    self.mouseDownRight = false;
                    break;
                default:
                    break;
            }
            var coords = getClickCoordsWithinElement(e);
            self.set("mouseup", coords, true);
        });

    canvas.dblclick(
        function (e) {
            if (!self.enabled) {
                return;
            }
            switch (e.which) {
                case 1:// Left button
                    self.mouseDownLeft = false;
                    self.mouseDownRight = false;
                    break;
                case 2:// Middle/both buttons
                    self.mouseDownMiddle = false;
                    break;
                case 3:// Right button
                    self.mouseDownLeft = false;
                    self.mouseDownRight = false;
                    break;
                default:
                    break;
            }
            var coords = getClickCoordsWithinElement(e);
            self.set("dblclick", coords, true);
        });

    canvas.mousemove(
        function (e) {
            if (!self.enabled) {
                return;
            }
            var coords = getClickCoordsWithinElement(e);
            self.set("mousemove", coords, true);
        });

    canvas.bind("mousewheel",
        function (event, d) {
            if (!self.enabled) {
                return;
            }
            self.set("mousewheel", { event: event, d: d }, true);
        });

    function getClickCoordsWithinElement(event) {
        var coords = { x: 0, y: 0 };
        if (!event) {
            event = window.event;
            coords.x = event.x;
            coords.y = event.y;
        }
        else {
            var element = event.target;
            var totalOffsetLeft = 0;
            var totalOffsetTop = 0;

            while (element.offsetParent) {
                totalOffsetLeft += element.offsetLeft;
                totalOffsetTop += element.offsetTop;
                element = element.offsetParent;
            }
            coords.x = event.pageX - totalOffsetLeft;
            coords.y = event.pageY - totalOffsetTop;
        }
        return coords;
    }
};

Njn._extend(Njn.Input, Njn.Component);


/**
 * Enables or disables input
 */
Njn.Input.prototype.setEnabled = function (enable) {
    if (this.enabled != enable) {
        this.set("enabled", this.enabled = enable);
    }
};

// Key codes

Njn.Input.prototype.KEY_BACKSPACE = 8;
Njn.Input.prototype.KEY_TAB = 9;
Njn.Input.prototype.KEY_ENTER = 13;
Njn.Input.prototype.KEY_SHIFT = 16;
Njn.Input.prototype.KEY_CTRL = 17;
Njn.Input.prototype.KEY_ALT = 18;
Njn.Input.prototype.KEY_PAUSE_BREAK = 19;
Njn.Input.prototype.KEY_CAPS_LOCK = 20;
Njn.Input.prototype.KEY_ESCAPE = 27;
Njn.Input.prototype.KEY_PAGE_UP = 33;
Njn.Input.prototype.KEY_PAGE_DOWN = 34;
Njn.Input.prototype.KEY_END = 35;
Njn.Input.prototype.KEY_HOME = 36;
Njn.Input.prototype.KEY_LEFT_ARROW = 37;
Njn.Input.prototype.KEY_UP_ARROW = 38;
Njn.Input.prototype.KEY_RIGHT_ARROW = 39;
Njn.Input.prototype.KEY_DOWN_ARROW = 40;
Njn.Input.prototype.KEY_INSERT = 45;
Njn.Input.prototype.KEY_DELETE = 46;
Njn.Input.prototype.KEY_NUM_0 = 48;
Njn.Input.prototype.KEY_NUM_1 = 49;
Njn.Input.prototype.KEY_NUM_2 = 50;
Njn.Input.prototype.KEY_NUM_3 = 51;
Njn.Input.prototype.KEY_NUM_4 = 52;
Njn.Input.prototype.KEY_NUM_5 = 53;
Njn.Input.prototype.KEY_NUM_6 = 54;
Njn.Input.prototype.KEY_NUM_7 = 55;
Njn.Input.prototype.KEY_NUM_8 = 56;
Njn.Input.prototype.KEY_NUM_9 = 57;
Njn.Input.prototype.KEY_A = 65;
Njn.Input.prototype.KEY_B = 66;
Njn.Input.prototype.KEY_C = 67;
Njn.Input.prototype.KEY_D = 68;
Njn.Input.prototype.KEY_E = 69;
Njn.Input.prototype.KEY_F = 70;
Njn.Input.prototype.KEY_G = 71;
Njn.Input.prototype.KEY_H = 72;
Njn.Input.prototype.KEY_I = 73;
Njn.Input.prototype.KEY_J = 74;
Njn.Input.prototype.KEY_K = 75;
Njn.Input.prototype.KEY_L = 76;
Njn.Input.prototype.KEY_M = 77;
Njn.Input.prototype.KEY_N = 78;
Njn.Input.prototype.KEY_O = 79;
Njn.Input.prototype.KEY_P = 80;
Njn.Input.prototype.KEY_Q = 81;
Njn.Input.prototype.KEY_R = 82;
Njn.Input.prototype.KEY_S = 83;
Njn.Input.prototype.KEY_T = 84;
Njn.Input.prototype.KEY_U = 85;
Njn.Input.prototype.KEY_V = 86;
Njn.Input.prototype.KEY_W = 87;
Njn.Input.prototype.KEY_X = 88;
Njn.Input.prototype.KEY_Y = 89;
Njn.Input.prototype.KEY_Z = 90;
Njn.Input.prototype.KEY_LEFT_WINDOW = 91;
Njn.Input.prototype.KEY_RIGHT_WINDOW = 92;
Njn.Input.prototype.KEY_SELECT_KEY = 93;
Njn.Input.prototype.KEY_NUMPAD_0 = 96;
Njn.Input.prototype.KEY_NUMPAD_1 = 97;
Njn.Input.prototype.KEY_NUMPAD_2 = 98;
Njn.Input.prototype.KEY_NUMPAD_3 = 99;
Njn.Input.prototype.KEY_NUMPAD_4 = 100;
Njn.Input.prototype.KEY_NUMPAD_5 = 101;
Njn.Input.prototype.KEY_NUMPAD_6 = 102;
Njn.Input.prototype.KEY_NUMPAD_7 = 103;
Njn.Input.prototype.KEY_NUMPAD_8 = 104;
Njn.Input.prototype.KEY_NUMPAD_9 = 105;
Njn.Input.prototype.KEY_MULTIPLY = 106;
Njn.Input.prototype.KEY_ADD = 107;
Njn.Input.prototype.KEY_SUBTRACT = 109;
Njn.Input.prototype.KEY_DECIMAL_POINT = 110;
Njn.Input.prototype.KEY_DIVIDE = 111;
Njn.Input.prototype.KEY_F1 = 112;
Njn.Input.prototype.KEY_F2 = 113;
Njn.Input.prototype.KEY_F3 = 114;
Njn.Input.prototype.KEY_F4 = 115;
Njn.Input.prototype.KEY_F5 = 116;
Njn.Input.prototype.KEY_F6 = 117;
Njn.Input.prototype.KEY_F7 = 118;
Njn.Input.prototype.KEY_F8 = 119;
Njn.Input.prototype.KEY_F9 = 120;
Njn.Input.prototype.KEY_F10 = 121;
Njn.Input.prototype.KEY_F11 = 122;
Njn.Input.prototype.KEY_F12 = 123;
Njn.Input.prototype.KEY_NUM_LOCK = 144;
Njn.Input.prototype.KEY_SCROLL_LOCK = 145;
Njn.Input.prototype.KEY_SEMI_COLON = 186;
Njn.Input.prototype.KEY_EQUAL_SIGN = 187;
Njn.Input.prototype.KEY_COMMA = 188;
Njn.Input.prototype.KEY_DASH = 189;
Njn.Input.prototype.KEY_PERIOD = 190;
Njn.Input.prototype.KEY_FORWARD_SLASH = 191;
Njn.Input.prototype.KEY_GRAVE_ACCENT = 192;
Njn.Input.prototype.KEY_OPEN_BRACKET = 219;
Njn.Input.prototype.KEY_BACK_SLASH = 220;
Njn.Input.prototype.KEY_CLOSE_BRAKET = 221;
Njn.Input.prototype.KEY_SINGLE_QUOTE = 222;
Njn.Input.prototype.KEY_SPACE = 32;