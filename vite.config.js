import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "styles/theme.scss";'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      assets: resolve(__dirname, 'src/assets'),
      styles: resolve(__dirname, 'src/styles'),
      libs: resolve(__dirname, 'src/libs'),
    },
  },
});
