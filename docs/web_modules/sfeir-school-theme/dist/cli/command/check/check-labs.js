"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLabs = checkLabs;
const labs_utils_1 = require("../../utils/labs.utils");
const assert_utils_1 = require("../../utils/assert.utils");
const fp_utils_1 = require("../../utils/fp.utils");
function checkLabs(rootDir, config) {
    checkLabDirectories(rootDir, config);
    checkLabsAndSolutions(rootDir, config);
}
function checkLabDirectories(rootDir, config) {
    const stepsPackageJson = (0, labs_utils_1.getWorkspaceStepsPackageJson)(rootDir);
    const labDirectories = (0, labs_utils_1.getAllLabsFromFs)(rootDir, config);
    const labsDeclared = (0, labs_utils_1.getAllLabsFromWorkspace)(rootDir);
    const labScripts = (0, labs_utils_1.getAllLabScripts)(rootDir);
    for (const labDir of labDirectories) {
        (0, assert_utils_1.check)("L_002", `Lab "${labDir}" should be declared in the workspace (either "workspaces" or "labs" in a file "package.json" or "labs.json" at the root of "steps" directory)`, () => labsDeclared.includes(labDir));
        if ((stepsPackageJson === null || stepsPackageJson === void 0 ? void 0 : stepsPackageJson.kind) === "package.json") {
            (0, assert_utils_1.check)("L_003", `Lab "${labDir}" should have corresponding script`, () => labScripts.includes(labDir));
            (0, assert_utils_1.check)("L_004", `Lab "${labDir}" should have a package.json with corresponding name`, () => { var _a; return ((_a = (0, labs_utils_1.getLabPackageJson)(rootDir, labDir)) === null || _a === void 0 ? void 0 : _a.name) === labDir; });
        }
    }
}
function checkLabsAndSolutions(rootDir, config) {
    const labDirectories = (0, labs_utils_1.getAllLabsFromFs)(rootDir, config);
    const { labs, labSolutions } = (0, labs_utils_1.splitLabsAndSolutions)(labDirectories);
    for (const lab of labs) {
        const readme = (0, labs_utils_1.getLabReadme)(rootDir, lab);
        const hasReadme = (0, assert_utils_1.check)("L_005", `Lab "${lab}" should have a README.md`, () => (0, fp_utils_1.isDefined)(readme) && readme.length > 0);
        if (hasReadme) {
            (0, assert_utils_1.check)("L_006", `Lab "${lab}"'s README.md should contains the correct title`, () => { var _a; return (_a = readme === null || readme === void 0 ? void 0 : readme.includes(`# ${lab} instructions`)) !== null && _a !== void 0 ? _a : false; });
            (0, assert_utils_1.check)("L_007", `Lab "${lab}"'s README.md should contains the correct command`, () => {
                var _a;
                return (_a = readme === null || readme === void 0 ? void 0 : readme.includes(`${config.stepCommandPrefix}${lab}`)) !== null && _a !== void 0 ? _a : false;
            });
        }
        (0, assert_utils_1.check)("L_008", `Lab "${lab}" should have a solution`, () => labSolutions.includes(lab + "-solution"));
    }
    for (const labSolution of labSolutions) {
        const matchingLabName = labSolution.replace("-solution", "");
        const hasMatchingLab = (0, assert_utils_1.check)("L_009", `Solution lab "${labSolution}" should match to a lab`, () => labs.includes(matchingLabName));
        if (hasMatchingLab) {
            const labReadme = (0, labs_utils_1.getLabReadme)(rootDir, matchingLabName);
            const labSolutionReadme = (0, labs_utils_1.getLabReadme)(rootDir, labSolution);
            (0, assert_utils_1.check)("L_010", `Lab and solution of "${matchingLabName}" should have same README.md`, () => labReadme === labSolutionReadme);
        }
    }
}
//# sourceMappingURL=check-labs.js.map