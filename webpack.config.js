const path = require('path'); //内置的node模块
const htmlWP = require('html-webpack-plugin'); //html插件

module.exports = {
    // 入口，打包谁配置谁
    entry: path.resolve(__dirname, './src/main.js'),
    // 输出，配置打包后文件的输出路径，以及打包后的js文件名
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        // 自动把打包js注入到html
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: 'body',
        }),
        // new cleanWebpackPlugin(['./dist'])
    ],
    module: {
        // 配置非js模块的处理规则
        rules: [
            // css模块
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // less模块
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // 打包 html 文件
            {
                test: /\.(html|tpl)$/,
                use: ['html-loader']
            },

            // 静态资源引入模块
            {
                test: /\.(gif|png|jpg|svg|mp3|mp4|avi|ttf|woff)$/,
                use: [
                    // 小于10kb的才打包
                    {
                        loader: 'url-loader',
                        options: { limit: 10240 },
                    }
                ]
            },
            // js模块
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //第三方的js,不需要语法转换，所以排除掉
            },
            // vue 模块
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    }

}