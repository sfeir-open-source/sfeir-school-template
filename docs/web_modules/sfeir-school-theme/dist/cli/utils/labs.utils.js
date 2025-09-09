"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStepDirectoryExists = isStepDirectoryExists;
exports.getWorkspaceStepsPackageJson = getWorkspaceStepsPackageJson;
exports.getAllLabsFromWorkspace = getAllLabsFromWorkspace;
exports.getLabsCommands = getLabsCommands;
exports.isLabCommandExists = isLabCommandExists;
exports.getLabCommandTarget = getLabCommandTarget;
exports.getAllLabsFromFs = getAllLabsFromFs;
exports.getAllLabScripts = getAllLabScripts;
exports.getLabPackageJson = getLabPackageJson;
exports.splitLabsAndSolutions = splitLabsAndSolutions;
exports.getLabReadme = getLabReadme;
const path_utils_1 = require("./path.utils");
const node_fs_1 = __importDefault(require("node:fs"));
const fs_utils_1 = require("./fs.utils");
const fp_utils_1 = require("./fp.utils");
function isStepDirectoryExists(stepDirPath) {
    return node_fs_1.default.existsSync(stepDirPath);
}
function getWorkspaceStepsPackageJson(rootDir) {
    const packageJson = (0, path_utils_1.labsDirPackageJsonPath)(rootDir);
    const labsJson = (0, path_utils_1.labsDirLabsJsonPath)(rootDir);
    if (node_fs_1.default.existsSync(packageJson)) {
        const raw = JSON.parse(node_fs_1.default.readFileSync(packageJson, "utf-8"));
        return Object.assign(Object.assign({}, raw), { kind: "package.json" });
    }
    else if (node_fs_1.default.existsSync(labsJson)) {
        const raw = JSON.parse(node_fs_1.default.readFileSync(labsJson, "utf-8"));
        return Object.assign(Object.assign({}, raw), { kind: "labs.json" });
    }
    else {
        return null;
    }
}
function extractLabsListFromPackageJson(packageJson) {
    var _a, _b, _c;
    if ((0, fp_utils_1.isNotDefined)(packageJson)) {
        return [];
    }
    if (packageJson.kind === "package.json") {
        return (_b = (_a = packageJson.workspaces) !== null && _a !== void 0 ? _a : packageJson.labs) !== null && _b !== void 0 ? _b : [];
    }
    if (packageJson.kind === "labs.json") {
        return (_c = packageJson.labs) !== null && _c !== void 0 ? _c : [];
    }
    return [];
}
function getAllLabsFromWorkspace(rootDir, { withSolution = true } = {}) {
    const packageJson = getWorkspaceStepsPackageJson(rootDir);
    const allCommands = extractLabsListFromPackageJson(packageJson);
    if (withSolution) {
        return allCommands;
    }
    else {
        return allCommands.filter((labCommand) => !labCommand.includes("-solution"));
    }
}
function getLabsCommands(rootDir, { withSolution = false } = {}) {
    return getAllLabsFromWorkspace(rootDir, { withSolution });
}
function isLabCommandExists(rootDir, commandName) {
    return getLabsCommands(rootDir).includes(commandName);
}
function getLabCommandTarget(labCommandRow, config) {
    var _a;
    return (_a = labCommandRow.split(config.stepCommandPrefix)[1]) === null || _a === void 0 ? void 0 : _a.trim();
}
function getAllLabsFromFs(rootDir, config) {
    return node_fs_1.default.readdirSync((0, path_utils_1.labsPath)(rootDir), { encoding: "utf-8" })
        .filter((filePath) => !config.ignoreStepsDirectories.includes(filePath))
        .filter((filePath) => (0, fs_utils_1.isDirectory)((0, path_utils_1.labsPath)(rootDir), filePath));
}
function getAllLabScripts(rootDir) {
    var _a;
    const packageJson = getWorkspaceStepsPackageJson(rootDir);
    if ((packageJson === null || packageJson === void 0 ? void 0 : packageJson.kind) === "package.json") {
        return Object.keys((_a = packageJson.scripts) !== null && _a !== void 0 ? _a : {});
    }
    else {
        return [];
    }
}
function getLabPackageJson(rootDir, lab) {
    try {
        return JSON.parse(node_fs_1.default.readFileSync((0, path_utils_1.labPackageJsonPath)(rootDir, lab), "utf-8"));
    }
    catch (_a) {
        return null;
    }
}
function splitLabsAndSolutions(labNames) {
    const labs = [];
    const labSolutions = [];
    for (const lab of labNames) {
        if (lab.endsWith("-solution")) {
            labSolutions.push(lab);
        }
        else {
            labs.push(lab);
        }
    }
    return { labs, labSolutions };
}
function getLabReadme(rootDir, lab) {
    try {
        return node_fs_1.default.readFileSync((0, path_utils_1.labReadmePath)(rootDir, lab), "utf-8");
    }
    catch (_a) {
        return null;
    }
}
//# sourceMappingURL=labs.utils.js.map