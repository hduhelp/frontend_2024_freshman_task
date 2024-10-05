import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/vuetify'

import App from '@/App.vue'
import router from '@/router'
import piniaPersist from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app') 
