"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api, options) {
    api.chainWebpack((webpackConfig) => {
        const isProduction = process.env.NODE_ENV === "production";
        const outputDir = api.resolve(options.outputDir);
        webpackConfig.output
            .path(outputDir)
            .filename("[name]-[hash:8].js")
            .chunkFilename("[name]-[chunkhash:8].js")
            .end();
        if (options.productionSourceMap) {
            webpackConfig.output.sourceMapFilename("[name].[hash:8]-map.js").end();
        }
        if (isProduction) {
            webpackConfig.mode("production").devtool(options.productionSourceMap ? "source-map" : false);
            webpackConfig
                .plugin("hash-module-ids")
                .use(require("webpack/lib/HashedModuleIdsPlugin"), [{ hashDigest: "hex" }]);
        }
        if (isProduction) {
            webpackConfig.optimization
                .splitChunks({
                cacheGroups: {
                    common: {
                        chunks: "initial",
                        name: "common",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "initial",
                        name: "vendors",
                        priority: 10,
                        enforce: true,
                    },
                    style: {
                        test: /\.css$/,
                        name: "style",
                        chunks: "all",
                    },
                },
            })
                .runtimeChunk({
                name: "manifest",
            });
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=prod.js.map