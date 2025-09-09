"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCssContent = getAllCssContent;
exports.getCssClassUsedInSlide = getCssClassUsedInSlide;
const path_utils_1 = require("./path.utils");
const node_fs_1 = __importDefault(require("node:fs"));
const THEME_CSS_FILES = [
    "web_modules/sfeir-school-theme/dist/sfeir-school-theme.css",
    "css/slides.css",
];
const OTHER_KNOWN_CSS_CLASSES = [
    ".list-fragment",
    ".transition-bg-sfeir-1",
    ".transition-bg-sfeir-2",
    ".transition-bg-sfeir-3",
];
function getAllCssContent(rootDir, extraCssFiles) {
    return (THEME_CSS_FILES.concat(extraCssFiles)).map((cssFilePath) => getCssFile(rootDir, cssFilePath)).concat(OTHER_KNOWN_CSS_CLASSES).join("\n\n\n");
}
function getCssFile(rootDir, cssPath) {
    const filePath = (0, path_utils_1.docsFilePath)(rootDir, cssPath);
    try {
        return node_fs_1.default.readFileSync(filePath, "utf-8");
    }
    catch (_a) {
        throw new Error(`Cannot find: ${filePath}`);
    }
}
function getCssClassUsedInSlide(fileContent) {
    return fileContent.split("\n")
        .map((row) => {
        // for syntax like:
        // <!-- .slide: class="with-code" -->
        // <!-- .slide: class="transition-bg-blue-3 right" -->
        if (row.startsWith("<!--")) {
            const classesPart = row.split('class="')[1];
            return classesPart === null || classesPart === void 0 ? void 0 : classesPart.substring(0, classesPart.indexOf('"'));
        }
        const trimmed = row.trimEnd();
        // for syntax like:
        // ![](./assets/images/logo-sfeir-blanc.png 'company')
        if (row.startsWith("![") && trimmed.endsWith("')")) {
            return row.substring(trimmed.lastIndexOf(" '") + 2, trimmed.length - 2);
        }
        return undefined;
    })
        .filter((classes) => classes != undefined)
        .flatMap((classes) => classes.split(" "));
}
//# sourceMappingURL=css.utils.js.map