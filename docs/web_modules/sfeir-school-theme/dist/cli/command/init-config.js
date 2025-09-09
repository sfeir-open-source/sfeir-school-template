"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConfigCommand = initConfigCommand;
const config_template_json_1 = __importDefault(require("../config-template.json"));
const node_fs_1 = __importDefault(require("node:fs"));
const path_utils_1 = require("../utils/path.utils");
function initConfigCommand({ rootDir }) {
    const configPath = (0, path_utils_1.projectConfigPath)(rootDir);
    if (node_fs_1.default.existsSync(configPath)) {
        throw new Error("Cannot init config as there is already one.");
    }
    node_fs_1.default.writeFileSync(configPath, JSON.stringify(config_template_json_1.default, undefined, 2));
}
//# sourceMappingURL=init-config.js.map