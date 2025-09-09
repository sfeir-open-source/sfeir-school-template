"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectConfig = getProjectConfig;
const config_template_json_1 = __importDefault(require("../config-template.json"));
const node_fs_1 = __importDefault(require("node:fs"));
const path_utils_1 = require("./path.utils");
function getProjectConfig(rootDir) {
    const configPath = (0, path_utils_1.projectConfigPath)(rootDir);
    if (node_fs_1.default.existsSync(configPath)) {
        return Object.assign(Object.assign({}, config_template_json_1.default), (JSON.parse(node_fs_1.default.readFileSync(configPath, "utf-8"))));
    }
    else {
        return config_template_json_1.default;
    }
}
//# sourceMappingURL=config.utils.js.map