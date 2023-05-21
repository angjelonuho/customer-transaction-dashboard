<template>
    <div class="my-5 max-w-2xl mx-auto">
      <div class="flex flex-col items-start">
        <DateRangeFilter @filters-applied="updateDateFilters" class="mb-4" />
        <PriceRangeFilter @filters-applied="updatePriceFilters" />
      </div>
      <TableComponent :columns="columns" :data="filteredTransactions" />
      <div v-if="loading">Loading...</div>
    </div>
  </template>
  
  
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from "vue";
import TableComponent from "@/components/common/TableComponent.vue";
import axiosInstance from "@/helpers/axiosInstance";
import { TransactionsTypes } from "@/interface/api/transaction";

import DateRangeFilter from "@/components/filtering/DateRangeFilter.vue"
import PriceRangeFilter from "@/components/filtering/PriceRangeFilter.vue";

export default defineComponent({
    name: "CustomerView",
    components: {
        TableComponent,
        DateRangeFilter,
        PriceRangeFilter,
    },
    setup() {
        const transactions: TransactionsTypes = reactive([]);
        const loading = ref(false);
        const columns = [
            { key: "id", label: "transaction ID" },
            { key: "date", label: "date" },
            { key: "amount", label: "amount" },
            { key: "description", label: "description" },
        ];

        onMounted(async () => {
            await fetchTransactionData();
        });

        const fetchTransactionData = async () => {
            loading.value = true;
            await axiosInstance
                .get("/transactions")
                .then((res) => transactions.splice(0, transactions.length, ...res.data))
                .catch((err) => console.log(err))
                .finally(() => (loading.value = false));
        };

        const startDateRef = ref("");
        const endDateRef = ref("");
        const minAmountRef = ref(0);
        const maxAmountRef = ref(100);

        const filterTransactions = () => {
            const filtered = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.date);
                const transactionAmount = transaction.amount;

                const isWithinDateRange =
                    (startDateRef.value === "" || transactionDate >= new Date(startDateRef.value)) &&
                    (endDateRef.value === "" || transactionDate <= new Date(endDateRef.value));

                const isWithinAmountRange =
                    transactionAmount >= minAmountRef.value && transactionAmount <= maxAmountRef.value;

                return isWithinDateRange && isWithinAmountRange;
            });

            return filtered;
        };

        const filteredTransactions = computed(() => filterTransactions());

        const updateDateFilters = (filters: { startDate: any; endDate: any; }) => {
            const { startDate, endDate } = filters;
            startDateRef.value = startDate;
            endDateRef.value = endDate;
        };

        const updatePriceFilters = (filters: { minAmount: any; maxAmount: any; }) => {
            const { minAmount, maxAmount } = filters;
            minAmountRef.value = minAmount;
            maxAmountRef.value = maxAmount;
        };

        return {
            columns,
            transactions,
            loading,
            startDateRef,
            endDateRef,
            minAmountRef,
            maxAmountRef,
            filterTransactions,
            filteredTransactions,
            updateDateFilters,
            updatePriceFilters,
        };
    },
});
</script>
  