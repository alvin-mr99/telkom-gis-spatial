// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".",
  plugins: [
    wasm(), 
    react({
      // Add support for styled-components
      babel: {
        plugins: [
          ["babel-plugin-styled-components", { displayName: true }]
        ]
      }
    })
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  server: {
    port: 8081,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    target: "esnext",
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production",
    ),
    "process.env.MapboxAccessToken": JSON.stringify(
      process.env.MapboxAccessToken || "",
    ),
    "process.env.DropboxClientId": JSON.stringify(
      process.env.DropboxClientId || "",
    ),
    "process.env.CartoClientId": JSON.stringify(
      process.env.CartoClientId || "",
    ),
    "process.env.FoursquareClientId": JSON.stringify(
      process.env.FoursquareClientId || "",
    ),
    "process.env.FoursquareDomain": JSON.stringify(
      process.env.FoursquareDomain || "",
    ),
    "process.env.FoursquareAPIURL": JSON.stringify(
      process.env.FoursquareAPIURL || "",
    ),
    "process.env.FoursquareUserMapsURL": JSON.stringify(
      process.env.FoursquareUserMapsURL || "",
    ),
    "process.env.OpenAIToken": JSON.stringify(process.env.OpenAIToken || ""),
    "process.env.NODE_DEBUG": JSON.stringify(false),
    global: "globalThis",
  },
  resolve: {
    dedupe: ["styled-components"],
    alias: {
      "@": resolve(__dirname, "./src"),
      util: "util/",
      assert: resolve(__dirname, "./src/assert-polyfill.js"),
    },
  },
  optimizeDeps: {
    exclude: ["parquet-wasm", "@loaders.gl/parquet", "apache-arrow"],
    include: [
      "assert",
      "buffer",
      "react",
      "react-dom",
      "react-redux",
      "redux",
      "styled-components",
      "maplibre-gl",
      "@kepler.gl/components",
      "@kepler.gl/reducers",
      "@kepler.gl/actions",
      "@kepler.gl/constants",
      "@kepler.gl/utils",
      "@kepler.gl/schemas",
      "@kepler.gl/table",
      "@kepler.gl/layers",
      "@kepler.gl/deckgl-layers",
      "@kepler.gl/effects",
      "@kepler.gl/styles",
      "@kepler.gl/tasks",
      "@deck.gl/core",
      "@deck.gl/layers",
      "@deck.gl/aggregation-layers",
      "@deck.gl/geo-layers",
      "@deck.gl/mesh-layers",
      "@deck.gl/extensions",
      "@luma.gl/core",
      "@luma.gl/engine",
      "@luma.gl/gltools",
      "@luma.gl/shadertools",
      "@luma.gl/webgl",
      "@loaders.gl/core",
      "@loaders.gl/gltf",
      "@loaders.gl/images",
      "@loaders.gl/parquet",
      "@math.gl/core",
      "@math.gl/web-mercator",
      "gl-matrix",
      "lodash.uniq",
    ],
    esbuildOptions: {
      target: "es2020",
    },
  },
});