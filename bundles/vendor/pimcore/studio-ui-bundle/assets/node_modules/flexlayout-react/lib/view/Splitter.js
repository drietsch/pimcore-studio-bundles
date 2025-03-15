"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splitter = void 0;
const React = require("react");
const DragDrop_1 = require("../DragDrop");
const Actions_1 = require("../model/Actions");
const BorderNode_1 = require("../model/BorderNode");
const Orientation_1 = require("../Orientation");
const Types_1 = require("../Types");
/** @internal */
const Splitter = (props) => {
    const { layout, node, path } = props;
    const pBounds = React.useRef([]);
    const outlineDiv = React.useRef(undefined);
    const parentNode = node.getParent();
    const onMouseDown = (event) => {
        var _a;
        DragDrop_1.DragDrop.instance.setGlassCursorOverride(node.getOrientation() === Orientation_1.Orientation.HORZ
            ? "ns-resize"
            : "ew-resize");
        DragDrop_1.DragDrop.instance.startDrag(event, onDragStart, onDragMove, onDragEnd, onDragCancel, undefined, undefined, layout.getCurrentDocument(), (_a = layout.getRootDiv()) !== null && _a !== void 0 ? _a : undefined);
        pBounds.current = parentNode._getSplitterBounds(node, true);
        const rootdiv = layout.getRootDiv();
        outlineDiv.current = layout.getCurrentDocument().createElement("div");
        outlineDiv.current.style.position = "absolute";
        outlineDiv.current.className = layout.getClassName(Types_1.CLASSES.FLEXLAYOUT__SPLITTER_DRAG);
        outlineDiv.current.style.cursor = node.getOrientation() === Orientation_1.Orientation.HORZ ? "ns-resize" : "ew-resize";
        const r = node.getRect();
        if (node.getOrientation() === Orientation_1.Orientation.VERT && r.width < 2) {
            r.width = 2;
        }
        else if (node.getOrientation() === Orientation_1.Orientation.HORZ && r.height < 2) {
            r.height = 2;
        }
        r.positionElement(outlineDiv.current);
        if (rootdiv) {
            rootdiv.appendChild(outlineDiv.current);
        }
    };
    const onDragCancel = (_wasDragging) => {
        const rootdiv = layout.getRootDiv();
        if (rootdiv) {
            rootdiv.removeChild(outlineDiv.current);
        }
    };
    const onDragStart = () => {
        return true;
    };
    const onDragMove = (event) => {
        const clientRect = layout.getDomRect();
        if (!clientRect) {
            return;
        }
        const pos = {
            x: event.clientX - clientRect.left,
            y: event.clientY - clientRect.top,
        };
        if (outlineDiv) {
            if (node.getOrientation() === Orientation_1.Orientation.HORZ) {
                outlineDiv.current.style.top = getBoundPosition(pos.y - 4) + "px";
            }
            else {
                outlineDiv.current.style.left = getBoundPosition(pos.x - 4) + "px";
            }
        }
        if (layout.isRealtimeResize()) {
            updateLayout();
        }
    };
    const updateLayout = () => {
        let value = 0;
        if (outlineDiv) {
            if (node.getOrientation() === Orientation_1.Orientation.HORZ) {
                value = outlineDiv.current.offsetTop;
            }
            else {
                value = outlineDiv.current.offsetLeft;
            }
        }
        if (parentNode instanceof BorderNode_1.BorderNode) {
            const pos = parentNode._calculateSplit(node, value);
            layout.doAction(Actions_1.Actions.adjustBorderSplit(node.getParent().getId(), pos));
        }
        else {
            const splitSpec = parentNode._calculateSplit(node, value);
            if (splitSpec !== undefined) {
                layout.doAction(Actions_1.Actions.adjustSplit(splitSpec));
            }
        }
    };
    const onDragEnd = () => {
        updateLayout();
        const rootdiv = layout.getRootDiv();
        if (rootdiv) {
            rootdiv.removeChild(outlineDiv.current);
        }
    };
    const getBoundPosition = (p) => {
        const bounds = pBounds.current;
        let rtn = p;
        if (p < bounds[0]) {
            rtn = bounds[0];
        }
        if (p > bounds[1]) {
            rtn = bounds[1];
        }
        return rtn;
    };
    const cm = layout.getClassName;
    let r = node.getRect();
    const style = r.styleWithPosition({
        cursor: node.getOrientation() === Orientation_1.Orientation.HORZ ? "ns-resize" : "ew-resize",
    });
    let className = cm(Types_1.CLASSES.FLEXLAYOUT__SPLITTER) + " " + cm(Types_1.CLASSES.FLEXLAYOUT__SPLITTER_ + node.getOrientation().getName());
    if (parentNode instanceof BorderNode_1.BorderNode) {
        className += " " + cm(Types_1.CLASSES.FLEXLAYOUT__SPLITTER_BORDER);
    }
    else {
        if (node.getModel().getMaximizedTabset() !== undefined) {
            style.display = "none";
        }
    }
    const extra = node.getModel().getSplitterExtra();
    if (extra === 0) {
        return (React.createElement("div", { style: style, "data-layout-path": path, className: className, onTouchStart: onMouseDown, onMouseDown: onMouseDown }));
    }
    else {
        // add extended transparent div for hit testing
        // extends forward only, so as not to interfere with scrollbars
        let r2 = r.clone();
        r2.x = 0;
        r2.y = 0;
        if (node.getOrientation() === Orientation_1.Orientation.VERT) {
            r2.width += extra;
        }
        else {
            r2.height += extra;
        }
        const style2 = r2.styleWithPosition({
            cursor: node.getOrientation() === Orientation_1.Orientation.HORZ ? "ns-resize" : "ew-resize"
        });
        const className2 = cm(Types_1.CLASSES.FLEXLAYOUT__SPLITTER_EXTRA);
        return (React.createElement("div", { style: style, "data-layout-path": path, className: className },
            React.createElement("div", { style: style2, className: className2, onTouchStart: onMouseDown, onMouseDown: onMouseDown })));
    }
};
exports.Splitter = Splitter;
//# sourceMappingURL=Splitter.js.map