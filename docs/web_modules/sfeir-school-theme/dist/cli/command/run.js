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
exports.runCommand = runCommand;
const index_1 = require("./check/index");
const help_1 = require("./help");
const info_1 = require("./info");
const init_config_1 = require("./init-config");
const version_1 = require("./version");
function runCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (command.type) {
            case "check":
                yield (0, index_1.checkCommand)(command);
                break;
            case "init-config":
                yield (0, init_config_1.initConfigCommand)(command);
                break;
            case "help":
                (0, help_1.helpCommand)();
                break;
            case "info":
                (0, info_1.infoCommand)(command);
                break;
            case "version":
                (0, version_1.versionCommand)();
                break;
            default:
                throw new Error(`Command "${JSON.stringify(command)}" not implemented`);
        }
    });
}
//# sourceMappingURL=run.js.map