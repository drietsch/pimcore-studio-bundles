"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
const React = require("react");
const Types_1 = require("../Types");
/** @internal */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.debug(error);
        console.debug(errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (React.createElement("div", { className: Types_1.CLASSES.FLEXLAYOUT__ERROR_BOUNDARY_CONTAINER },
                React.createElement("div", { className: Types_1.CLASSES.FLEXLAYOUT__ERROR_BOUNDARY_CONTENT }, this.props.message)));
        }
        return this.props.children;
    }
}
exports.ErrorBoundary = ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map