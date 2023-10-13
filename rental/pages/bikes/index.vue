<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="flex flex-col gap-10">
      <card-list-vehicle
        title="Bikes Showcase"
        subtitle="Find your dream bike"
        search-placeholder="Search bike by name here..."
        :paginated-cars="paginatedBikes"
        :link-cars="linkBikes"
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :unique-categories="uniqueCategories"
        :card-not-found="cardNotFound"
        @category-change="handleCategoryChange"
        @search-query-change="handleSearchQueryChange"
      />
      <pagination-layout
        :current-page="currentPage"
        :total-pages="totalPages"
        :go-to-page="goToPage"
      />
    </div>
  </main>
</template>

<script>
import { linkContact, linkBikes } from '@/helpers/linkData'
import heroImage from '@/static/images/hero/mobil-motor.webp'

export default {
  name: 'Bikes',
  data() {
    return {
      heroImage,
      linkContact,
      linkBikes,
      bikesData: [],
      selectedCategory: 'All',
      searchQuery: '',
      cardNotFound: false,
      currentPage: 1,
      perPage: 10,
    }
  },
  head() {
    return {
      title: 'Bikes - RentHere',
    }
  },
  computed: {
    paginatedBikes() {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      return this.filteredBikes.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredBikes.length / this.perPage)
    },
    uniqueCategories() {
      const categories = ['All']
      this.bikesData.forEach((bike) => {
        if (!categories.includes(bike.brand)) {
          categories.push(bike.brand)
        }
      })
      return categories
    },
    filteredBikes() {
      let filtered = this.bikesData

      if (this.selectedCategory !== 'All') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.currentPage = 1
        filtered = filtered.filter(
          (bike) => bike.brand === this.selectedCategory
        )
      }

      if (this.searchQuery) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.currentPage = 1
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter((bike) =>
          bike.name.toLowerCase().includes(query)
        )
      }

      if (this.cardNotFound) {
        filtered = []
      }

      return filtered
    },
  },
  watch: {
    searchQuery(newValue) {
      if (
        this.selectedCategory === 'All' &&
        newValue.length > 0 &&
        this.filteredBikes.length === 0
      ) {
        this.cardNotFound = true
      } else {
        this.cardNotFound = false
      }
    },
    selectedCategory(newValue) {
      this.currentPage = 1
    },
  },

  mounted() {
    this.getBikes()
  },
  methods: {
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    handleCategoryChange(newCategory) {
      this.selectedCategory = newCategory
    },
    handleSearchQueryChange(newSearchQuery) {
      this.searchQuery = newSearchQuery
    },
    async getBikes() {
      try {
        const response = await this.$axios.get('/Bikes')
        console.log(response.data.data)
        this.bikesData = response.data.data
        this.$store.commit('vehicles/setBikes', response.data.data)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped></style>
