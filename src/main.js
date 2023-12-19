import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router"
import { loadFonts } from './plugins/webfontloader'
import { useUserStore } from './store/userStore'

loadFonts()

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')

const store = useUserStore()

const userFromStorage = JSON.parse(localStorage.getItem("sb-ykprzcvwefhdanrgmcdc-auth-token"))

if(userFromStorage) {
  store.updateSession(userFromStorage)
}
