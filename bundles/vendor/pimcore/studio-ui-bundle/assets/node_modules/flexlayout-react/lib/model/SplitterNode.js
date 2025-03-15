"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitterNode = void 0;
const AttributeDefinitions_1 = require("../AttributeDefinitions");
const Orientation_1 = require("../Orientation");
const Node_1 = require("./Node");
class SplitterNode extends Node_1.Node {
    /** @internal */
    constructor(model) {
        super(model);
        this._fixed = true;
        this._attributes.type = SplitterNode.TYPE;
        model._addNode(this);
    }
    /** @internal */
    getWidth() {
        return this._model.getSplitterSize();
    }
    /** @internal */
    getMinWidth() {
        if (this.getOrientation() === Orientation_1.Orientation.VERT) {
            return this._model.getSplitterSize();
        }
        else {
            return 0;
        }
    }
    /** @internal */
    getHeight() {
        return this._model.getSplitterSize();
    }
    /** @internal */
    getMinHeight() {
        if (this.getOrientation() === Orientation_1.Orientation.HORZ) {
            return this._model.getSplitterSize();
        }
        else {
            return 0;
        }
    }
    /** @internal */
    getMinSize(orientation) {
        if (orientation === Orientation_1.Orientation.HORZ) {
            return this.getMinWidth();
        }
        else {
            return this.getMinHeight();
        }
    }
    /** @internal */
    getWeight() {
        return 0;
    }
    /** @internal */
    _setWeight(value) { }
    /** @internal */
    _getPrefSize(orientation) {
        return this._model.getSplitterSize();
    }
    /** @internal */
    _updateAttrs(json) { }
    /** @internal */
    _getAttributeDefinitions() {
        return new AttributeDefinitions_1.AttributeDefinitions();
    }
    toJson() {
        return undefined;
    }
}
exports.SplitterNode = SplitterNode;
SplitterNode.TYPE = "splitter";
//# sourceMappingURL=SplitterNode.js.map