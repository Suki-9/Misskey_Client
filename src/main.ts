// css -------------------------------------------------///
import "./styles/main.css";
import "./assets/icon/fontello/css/fontello.css";

// JS Module -------------------------------------------///
import "../src/styles/device/styleSwitch";

// TS Module -------------------------------------------///
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


createApp(App).use(router).mount("#app");
