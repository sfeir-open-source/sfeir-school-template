"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileContent = isFileContent;
exports.buildProject = buildProject;
const node_fs_1 = __importDefault(require("node:fs"));
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
function isFileContent(x) {
    return typeof x === "string";
}
// function isDirStruct(x: DirStruct | FileContent): x is DirStruct {
//     return typeof x === 'object';
// }
function buildProject(project) {
    const rootDir = node_fs_1.default.mkdtempSync(node_path_1.default.join(node_os_1.default.tmpdir(), "sfeir-school-theme__cli_check__"));
    buildDirectory(rootDir, { project });
    console.log("PROJECT BUILT", rootDir);
    return `${rootDir}/project`;
}
function buildDirectory(rootDir, dir) {
    for (const [name, struct] of Object.entries(dir)) {
        if (isFileContent(struct)) {
            node_fs_1.default.writeFileSync(`${rootDir}/${name}`, struct, "utf-8");
        }
        else {
            const dir = `${rootDir}/${name}`;
            node_fs_1.default.mkdirSync(dir);
            buildDirectory(dir, struct);
        }
    }
}
//# sourceMappingURL=project-builder.utils.js.map