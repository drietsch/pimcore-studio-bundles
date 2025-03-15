"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const React = require("react");
const react_1 = require("react");
const Actions_1 = require("../model/Actions");
const TabSetNode_1 = require("../model/TabSetNode");
const Types_1 = require("../Types");
const ErrorBoundary_1 = require("./ErrorBoundary");
const I18nLabel_1 = require("../I18nLabel");
const BorderNode_1 = require("../model/BorderNode");
const Utils_1 = require("./Utils");
/** @internal */
const Tab = (props) => {
    const { layout, selected, node, factory, path } = props;
    const [renderComponent, setRenderComponent] = React.useState(!props.node.isEnableRenderOnDemand() || props.selected);
    React.useLayoutEffect(() => {
        if (!renderComponent && selected) {
            // load on demand
            // console.log("load on demand: " + node.getName());
            setRenderComponent(true);
        }
    });
    const onMouseDown = () => {
        const parent = node.getParent();
        if (parent.getType() === TabSetNode_1.TabSetNode.TYPE) {
            if (!parent.isActive()) {
                layout.doAction(Actions_1.Actions.setActiveTabset(parent.getId()));
            }
        }
    };
    const cm = layout.getClassName;
    const useVisibility = node.getModel().isUseVisibility();
    const parentNode = node.getParent();
    const style = node._styleWithPosition();
    if (!selected) {
        (0, Utils_1.hideElement)(style, useVisibility);
    }
    if (parentNode instanceof TabSetNode_1.TabSetNode) {
        if (node.getModel().getMaximizedTabset() !== undefined && !parentNode.isMaximized()) {
            (0, Utils_1.hideElement)(style, useVisibility);
        }
    }
    let child;
    if (renderComponent) {
        child = factory(node);
    }
    let className = cm(Types_1.CLASSES.FLEXLAYOUT__TAB);
    if (parentNode instanceof BorderNode_1.BorderNode) {
        className += " " + cm(Types_1.CLASSES.FLEXLAYOUT__TAB_BORDER);
        className += " " + cm(Types_1.CLASSES.FLEXLAYOUT__TAB_BORDER_ + parentNode.getLocation().getName());
    }
    if (node.getContentClassName() !== undefined) {
        className += " " + node.getContentClassName();
    }
    return (React.createElement("div", { className: className, "data-layout-path": path, onMouseDown: onMouseDown, onTouchStart: onMouseDown, style: style },
        React.createElement(ErrorBoundary_1.ErrorBoundary, { message: props.layout.i18nName(I18nLabel_1.I18nLabel.Error_rendering_component) },
            React.createElement(react_1.Fragment, null, child))));
};
exports.Tab = Tab;
//# sourceMappingURL=Tab.js.map