const path = require('path');

const fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, 'src/index.js'),
    // devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        publicPath: '/dist'
    },
    watch: true,
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    externals: nodeModules,
};
