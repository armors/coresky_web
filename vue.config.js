const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir);
}
const cdnExternals = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
    'element-plus': 'ElementPlus'
  },
  cdn: {
    // 通过cdn方式使用
    js: [
      'https://cdn.bootcdn.net/ajax/libs/vue/3.2.37/vue.global.js',
      'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.16/vue-router.global.js',
      'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.global.js',
      'https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.js',
      'https://unpkg.com/element-plus',
    ],
    css: [
      'https://unpkg.com/element-plus/dist/index.css'
    ]
  }
}

module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  // transpileDependencies: true,
  productionSourceMap: false,
  assetsDir: 'static',
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
      },
      "/oss": {
        target: 'http://54.169.232.16:8090',
      }
    },
  },
  transpileDependencies: ['webpack-dev-server/client'],
  // chainWebpack: config => {
  //   config.entry.app = ['babel-polyfill', './src/main.js'];
  // },

  chainWebpack: config => {
    // 配置，将当前页定义的cdn值传到主页面（index.html）
    // config.plugin('html').tap(args => {
    //   // 这里我是除本地环境，其余均使用CDN，可自己选择是否配置
    //   args[0].cdn = cdnExternals.cdn
    //   return args;
    // });
    config.entry.app = ['babel-polyfill', './src/main.js'];
    config.output.filename('./js/[name].[chunkhash:8].js');
    config.output.chunkFilename('./js/[name].[chunkhash:8].js');
    if (process.env.VUE_APP_MODE === 'production') {
      // 执行报错 先注掉
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;	//生产环境去掉console.log
    }
    config.optimization.runtimeChunk('single');
    config.plugin('CompressionWebpackPlugin')
      .use('compression-webpack-plugin');


    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
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
          priority: 5
        }
      }
    });
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ],
    resolve: { fallback: { fs: false } }
    // externals: cdnExternals.externals
  }
})
