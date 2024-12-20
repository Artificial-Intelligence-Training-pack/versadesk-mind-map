const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const isLibrary = process.env.NODE_ENV === 'library';

module.exports = {
  publicPath: isDev ? '' : './dist',
  outputDir: '../dist',
  lintOnSave: false,
  productionSourceMap: false,
  filenameHashing: false,
  transpileDependencies: ['yjs', 'lib0', 'quill'],
  chainWebpack: config => {
    // 移除默认的 html-webpack-plugin 插件
    config.plugins.delete('html');

    // 移除 preload 插件
    config.plugins.delete('preload');
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
  },
  configureWebpack: {
    plugins: [
      // 添加自定义的 HtmlWebpackPlugin 插件
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'), // 指定模板文件
        filename: 'index.html',
        inject: true,
        publicPath: isDev ? '' : './dist', // 设置资源引用的公共路径
        minify: {
          removeComments: true,
          collapseWhitespace: false,
        },
        hash: true, // 为生成的文件添加一个唯一的 hash
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  },
};
