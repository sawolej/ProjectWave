/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");

const merge = require("webpack-merge").merge;

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    const config = {
        entry: "./src/App.ts",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            // alias: {
            //     // Force CommonJS for PixiJS since some modules are not ES6 compatible
            //     "pixi.js": path.resolve(__dirname, "node_modules/pixi.js/dist/cjs/pixi.min.js"),
            // },
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader",
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: path.resolve(__dirname, "src/index.html"),
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "src/assets/**",

                        // if there are nested subdirectories , keep the hierarchy
                        to({ context, absoluteFilename }) {
                            const assetsPath = path.resolve(__dirname, "src/assets");

                            if (!absoluteFilename) {
                                throw Error();
                            }

                            const endPath = absoluteFilename.slice(assetsPath.length);

                            return Promise.resolve(`src/assets/${endPath}`);
                        },
                    },
                ],
            }),
        ],
    };
    const envConfig = require(path.resolve(__dirname, `./webpack.${env.mode}.js`))(env);

    const mergedConfig = merge(config, envConfig);

    return mergedConfig;
};
