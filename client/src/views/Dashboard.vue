<template>
    <Customers />
</template>
  
<script lang="ts">
import { defineComponent } from "vue"
import Customers from "@/views/Customers.vue"


export default defineComponent({
    name: "DashboardView",
    components: {
        Customers,
    },
    setup() {
        return {
            
        }
    },
})
</script>

<style scoped></style>
