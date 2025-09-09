"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsPath = docsPath;
exports.docsMarkdownPath = docsMarkdownPath;
exports.slidePath = slidePath;
exports.docsFilePath = docsFilePath;
exports.docsImagesPath = docsImagesPath;
exports.docsImagePath = docsImagePath;
exports.labsPath = labsPath;
exports.labsDirPackageJsonPath = labsDirPackageJsonPath;
exports.labsDirLabsJsonPath = labsDirLabsJsonPath;
exports.projectConfigPath = projectConfigPath;
exports.labPackageJsonPath = labPackageJsonPath;
exports.labReadmePath = labReadmePath;
const node_path_1 = __importDefault(require("node:path"));
function docsPath(rootDir) {
    return node_path_1.default.resolve(rootDir, "docs");
}
function docsMarkdownPath(rootDir) {
    return node_path_1.default.resolve(docsPath(rootDir), "markdown");
}
function slidePath(rootDir, slideFile) {
    return node_path_1.default.resolve(docsMarkdownPath(rootDir), slideFile);
}
function docsFilePath(rootDir, assetFile) {
    return node_path_1.default.resolve(docsPath(rootDir), assetFile);
}
function docsImagesPath(rootDir) {
    return node_path_1.default.resolve(docsPath(rootDir), "assets", "images");
}
function docsImagePath(rootDir, filePath) {
    return node_path_1.default.resolve(docsImagesPath(rootDir), filePath);
}
function labsPath(rootDir) {
    return node_path_1.default.resolve(rootDir, "steps");
}
function labsDirPackageJsonPath(rootDir) {
    return node_path_1.default.resolve(labsPath(rootDir), "package.json");
}
function labsDirLabsJsonPath(rootDir) {
    return node_path_1.default.resolve(labsPath(rootDir), "labs.json");
}
function projectConfigPath(rootDir) {
    return node_path_1.default.resolve(rootDir, ".sfeir-theme-config.json");
}
function labPackageJsonPath(rootDir, lab) {
    return node_path_1.default.resolve(labsPath(rootDir), lab, "package.json");
}
function labReadmePath(rootDir, lab) {
    return node_path_1.default.resolve(labsPath(rootDir), lab, "README.md");
}
//# sourceMappingURL=path.utils.js.map