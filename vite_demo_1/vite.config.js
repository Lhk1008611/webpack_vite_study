//defineConfig  在编写配置文件时给与提示
import { defineConfig } from "vite";
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "IE 11"],
    }),
  ],
});
