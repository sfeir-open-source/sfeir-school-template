"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckError = void 0;
exports.check = check;
exports.getErrors = getErrors;
exports.__TEST_ONLY__cleanupErrors = __TEST_ONLY__cleanupErrors;
const ERRORS = [];
function check(ruleId, msg, predicate) {
    if (predicate()) {
        return true;
    }
    else {
        if (typeof msg === "string") {
            ERRORS.push(new CheckError(ruleId, msg));
        }
        else {
            const error = new CheckError(ruleId, msg.msg, msg.continueCheck);
            ERRORS.push(error);
            if (!msg.continueCheck) {
                throw error;
            }
        }
        return false;
    }
}
class CheckError extends Error {
    constructor(ruleId, message, continueCheck = true) {
        super(`[CheckError] ${ruleId} ${message}`);
        this.continueCheck = continueCheck;
    }
}
exports.CheckError = CheckError;
function getErrors() {
    return ERRORS;
}
function __TEST_ONLY__cleanupErrors() {
    ERRORS.splice(0, ERRORS.length);
}
//# sourceMappingURL=assert.utils.js.map