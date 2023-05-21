<template>
    <div class="mb-2">
        <div class="flex flex-col sm:flex-row justify-center">
            <label class="mr-2 text-sm font-bold sm:inline-block hidden whitespace-nowrap">Date Range</label>
            <div class="sm:mb-0 sm:mr-2">
                <label class="mr-2 text-sm font-bold sm:hidden mb-1">Date Range</label>
                <input type="date" v-model="startDate"
                    class="w-full sm:w-200 px-2 py-1 text-sm border rounded mb-1 sm:mb-0" />
            </div>
            <span class="px-2 hidden sm:inline">-</span>
            <input type="date" v-model="endDate"
                class="w-full sm:w-200 px-2 py-1 text-sm border rounded mb-1 sm:mb-0 sm:mr-2" />
            <button @click="applyFilters"
                class="w-full sm:w-auto mt-2 sm:mt-0 px-3 py-1 bg-blue-500 text-white rounded text-sm">Filter</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "DateRangeFilter",
    data() {
        return {
            startDate: "",
            endDate: "",
        };
    },
    methods: {
        applyFilters() {
            this.$emit("filters-applied", {
                startDate: this.startDate,
                endDate: this.endDate,
            });
        },
    },
})
</script>
<style scoped></style>
  