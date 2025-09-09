"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slideCssFile = slideCssFile;
exports.slideJsFile = slideJsFile;
exports.packageJsonFile = packageJsonFile;
exports.labsJsonFile = labsJsonFile;
exports.configFile = configFile;
exports.labSlideFile = labSlideFile;
exports.imageFile = imageFile;
exports.web_modules = web_modules;
exports.sfeirSchoolThemeCssFile = sfeirSchoolThemeCssFile;
exports.labReadmeMdFile = labReadmeMdFile;
exports.oneLabStructure = oneLabStructure;
exports.minimalValidLabStructure = minimalValidLabStructure;
const node_fs_1 = __importDefault(require("node:fs"));
function slideCssFile() {
    return `\n`;
}
function slideJsFile(slides = []) {
    return `export function formation() { return ${JSON.stringify(slides)}.map(path => ({path})) }\n`;
}
function packageJsonFile(content = {}) {
    return JSON.stringify(content) + "\n";
}
function labsJsonFile(content = {}) {
    return JSON.stringify(content) + "\n";
}
function configFile(content = {}) {
    return { ".sfeir-theme-config.json": JSON.stringify(content) };
}
function labSlideFile({ title = "", steps = [], cmd = "" }) {
    return `<!-- .slide: class="exercice" -->

# ${title}

## Lab

<br>

${steps.map((step, index) => `${index + 1}. ${step}`)}

### ${cmd}
    `;
}
function imageFile() {
    return "";
}
function web_modules() {
    return {
        "web_modules": {
            "sfeir-school-theme": {
                dist: {
                    "sfeir-school-theme.css": sfeirSchoolThemeCssFile(),
                },
            },
        },
    };
}
function sfeirSchoolThemeCssFile() {
    return node_fs_1.default.readFileSync("./dist/sfeir-school-theme.css", "utf-8");
}
function labReadmeMdFile(name, prefix = "npm run ") {
    return `# ${name} instructions\n${prefix}${name}\n`;
}
function oneLabStructure(name, files) {
    return {
        [name]: Object.assign({}, files),
    };
}
function minimalValidLabStructure(name) {
    return Object.assign(Object.assign({}, oneLabStructure(name, {
        "package.json": packageJsonFile({ name }),
        "README.md": labReadmeMdFile(name),
    })), oneLabStructure(name + "-solution", {
        "package.json": packageJsonFile({ name: name + "-solution" }),
        "README.md": labReadmeMdFile(name),
    }));
}
//# sourceMappingURL=command-check.spec-helper.js.map