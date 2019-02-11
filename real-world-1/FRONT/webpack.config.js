const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    output: {
        filename: "bundle.js",
        path: path.resolve('../', 'BACK/dist')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.js$/
        })],
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: "babel-loader?cacheDirectory"},
            { test: /\.css$/, use: ["style-loader", "css-loader"]},
            { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"]}
        ]
    },
}