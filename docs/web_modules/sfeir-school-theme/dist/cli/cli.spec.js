"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
const vitest_1 = require("vitest");
(0, vitest_1.describe)(cli_1.parseArgs.name, () => {
    (0, vitest_1.it)("should enable help command by default", () => {
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs(), "./cwd").type).toBe("help");
    });
    (0, vitest_1.it)("should enable help command if 'help' is present", () => {
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("help"), "./cwd").type).toBe("help");
    });
    (0, vitest_1.it)("should enable version command if 'version' is present", () => {
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("version"), "./cwd").type).toBe("version");
    });
    (0, vitest_1.it)("should enable help command if 'version' and 'help' are present", () => {
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("version", "help"), "./cwd").type).toBe("help");
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("help", "version"), "./cwd").type).toBe("help");
    });
    (0, vitest_1.it)("should enable version command if 'info' is present", () => {
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("info"), "./cwd").type).toBe("info");
    });
    (0, vitest_1.it)("should enable check command with custom root dir if 'info' is present with option --rootDir", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("info", "--rootDir=/other/path"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("info");
        (0, vitest_1.expect)(res.rootDir).toBe("/other/path");
    });
    (0, vitest_1.it)("should enable help command if 'info' and 'help' are present", () => {
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("info", "help"), "./cwd").type).toBe("help");
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("help", "info"), "./cwd").type).toBe("help");
    });
    (0, vitest_1.it)("should enable version command if 'info' and 'version' are present", () => {
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("info", "version"), "./cwd").type).toBe("version");
        (0, vitest_1.expect)((0, cli_1.parseArgs)(withBaseArgs("version", "info"), "./cwd").type).toBe("version");
    });
    (0, vitest_1.it)("should enable check command if 'check' is present", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("check"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("check");
        (0, vitest_1.expect)(res.rootDir).toBe("./cwd");
    });
    (0, vitest_1.it)("should enable version command if 'check' and 'version' are present", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("check", "version"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("version");
    });
    (0, vitest_1.it)("should enable help command if 'check' and 'help' are present", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("check", "help"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("help");
    });
    (0, vitest_1.it)("should enable check command with custom root dir if 'check' is present with option --rootDir", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("check", "--rootDir=/other/path"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("check");
        (0, vitest_1.expect)(res.rootDir).toBe("/other/path");
    });
    (0, vitest_1.it)("should enable init-config command if 'init-config' is present", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("init-config"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("init-config");
        (0, vitest_1.expect)(res.rootDir).toBe("./cwd");
    });
    (0, vitest_1.it)("should enable version command if 'init-config' and 'version' are present", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("init-config", "version"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("version");
    });
    (0, vitest_1.it)("should enable help command if 'init-config' and 'help' are present", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("init-config", "help"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("help");
    });
    (0, vitest_1.it)("should enable init-config command if 'init-config' and 'check' are present", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("check", "init-config"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("init-config");
    });
    (0, vitest_1.it)("should enable init-config command with custom root dir if 'init-config' is present with option --rootDir", () => {
        const res = (0, cli_1.parseArgs)(withBaseArgs("init-config", "--rootDir=/other/path"), "./cwd");
        (0, vitest_1.expect)(res.type).toBe("init-config");
        (0, vitest_1.expect)(res.rootDir).toBe("/other/path");
    });
    function withBaseArgs(...args) {
        return [
            "/path/to/node",
            "/path/to/main.js",
            ...args,
        ];
    }
});
//# sourceMappingURL=cli.spec.js.map