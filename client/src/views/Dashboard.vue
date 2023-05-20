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
