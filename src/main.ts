import { createApp } from "vue";

import "./assets/css/main.css";
import "../src/scripts/global/result";

import App from "./App.vue";
import router from "./router";


createApp(App).use(router).mount("#app");
