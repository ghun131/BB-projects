const path = require('path');

module.exports = {
    entry: './src/entry.js',
    mode: 'development',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test:/\.jsx?$/, loader:['babel-loader?cacheDirectory'] }
        ]
    }
}