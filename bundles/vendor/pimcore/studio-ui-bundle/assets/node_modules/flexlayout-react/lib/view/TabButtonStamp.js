"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabButtonStamp = void 0;
const React = require("react");
const Types_1 = require("../Types");
const Utils_1 = require("./Utils");
/** @internal */
const TabButtonStamp = (props) => {
    const { layout, node, iconFactory, titleFactory } = props;
    const selfRef = React.useRef(null);
    const cm = layout.getClassName;
    let classNames = cm(Types_1.CLASSES.FLEXLAYOUT__TAB_BUTTON_STAMP);
    const renderState = (0, Utils_1.getRenderStateEx)(layout, node, iconFactory, titleFactory);
    let content = renderState.content ? (React.createElement("div", { className: cm(Types_1.CLASSES.FLEXLAYOUT__TAB_BUTTON_CONTENT) }, renderState.content))
        : node._getNameForOverflowMenu();
    const leading = renderState.leading ? (React.createElement("div", { className: cm(Types_1.CLASSES.FLEXLAYOUT__TAB_BUTTON_LEADING) }, renderState.leading)) : null;
    return (React.createElement("div", { ref: selfRef, className: classNames, title: node.getHelpText() },
        leading,
        content));
};
exports.TabButtonStamp = TabButtonStamp;
//# sourceMappingURL=TabButtonStamp.js.map