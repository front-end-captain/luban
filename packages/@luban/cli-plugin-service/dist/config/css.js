"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const getAssetsPath_1 = require("./../utils/getAssetsPath");
function default_1(api, options) {
    api.chainWebpack((webpackConfig) => {
        const isProduction = process.env.NODE_ENV === "production";
        const createConfig = api.resolveInitConfig();
        const { css: { extract, sourceMap, loaderOptions }, } = options;
        const filename = getAssetsPath_1.getAssetsPath(options, `css/[name]${isProduction ? ".[hash:8]" : ""}.css`);
        const chunkFilename = getAssetsPath_1.getAssetsPath(options, `css/[name]${isProduction ? ".[chunkhash:8]" : ""}.css`);
        const extractOptions = {
            filename,
            chunkFilename,
        };
        const miniCssOptions = Object.assign(Object.assign({}, loaderOptions.miniCss), { hmr: !isProduction, reloadAll: !isProduction });
        const cssLoaderOptions = Object.assign(Object.assign({}, loaderOptions.css), { sourceMap });
        const cssRule = webpackConfig.module.rule("css");
        cssRule
            .test(/\.css$/)
            .use("extract-css")
            .loader(mini_css_extract_plugin_1.default.loader)
            .options(miniCssOptions)
            .end()
            .use("css-loader")
            .loader("css-loader")
            .options(cssLoaderOptions)
            .end();
        if (!api.hasNoAnyFeatures) {
            cssRule
                .use("postcss")
                .loader("postcss-loader")
                .options(Object.assign(Object.assign({}, loaderOptions.postcss), { sourceMap, ident: "postcss" }))
                .end();
        }
        if (createConfig.cssPreprocessor === "less") {
            const lessRule = webpackConfig.module.rule("less");
            lessRule
                .test(/\.less$/)
                .use("extract-css")
                .loader(mini_css_extract_plugin_1.default.loader)
                .options(miniCssOptions)
                .end()
                .use("css-loader")
                .loader("css-loader")
                .options(Object.assign(Object.assign({}, cssLoaderOptions), { sourceMap, importLoaders: 2, modules: {
                    localIdentName: "[local]-[hash:base64:5]",
                } }))
                .end()
                .use("postcss-loader")
                .loader("postcss-loader")
                .options(Object.assign(Object.assign({}, loaderOptions.postcss), { sourceMap, ident: "postcss" }))
                .end()
                .use("less-loader")
                .loader("less-loader")
                .options(Object.assign(Object.assign({}, loaderOptions.less), { sourceMap, noIeCompat: true }))
                .end();
        }
        if (extract) {
            webpackConfig.plugin("extract-css").use(mini_css_extract_plugin_1.default, [extractOptions]);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=css.js.map