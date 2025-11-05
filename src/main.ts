import { createSSRApp } from "vue";
import App from "./App.vue";

import "uno.css";
import "@/styles/index.scss";

import { setupStore } from "@/store";
import router from "./router";

export function createApp() {
  const app = createSSRApp(App);

  setupStore(app);
  app.use(router);

  return {
    app,
  };
}
