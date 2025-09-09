"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefined = isDefined;
exports.isNotDefined = isNotDefined;
exports.isNotEmpty = isNotEmpty;
exports.isDefinedAndNotEmpty = isDefinedAndNotEmpty;
function isDefined(x) {
    return x != undefined;
}
function isNotDefined(x) {
    return x == undefined;
}
function isNotEmpty(x) {
    return x.length > 0;
}
function isDefinedAndNotEmpty(x) {
    return isDefined(x) && isNotEmpty(x);
}
//# sourceMappingURL=fp.utils.js.map