<template>
    <div>
      <TableComponent
        :columns="columns"
        :data="pagedCustomers"
        :sortableColumns="sortableColumns"
      />
      <div v-if="loading" id="loading-indicator">Loading...</div>
      <PaginationComponent
        :totalPages="totalPages"
        :currentPage="currentPage"
        @page-change="changePage"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed, reactive } from "vue";
  import TableComponent from "@/components/common/Table.vue";
  import axiosInstance from "@/helpers/axiosInstance";
  import { CustomersTypes } from "@/types/api/customers";
  import PaginationComponent from "@/components/navigation/Pagination.vue";
  
  export default defineComponent({
    name: "CustomerView",
    components: {
      TableComponent,
      PaginationComponent,
    },
    setup() {
      const customers = reactive<CustomersTypes>([]);
      const loading = ref(false);
      const columns = [
        { key: "id", label: "Customer ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
      ];
      const sortableColumns = ["name", "email"];
      const currentPage = ref(1);
      const pageSize = 10; // Set the desired page size
      const totalCustomers = ref(0);
  
      onMounted(async () => {
        await fetchCustomerData();
      });
  
      const fetchCustomerData = async () => {
        loading.value = true;
        await axiosInstance
          .get("/customers")
          .then((res) => {
            customers.splice(0, customers.length, ...res.data);
            totalCustomers.value = customers.length;
          })
          .catch((err) => console.log(err))
          .finally(() => {
            loading.value = false;
            currentPage.value = 1; // Reset to first page after fetching data
          });
      };
  
      const pagedCustomers = computed(() => {
        const start = (currentPage.value - 1) * pageSize;
        const end = start + pageSize;
        return customers.slice(start, end);
      });
  
      const totalPages = computed(() => Math.ceil(totalCustomers.value / pageSize));
  
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
        customers,
        loading,
        sortableColumns,
        currentPage,
        pageSize,
        totalCustomers,
        pagedCustomers,
        totalPages,
        changePage,
      };
    },
  });
  </script>
  