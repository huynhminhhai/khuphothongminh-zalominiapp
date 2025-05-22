// vite.config.mts
import { defineConfig } from "file:///d:/vnpt/khuphothongminh/khuphothongminh-zalominiapp/node_modules/vite/dist/node/index.js";
import zaloMiniApp from "file:///d:/vnpt/khuphothongminh/khuphothongminh-zalominiapp/node_modules/zmp-vite-plugin/dist/index.mjs";
import react from "file:///d:/vnpt/khuphothongminh/khuphothongminh-zalominiapp/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///d:/vnpt/khuphothongminh/khuphothongminh-zalominiapp/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { fileURLToPath } from "url";
import path from "path";
var __vite_injected_original_import_meta_url = "file:///d:/vnpt/khuphothongminh/khuphothongminh-zalominiapp/vite.config.mts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [zaloMiniApp(), react(), tsconfigPaths()],
    resolve: {
      alias: {
        css: path.resolve(__dirname, "src/css"),
        components: path.resolve(__dirname, "src/components"),
        pages: path.resolve(__dirname, "src/pages"),
        store: path.resolve(__dirname, "src/store"),
        services: path.resolve(__dirname, "src/services"),
        assets: path.resolve(__dirname, "src/assets"),
        apiRequest: path.resolve(__dirname, "src/apiRequest"),
        utils: path.resolve(__dirname, "src/utils"),
        constants: path.resolve(__dirname, "src/constants"),
        envConfig: path.resolve(__dirname, "src/envConfig")
      }
    },
    server: {
      proxy: {
        "/api": {
          target: "https://qlkhupho.vnpt.me",
          changeOrigin: true,
          secure: false
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiZDpcXFxcdm5wdFxcXFxraHVwaG90aG9uZ21pbmhcXFxca2h1cGhvdGhvbmdtaW5oLXphbG9taW5pYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJkOlxcXFx2bnB0XFxcXGtodXBob3Rob25nbWluaFxcXFxraHVwaG90aG9uZ21pbmgtemFsb21pbmlhcHBcXFxcdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9kOi92bnB0L2todXBob3Rob25nbWluaC9raHVwaG90aG9uZ21pbmgtemFsb21pbmlhcHAvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHphbG9NaW5pQXBwIGZyb20gXCJ6bXAtdml0ZS1wbHVnaW5cIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5cclxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcclxuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgcm9vdDogXCIuL3NyY1wiLFxyXG4gICAgYmFzZTogXCJcIixcclxuICAgIHBsdWdpbnM6IFt6YWxvTWluaUFwcCgpLCByZWFjdCgpLCB0c2NvbmZpZ1BhdGhzKCldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIGNzczogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jc3MnKSxcclxuICAgICAgICBjb21wb25lbnRzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcclxuICAgICAgICBwYWdlczogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wYWdlcycpLFxyXG4gICAgICAgIHN0b3JlOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0b3JlJyksXHJcbiAgICAgICAgc2VydmljZXM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc2VydmljZXMnKSxcclxuICAgICAgICBhc3NldHM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzJyksXHJcbiAgICAgICAgYXBpUmVxdWVzdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hcGlSZXF1ZXN0JyksXHJcbiAgICAgICAgdXRpbHM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMnKSxcclxuICAgICAgICBjb25zdGFudHM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29uc3RhbnRzJyksXHJcbiAgICAgICAgZW52Q29uZmlnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2VudkNvbmZpZycpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9xbGtodXBoby52bnB0Lm1lXCIsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVYsU0FBUyxvQkFBb0I7QUFDbFgsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sVUFBVTtBQUxxTSxJQUFNLDJDQUEyQztBQVN2USxJQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxJQUFNLFlBQVksS0FBSyxRQUFRLFVBQVU7QUFFekMsSUFBTyxzQkFBUSxNQUFNO0FBQ25CLFNBQU8sYUFBYTtBQUFBLElBQ2xCLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFNBQVMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxHQUFHLGNBQWMsQ0FBQztBQUFBLElBQ2pELFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLFdBQVcsU0FBUztBQUFBLFFBQ3RDLFlBQVksS0FBSyxRQUFRLFdBQVcsZ0JBQWdCO0FBQUEsUUFDcEQsT0FBTyxLQUFLLFFBQVEsV0FBVyxXQUFXO0FBQUEsUUFDMUMsT0FBTyxLQUFLLFFBQVEsV0FBVyxXQUFXO0FBQUEsUUFDMUMsVUFBVSxLQUFLLFFBQVEsV0FBVyxjQUFjO0FBQUEsUUFDaEQsUUFBUSxLQUFLLFFBQVEsV0FBVyxZQUFZO0FBQUEsUUFDNUMsWUFBWSxLQUFLLFFBQVEsV0FBVyxnQkFBZ0I7QUFBQSxRQUNwRCxPQUFPLEtBQUssUUFBUSxXQUFXLFdBQVc7QUFBQSxRQUMxQyxXQUFXLEtBQUssUUFBUSxXQUFXLGVBQWU7QUFBQSxRQUNsRCxXQUFXLEtBQUssUUFBUSxXQUFXLGVBQWU7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
