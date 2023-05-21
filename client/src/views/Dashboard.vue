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
            columns: [
                { key: "customerId", label: "Customer ID" },
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
            ],
            tableData: [
                { id: 1, customerId: 123, name: "John Doe", email: "john@example.com" },
                { id: 2, customerId: 456, name: "Jane Smith", email: "jane@example.com" },
            ],
        }
    },
})
</script>

<style scoped></style>
