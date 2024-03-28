// css -------------------------------------------------///
import "./styles/main.scss";
import "./assets/icon/fontello/css/fontello.css";

// JS Module -------------------------------------------///
import "../src/styles/device/styleSwitch";

// TS Module -------------------------------------------///
import { createApp } from "vue";

// plugins ---------------------------------------------///
import VITE_env from "./plugin/vite_env";
import router from "./plugin/router_index";

import App from "./App.vue";

createApp(App).use(router).use(VITE_env).mount("#app");
