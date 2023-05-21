<template>
  <div class="max-w-2xl mx-auto my-5">
    <div class="relative overflow-x-auto rounded-t-lg bg-gray-100" v-if="showSearch">
      <div class="p-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <input type="text" id="table-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-80 pl-10 p-2.5"
            placeholder="Search for items" v-model="searchQuery" @input="performSearch">
        </div>
      </div>
    </div>
    <table class="w-full text-sm text-left">
      <thead class="text-xs uppercase bg-gray-100">
        <tr>
          <th v-for="column in columns" :key="column.key" class="px-6 py-3 cursor-pointer" @click="sortData(column.key)"
            :data-column-key="column.key">
            {{ column.label }}
            <span v-if="isSortable(column.key)">
              <span v-if="sortColumn === column.key || !sortColumn">
                <span v-if="sortDirection === 'asc'">▲</span>
                <span v-else>▼</span>
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id" class="bg-white hover:bg-gray-50" id="transaction-table-row">
          <td v-for="column in columns" :key="column.key" class="px-6 py-4">{{ item[column.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue"
import { TableColumnTypes, TableDataTypes } from "@/types/components/table"

export default defineComponent({
  name: "TableComponent",
  props: {
    columns: {
      type: Array as PropType<TableColumnTypes[]>,
      required: true,
    },
    data: {
      type: Array as PropType<TableDataTypes[]>,
      required: true,
    },
    sortableColumns: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const sortColumn = ref<string | null>(null);
    const sortDirection = ref<"asc" | "desc">("asc");
    const searchQuery = ref("");

    const sortedData = computed(() => {
      if (sortColumn.value) {
        const key = sortColumn.value;
        const direction = sortDirection.value === "asc" ? 1 : -1;
        return [...props.data].sort((a, b) => {
          const valueA = a[key];
          const valueB = b[key];
          if (valueA < valueB) return -1 * direction;
          if (valueA > valueB) return 1 * direction;
          return 0;
        });
      }
      return props.data;
    });

    const isSortable = (columnKey: string) => {
      return props.sortableColumns.includes(columnKey);
    };

    const sortData = (columnKey: string) => {
      if (isSortable(columnKey)) {
        if (sortColumn.value === columnKey) {
          sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
        } else {
          sortColumn.value = columnKey;
          sortDirection.value = "asc";
        }
      }
    };

    const filteredData = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return sortedData.value.filter(item =>
        Object.values(item).some(value => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(query);
          }
          return false;
        })
      );
    });

    const performSearch = () => {
      sortColumn.value = null;
      sortDirection.value = "asc";
    };

    return {
      sortColumn,
      sortDirection,
      searchQuery,
      filteredData,
      isSortable,
      sortData,
      performSearch
    };
  }
})
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f4f4f4;
}

.bg-white {
  background-color: #ffffff;
}

.text-gray-900 {
  color: #333333;
}

.text-gray-500 {
  color: #888888;
}
</style>
