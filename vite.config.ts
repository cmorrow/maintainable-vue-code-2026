/// <reference types="vitest" />
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    Vue(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "happy-dom",
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
