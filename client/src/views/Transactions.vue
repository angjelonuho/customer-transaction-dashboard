<template>
    <TableComponent :columns="columns" :data="transactions" />
    <div v-if="loading">Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue"
import TableComponent from "@/components/common/TableComponent.vue";
import axiosInstance from "@/helpers/axiosInstance";
import { TransactionsTypes } from "@/interface/api/transaction";

export default defineComponent({
    name: "CustomerView",
    components: {
        TableComponent,
    },
    setup() {
        const transactions = reactive<TransactionsTypes[]>([]);
        const loading = ref(false);
        const columns = [
            { key: "id", label: "transaction ID" },
            { key: "date", label: "date" },
            { key: "amount", label: "amount" },
            { key: "description", label: "description" },
        ]

        onMounted(async () => {
            await fetchTransactionData()
        });

        const fetchTransactionData = async () => {
            loading.value = true;
            await axiosInstance.get("/transactions")
                .then((res) => transactions.splice(0, transactions.length, ...res.data))
                .catch(err => console.log(err))
                .finally(() => loading.value = false)
        }

        return {
            columns,
            transactions,
            loading
        }
    },
})
</script>

<style scoped></style>