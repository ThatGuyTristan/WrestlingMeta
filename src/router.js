import { createRouter, createWebHistory } from "vue-router"
import MainPage from "./views/MainPage.vue"

// import useUserStore from "./store/userStore"

const routes = [ 
  { path: "/", component: MainPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
