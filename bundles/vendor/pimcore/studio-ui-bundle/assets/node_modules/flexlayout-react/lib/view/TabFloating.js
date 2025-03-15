"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabFloating = void 0;
const React = require("react");
const Actions_1 = require("../model/Actions");
const TabSetNode_1 = require("../model/TabSetNode");
const Types_1 = require("../Types");
const I18nLabel_1 = require("../I18nLabel");
const Utils_1 = require("./Utils");
/** @internal */
const TabFloating = (props) => {
    const { layout, selected, node, path } = props;
    const showPopout = () => {
        if (node.getWindow()) {
            node.getWindow().focus();
        }
    };
    const dockPopout = () => {
        layout.doAction(Actions_1.Actions.unFloatTab(node.getId()));
    };
    const onMouseDown = () => {
        const parent = node.getParent();
        if (parent.getType() === TabSetNode_1.TabSetNode.TYPE) {
            if (!parent.isActive()) {
                layout.doAction(Actions_1.Actions.setActiveTabset(parent.getId()));
            }
        }
    };
    const onClickFocus = (event) => {
        event.preventDefault();
        showPopout();
    };
    const onClickDock = (event) => {
        event.preventDefault();
        dockPopout();
    };
    const cm = layout.getClassName;
    const parentNode = node.getParent();
    const style = node._styleWithPosition();
    if (!selected) {
        (0, Utils_1.hideElement)(style, node.getModel().isUseVisibility());
    }
    if (parentNode instanceof TabSetNode_1.TabSetNode) {
        if (node.getModel().getMaximizedTabset() !== undefined && !parentNode.isMaximized()) {
            (0, Utils_1.hideElement)(style, node.getModel().isUseVisibility());
        }
    }
    const message = layout.i18nName(I18nLabel_1.I18nLabel.Floating_Window_Message);
    const showMessage = layout.i18nName(I18nLabel_1.I18nLabel.Floating_Window_Show_Window);
    const dockMessage = layout.i18nName(I18nLabel_1.I18nLabel.Floating_Window_Dock_Window);
    const customRenderCallback = layout.getOnRenderFloatingTabPlaceholder();
    if (customRenderCallback) {
        return (React.createElement("div", { className: cm(Types_1.CLASSES.FLEXLAYOUT__TAB_FLOATING), onMouseDown: onMouseDown, onTouchStart: onMouseDown, style: style }, customRenderCallback(dockPopout, showPopout)));
    }
    else {
        return (React.createElement("div", { className: cm(Types_1.CLASSES.FLEXLAYOUT__TAB_FLOATING), "data-layout-path": path, onMouseDown: onMouseDown, onTouchStart: onMouseDown, style: style },
            React.createElement("div", { className: cm(Types_1.CLASSES.FLEXLAYOUT__TAB_FLOATING_INNER) },
                React.createElement("div", null, message),
                React.createElement("div", null,
                    React.createElement("a", { href: "#", onClick: onClickFocus }, showMessage)),
                React.createElement("div", null,
                    React.createElement("a", { href: "#", onClick: onClickDock }, dockMessage)))));
    }
};
exports.TabFloating = TabFloating;
//# sourceMappingURL=TabFloating.js.map