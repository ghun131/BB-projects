const path = require('path');

module.exports = {
    entry: "./src/App.js",
    mode: "none",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,'dist'),
    },
    module: {
        rules: [
            {test:/\.css$/, use: ['style-loader', 'css-loader']},
            {test:/\.jsx?$/, loader: ['babel-loader?cacheDirectory']}
        ]
    }
}