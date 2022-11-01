import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

import path from 'path';
// https://vitejs.dev/config/
export default  ({ mode }) =>  defineConfig({
  //静态资源服务的文件夹
  publicDir: "public",
  // base: './',
  // TODO 测试环境为 /metatdexv2/v1 生产环境为 /
  base: loadEnv(mode, process.cwd()).VITE_APP_BASE_ROUTER_URL,
  outDir: 'dist',
  // transpileDependencies: true,
  assetsDir: 'static',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve('./src'), // @替代src
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  define: {
    global: {},
    'process.env': {}
  }
})
