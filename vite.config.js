import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8080", //后端目标服务器
        changeOrigin: true, //允许跨域请求
        rewrite: (path) => path.replace(/^\/api/, ""), //将所有含/api路径的，去掉/api转发给服务器
      },
    },
  },
});
