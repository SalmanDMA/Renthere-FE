<template>
  <section
    v-if="totalPages > 1"
    class="px-10 pb-10 flex justify-center items-center mt-4"
  >
    <div class="space-x-2">
      <!-- Tombol navigasi sebelumnya -->
      <button
        :disabled="currentPage === 1"
        class="px-3 py-1 bg-orange-400 hover:bg-orange-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        @click="prevPage"
      >
        <fa :icon="['fas', 'chevron-left']" />
      </button>
      <!-- Tampilkan nomor halaman di antara panah -->
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{
          'bg-orange-400 text-white rounded-md': currentPage === page,
          'text-orange-400 hover:bg-orange-200 hover:text-orange-700 rounded-md':
            currentPage !== page,
        }"
        class="px-3 py-1"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <!-- Tombol navigasi selanjutnya -->
      <button
        :disabled="currentPage === totalPages || totalPages === 0"
        class="px-3 py-1 bg-orange-400 hover:bg-orange-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        @click="nextPage"
      >
        <fa :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PaginationLayout',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    prevPage: {
      type: Function,
      required: true,
    },
    nextPage: {
      type: Function,
      required: true,
    },
    goToPage: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style></style>
