import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    
} else {
    
}