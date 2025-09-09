"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = parseArgs;
const node_path_1 = __importDefault(require("node:path"));
function parseArgs(args, currentWorkingDir) {
    if (args.includes("help")) {
        return { type: "help" };
    }
    if (args.includes("version")) {
        return { type: "version" };
    }
    if (args.includes("info")) {
        return {
            type: "info",
            rootDir: getRootDirOrDefault(args, currentWorkingDir),
        };
    }
    if (args.includes("init-config")) {
        return {
            type: "init-config",
            rootDir: getRootDirOrDefault(args, currentWorkingDir),
        };
    }
    if (args.includes("check")) {
        return {
            type: "check",
            rootDir: getRootDirOrDefault(args, currentWorkingDir),
        };
    }
    return { type: "help" };
}
function getRootDirOrDefault(args, currentWorkingDir) {
    const fromArgs = args.find((arg) => arg.startsWith("--rootDir="));
    if (fromArgs == undefined) {
        return currentWorkingDir;
    }
    return node_path_1.default.resolve(fromArgs.replace("--rootDir=", ""));
}
//# sourceMappingURL=cli.js.map