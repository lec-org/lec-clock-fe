import { createApp } from 'vue'
import { createPinia } from 'pinia'
<<<<<<< HEAD
import { Message } from '@arco-design/web-vue';
import '@arco-design/web-vue/es/message/style/index.css'

=======
import { Message } from '@arco-design/web-vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982

import App from './App.vue'
import router from './router'
import './style.scss'

const app = createApp(App)
const pinia = createPinia()
<<<<<<< HEAD
Message._context = app._context;
app.use(pinia)
app.use(router)
=======
Message._context = app._context

app.use(ArcoVue)
app.use(pinia)
app.use(router)
app.use(ArcoVueIcon)
>>>>>>> 96096f18bd850164bbda7ebb3dbd496fe0bfa982

app.mount('#app')
