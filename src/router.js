import { createRouter, createWebHistory } from "vue-router"
import MainPage from "./views/MainPage.vue"
import ControlPanel from "./views/ControlPanel"

// import useUserStore from "./store/userStore"

const routes = [ 
  { path: "/", component: MainPage },
  { path: "/admin", component: ControlPanel,
  // beforeEnter: () => {
  //   const store = useUserStore;
  //   if(!store.admin) { 
  //     return false 
  //   }
  // },
}
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
