import { App } from "vue"

export const
  $HOST_URL: string = import.meta.env.VITE_HOST_URL

const VITE_env = {
  install: function (app: App) {
    app.config.globalProperties.$HOST_URL = $HOST_URL;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $HOST_URL: string;
  }
}

export default VITE_env