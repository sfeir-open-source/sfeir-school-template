"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlideFilesFromSlidesJs = getSlideFilesFromSlidesJs;
exports.getSlideFilesFromFs = getSlideFilesFromFs;
exports.importSlidesJs = importSlidesJs;
exports.isSlideFileExists = isSlideFileExists;
exports.getAllSlidesImages = getAllSlidesImages;
exports.getLabSlides = getLabSlides;
exports.readSlideFile = readSlideFile;
exports.getLabSlideCommandRow = getLabSlideCommandRow;
exports.getImagesPathFromSlides = getImagesPathFromSlides;
exports.getImagesPathFromFs = getImagesPathFromFs;
exports.isImageFileExists = isImageFileExists;
const path_utils_1 = require("./path.utils");
const node_fs_1 = __importDefault(require("node:fs"));
const fs_utils_1 = require("./fs.utils");
const node_path_1 = __importDefault(require("node:path"));
function getSlideFilesFromSlidesJs(rootDir) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield import(importSlidesJs(rootDir))).formation();
    });
}
function getSlideFilesFromFs(rootDir) {
    return node_fs_1.default
        .readdirSync(node_path_1.default.resolve((0, path_utils_1.docsMarkdownPath)(rootDir)), {
        encoding: "utf-8",
        recursive: true,
    })
        .filter((path) => path.endsWith(".md"));
}
function importSlidesJs(rootDir) {
    return ("data:text/javascript;charset=utf-8," +
        encodeURIComponent(node_fs_1.default
            .readFileSync(node_path_1.default.resolve((0, path_utils_1.docsPath)(rootDir), "scripts/slides.js"), "utf-8")
            .split("\n")
            .filter((line) => !line.includes("SfeirThemeInitializer"))
            .join("\n")));
}
function isSlideFileExists(slideFilePath) {
    return node_fs_1.default.existsSync(slideFilePath);
}
function getAllSlidesImages(rootDir) {
    return getSlideFilesFromFs(rootDir).map((file) => readSlideFile(rootDir, file)).flatMap((fileContent) => getImagesPathFromSlides(rootDir, fileContent));
}
function getLabSlides(slides) {
    return slides.filter((slide) => slide.path.includes("-lab-") || slide.path.includes("-lab.md"));
}
function readSlideFile(rootDir, slideFilePath) {
    return node_fs_1.default.readFileSync((0, path_utils_1.slidePath)(rootDir, slideFilePath), "utf-8");
}
function getLabSlideCommandRow(file, config) {
    return file.split("\n").find((row) => row.includes(config.stepCommandPrefix));
}
function getImagesPathFromSlides(rootDir, fileContent) {
    return fileContent
        .split("\n")
        .filter((row) => row.startsWith("!["))
        .map(extractUrlPart)
        .filter((url) => !url.startsWith("http"))
        .filter(isImageInAssetsDir)
        .map((imgPath) => (0, path_utils_1.docsFilePath)(rootDir, imgPath));
    function extractUrlPart(imageMdRow) {
        const secondPart = imageMdRow.split("](")[1];
        const urlPart = secondPart === null || secondPart === void 0 ? void 0 : secondPart.substring(0, secondPart.lastIndexOf(")"));
        if (urlPart.endsWith("'")) {
            return urlPart.substring(0, urlPart.lastIndexOf(" '"));
        }
        else {
            return urlPart;
        }
    }
    function isImageInAssetsDir(imagePath) {
        return imagePath.startsWith("assets") ||
            imagePath.startsWith("./assets");
    }
}
function getImagesPathFromFs(rootDir) {
    return node_fs_1.default.readdirSync((0, path_utils_1.docsImagesPath)(rootDir), {
        encoding: "utf-8",
        recursive: true,
    }).filter((imagePath) => !(0, fs_utils_1.isDirectory)((0, path_utils_1.docsImagesPath)(rootDir), imagePath))
        .filter((imagePath) => !imagePath.includes("sfeir-school-logo.png"))
        .map((imagePath) => (0, path_utils_1.docsImagePath)(rootDir, imagePath));
}
function isImageFileExists(imageFilePath) {
    return node_fs_1.default.existsSync(imageFilePath);
}
//# sourceMappingURL=slide.utils.js.map