import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from 'url';
import path from 'path';

// https://vitejs.dev/config/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [zaloMiniApp(), react(), tsconfigPaths()],
    resolve: {
      alias: {
        css: path.resolve(__dirname, 'src/css'),
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
        store: path.resolve(__dirname, 'src/store'),
        services: path.resolve(__dirname, 'src/services'),
        assets: path.resolve(__dirname, 'src/assets'),
        apiRequest: path.resolve(__dirname, 'src/apiRequest'),
        utils: path.resolve(__dirname, 'src/utils'),
        constants: path.resolve(__dirname, 'src/constants'),
        envConfig: path.resolve(__dirname, 'src/envConfig'),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "https://qlkhupho.vnpt.me",
          changeOrigin: true,
          secure: false,
        },
      }
    },
  });
};
