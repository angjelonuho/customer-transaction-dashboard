<template>
    <nav aria-label="Page navigation example" class="mt-4">
        <ul class="inline-flex -space-x-px">
            <li>
                <a href="#" class="pagination-link" @click="navigateToPage('previous')">Previous</a>
            </li>
            <li v-for="page in totalPages" :key="page">
                <a href="#" class="pagination-link" :class="{ active: page === currentPage }" @click="navigateToPage(page)">
                    {{ page }}
                </a>
            </li>
            <li>
                <a href="#" class="pagination-link" @click="navigateToPage('next')">Next</a>
            </li>
        </ul>
    </nav>
</template>
  
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "PaginationComponent",
    props: {
        totalPages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    setup(_, { emit }) {
        const navigateToPage = (page) => {
            emit("page-change", page);
        };

        return {
            navigateToPage,
        };
    },
})
</script>
<style scoped>
.pagination-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin-left: 0;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #6b7280;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
}

.pagination-link:hover {
    background-color: #f9fafb;
    color: #4b5563;
}

.pagination-link.active {
    color: #ffffff;
    background-color: #3b82f6;
    border-color: #3b82f6;
}

.pagination-link.active:hover {
    background-color: #2563eb;
    border-color: #2563eb;
}
</style>
  