module.exports = {
    entry: [
        './embed/src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/embed/dist',
        publicPath: '/',
        filename: 'mortgage-calculator-react.js'
    },
    devServer: {
        contentBase: './embed/dist'
    }
};