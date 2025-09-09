"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoCommand = infoCommand;
const labs_utils_1 = require("../utils/labs.utils");
const fp_utils_1 = require("../utils/fp.utils");
function infoCommand({ rootDir }) {
    const allLabs = (0, labs_utils_1.getAllLabsFromWorkspace)(rootDir);
    const { labs, labSolutions } = (0, labs_utils_1.splitLabsAndSolutions)(allLabs);
    console.log([
        "", //
        "# Labs", //
        "", //
        ...labs.map((lab) => printLab(lab, labSolutions)),
    ].join("\n"));
}
function printLab(lab, labSolutions) {
    const labSolution = labSolutions.find((labSol) => labSol.startsWith(lab));
    if ((0, fp_utils_1.isDefined)(labSolution)) {
        return ` - ${lab}(-solution)`;
    }
    else {
        return ` - ${lab}`;
    }
}
//# sourceMappingURL=info.js.map