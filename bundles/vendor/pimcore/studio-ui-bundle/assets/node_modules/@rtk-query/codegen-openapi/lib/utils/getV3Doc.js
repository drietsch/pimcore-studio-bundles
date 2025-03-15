"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getV3Doc = void 0;
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
// @ts-ignore
const swagger2openapi_1 = __importDefault(require("swagger2openapi"));
async function getV3Doc(spec) {
    const doc = await swagger_parser_1.default.bundle(spec);
    const isOpenApiV3 = 'openapi' in doc && doc.openapi.startsWith('3');
    if (isOpenApiV3) {
        return doc;
    }
    else {
        const result = await swagger2openapi_1.default.convertObj(doc, {});
        return result.openapi;
    }
}
exports.getV3Doc = getV3Doc;
//# sourceMappingURL=getV3Doc.js.map