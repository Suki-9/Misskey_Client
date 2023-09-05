//css
import "./assets/css/main.css";
import "./assets/icon/fontello/css/fontello.css";

//js
import "../src/scripts/global/result";
import "../src/assets/css/device/styleSwitch";

//ts module
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
