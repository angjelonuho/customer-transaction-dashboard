<template>
  <div class="flex flex-col items-center">
    <form class="w-full max-w-sm mt-10" @submit.prevent="handleLogin">
      <!-- Username field -->
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Username
          </label>
        </div>
        <div class="md:w-2/3">
          <input v-model="username"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name" type="text">
        </div>
      </div>

      <!-- Password field -->
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input v-model="password"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password" type="password" placeholder="**************">
        </div>
      </div>
      <!-- Error message -->
      <div class="md:flex md:items-center mt-2 mb-4"> <!-- Added CSS class -->
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3 text-red-500"> <!-- Added CSS class for text color -->
          {{ loginError }}
        </div>
      </div>

      <!-- Login button -->
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3 flex justify-center">
          <button @click="handleLogin"
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button">
            Login
          </button>
        </div>
      </div>


    </form>
  </div>

  <!-- Left-aligned last <div> -->
  <div class="mt-10 content-start">
    <p class="text-base font-mono mb-2">username : user1</p>
    <p class="text-base font-mono">password : password1</p>
  </div>
</template>

<script lang="ts">
import { AxiosError } from "axios";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import { ApiErrors } from "@/interface/api/apiErrors";

export default defineComponent({
  name: "LoginView",
  setup() {
    const router = useRouter();
    const store = useStore();
    const loggedIn = computed(() => store.state.auth.status.loggedIn);
    const loginError = ref(""); // Add a reactive variable to hold the login error message

    const username = ref("");
    const password = ref("");

    const handleLogin = () => {
      store.dispatch("auth/login", {
        username: username.value,
        password: password.value
      }).then(
        () => {
          router.push("/dashboard");
        },
        (error: any) => {
          console.log(error)
          if (error.code === "ERR_NETWORK") {
            loginError.value = "server is offline";
          }
          if (error === ApiErrors.INVALID_CREDENTIALS) {
            loginError.value = "username or password is incorrect";
          }

        }
      );
    };

    onMounted(() => {
      if (loggedIn.value) {
        router.push("/dashboard");
      }
    });

    return {
      username,
      password,
      handleLogin,
      loginError // Add loginError to the returned object
    };
  }
});
</script>

<style scoped></style>
