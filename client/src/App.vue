<template>
  <NavBar v-if="showNavBar" />
  <router-view />
</template>

<script>
import { defineComponent, computed } from "vue"
import NavBar from "@/components/navigation/NavBar.vue";
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    NavBar
  },
  setup() {
    const store = useStore()
    const showNavBar = computed(() => store.state.auth.status.loggedIn) ?? false

    return {
      showNavBar
    }
  },
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
