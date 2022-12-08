const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
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
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
})
