import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path';
const pathSrc = path.resolve(__dirname, 'src')

import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://vitejs.dev/config/
export default  ({ mode }) =>  defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  },
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
      '~/': `${pathSrc}/`,
      '@': path.resolve('./src'), // @替代src
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "src/styles/normal.scss" as *;
        @use "src/styles/element/index.scss" as *;
        `,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ]
    }),
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
