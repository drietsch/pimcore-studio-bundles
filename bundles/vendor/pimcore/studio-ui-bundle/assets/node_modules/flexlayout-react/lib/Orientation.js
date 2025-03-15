"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orientation = void 0;
class Orientation {
    static flip(from) {
        if (from === Orientation.HORZ) {
            return Orientation.VERT;
        }
        else {
            return Orientation.HORZ;
        }
    }
    /** @internal */
    constructor(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    toString() {
        return this._name;
    }
}
exports.Orientation = Orientation;
Orientation.HORZ = new Orientation("horz");
Orientation.VERT = new Orientation("vert");
//# sourceMappingURL=Orientation.js.map