/**
 * @Date:   2017-03-04T12:49:16+08:00
 * @Last modified time: 2017-05-01T21:09:54+08:00
 */

 var webpack = require('webpack');
 var path = require('path');
 module.exports = {
 //  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
   entry: './src/index.js',
   output: {
     //path: path.join(__dirname,'builds'), //指定文件夹
     filename:'builds.js' //入口文件
   },
   devServer: {
    contentBase: "./src/",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
   module: {
    loaders: [
      {  test: /\.css$/,
         loader: 'style-loader!css-loader',
     },
      { test: /\.scss$/, loader: 'style!css!sass'}, // => 透過 css-laoder 不只處理編譯好的 css, imports 同時包含 url(...)
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by zhangdelei')
  ]
 };
