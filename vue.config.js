const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  publicPath: './',
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
      "/fingernft": {
        target: process.env.VUE_APP_API_URL,
      },
      "/static": {
        target: process.env.VUE_APP_STATIC_URL,
      },
      "/oauth": {
        target: process.env.VUE_APP_OAUTH_URL,
      },
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
