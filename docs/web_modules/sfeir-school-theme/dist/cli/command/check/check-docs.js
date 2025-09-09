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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDocs = checkDocs;
const slide_utils_1 = require("../../utils/slide.utils");
const css_utils_1 = require("../../utils/css.utils");
const labs_utils_1 = require("../../utils/labs.utils");
const fp_utils_1 = require("../../utils/fp.utils");
const assert_utils_1 = require("../../utils/assert.utils");
const path_utils_1 = require("../../utils/path.utils");
function checkDocs(rootDir, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const slideFilesFromSlidesJs = yield (0, slide_utils_1.getSlideFilesFromSlidesJs)(rootDir);
        checkSlideFilePathInSlideJs(rootDir, slideFilesFromSlidesJs);
        checkSlideFileInFs(rootDir, slideFilesFromSlidesJs, config);
        checkLabSlideFile(rootDir, slideFilesFromSlidesJs, config);
        checkLabCommand(rootDir, slideFilesFromSlidesJs, config);
        checkImagesFs(rootDir);
    });
}
function checkSlideFilePathInSlideJs(rootDir, slideFilesFromSlidesJs) {
    for (const slideFile of slideFilesFromSlidesJs) {
        const slide = JSON.stringify(slideFile);
        (0, assert_utils_1.check)("S_001", `slides.js entry "${slide}" should be a valid entry`, () => (0, fp_utils_1.isDefined)(slideFile) && (0, fp_utils_1.isDefined)(slideFile.path) &&
            slideFile.path.length > 0);
        (0, assert_utils_1.check)("S_002", `slides.js entry "${slideFile === null || slideFile === void 0 ? void 0 : slideFile.path}" does not match an existing file`, () => (0, slide_utils_1.isSlideFileExists)((0, path_utils_1.slidePath)(rootDir, slideFile.path)));
    }
}
function checkSlideFileInFs(rootDir, slideEntriesFromSlidesJs, config) {
    const slideFilesFromFs = (0, slide_utils_1.getSlideFilesFromFs)(rootDir);
    const slideFilesFromSlidesJs = slideEntriesFromSlidesJs.map((entry) => entry.path);
    const cssContent = (0, css_utils_1.getAllCssContent)(rootDir, config.extraCssFiles);
    for (const slideFile of slideFilesFromFs) {
        (0, assert_utils_1.check)("S_003", `"${slideFile}" should be used`, () => slideFilesFromSlidesJs.includes(slideFile));
        for (const imagePath of (0, slide_utils_1.getImagesPathFromSlides)(rootDir, (0, slide_utils_1.readSlideFile)(rootDir, slideFile))) {
            (0, assert_utils_1.check)("S_007", `"${imagePath}" in "${slideFile}" should be an existing images`, () => (0, slide_utils_1.isImageFileExists)(imagePath));
        }
        for (const cssClass of (0, css_utils_1.getCssClassUsedInSlide)((0, slide_utils_1.readSlideFile)(rootDir, slideFile))) {
            (0, assert_utils_1.check)("S_009", `"${cssClass}" in "${slideFile}" is not a known css class`, () => cssContent.includes(cssClass));
        }
    }
}
function checkLabSlideFile(rootDir, slideFilesFromSlidesJs, config) {
    const labSlides = (0, slide_utils_1.getLabSlides)(slideFilesFromSlidesJs);
    for (const slideFile of labSlides) {
        const labSlideContent = (0, slide_utils_1.readSlideFile)(rootDir, slideFile.path);
        const commandRow = (0, slide_utils_1.getLabSlideCommandRow)(labSlideContent, config);
        const hasCommandRow = (0, assert_utils_1.check)("S_004", `"${slideFile === null || slideFile === void 0 ? void 0 : slideFile.path}" should contains the command to run the exercise`, () => {
            return (0, fp_utils_1.isDefined)(commandRow) && commandRow.length > 0;
        });
        if (hasCommandRow && (0, fp_utils_1.isDefinedAndNotEmpty)(config.stepCommandPrefix)) {
            (0, assert_utils_1.check)("S_005", `"${slideFile === null || slideFile === void 0 ? void 0 : slideFile.path}" should contains the valid command to run the exercise`, () => {
                const commandTarget = (0, labs_utils_1.getLabCommandTarget)(commandRow, config);
                return (0, labs_utils_1.isLabCommandExists)(rootDir, commandTarget);
            });
        }
        (0, assert_utils_1.check)("S_006", `"${slideFile === null || slideFile === void 0 ? void 0 : slideFile.path}" should use lab slide format`, () => {
            const slideRows = labSlideContent.split("\n").map((row) => row.trim());
            return slideRows.includes('<!-- .slide: class="exercice" -->') &&
                slideRows.includes("## Lab");
        });
    }
}
function checkLabCommand(rootDir, labSlides, config) {
    const allLabSlides = labSlides.map((slide) => (0, slide_utils_1.readSlideFile)(rootDir, slide.path));
    const labsCommands = (0, labs_utils_1.getLabsCommands)(rootDir);
    for (const labCommand of labsCommands) {
        (0, assert_utils_1.check)("L_001", `"${labCommand}" should be used in a lab slide`, () => {
            return allLabSlides.some((slide) => slide.includes(`${config.stepCommandPrefix}${labCommand}`));
        });
    }
}
function checkImagesFs(rootDir) {
    const imagesFromFs = (0, slide_utils_1.getImagesPathFromFs)(rootDir);
    for (const imagePath of imagesFromFs) {
        (0, assert_utils_1.check)("S_008", `"${imagePath}" should be used`, () => {
            return (0, slide_utils_1.getAllSlidesImages)(rootDir).includes(imagePath);
        });
    }
}
//# sourceMappingURL=check-docs.js.map