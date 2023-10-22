// css -------------------------------------------------///
import "./styles/main.css";
import "./assets/icon/fontello/css/fontello.css";

// JS Module -------------------------------------------///
import "../src/styles/device/styleSwitch";

// TS Module -------------------------------------------///
import { createApp } from "vue";

// plugins ---------------------------------------------///
import VITE_env from "./plugin/vite_env";
import router from "./router";

import App from "./App.vue";

createApp(App).use(router).use(VITE_env).mount("#app");
