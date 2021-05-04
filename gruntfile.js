module.exports = function (grunt) {
    function deepMerge(target, src) {
        try {
            var newValue = Object.assign({}, target, src);

            if (target && src) {
                Object.keys(target).forEach((key) => {
                    // Any existing src[key] value would have been assigned over the target[key] version
                    if (src[key] !== undefined) {
                        if (Array.isArray(newValue[key])) {
                            target[key].forEach((value) => {
                                newValue[key].push(value);
                            });
                        } else if (typeof newValue[key] === "object") {
                            // Make sure we merge all properties
                            newValue[key] = deepMerge(newValue[key], target[key]);
                        }
                    }
                });
            }

            return newValue;
        } catch (e) {
            console.error("stack: '" + e.stack + "', message: '" + e.message + "', name: '" + e.name + "'");
        }
    }

    function buildConfig(modules) {
        var buildCmds = {
            ts: {
                options: {
                    comments: true
                }            
            },
            "eslint-ts": {
                options: {
                    debug: true
                }
            }
        };

        for (var key in modules) {
            if (modules.hasOwnProperty(key)) {
                var modulePath = modules[key].path;
                var moduleCfg = modules[key].cfg;

                if (grunt.file.exists(modulePath + '/src/tsconfig.json')) {
                    // Use the src tsconfig (if available)
                    buildCmds.ts[key] = {
                        'tsconfig': modulePath + "/src/tsconfig.json",
                    };
                } else if (grunt.file.exists(modulePath + '/tsconfig.json')) {
                    // Otherwise fall back to the root tsconfig (if available)
                    buildCmds.ts[key] = {
                        'tsconfig': modulePath + "/tsconfig.json",
                    };
                } else {
                    throw new Error("TSConfig not found for [" + key + "]");
                }

                if (moduleCfg) {
                    buildCmds.ts[key] = Object.assign(buildCmds.ts[key], moduleCfg);
                }

                // If the tests have their own tsconfig, add that as a new target
                // if (grunt.file.exists(modulePath + '/test/tsconfig.json')) {
                //     buildCmds.ts[key + '-tests'] = {
                //         'tsconfig': modulePath + "/test/tsconfig.json",
                //     };
                // } else if (grunt.file.exists(modulePath + '/tests/tsconfig.json')) {
                //     buildCmds.ts[key + '-tests'] = {
                //         'tsconfig': modulePath + "/tests/tsconfig.json",
                //     };
                // }

                let esLintCmd = buildCmds["eslint-ts"];
                esLintCmd[key + '-lint'] = {
                    options: {
                        tsconfig: modulePath + '/tsconfig.json'
                    }
                };

                if (moduleCfg) {
                    esLintCmd[key + '-lint'] = Object.assign(buildCmds.ts[key], moduleCfg);
                }

                esLintCmd[key + '-lint-fix'] = deepMerge({ options: { fix: true } }, esLintCmd[key + '-lint']);
            }
        }

        return buildCmds;
    }

    try {
        var theBuildConfig = deepMerge(buildConfig({
            // Shared
            "core":                 { path: "./shared/AppInsightsCore" },
            "common":               { path: "./shared/AppInsightsCommon" },
    
            // SKUs
            "aisku":                { path: "./AISKU", 
                                        cfg: { 
                                            src: [ 
                                                "AISKU/src/*.ts" 
                                            ] 
                                        } 
                                    },
            "aiskulite":            { path: "./AISKULight", 
                                        cfg: { 
                                            src: [ 
                                                "AISKULight/*.ts" 
                                            ] 
                                        } 
                                    },
    
            // Channels
            "aichannel":            { path: "./channels/applicationinsights-channel-js" },
    
            // Extensions
            "appinsights":          { path: "./extensions/applicationinsights-analytics-js" },
            "clickanalytics":       { path: "./extensions/applicationinsights-clickanalytics-js" },
            "debugplugin":          { path: "./extensions/applicationinsights-debugplugin-js" },
            "deps":                 { path: "./extensions/applicationinsights-dependencies-js" },
            "properties":           { path: "./extensions/applicationinsights-properties-js" },
            "react":                { path: "./extensions/applicationinsights-react-js",
                                        cfg: {
                                            src: [
                                                "./extensions/applicationinsights-react-js/src/index.ts"
                                            ]
                                        } 
                                    },
            "reactnative":          { path: "./extensions/applicationinsights-react-native",
                                        cfg: {
                                            src: [
                                                "./extensions/applicationinsights-react-native/src/**/*.ts"
                                            ]
                                        } 
                                    },
    
            // Tools
            "rollupuglify":         { path: "./tools/rollup-plugin-uglify3-js",
                                        cfg: {
                                            src: [
                                                "./tools/rollup-plugin-uglify3-js/src/*.ts",
                                                "!node_modules/**"
                                            ],
                                            out: './tools/rollup-plugin-uglify3-js/out/src/uglify3-js.js'
                                        }
                                    },
            "rollupes3":            { path: "./tools/rollup-es3" },
            "shims":                { path: "./tools/shims",
                                        cfg: {
                                            src: [
                                                "./tools/shims/src/*.ts"
                                            ]
                                        }
                                    },
    
            // Common
            "tst-framework":        { path: "./common/Tests/Framework",
                                        cfg: {
                                            src: [
                                                "./common/Tests/Framework/src/*.ts"
                                            ]
                                        } 
                                    }
        }), {
            ts: {
                options: {
                    comments: true,
                    debug: true
                },
                coretest: {
                    tsconfig: './shared/AppInsightsCore/Tests/tsconfig.json',
                    src: [
                        './shared/AppInsightsCore/Tests/Selenium/ApplicationInsightsCore.Tests.ts',
                        './shared/AppInsightsCore/Tests/Selenium/aitests.ts'
                    ],
                    out: 'shared/AppInsightsCore/Tests/Selenium/aicore.tests.js'
                },
                commontest: {
                    tsconfig: './shared/AppInsightsCommon/Tests/tsconfig.json',
                    src: [
                        './shared/AppInsightsCommon/Tests/Selenium/appinsights-common.tests.ts',
                    ],
                    out: 'shared/AppInsightsCommon/Tests/Selenium/aicommon.tests.js'
                },
                appinsightstests: {
                    tsconfig: './extensions/applicationinsights-analytics-js/Tests/tsconfig.json',
                    src: [
                        './extensions/applicationinsights-analytics-js/Tests/Selenium/*.ts',
                        './extensions/applicationinsights-analytics-js/Tests/*.ts'
                    ],
                    out: 'extensions/applicationinsights-analytics-js/Tests/Selenium/appinsights-analytics.tests.js'
                },
                aiskutests: {
                    tsconfig: './AISKU/Tests/tsconfig.json',
                    src: [
                        'AISKU/Tests/Selenium/*.ts',
                        'AISKU/Tests/*.ts'
                    ],
                    out: 'AISKU/Tests/Selenium/appinsights-sdk.tests.js'
                },
                clickanalyticstests: {
                    tsconfig: './extensions/applicationinsights-clickanalytics-js/Tests/tsconfig.json',
                    src: [
                        './extensions/applicationinsights-clickanalytics-js/Tests/Selenium/*.ts',
                        './extensions/applicationinsights-clickanalytics-js/Tests/*.ts'
                    ],
                    out: 'extensions/applicationinsights-clickanalytics-js/Tests/Selenium/appinsights-clickanalytics.tests.js'
                },
                propertiestests: {
                    tsconfig: './extensions/applicationinsights-properties-js/Tests/tsconfig.json',
                    src: [ './extensions/applicationinsights-properties-js/Tests/**/*.ts' ],
                    out: './extensions/applicationinsights-properties-js/Tests/Selenium/prop.tests.js'
                },
                reactnativetests: {
                    tsconfig: './extensions/applicationinsights-react-native/Tests/tsconfig.json',
                    src: [ './extensions/applicationinsights-react-native/Tests/**/*.ts' ],
                    out: './extensions/applicationinsights-react-native/Tests/Selenium/reactnativeplugin.tests.js'
                },
                reacttests: {
                    tsconfig: './extensions/applicationinsights-react/Tests/tsconfig.json',
                    src: [ './extensions/applicationinsights-react/Tests/**/*.ts' ],
                    out: './extensions/applicationinsights-react/Tests/Selenium/reactplugin.tests.js'
                },
                depstest: {
                    tsconfig: './extensions/applicationinsights-dependencies-js/Tests/tsconfig.json',
                    src: [
                        './extensions/applicationinsights-dependencies-js/Tests/Selenium/*.ts',
                        './extensions/applicationinsights-dependencies-js/Tests/TestsFramework/*.ts'
                    ],
                    out: './extensions/applicationinsights-dependencies-js/Tests/Selenium/dependencies.tests.js'
                },
                aichanneltest: {
                    tsconfig: './channels/applicationinsights-channel-js/Tests/tsconfig.json',
                    src: [
                        './channels/applicationinsights-channel-js/Tests/Selenium/*.ts',
                        './channels/applicationinsights-channel-js/Tests/*.ts',
                    ],
                    out: './channels/applicationinsights-channel-js/Tests/Selenium/aichannel.tests.js'
                },
                rollupes3test: {
                    tsconfig: './tools/rollup-es3/Tests/tsconfig.json',
                    src: [
                        './tools/rollup-es3/Tests/Selenium/Es3RollupTests.ts'
                    ],
                    out: './tools/rollup-es3/Tests/Selenium/es3rolluptests.js'
                },
                shimstest: {
                    tsconfig: './tools/shims/Tests/tsconfig.json',
                    src: [
                        './tools/shims/src/*.ts',
                        './tools/shims/Tests/**/*.ts'
                    ],
                    out: './tools/shims/Tests/Selenium/shimstests.js'
                },
            }
        });
    
        function tsBuildActions(name, addTests, replaceName) {
            var actions = [
                "eslint-ts:" + name + "-lint-fix"
            ];
    
            var gruntTsConfig = theBuildConfig["ts"];
            if (replaceName) {
                actions.push("string-replace:" + replaceName);
                actions.push("ts:" + name);
    
                if (addTests && gruntTsConfig[name + "-tests"]) {
                    actions.push("ts:" + name + "-tests");
                }
    
                actions.push("string-replace:" + replaceName + "-reverse");
            } else {
                actions.push("ts:" + name);
                if (addTests && gruntTsConfig[name + "-tests"]) {
                    actions.push("ts:" + name + "-tests");
                }
            }
    
            actions.push("eslint-ts:" + name + "-lint");
    
            return actions;
        }

        grunt.initConfig(deepMerge(
            theBuildConfig, {
            uglify: {
                snippetvNext: {
                    files: {
                        'AISKU/snippet/snippet.min.js': ['AISKU/snippet/snippet.js']
                    },
                    options: {
                        sourceMap: false,
                        ie8: true,
                        compress: {
                          passes:3,
                          unsafe: true,
                        },
                        output: {
                          webkit:true
                        }
                    }
                }
            },
            qunit: {
                all: {
                    options: {
                    }
                },
                core: {
                    options: {
                        urls: [
                            'http://localhost:9001/shared/AppInsightsCore/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: true,
                        summaryOnly: false,
                        '--web-security': 'false' // we need this to allow CORS requests in PhantomJS
                    }
                },
                common: {
                    options: {
                        urls: [
                            'http://localhost:9001/shared/AppInsightsCommon/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: true,
                        summaryOnly: false,
                        '--web-security': 'false' // we need this to allow CORS requests in PhantomJS
                    }
                },
                aitests: {
                    options: {
                        urls: [
                            'http://localhost:9001/extensions/applicationinsights-analytics-js/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: true,
                        summaryOnly: false,
                        '--web-security': 'false' // we need this to allow CORS requests in PhantomJS
                    }
                },
                deps: {
                    options: {
                        urls: [
                            'http://localhost:9001/extensions/applicationinsights-dependencies-js/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: true,
                        summaryOnly: false,
                        '--web-security': 'false'
                    }
                },
                properties: {
                    options: {
                        urls: [
                            'http://localhost:9001/extensions/applicationinsights-properties-js/Tests/Selenium/Tests.html'
                        ],
                        timeout: 5 * 60 * 1000, // 5 min
                        console: false,
                        summaryOnly: true,
                        '--web-security': 'false'
                    }
                },
                react: {
                    options: {
                        urls: [
                            'http://localhost:9001/extensions/applicationinsights-react-js/Tests/Selenium/Tests.html'
                        ],
                        timeout: 5 * 60 * 1000, // 5 min
                        console: true,
                        summaryOnly: true,
                        '--web-security': 'false'
                    }
                },
                reactnative: {
                    options: {
                        urls: [
                            'http://localhost:9001/extensions/applicationinsights-react-native/Tests/Selenium/Tests.html'
                        ],
                        timeout: 5 * 60 * 1000, // 5 min
                        console: true,
                        summaryOnly: true,
                        '--web-security': 'false'
                    }
                },
                aisku: {
                    options: {
                        urls: [
                            'http://localhost:9001/AISKU/Tests/Selenium/Tests.html'
                        ],
                        timeout: 5 * 60 * 1000, // 5 min
                        console: true,
                        summaryOnly: false,
                        '--web-security': 'false'
                    }
                },
                aichannel: {
                    options: {
                        urls: [
                            'http://localhost:9001/channels/applicationinsights-channel-js/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: false,
                        summaryOnly: true,
                        '--web-security': 'false'
                    }
                },
                rollupes3: {
                    options: {
                        urls: [
                            './tools/rollup-es3/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: false,
                        summaryOnly: true,
                        '--web-security': 'false' // we need this to allow CORS requests in PhantomJS
                    }
                },
                shims: {
                    options: {
                        urls: [
                            './tools/shims/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: false,
                        summaryOnly: true,
                        '--web-security': 'false' // we need this to allow CORS requests in PhantomJS
                    }
                },
                clickanalytics: {
                    options: {
                        urls: [
                            'http://localhost:9001/extensions/applicationinsights-clickanalytics-js/Tests/Selenium/Tests.html'
                        ],
                        timeout: 300 * 1000, // 5 min
                        console: true,
                        summaryOnly: false,
                        '--web-security': 'false' // we need this to allow CORS requests in PhantomJS
                    }
                },
            },
            connect: {
                server: {
                    options: {
                        port: 9001,
                        base: '.'
                    }
                }        
            }
        }));
    
        grunt.event.on('qunit.testStart', function (name) {
            grunt.log.ok('Running test: ' + name);
        });
    
        grunt.loadNpmTasks("@nevware21/grunt-ts-plugin");
        grunt.loadNpmTasks("@nevware21/grunt-eslint-ts");
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-qunit');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-run');
        grunt.registerTask("default", ["ts:rollupuglify", "ts:rollupes3", "ts:rollupes3test", "qunit:rollupes3", "ts:shims", "ts:shimstest", "qunit:shims", "ts:default", "uglify:ai", "uglify:snippet"]);
        grunt.registerTask("core", tsBuildActions("core"));
        grunt.registerTask("common", tsBuildActions("common"));
        grunt.registerTask("ai", tsBuildActions("appinsights"));
        grunt.registerTask("aitests", ["connect", "ts:appinsightstests", "qunit:aitests"]);
        grunt.registerTask("aisku", tsBuildActions("aisku"));
        grunt.registerTask("aiskulite", tsBuildActions("aiskulite"));
        grunt.registerTask("snippetvnext", ["uglify:snippetvNext"]);
        grunt.registerTask("aiskutests", ["connect", "ts:aiskutests", "qunit:aisku"]);
        grunt.registerTask("test", ["connect", "ts:default", "ts:test", "ts:testSchema", "ts:testE2E", "qunit:all"]);
        grunt.registerTask("test1ds", ["coretest", "common", "propertiestests", "depstest", "aitests", "aiskutests", "reactnativetests", "reacttests"]);
        grunt.registerTask("coretest", ["connect", "ts:coretest", "qunit:core"]);
        grunt.registerTask("commontest", ["connect", "ts:common", "ts:commontest", "qunit:common"]);
        grunt.registerTask("properties", tsBuildActions("properties"));
        grunt.registerTask("propertiestests", ["connect", "ts:propertiestests", "qunit:properties"]);
        grunt.registerTask("react", tsBuildActions("react"));
        grunt.registerTask("reacttests", ["connect", "ts:reacttests", "qunit:react"]);
        grunt.registerTask("reactnative", tsBuildActions("reactnative"));
        grunt.registerTask("reactnativetests", ["connect", "ts:reactnativetests", "qunit:reactnative"]);
        grunt.registerTask("deps", tsBuildActions("deps"));
        grunt.registerTask("depstest", [ "connect", "ts:depstest","qunit:deps"]);
        grunt.registerTask("debugplugin", tsBuildActions("debugplugin"));
        grunt.registerTask("aichannel", tsBuildActions("aichannel"));
        grunt.registerTask("aichanneltest", ["connect", "ts:aichanneltest", "qunit:aichannel"]);
        grunt.registerTask("rollupuglify", tsBuildActions("rollupuglify"));
        grunt.registerTask("rollupes3", tsBuildActions("rollupes3").concat(["ts:rollupes3test", "qunit:rollupes3"]));
        grunt.registerTask("rollupes3test", ["ts:rollupes3test", "qunit:rollupes3"]);
        grunt.registerTask("shims", tsBuildActions("shims").concat(["ts:shimstest", "qunit:shims"]));
        grunt.registerTask("shimstest", ["ts:shimstest", "qunit:shims"]);
        grunt.registerTask("clickanalytics", tsBuildActions("clickanalytics"));
        grunt.registerTask("clickanalyticstests", ["connect", "ts:clickanalyticstests", "qunit:clickanalytics"]);
        grunt.registerTask("tst-framework", tsBuildActions("tst-framework"));
        grunt.registerTask("serve", ["connect:server:keepalive"]);
    } catch (e) {
        console.error(e);
        console.error("stack: '" + e.stack + "', message: '" + e.message + "', name: '" + e.name + "'");
    }
};
