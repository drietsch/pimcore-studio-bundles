"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = void 0;
function isValidUrl(string) {
    try {
        new URL(string);
    }
    catch (_) {
        return false;
    }
    return true;
}
exports.isValidUrl = isValidUrl;
//# sourceMappingURL=isValidUrl.js.map