import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
