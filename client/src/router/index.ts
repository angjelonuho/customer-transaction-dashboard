import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { useStore } from 'vuex';
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue"
import Customers from "@/views/Customers.vue"
import Transactions from "@/views/Transactions.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/customers",
    name: "customers",
    component: Customers,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.state.auth.status.loggedIn;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next({ path: '/' }); // Redirect to login page if not authenticated
    }
  } else {
    next();
  }
})

export default router
