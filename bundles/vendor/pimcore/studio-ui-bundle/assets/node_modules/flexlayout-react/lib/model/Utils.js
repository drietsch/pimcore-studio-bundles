"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUUID = exports.adjustSelectedIndex = exports.adjustSelectedIndexAfterDock = exports.adjustSelectedIndexAfterFloat = void 0;
const TabSetNode_1 = require("./TabSetNode");
const BorderNode_1 = require("./BorderNode");
/** @internal */
function adjustSelectedIndexAfterFloat(node) {
    const parent = node.getParent();
    if (parent !== null) {
        if (parent instanceof TabSetNode_1.TabSetNode) {
            let found = false;
            let newSelected = 0;
            const children = parent.getChildren();
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child === node) {
                    found = true;
                }
                else {
                    if (!child.isFloating()) {
                        newSelected = i;
                        if (found)
                            break;
                    }
                }
            }
            parent._setSelected(newSelected);
        }
        else if (parent instanceof BorderNode_1.BorderNode) {
            parent._setSelected(-1);
        }
    }
}
exports.adjustSelectedIndexAfterFloat = adjustSelectedIndexAfterFloat;
/** @internal */
function adjustSelectedIndexAfterDock(node) {
    const parent = node.getParent();
    if (parent !== null && (parent instanceof TabSetNode_1.TabSetNode || parent instanceof BorderNode_1.BorderNode)) {
        const children = parent.getChildren();
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child === node) {
                parent._setSelected(i);
                return;
            }
        }
    }
}
exports.adjustSelectedIndexAfterDock = adjustSelectedIndexAfterDock;
/** @internal */
function adjustSelectedIndex(parent, removedIndex) {
    // for the tabset/border being removed from set the selected index
    if (parent !== undefined && (parent.getType() === TabSetNode_1.TabSetNode.TYPE || parent.getType() === BorderNode_1.BorderNode.TYPE)) {
        const selectedIndex = parent.getSelected();
        if (selectedIndex !== -1) {
            if (removedIndex === selectedIndex && parent.getChildren().length > 0) {
                if (removedIndex >= parent.getChildren().length) {
                    // removed last tab; select new last tab
                    parent._setSelected(parent.getChildren().length - 1);
                }
                else {
                    // leave selected index as is, selecting next tab after this one
                }
            }
            else if (removedIndex < selectedIndex) {
                parent._setSelected(selectedIndex - 1);
            }
            else if (removedIndex > selectedIndex) {
                // leave selected index as is
            }
            else {
                parent._setSelected(-1);
            }
        }
    }
}
exports.adjustSelectedIndex = adjustSelectedIndex;
function randomUUID() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
exports.randomUUID = randomUUID;
//# sourceMappingURL=Utils.js.map