#!/usr/bin/env node
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
const assert_utils_1 = require("./utils/assert.utils");
const cli_1 = require("./cli");
const run_1 = require("./command/run");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, run_1.runCommand)((0, cli_1.parseArgs)(process.argv, process.cwd()));
    }
    catch (error) {
        if (error instanceof assert_utils_1.CheckError) {
            console.error(error.message);
            process.exit(1);
        }
        if (error instanceof Error) {
            console.error(error.message);
            console.error(error.stack);
            process.exit(2);
        }
    }
}))();
//# sourceMappingURL=main.js.map