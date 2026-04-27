import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
      jsxImportSource: "@emotion/react",
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      moment: "moment/moment.js",
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss"],
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          vendor: ["@reduxjs/toolkit", "react-redux"],
        },
      },
    },
  },
});
