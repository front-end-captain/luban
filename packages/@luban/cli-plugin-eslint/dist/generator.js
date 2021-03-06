"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_shared_utils_1 = require("@luban-cli/cli-shared-utils");
function default_1(api, options) {
    const eslintParser = options.preset.language === "ts" ? "@typescript-eslint/parser" : "babel-eslint";
    const eslintEnv = new cli_shared_utils_1.SimpleMapPolyfill([
        ["browser", true],
        ["es2020", true],
    ]);
    const parserOptions = new cli_shared_utils_1.SimpleMapPolyfill([
        ["ecmaVersion", 11],
        ["sourceType", "module"],
        [
            "ecmaFeatures",
            {
                jsx: true,
            },
        ],
    ]);
    const eslintRules = new cli_shared_utils_1.SimpleMapPolyfill([
        ["quotes", ["error", "double"]],
        ["semi", ["error", "always"]],
        ["react/display-name", ["warn"]],
        ["react/prop-types", ["error"]],
        ["space-before-function-paren", ["error", "never"]],
        ["comma-dangle", ["error", "always-multiline"]],
        ["max-len", ["error", { code: 120, ignoreUrls: true, ignoreComments: true }]],
        ["arrow-body-style", ["error", "always"]],
        [
            "object-curly-newline",
            [
                "error",
                {
                    ObjectExpression: { multiline: true, minProperties: 4 },
                    ObjectPattern: { multiline: true },
                    ImportDeclaration: "never",
                    ExportDeclaration: { multiline: true, minProperties: 3 },
                },
            ],
        ],
        ["indent", ["off"]],
    ]);
    const eslintPlugins = ["react-hooks"];
    const eslintSettings = new cli_shared_utils_1.SimpleMapPolyfill([
        [
            "react",
            [
                {
                    createClass: "createReactClass",
                    pragma: "React",
                    version: "detect",
                    flowVersion: "0.53",
                },
            ],
        ],
        ["propWrapperFunctions", ["forbidExtraProps", { property: "freeze", object: "Object" }]],
        ["linkComponents", ["Hyperlink", { name: "Link", linkAttribute: "to" }]],
    ]);
    const eslintExtends = [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "prettier/react",
    ];
    if (options.preset.language === "js") {
        api.extendPackage({
            scripts: {
                eslint: "eslint --config .eslintrc --ext .jsx,.js src/",
                "eslint:fix": "eslint --fix --config .eslintrc --ext .jsx,.js src/",
                "format:js": "prettier --write src/**/*.{js,jsx}",
                "format:check:js": "prettier --check src/**/*.{js,jsx}",
            },
            devDependencies: {
                "babel-eslint": "^10.0.3",
            },
            dependencies: {
                "prop-types": "^15.7.2",
            },
        });
        eslintSettings.set("import/extensions", [".js", ".jsx"]);
    }
    if (options.preset.language === "ts") {
        api.extendPackage({
            scripts: {
                eslint: "eslint --config .eslintrc --ext .tsx,.ts src/",
                "eslint:fix": "eslint --fix --config .eslintrc --ext .tsx,.ts src/",
                check: "tsc --noEmit",
                "format:ts": "prettier --write src/**/*.{ts,tsx}",
                "format:check:ts": "prettier --check src/**/*.{ts,tsx}",
            },
            devDependencies: {
                "@typescript-eslint/parser": "^2.20.0",
                "@typescript-eslint/eslint-plugin": "^2.7.0",
            },
        });
        eslintPlugins.push("@typescript-eslint");
        eslintExtends.push("prettier/@typescript-eslint", "plugin:@typescript-eslint/recommended-requiring-type-checking", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:import/typescript");
        parserOptions.set("project", "./tsconfig.json");
        eslintSettings.set("import/extensions", [".ts", ".tsx"]);
        eslintRules.set("react/prop-types", ["off"]);
    }
    if (options.preset.eslint === "standard") {
        api.extendPackage({
            devDependencies: {
                "eslint-config-standard": "^14.1.0",
                "eslint-plugin-node": "^10.0.0",
                "eslint-plugin-promise": "^4.2.1",
                "eslint-plugin-standard": "^4.0.1",
            },
        });
        eslintExtends.push("standard");
    }
    if (options.preset.eslint === "airbnb") {
        api.extendPackage({
            devDependencies: {
                "eslint-config-airbnb": "^18.0.1",
                "eslint-plugin-jsx-a11y": "^6.2.3",
            },
        });
        eslintExtends.push("airbnb");
        eslintRules.set("import/prefer-default-export", ["off"]);
        eslintRules.set("import/no-unresolved", ["off"]);
        eslintRules.set("jsx-a11y/click-events-have-key-events", ["off"]);
        eslintRules.set("jsx-a11y/no-noninteractive-element-interactions", ["off"]);
        if (options.preset.language === "ts") {
            eslintRules.set("react/state-in-constructor", ["warn"]);
            eslintRules.set("react/jsx-filename-extension", ["error", { extensions: [".ts", ".tsx"] }]);
            eslintRules.set("import/extensions", ["off"]);
        }
    }
    api.extendPackage({
        devDependencies: {
            eslint: "^6.6.0",
            "eslint-config-prettier": "^6.10.0",
            "eslint-plugin-react": "^7.16.0",
            "eslint-plugin-react-hooks": "^2.4.0",
            "eslint-plugin-import": "^2.18.2",
            "eslint-loader": "^3.0.3",
        },
    });
    const lintFileSuffix = options.preset.language === "ts" ? "{ts,tsx}" : "{js,jsx}";
    if (api.isGitRepository()) {
        api.extendPackage({
            devDependencies: {
                husky: "^3.0.9",
                "lint-staged": "^9.4.3",
            },
            husky: {
                hooks: {
                    "pre-commit": "lint-staged",
                },
            },
            "lint-staged": {
                [`src/**/*.${lintFileSuffix}`]: [
                    "npm run eslint",
                    `npm run format:check:${options.preset.language}`,
                ],
            },
        });
    }
    if (options.preset.unitTest) {
        eslintEnv.set("jest", true);
        eslintRules.set("import/no-extraneous-dependencies", [
            "error",
            { devDependencies: [`**/*.test.${lintFileSuffix}`, `**/*.spec.${lintFileSuffix}`] },
        ]);
    }
    api.render("./template", {
        eslintExtends: JSON.stringify(eslintExtends),
        eslintPlugins: JSON.stringify(eslintPlugins),
        parserOptions: JSON.stringify(parserOptions.toPlainObject()),
        eslintParser: JSON.stringify(eslintParser),
        eslintRules: JSON.stringify(eslintRules.toPlainObject()),
        settings: JSON.stringify(eslintSettings.toPlainObject()),
        eslintEnv: JSON.stringify(eslintEnv.toPlainObject()),
    });
}
exports.default = default_1;
//# sourceMappingURL=generator.js.map