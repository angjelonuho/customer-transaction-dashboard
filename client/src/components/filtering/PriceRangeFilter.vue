<template>
    <div class="mb-2">
      <div class="flex flex-col sm:flex-row">
        <label class="text-sm font-bold mb-1 mr-2">Price</label>
        <input type="number" v-model="minAmount"
          class="w-full sm:w-20 px-2 py-1 text-sm border rounded mb-1 sm:mb-0 sm:mr-2" />
        <span class="pr-2 hidden sm:inline">-</span>
        <input type="number" v-model="maxAmount"
          class="w-full sm:w-20 px-2 py-1 text-sm border rounded mb-1 sm:mb-0 sm:mr-2" />
        <button @click="applyFilters" id="priceRangeFilterButton"
          class="w-full sm:w-auto mt-2 sm:mt-0 px-3 py-1 bg-blue-500 text-white rounded text-sm">Filter</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "PriceRangeFilter",
    setup(_, { emit }) {
      const minAmount = ref(0);
      const maxAmount = ref(100);
  
      const applyFilters = () => {
        const filters = {
          minAmount: minAmount.value,
          maxAmount: maxAmount.value,
        };
        emit("filters-applied", filters);
      };
  
      return {
        minAmount,
        maxAmount,
        applyFilters,
      };
    },
  });
  </script>
  
  <style scoped></style>
  