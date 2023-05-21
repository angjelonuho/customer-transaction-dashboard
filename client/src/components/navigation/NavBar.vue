<template>
    <nav class="bg-gray-100">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between">
                <div class="flex space-x-4">
                    <!-- logo -->
                    <div>
                        <router-link to="/dashboard" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                            <img src="https://companieslogo.com/img/orig/ABN.AS-b4e2e1d3.png?t=1597963953"
                                class="h-6 mr-2" />
                            <span class="font-bold">Dashboard</span>
                        </router-link>
                    </div>

                    <!-- primary nav -->
                    <div class="hidden md:flex items-center space-x-1">
                        <router-link to="/dashboard/customer"
                            class="py-5 px-3 text-gray-700 hover:text-gray-900">Customers</router-link>
                        <router-link to="/dashboard/transactions"
                            class="py-5 px-3 text-gray-700 hover:text-gray-900">Transactions</router-link>
                    </div>
                </div>

                <!-- secondary nav -->
                <div class="hidden md:flex items-center space-x-1">
                    <button @click="logout" id="logoutButton"
                        class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">
                        Logout
                    </button>
                </div>

                <!-- mobile button goes here -->
                <div class="md:hidden flex items-center">
                    <button class="mobile-menu-button" @click="showMobileMenu = !showMobileMenu">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- mobile menu -->
        <div class="mobile-menu" :class="{ 'hidden': !showMobileMenu }">
            <router-link to="/dashboard/customer" class="block py-2 px-4 text-sm hover:bg-gray-200">Customers</router-link>
            <router-link to="/dashboard/transactions"
                class="block py-2 px-4 text-sm hover:bg-gray-200">Transactions</router-link>
            <button @click="logout"
                class="py-2 my-2 px-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">
                Logout
            </button>
        </div>
    </nav>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'NavBar',
    setup() {
        const showMobileMenu = ref(false);
        const store = useStore();
        const router = useRouter();

        const logout = () => {
            store.dispatch('auth/logout');
            router.push('/');
        };

        return {
            showMobileMenu,
            logout,
        };
    },
});
</script>
  
<style scoped></style>
  