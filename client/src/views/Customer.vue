<template>
    <TableComponent :columns="columns" :data="customers" />
    <div v-if="loading">Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from "vue"
import TableComponent from "@/components/common/TableComponent.vue";
import axiosInstance from "@/helpers/axiosInstance";
import { CustomersTypes } from "@/interface/api/customers";

export default defineComponent({
    name: "CustomerView",
    components: {
        TableComponent,
    },
    setup() {
        const customers = reactive<CustomersTypes[]>([]);
        const loading = ref(false);
        const columns = [
            { key: "id", label: "Customer ID" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
        ]

        onMounted(async () => {
            await fetchCustomerData()
        });

        const fetchCustomerData = async () => {
            loading.value = true;
            await axiosInstance.get("/customers")
                .then((res) => customers.splice(0, customers.length, ...res.data))
                .catch(err => console.log(err))
                .finally(() => loading.value = false)
        }

        return {
            columns,
            customers,
            loading
        }
    },
})
</script>

<style scoped></style>
