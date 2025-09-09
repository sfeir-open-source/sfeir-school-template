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
exports.checkCommandInternal = checkCommandInternal;
const check_docs_1 = require("./check-docs");
const check_labs_1 = require("./check-labs");
const check_root_dir_1 = require("./check-root-dir");
const config_utils_1 = require("../../utils/config.utils");
function checkCommandInternal(command) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, check_root_dir_1.checkRootDir)(command);
        const config = (0, config_utils_1.getProjectConfig)(command.rootDir);
        yield (0, check_docs_1.checkDocs)(command.rootDir, config);
        (0, check_labs_1.checkLabs)(command.rootDir, config);
    });
}
//# sourceMappingURL=internal.js.map