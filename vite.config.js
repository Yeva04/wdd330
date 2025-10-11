import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/wdd330/", // matches your repo name
  root: "src",      // tell Vite that your HTML files are inside src/
  build: {
    outDir: "../dist", // output dist folder at project root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),           // home page
        cart: resolve(__dirname, "src/checkout/index.html"),  // cart page
      },
    },
  },
  server: {
    open: "/index.html", // localhost opens home page
  },
});
