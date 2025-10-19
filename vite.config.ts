import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()],

  // Base public path
  base: "/",

  // Build configuration
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",

    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("solid-js")) {
              return "vendor";
            }
          }
        },
      },
    },

    // Asset handling
    assetsInlineLimit: 4096,
    cssCodeSplit: true,

    // Reporting
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },

  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: false,
    cors: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: false,
  },

  // Dependency optimization
  optimizeDeps: {
    include: ["solid-js"],
    exclude: [],
  },

  // CSS configuration
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    devSourcemap: true,
  },

  // Path resolution
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@styles": resolve(__dirname, "src/styles"),
      "@utils": resolve(__dirname, "src/utils"),
      "@types": resolve(__dirname, "src/types"),
      "@data": resolve(__dirname, "src/data"),
    },
  },

  // Environment variables prefix
  envPrefix: "VITE_",
});
