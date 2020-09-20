const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/js/index.ts',
    output: {
        // publicPath: "public",
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    devServer: {
        inline: true,
        port: 3000 /* number not string */,
        contentBase: './public',
        overlay: {
            warnings: true,
            errors: true,
        },
        clientLogLevel: 'error',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.scss',
            chunkFilename: '[name].scss',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.s?css$/,
                oneOf: [
                    {
                        test: /\.module\.s?css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'scss-loader',
                                options: { modules: true, exportOnlyLocals: false },
                            },
                            'sass-loader',
                        ],
                    },
                    {
                        use: [MiniCssExtractPlugin.loader, 'scss-loader', 'sass-loader'],
                    },
                ],
                // use: [
                //   'style-loader', 'scss-loader', 'sass-loader'
                // ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[name].[ext]',
                },
            },
        ],
    },
};
