import { createApp } from 'vue'
import './assets/app.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// plugins
import apiPlugin from './plugins/api'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(apiPlugin)
  .use(pinia)
  .mount('#app')
