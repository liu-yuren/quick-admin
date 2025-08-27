import type { ConfigEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  console.log(command, 'command')
  console.log(mode, 'mode')
  return {
    base: '/quick-admin/',
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock', // mock文件夹路径
        enable: command === 'serve', // 只有开发环境才开启mock
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      hmr: true, // 热更新
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
})
