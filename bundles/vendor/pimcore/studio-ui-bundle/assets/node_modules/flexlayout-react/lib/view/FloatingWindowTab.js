"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingWindowTab = void 0;
const React = require("react");
const ErrorBoundary_1 = require("./ErrorBoundary");
const I18nLabel_1 = require("../I18nLabel");
const react_1 = require("react");
const Types_1 = require("../Types");
/** @internal */
const FloatingWindowTab = (props) => {
    const { layout, node, factory } = props;
    const cm = layout.getClassName;
    const child = factory(node);
    return (React.createElement("div", { className: cm(Types_1.CLASSES.FLEXLAYOUT__FLOATING_WINDOW_TAB) },
        React.createElement(ErrorBoundary_1.ErrorBoundary, { message: props.layout.i18nName(I18nLabel_1.I18nLabel.Error_rendering_component) },
            React.createElement(react_1.Fragment, null, child))));
};
exports.FloatingWindowTab = FloatingWindowTab;
//# sourceMappingURL=FloatingWindowTab.js.map