<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="flex flex-col gap-10">
      <card-list-vehicle
        title="Cars Showcase"
        subtitle="Find your dream car"
        search-placeholder="Search car by name here..."
        :paginated-cars="paginatedCars"
        :link-cars="linkCars"
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
import { linkContact, linkCars } from '@/helpers/linkData'
import heroImage from '@/static/images/hero/mobil-motor.webp'
// import carsData from '@/helpers/carsDataDummy'

export default {
  name: 'Cars',
  data() {
    return {
      heroImage,
      linkContact,
      linkCars,
      carsData: [],
      selectedCategory: 'All',
      searchQuery: '',
      cardNotFound: false,
      currentPage: 1,
      perPage: 10,
    }
  },
  head() {
    return {
      title: 'Cars - RentHere',
    }
  },
  computed: {
    paginatedCars() {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      return this.filteredCars.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredCars.length / this.perPage)
    },
    uniqueCategories() {
      const categories = ['All']
      this.carsData.forEach((car) => {
        if (!categories.includes(car.brand)) {
          categories.push(car.brand)
        }
      })
      return categories
    },
    filteredCars() {
      let filtered = this.carsData

      if (this.selectedCategory !== 'All') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.currentPage = 1
        filtered = filtered.filter((car) => car.brand === this.selectedCategory)
      }

      if (this.searchQuery) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.currentPage = 1
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter((car) =>
          car.name.toLowerCase().includes(query)
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
        this.filteredCars.length === 0
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
    this.getCars()
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
    async getCars() {
      try {
        const response = await this.$axios.get('/cars')
        console.log(response.data.data)
        this.carsData = response.data.data
        this.$store.commit('vehicles/setCars', response.data.data)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped></style>
