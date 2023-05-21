<template>
    <div class="my-5 max-w-2xl mx-auto">
        <div class="flex flex-col items-start">
            <DateRangeFilter @filters-applied="updateDateFilters" class="mb-4" />
            <PriceRangeFilter @filters-applied="updatePriceFilters" />
        </div>
        <TableComponent :columns="columns" :data="pagedTransactions" :show-search="false" />
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @page-change="changePage" />
        <div v-if="loading">Loading...</div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from "vue";
import TableComponent from "@/components/common/Table.vue";
import axiosInstance from "@/helpers/axiosInstance";
import { TransactionsTypes } from "@/types/api/transaction";

import DateRangeFilter from "@/components/filtering/DateRangeFilter.vue";
import PriceRangeFilter from "@/components/filtering/PriceRangeFilter.vue";
import PaginationComponent from "@/components/navigation/Pagination.vue";

export default defineComponent({
    name: "CustomerView",
    components: {
        TableComponent,
        DateRangeFilter,
        PriceRangeFilter,
        PaginationComponent,
    },
    setup() {
        const transactions = reactive<TransactionsTypes>([]);
        const loading = ref(false);
        const columns = [
            { key: "id", label: "transaction ID" },
            { key: "date", label: "date" },
            { key: "amount", label: "amount" },
            { key: "description", label: "description" },
        ];
        const currentPage = ref(1);
        const pageSize = 10; // Set the desired page size static for now
        const totalTransactions = ref(0);

        onMounted(async () => {
            await fetchTransactionData();
        });

        const fetchTransactionData = async () => {
            loading.value = true;
            await axiosInstance
                .get("/transactions")
                .then((res) => {
                    transactions.splice(0, transactions.length, ...res.data);
                    totalTransactions.value = transactions.length;
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    loading.value = false;
                    currentPage.value = 1; // Reset to first page after fetching data
                });
        };

        const filteredTransactions = computed(() => {
            const filtered = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.date);
                const transactionAmount = transaction.amount;

                const isWithinDateRange =
                    (startDateRef.value === "" ||
                        transactionDate >= new Date(startDateRef.value)) &&
                    (endDateRef.value === "" ||
                        transactionDate <= new Date(endDateRef.value));

                const isWithinAmountRange =
                    transactionAmount >= minAmountRef.value &&
                    transactionAmount <= maxAmountRef.value;

                return isWithinDateRange && isWithinAmountRange;
            });

            return filtered;
        });

        const pagedTransactions = computed(() => {
            const start = (currentPage.value - 1) * pageSize;
            const end = start + pageSize;
            return filteredTransactions.value.slice(start, end);
        });

        const totalPages = computed(() =>
            Math.ceil(filteredTransactions.value.length / pageSize)
        );

        const startDateRef = ref("");
        const endDateRef = ref("");
        const minAmountRef = ref(0);
        const maxAmountRef = ref(100);

        const updateDateFilters = (filters: { startDate: any; endDate: any }) => {
            const { startDate, endDate } = filters;
            startDateRef.value = startDate;
            endDateRef.value = endDate;
            currentPage.value = 1; // Reset to first page when filters are applied
        };

        const updatePriceFilters = (filters: { minAmount: any; maxAmount: any }) => {
            const { minAmount, maxAmount } = filters;
            minAmountRef.value = minAmount;
            maxAmountRef.value = maxAmount;
            currentPage.value = 1; // Reset to first page when filters are applied
        };

        const changePage = (newPage: number | string) => {
            if (newPage === "previous" && currentPage.value > 1) {
                currentPage.value--;
            } else if (newPage === "next" && currentPage.value < totalPages.value) {
                currentPage.value++;
            } else if (typeof newPage === "number") {
                currentPage.value = newPage;
            }
        };

        return {
            columns,
            transactions,
            loading,
            startDateRef,
            endDateRef,
            minAmountRef,
            maxAmountRef,
            filteredTransactions,
            pagedTransactions,
            currentPage,
            pageSize,
            totalPages,
            updateDateFilters,
            updatePriceFilters,
            changePage,
        };
    },
});
</script>
  