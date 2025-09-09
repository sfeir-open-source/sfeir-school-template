"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCommand = checkCommand;
const internal_1 = require("./internal");
const assert_utils_1 = require("../../utils/assert.utils");
function checkCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, internal_1.checkCommandInternal)(command);
        if ((0, assert_utils_1.getErrors)().length === 0) {
            console.log("OK");
            process.exit(0);
        }
        else {
            (0, assert_utils_1.getErrors)().forEach((error) => {
                console.error(error.message);
            });
            process.exit((0, assert_utils_1.getErrors)().length);
        }
    });
}
//# sourceMappingURL=index.js.map