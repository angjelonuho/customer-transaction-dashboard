import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router/index"
import store from "@/store"
import setupAxios from "@/helpers/axiosHelper";
import './assets/tailwind.css'

setupAxios(store)

// Create the Vue app
const app = createApp(App)

// Mount the app to the DOM
app.use(router)
app.use(store)
app.mount("#app")
