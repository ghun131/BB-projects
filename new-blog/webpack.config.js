const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: "./src/index.js",
    mode: "none",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loader: "babel-loader?cacheDirectory"},
            { test: /\.css$/, use: ["style-loader", "css-loader"]},
            { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"]}
        ]
    },
    plugins: [new BundleAnalyzerPlugin()]
}