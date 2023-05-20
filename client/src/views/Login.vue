<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" @click="handleLogin">Login</button>
      <h3>username : user1</h3>
      <h3>password : password1</h3>
    </form>
  </div>
</template>

<script lang="ts">

import { computed, defineComponent, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from 'vuex';



export default defineComponent({
  name: "LoginView",
  setup() {
    const router = useRouter()
    const store = useStore()
    const loggedIn = computed(() => store.state.auth.status.loggedIn);

    const username = ref("")
    const password = ref("")

    const handleLogin = () => {
      store.dispatch("auth/login", {
        username: username.value,
        password: password.value
      }).then(
        () => {
          router.push("/dashboard")
        },
        (error: any) => {
          console.log(error)
        }
      )
    }

    onMounted(() => {
      if (loggedIn.value) {
        router.push("/dashboard")
      }
    });

    return {
      username,
      password,
      handleLogin
    }
  }
})
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
