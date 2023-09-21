import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Message } from '@arco-design/web-vue';
import '@arco-design/web-vue/es/message/style/index.css'

import App from './App.vue'
import router from './router'
import './style.scss'

const app = createApp(App)
const pinia = createPinia()
Message._context = app._context;

app.use(pinia)
app.use(router)

app.mount('#app')
