module: {
    rules: [
        {
            test: /\.js[x]?$/,
            enforce: 'pre',
            use: [{
                loader: 'eslint-loader',
                option: { fix: true }
            }],
            include: path.resolve(__dirname, './src/**/*.js'),
            exclude: /node_modules/
        }
    ]
}