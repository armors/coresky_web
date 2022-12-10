const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const fs = require('fs');
const path = require('path');
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
      chunks: 'all',
      minSize: 20000, // 允许新拆出 chunk 的最小体积，也是异步 chunk 公共模块的强制拆分体积
      maxAsyncRequests: 6, // 每个异步加载模块最多能被拆分的数量
      maxInitialRequests: 6, // 每个入口和它的同步依赖最多能被拆分的数量
      enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值并忽略其他限制
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
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
