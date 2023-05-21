<template>
    <div class="mb-2">

        <div class="flex flex-col sm:flex-row">
            <label class="text-sm font-bold mb-1 mr-2">Price</label>
            <input type="number" v-model="minAmount"
                class="w-full sm:w-20 px-2 py-1 text-sm border rounded mb-1 sm:mb-0 sm:mr-2" />
            <span class="pr-2 hidden sm:inline">-</span>
            <input type="number" v-model="maxAmount"
                class="w-full sm:w-20 px-2 py-1 text-sm border rounded mb-1 sm:mb-0 sm:mr-2" />
            <button @click="applyFilters"
                class="w-full sm:w-auto mt-2 sm:mt-0 px-3 py-1 bg-blue-500 text-white rounded text-sm">Filter</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "PriceRangeFilter",
    data() {
        return {
            minAmount: 0,
            maxAmount: 100,
        };
    },
    methods: {
        applyFilters() {
            this.$emit("filters-applied", {
                minAmount: this.minAmount,
                maxAmount: this.maxAmount,
            });
        },
    },
})
</script>
  