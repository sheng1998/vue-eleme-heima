let path = require('path');

//导入在内存中生成 HTML 页面的插件
let htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development', // 打包模式 production(生产模式)   development(开发模式)
    entry: './src/main.js', // 入口文件
    output: {
        filename: 'bundle.js', //打包后文件名
        path: path.resolve(__dirname, 'dist'), //打包路径(必须是绝对路径)
    },
    plugins: [
        new htmlWebpackPlugin({ // 创建一个在内存中生成 HTML 页面的插件
            template: path.join(__dirname, './src/index.html'), // 指定模板页面,会根据指定的页面路径，去内存生成页面
            filename: 'index.html', // 指定生成的页面的名称
            minify: { //压缩html
                removeAttributeQuotes: true, //是否删减一些可有可无的双引号
                // collapseWhitespace:true,//是否删除空格
            }
        }),
        new VueLoaderPlugin()
        
    ],
    module: {
        rules: [
            //$表示以.css为后缀,在调用loader 的时候，是从后往前调用的
            //配置处理 css 文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //配置处理 .less 文件的第三方 loader 规则
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            //配置处理 .scss 文件的第三方 loader 规则
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            //配置处理 图片 文件
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader?limit=512000&name=[hash:8]-[name].[ext]',
                /* limit 给定的值是图片的大小，单位是 byte， 如果我们引用的图片大于或等于给
                定的 limit值,则不会被转为base64格式的字符串,如 图片小于给定的 limit 值，
                则会被转为 base64的字符串 name指定的是图片的名字，如果不指定则为hash值，
                [name]:图片原来的名字，[ext]:图片原来的后缀*/
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, 
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
}