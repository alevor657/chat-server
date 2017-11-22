const path = require('path');

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, 'src/index.js'),
    devtool: 'eval',
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
    }
};
