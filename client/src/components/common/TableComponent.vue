<template>
  <div class="max-w-2xl mx-auto">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
      <div class="p-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
            placeholder="Search for items"
          >
        </div>
      </div>
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase bg-gray-100">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 cursor-pointer"
              @click="sortData(column.key)"
              :data-column-key="column.key"
            >
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
          <tr v-for="item in sortedData" :key="item.id" class="bg-white hover:bg-gray-50" id="transaction-table-row">
            <td v-for="column in columns" :key="column.key" class="px-6 py-4">{{ item[column.key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue"

interface TableColumn {
  key: string
  label: string
  sortable?: boolean // Add sortable property to TableColumn interface
}

interface TableData {
  [key: string]: any
}

export default defineComponent({
  name: "TableComponent",
  props: {
    columns: {
      type: Array as PropType<TableColumn[]>,
      required: true,
    },
    data: {
      type: Array as PropType<TableData[]>,
      required: true,
    },
    sortableColumns: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const sortColumn = ref<string | null>(null);
    const sortDirection = ref<"asc" | "desc">("asc");

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
      return props.sortableColumns.includes(columnKey); // Check if column is in the sortable columns list
    };

    const sortData = (columnKey: string) => {
      if (isSortable(columnKey)) { // Sort only if the column is in the sortable columns list
        if (sortColumn.value === columnKey) {
          // Reverse the sort direction
          sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
        } else {
          // Set the new sort column and reset the sort direction
          sortColumn.value = columnKey;
          sortDirection.value = "asc";
        }
      }
    };

    return {
      sortColumn,
      sortDirection,
      sortedData,
      isSortable,
      sortData
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
