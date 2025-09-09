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
const vitest_1 = require("vitest");
const command_check_spec_helper_1 = require("./command-check.spec-helper");
const project_builder_utils_1 = require("./test-utils/project-builder.utils");
const internal_1 = require("./command/check/internal");
(0, vitest_1.describe)("check command", () => {
    (0, vitest_1.beforeEach)(() => (0, assert_utils_1.__TEST_ONLY__cleanupErrors)());
    (0, vitest_1.describe)("valid projects", () => {
        (0, vitest_1.it)("minimal valid empty project", () => __awaiter(void 0, void 0, void 0, function* () {
            const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: { images: {} }, css: {
                        "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                    }, markdown: {}, scripts: {
                        "slides.js": (0, command_check_spec_helper_1.slideJsFile)(),
                    } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                    "package.json": (0, command_check_spec_helper_1.packageJsonFile)(),
                } }));
            yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
            console.error((0, assert_utils_1.getErrors)());
            (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(0);
        }));
        (0, vitest_1.it)("simple project with no command prefix", () => __awaiter(void 0, void 0, void 0, function* () {
            const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "" })), { docs: Object.assign({ assets: {
                        images: {
                            "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                        },
                    }, css: {
                        "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                    }, markdown: {
                        "01-getting-started.md": "![](./assets/images/foo.png)",
                        "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                            title: "Getting started",
                            cmd: "Go to 01-getting-started",
                        }),
                    }, scripts: {
                        "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                            "01-getting-started.md",
                            "01-lab-getting-started.md",
                        ]),
                    } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                    "labs.json": (0, command_check_spec_helper_1.labsJsonFile)({
                        labs: [
                            "01-getting-started",
                            "01-getting-started-solution",
                        ],
                    }),
                    "01-getting-started": {
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started", ""),
                    },
                    "01-getting-started-solution": {
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started", ""),
                    },
                } }));
            yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
            console.error((0, assert_utils_1.getErrors)());
            (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(0);
        }));
        (0, vitest_1.it)("simple npm project with workspace", () => __awaiter(void 0, void 0, void 0, function* () {
            const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                        images: {
                            "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                        },
                    }, css: {
                        "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                    }, markdown: {
                        "01-getting-started.md": "![](./assets/images/foo.png)",
                        "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                            title: "Getting started",
                            cmd: "npm run 01-getting-started",
                        }),
                    }, scripts: {
                        "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                            "01-getting-started.md",
                            "01-lab-getting-started.md",
                        ]),
                    } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                    "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                        workspaces: ["01-getting-started"],
                        scripts: {
                            "01-getting-started": "",
                        },
                    }),
                } }));
            yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
            console.error((0, assert_utils_1.getErrors)());
            (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(0);
        }));
        (0, vitest_1.it)("simple npm project without workspace", () => __awaiter(void 0, void 0, void 0, function* () {
            const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: { images: {} }, css: {
                        "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                    }, markdown: {
                        "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                            title: "Getting started",
                            cmd: "npm run 01-getting-started",
                        }),
                    }, scripts: {
                        "slides.js": (0, command_check_spec_helper_1.slideJsFile)(["01-lab-getting-started.md"]),
                    } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                    "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                        labs: ["01-getting-started"],
                        scripts: {
                            "01-getting-started": "",
                        },
                    }),
                } }));
            yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
            console.error((0, assert_utils_1.getErrors)());
            (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(0);
        }));
        (0, vitest_1.it)("npm project with command prefix override", () => __awaiter(void 0, void 0, void 0, function* () {
            const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "yarn run " })), { docs: Object.assign({ assets: { images: {} }, css: {
                        "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                    }, markdown: {
                        "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                            title: "Getting started",
                            cmd: "yarn run 01-getting-started",
                        }),
                    }, scripts: {
                        "slides.js": (0, command_check_spec_helper_1.slideJsFile)(["01-lab-getting-started.md"]),
                    } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                    "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                        workspaces: ["01-getting-started"],
                        scripts: {
                            "01-getting-started": "",
                        },
                    }),
                } }));
            yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
            console.error((0, assert_utils_1.getErrors)());
            (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(0);
        }));
        (0, vitest_1.it)("Slides with images", () => __awaiter(void 0, void 0, void 0, function* () {
            const rootDir = (0, project_builder_utils_1.buildProject)({
                docs: Object.assign({ assets: {
                        images: {
                            "intro.png": (0, command_check_spec_helper_1.imageFile)(),
                            "logo-sfeir-blanc.png": (0, command_check_spec_helper_1.imageFile)(),
                            speakers: {
                                "CMA.jpg": (0, command_check_spec_helper_1.imageFile)(),
                                "the-conf.svg": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        },
                    }, css: {
                        "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                    }, markdown: {
                        "00-speaker-cma.md": `
<!-- .slide: class="speaker-slide" -->

<div class="speaker-slide">

# Présentation

![](./assets/images/speakers/CMA.jpg 'speaker')

![](./assets/images/speakers/the-conf.svg 'badge')

![](./assets/images/logo-sfeir-blanc.png 'company')

## Claire MARTIN

### Ingénieure DevOps & Cloud

### @ClaireDevOps

### martin.c@sfeir.com

</div>`,
                        "01-getting-started.md": `
# Getting started

![](./assets/images/intro.png)
                        `,
                    }, scripts: {
                        "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                            "00-speaker-cma.md",
                            "01-getting-started.md",
                        ]),
                    } }, (0, command_check_spec_helper_1.web_modules)()),
                steps: {
                    "package.json": (0, command_check_spec_helper_1.packageJsonFile)({}),
                },
            });
            yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
            console.error((0, assert_utils_1.getErrors)());
            (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(0);
        }));
    });
    (0, vitest_1.describe)("invalid projects", () => {
        (0, vitest_1.describe)("Global checks", () => {
            (0, vitest_1.it)("missing rootDir [G_001]", () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield (0, internal_1.checkCommandInternal)({
                        type: "check",
                        rootDir: `./foo-${crypto.randomUUID()}`,
                    });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] G_001 Project root dir \(\.\/foo-.*\) does not exist\./;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("missing docs dir [G_002]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)({
                    steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)(),
                    },
                });
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] G_002 Project should have a 'docs' directory/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("missing steps dir [G_003]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)({
                    docs: Object.assign({ assets: { images: {} }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {}, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)(),
                        } }, (0, command_check_spec_helper_1.web_modules)()),
                });
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] G_003 Project should have a 'steps' directory/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
        });
        (0, vitest_1.describe)("Slides checks", () => {
            (0, vitest_1.it)("invalid slides.js entry [S_001]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)({
                    docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": `export function formation() { return ['01-getting-started.md'] }\n`,
                        } }, (0, command_check_spec_helper_1.web_modules)()),
                    steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    },
                });
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_001 slides.js entry ""01-getting-started.md"" should be a valid entry/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("not existing markdown file in slides.js [S_002]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                                "02-not-existing-file.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_002 slides.js entry "02-not-existing-file.md" does not match an existing file/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("not declared in slides.js markdown file [S_003]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                            "02-not-existing-file.md": "",
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_003 "02-not-existing-file.md" should be used/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("lab slide without command [S_004]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                            "01-lab-getting-started-bis.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started bis",
                                cmd: "",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                                "01-lab-getting-started-bis.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_004 "01-lab-getting-started-bis.md" should contains the command to run the exercise/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("lab slide without a valid command [S_005]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                            "01-lab-getting-started-bis.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started bis",
                                cmd: "npm run 01-getting-starte",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                                "01-lab-getting-started-bis.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_005 "01-lab-getting-started-bis.md" should contains the valid command to run the exercise/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("lab slide without a valid command [S_006]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                            "01-lab-getting-started-bis.md": "# Getting started\n\nnpm run 01-getting-started",
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                                "01-lab-getting-started-bis.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_006 "01-lab-getting-started-bis.md" should use lab slide format/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("slide should contains existing image [S_007]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)\n![](./assets/images/foo2.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_007 ".*\/docs\/assets\/images\/foo2.png" in "01-getting-started.md" should be an existing images/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("images in asset should be used [S_008]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                                "foo2.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] S_008 ".*\/docs\/assets\/images\/foo2.png" should be used/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("slide should only used existing css classes [S_009]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": '![](./assets/images/foo.png)\n<!-- .class="any-undefined-class" -->\n' +
                                "![](./assets/images/foo.png 'another-undefined-class')\n",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started"],
                            scripts: {
                                "01-getting-started": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg1 = /\[CheckError\] S_009 "any-undefined-class" in "01-getting-started.md" is not a known css class/;
                expectMatching((0, assert_utils_1.getErrors)(), reg1).toHaveLength(1);
                const reg2 = /\[CheckError\] S_009 "another-undefined-class" in "01-getting-started.md" is not a known css class/;
                expectMatching((0, assert_utils_1.getErrors)(), reg2).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(2);
            }));
        });
        (0, vitest_1.describe)("Labs checks", () => {
            (0, vitest_1.it)("labs not used in slide [L_001]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: ["01-getting-started", "02-next"],
                            scripts: {
                                "01-getting-started": "",
                                "02-next": "",
                            },
                        }),
                    } }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] L_001 "02-next" should be used in a lab slide/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("labs not declared in workspace [L_002][L_003]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: Object.assign(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.minimalValidLabStructure)("01-getting-started")), (0, command_check_spec_helper_1.minimalValidLabStructure)("02-next")), { "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: [
                                "01-getting-started",
                                "01-getting-started-solution",
                            ],
                            scripts: {
                                "01-getting-started": "",
                                "01-getting-started-solution": "",
                            },
                        }) }) }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const regL002 = /\[CheckError\] L_002 Lab "02-next" should be declared in the workspace \(either "workspaces" or "labs" in a file "package.json" or "labs.json" at the root of "steps" directory\)/;
                expectMatching((0, assert_utils_1.getErrors)(), regL002).toHaveLength(1);
                const regL003 = /\[CheckError\] L_003 Lab "02-next" should have corresponding script/;
                expectMatching((0, assert_utils_1.getErrors)(), regL003).toHaveLength(1);
                const regL002Sol = /\[CheckError\] L_002 Lab "02-next-solution" should be declared in the workspace \(either "workspaces" or "labs" in a file "package.json" or "labs.json" at the root of "steps" directory\)/;
                expectMatching((0, assert_utils_1.getErrors)(), regL002Sol).toHaveLength(1);
                const regL003Sol = /\[CheckError\] L_003 Lab "02-next-solution" should have corresponding script/;
                expectMatching((0, assert_utils_1.getErrors)(), regL003Sol).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(4);
            }));
            (0, vitest_1.it)("labs in workspace but without package.json [L_004]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: Object.assign(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started", {
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started"),
                    })), (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started-solution", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started-solution",
                        }),
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started"),
                    })), { "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: [
                                "01-getting-started",
                                "01-getting-started-solution",
                            ],
                            scripts: {
                                "01-getting-started": "",
                                "01-getting-started-solution": "",
                            },
                        }) }) }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] L_004 Lab "01-getting-started" should have a package.json with corresponding name/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("labs without README.md [L_005][L_010]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: Object.assign(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started",
                        }),
                        // "README.md": labReadmeMdFile("01-getting-started"),
                    })), (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started-solution", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started-solution",
                        }),
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started"),
                    })), { "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: [
                                "01-getting-started",
                                "01-getting-started-solution",
                            ],
                            scripts: {
                                "01-getting-started": "",
                                "01-getting-started-solution": "",
                            },
                        }) }) }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const regL005 = /\[CheckError\] L_005 Lab "01-getting-started" should have a README.md/;
                expectMatching((0, assert_utils_1.getErrors)(), regL005).toHaveLength(1);
                const regL010 = /\[CheckError\] L_010 Lab and solution of "01-getting-started" should have same README.md/;
                expectMatching((0, assert_utils_1.getErrors)(), regL010).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(2);
            }));
            (0, vitest_1.it)("labs with README.md missing some infos [L_006][L_007]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: Object.assign(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started",
                        }),
                        "README.md": "# 01-getting-started\n",
                    })), (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started-solution", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started-solution",
                        }),
                        "README.md": "# 01-getting-started\n",
                    })), { "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: [
                                "01-getting-started",
                                "01-getting-started-solution",
                            ],
                            scripts: {
                                "01-getting-started": "",
                                "01-getting-started-solution": "",
                            },
                        }) }) }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const regL006 = /\[CheckError\] L_006 Lab "01-getting-started"'s README.md should contains the correct title/;
                expectMatching((0, assert_utils_1.getErrors)(), regL006).toHaveLength(1);
                const regL007 = /\[CheckError\] L_007 Lab "01-getting-started"'s README.md should contains the correct command/;
                expectMatching((0, assert_utils_1.getErrors)(), regL007).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(2);
            }));
            (0, vitest_1.it)("every lab should have a solution [L_008]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: Object.assign(Object.assign({}, (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started",
                        }),
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started"),
                    })), { "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: [
                                "01-getting-started",
                                "01-getting-started-solution",
                            ],
                            scripts: {
                                "01-getting-started": "",
                                "01-getting-started-solution": "",
                            },
                        }) }) }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] L_008 Lab "01-getting-started" should have a solution/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("lab solution should match a lab [L_009]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)({
                    docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()),
                    steps: Object.assign(Object.assign({}, (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started-solution", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started-solution",
                        }),
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started"),
                    })), { "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: [
                                "01-getting-started-solution",
                            ],
                            scripts: {
                                "01-getting-started-solution": "",
                            },
                        }) }),
                });
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] L_009 Solution lab "01-getting-started-solution" should match to a lab/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
            (0, vitest_1.it)("lab and solution should have same README.md [L_010]", () => __awaiter(void 0, void 0, void 0, function* () {
                const rootDir = (0, project_builder_utils_1.buildProject)(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.configFile)({ stepCommandPrefix: "npm run " })), { docs: Object.assign({ assets: {
                            images: {
                                "foo.png": (0, command_check_spec_helper_1.imageFile)(),
                            },
                        }, css: {
                            "slides.css": (0, command_check_spec_helper_1.slideCssFile)(),
                        }, markdown: {
                            "01-getting-started.md": "![](./assets/images/foo.png)",
                            "01-lab-getting-started.md": (0, command_check_spec_helper_1.labSlideFile)({
                                title: "Getting started",
                                cmd: "npm run 01-getting-started",
                            }),
                        }, scripts: {
                            "slides.js": (0, command_check_spec_helper_1.slideJsFile)([
                                "01-getting-started.md",
                                "01-lab-getting-started.md",
                            ]),
                        } }, (0, command_check_spec_helper_1.web_modules)()), steps: Object.assign(Object.assign(Object.assign({}, (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started",
                        }),
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started"),
                    })), (0, command_check_spec_helper_1.oneLabStructure)("01-getting-started-solution", {
                        "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            name: "01-getting-started-solution",
                        }),
                        "README.md": (0, command_check_spec_helper_1.labReadmeMdFile)("01-getting-started") +
                            "\nHello\n",
                    })), { "package.json": (0, command_check_spec_helper_1.packageJsonFile)({
                            workspaces: [
                                "01-getting-started",
                                "01-getting-started-solution",
                            ],
                            scripts: {
                                "01-getting-started": "",
                                "01-getting-started-solution": "",
                            },
                        }) }) }));
                try {
                    yield (0, internal_1.checkCommandInternal)({ type: "check", rootDir });
                }
                catch (err) {
                    console.error(err);
                }
                const reg = /\[CheckError\] L_010 Lab and solution of "01-getting-started" should have same README.md/;
                expectMatching((0, assert_utils_1.getErrors)(), reg).toHaveLength(1);
                (0, vitest_1.expect)((0, assert_utils_1.getErrors)()).toHaveLength(1);
            }));
        });
    });
});
function expectMatching(errors, expected) {
    const messages = errors.map((err) => err.message);
    return (0, vitest_1.expect)(messages.filter((err) => err.match(expected) !== null), JSON.stringify(messages, undefined, 2));
}
//# sourceMappingURL=command-check.spec.js.map