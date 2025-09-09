"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRootDir = checkRootDir;
const assert_utils_1 = require("../../utils/assert.utils");
const node_fs_1 = __importDefault(require("node:fs"));
const fs_utils_1 = require("../../utils/fs.utils");
function checkRootDir(command) {
    (0, assert_utils_1.check)("G_001", {
        msg: `Project root dir (${command.rootDir}) does not exist.`,
        continueCheck: false,
    }, () => (0, fs_utils_1.isDirectory)(command.rootDir));
    (0, assert_utils_1.check)("G_003", {
        msg: "Project should have a 'steps' directory",
        continueCheck: false,
    }, () => readRootDir(command).includes("steps") &&
        (0, fs_utils_1.isDirectory)(command.rootDir, "steps"));
    (0, assert_utils_1.check)("G_002", {
        msg: "Project should have a 'docs' directory",
        continueCheck: false,
    }, () => readRootDir(command).includes("docs") &&
        (0, fs_utils_1.isDirectory)(command.rootDir, "docs"));
}
function readRootDir(command) {
    return node_fs_1.default.readdirSync(command.rootDir);
}
//# sourceMappingURL=check-root-dir.js.map