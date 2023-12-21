import './assets/main.css'
import './assets/fonts/iconfont.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
// app.use(createPinia())

app.use(router)

app.mount('#app')
