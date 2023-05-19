import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginComponent from "@/components/auth/LoginComponent.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginComponent,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
