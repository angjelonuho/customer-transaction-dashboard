<template>
    <Customer />
</template>
  
<script lang="ts">
import { defineComponent } from "vue"
import Customer from "@/views/Customer.vue"


export default defineComponent({
    name: "DashboardView",
    components: {
        Customer,
    },
    setup() {
        return {
            
        }
    },
})
</script>

<style scoped></style>
