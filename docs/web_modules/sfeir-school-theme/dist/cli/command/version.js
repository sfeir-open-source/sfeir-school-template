"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionCommand = versionCommand;
const package_json_1 = __importDefault(require("../../package.json"));
function versionCommand() {
    console.log("Version: " + package_json_1.default.version);
}
//# sourceMappingURL=version.js.map