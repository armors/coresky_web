const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const fs = require('fs');
const path = require('path');
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin');
const WebpackBar = require('webpackbar');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  // transpileDependencies: true,
  assetsDir: 'static',
  transpileDependencies: ['webpack-dev-server/client'],
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
      }
    },
  },
  chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js'];
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    config.output.filename('./js/[name].[chunkhash:8].js');
    config.output.chunkFilename('./js/[name].[chunkhash:8].js');
    if (process.env.VUE_APP_MODE === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;	//生产环境去掉console.log
    }
    // config.module.rule('images').use('url-loader')
    //   .tap(options => ({
    //     name: './assets/images/[name].[ext]',
    //     quality: 85,
    //     limit: 0,
    //     esModule: false,
    //   }));
    config.plugin('define').tap(args => [{
      ...args,
      "window.isDefine": JSON.stringify(true)
    }]);
    config.optimization.runtimeChunk('single');
    config.plugin('CompressionWebpackPlugin')
      .use('compression-webpack-plugin');
    config.optimization.minimize(true)
      .minimizer('terser')
      .tap(args => {
        let { terserOptions } = args[0];
        terserOptions.compress.drop_console = true;
        terserOptions.compress.drop_debugger = true;
        return args
      });
    config.optimization.splitChunks({
      cacheGroups: {
        // common: {
        //   name: 'common',
        //   chunks: 'all',
        //   minSize: 1,
        //   minChunks: 2,
        //   priority: 1
        // },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
        vendor: {
          name: 'chunk-libs',
          chunks: 'all',
          test: /[\/]node_modules[\/]/,
          priority: 10
        }
      }
    });


    // 生产环境配置
    // if (process.env.VUE_APP_MODE === 'production') {
    //   config.output.filename('./js/[name].[chunkhash:8].js');
    //   config.output.chunkFilename('./js/[name].[chunkhash:8].js');
      // config.plugin('extract-css').tap(args => [{
      //   filename: 'css/[name].[contenthash:8].css',
      //   chunkFilename: 'css/[name].[contenthash:8].css'
      // }]);
      // config.plugin('hotHash').use(HotHashWebpackPlugin, [{ version : '1.0.0'}]);
      // config.plugin('webpackBar').use(WebpackBar);
      //
      // config.optimization.minimize(true)
      //   .minimizer('terser')
      //   .tap(args => {
      //     let { terserOptions } = args[0];
      //     terserOptions.compress.drop_console = true;
      //     terserOptions.compress.drop_debugger = true;
      //     return args
      //   });
      // config.optimization.splitChunks({
      //   cacheGroups: {
      //     common: {
      //       name: 'common',
      //       chunks: 'all',
      //       minSize: 1,
      //       minChunks: 2,
      //       priority: 1
      //     },
      //     vendor: {
      //       name: 'chunk-libs',
      //       chunks: 'all',
      //       test: /[\/]node_modules[\/]/,
      //       priority: 10
      //     }
      //   }
      // });
    // }
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
