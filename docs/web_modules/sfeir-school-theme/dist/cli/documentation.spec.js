"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const node_fs_1 = __importDefault(require("node:fs"));
const README = node_fs_1.default.readFileSync("./cli/README.md", "utf-8");
const RULE_FILES = [
    "./cli/command/check/check-docs.ts",
    "./cli/command/check/check-labs.ts",
    "./cli/command/check/check-root-dir.ts",
].map((file) => node_fs_1.default.readFileSync(file, "utf-8"));
const CHECK_COMMAND_TESTS = node_fs_1.default.readFileSync("./cli/command-check.spec.ts", "utf-8");
(0, vitest_1.describe)("Documentation", () => {
    var _a, _b;
    const ruleCodesFromReadme = (_a = README.match(/([GSL]_\d{3})/g)) !== null && _a !== void 0 ? _a : [];
    const concatenedRuleFiles = RULE_FILES.join("\n");
    const ruleCodesFromCode = ensureUnique((_b = concatenedRuleFiles.match(/([GSL]_\d{3})/g)) !== null && _b !== void 0 ? _b : []);
    const allCodes = ensureUnique([
        ...ruleCodesFromReadme,
        ...ruleCodesFromCode,
    ]);
    for (const ruleCode of allCodes) {
        (0, vitest_1.describe)(ruleCode, () => {
            (0, vitest_1.it)("should correspond to a documented rule", () => {
                (0, vitest_1.expect)(ruleCodesFromReadme).includes(ruleCode);
            });
            (0, vitest_1.it)("should be unique in the documentation", () => {
                (0, vitest_1.expect)(ruleCodesFromReadme.filter((code) => code === ruleCode))
                    .toHaveLength(1);
            });
            (0, vitest_1.it)("should correspond to a check in the code", () => {
                (0, vitest_1.expect)(ruleCodesFromCode).includes(ruleCode);
            });
            (0, vitest_1.it)("should have at least one unit test", () => {
                (0, vitest_1.expect)(CHECK_COMMAND_TESTS).includes(`[${ruleCode}]`);
                (0, vitest_1.expect)(CHECK_COMMAND_TESTS).includes(`\\[CheckError\\] ${ruleCode} `);
            });
        });
    }
});
function ensureUnique(array) {
    return [...new Set(array)];
}
//# sourceMappingURL=documentation.spec.js.map