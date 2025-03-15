"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperationDefinitions = void 0;
const types_1 = require("../types");
function getOperationDefinitions(v3Doc) {
    return Object.entries(v3Doc.paths).flatMap(([path, pathItem]) => !pathItem
        ? []
        : Object.entries(pathItem)
            .filter((arg) => types_1.operationKeys.includes(arg[0]))
            .map(([verb, operation]) => ({
            path,
            verb,
            pathItem,
            operation,
        })));
}
exports.getOperationDefinitions = getOperationDefinitions;
//# sourceMappingURL=getOperationDefinitions.js.map