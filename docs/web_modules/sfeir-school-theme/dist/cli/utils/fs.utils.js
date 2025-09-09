"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDirectory = isDirectory;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function isDirectory(dir, file) {
    try {
        if (file == undefined) {
            return node_fs_1.default.statSync(dir).isDirectory();
        }
        else {
            return node_fs_1.default.statSync(node_path_1.default.resolve(dir, file)).isDirectory();
        }
    }
    catch (_a) {
        return false;
    }
}
//# sourceMappingURL=fs.utils.js.map