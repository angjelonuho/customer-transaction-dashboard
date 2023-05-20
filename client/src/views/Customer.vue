<template>
    <TableComponent :columns="columns" :data="tableData" />
    <div v-if="loading">Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from "vue"
import TableComponent from "@/components/common/TableComponent.vue";
import axiosInstance from "@/helpers/axiosInstance";

export default defineComponent({
    name: "CustomerView",
    components: {
        TableComponent,
    },
    setup() {
        let customers = reactive([]);
        const loading = ref(false);

        onMounted(async () => {
            await fetchCustomerData()
        });

        const fetchCustomerData = async () => {

            loading.value = true;
            await axiosInstance.get("/customers")
                .then((res) => customers = res.data)
                .catch(err => console.log(err))
                .finally(() => loading.value = false)

            console.log('___________' + JSON.stringify(customers[0].id))
        }


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
