"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPopup = void 0;
const React = require("react");
const DragDrop_1 = require("./DragDrop");
const Types_1 = require("./Types");
const TabButtonStamp_1 = require("./view/TabButtonStamp");
/** @internal */
function showPopup(triggerElement, items, onSelect, layout, iconFactory, titleFactory) {
    var _a;
    const layoutDiv = layout.getRootDiv();
    const classNameMapper = layout.getClassName;
    const currentDocument = triggerElement.ownerDocument;
    const triggerRect = triggerElement.getBoundingClientRect();
    const layoutRect = (_a = layoutDiv === null || layoutDiv === void 0 ? void 0 : layoutDiv.getBoundingClientRect()) !== null && _a !== void 0 ? _a : new DOMRect(0, 0, 100, 100);
    const elm = currentDocument.createElement("div");
    elm.className = classNameMapper(Types_1.CLASSES.FLEXLAYOUT__POPUP_MENU_CONTAINER);
    if (triggerRect.left < layoutRect.left + layoutRect.width / 2) {
        elm.style.left = triggerRect.left - layoutRect.left + "px";
    }
    else {
        elm.style.right = layoutRect.right - triggerRect.right + "px";
    }
    if (triggerRect.top < layoutRect.top + layoutRect.height / 2) {
        elm.style.top = triggerRect.top - layoutRect.top + "px";
    }
    else {
        elm.style.bottom = layoutRect.bottom - triggerRect.bottom + "px";
    }
    DragDrop_1.DragDrop.instance.addGlass(() => onHide());
    DragDrop_1.DragDrop.instance.setGlassCursorOverride("default");
    if (layoutDiv) {
        layoutDiv.appendChild(elm);
    }
    const onHide = () => {
        layout.hidePortal();
        DragDrop_1.DragDrop.instance.hideGlass();
        if (layoutDiv) {
            layoutDiv.removeChild(elm);
        }
        elm.removeEventListener("mousedown", onElementMouseDown);
        currentDocument.removeEventListener("mousedown", onDocMouseDown);
    };
    const onElementMouseDown = (event) => {
        event.stopPropagation();
    };
    const onDocMouseDown = (_event) => {
        onHide();
    };
    elm.addEventListener("mousedown", onElementMouseDown);
    currentDocument.addEventListener("mousedown", onDocMouseDown);
    layout.showPortal(React.createElement(PopupMenu, { currentDocument: currentDocument, onSelect: onSelect, onHide: onHide, items: items, classNameMapper: classNameMapper, layout: layout, iconFactory: iconFactory, titleFactory: titleFactory }), elm);
}
exports.showPopup = showPopup;
/** @internal */
const PopupMenu = (props) => {
    const { items, onHide, onSelect, classNameMapper, layout, iconFactory, titleFactory } = props;
    const onItemClick = (item, event) => {
        onSelect(item);
        onHide();
        event.stopPropagation();
    };
    const itemElements = items.map((item, i) => (React.createElement("div", { key: item.index, className: classNameMapper(Types_1.CLASSES.FLEXLAYOUT__POPUP_MENU_ITEM), "data-layout-path": "/popup-menu/tb" + i, onClick: (event) => onItemClick(item, event), title: item.node.getHelpText() }, item.node.getModel().isLegacyOverflowMenu() ?
        item.node._getNameForOverflowMenu() :
        React.createElement(TabButtonStamp_1.TabButtonStamp, { node: item.node, layout: layout, iconFactory: iconFactory, titleFactory: titleFactory }))));
    return (React.createElement("div", { className: classNameMapper(Types_1.CLASSES.FLEXLAYOUT__POPUP_MENU), "data-layout-path": "/popup-menu" }, itemElements));
};
//# sourceMappingURL=PopupMenu.js.map