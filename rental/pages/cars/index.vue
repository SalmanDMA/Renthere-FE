<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="flex flex-col gap-10">
      <card-list-vehicle
        title="Cars Showcase"
        subtitle="Find your dream car"
        search-placeholder="Search car by name here..."
        type="car"
        :paginated-cars="paginatedCars"
        :link-cars="linkCars"
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :unique-categories="uniqueCategories"
        :card-not-found="cardNotFound"
        @category-change="handleCategoryChange"
        @search-query-change="handleSearchQueryChange"
        @toggle-wishlist="saveWishList"
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
import { mapGetters } from 'vuex'
import { linkContact, linkCars } from '@/helpers/linkData'
import heroImage from '@/static/images/hero/mobil-motor.webp'

export default {
  name: 'Cars',
  data() {
    return {
      heroImage,
      linkContact,
      linkCars,
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
    ...mapGetters({
      carsData: 'vehicles/getCars',
      wishlists: 'wishlist/getWishlists',
    }),
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
    this.$store.dispatch('vehicles/fetchCars')
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
    async saveWishList(carId) {
      try {
        const findWishlistSaved = this.wishlists.find(
          (wishlist) => wishlist.carId === carId
        )
        if (findWishlistSaved) {
          await this.removeWishList(findWishlistSaved.id)
        } else {
          await this.addWishList(carId)
        }
      } catch (error) {
        this.$store.commit('toast/setToast', {
          message: error.message,
          show: true,
          backgroundColor: 'bg-red-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 300)
      }
    },

    async addWishList(carId) {
      try {
        const response = await this.$axios.post(
          '/wishlists',
          {
            carId,
            bikeId: null,
          },
          {
            headers: {
              Authorization: this.$auth.getToken('local'),
            },
          }
        )

        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
          this.$store.dispatch('wishlist/fetchWishlists')
        } else {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 300)
        }
      } catch (error) {
        this.$store.commit('toast/setToast', {
          message: error.message,
          show: true,
          backgroundColor: 'bg-red-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 300)
      }
    },
    async removeWishList(id) {
      try {
        const response = await this.$axios.delete(`/wishlists/${id}`, {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
          this.$store.dispatch('wishlist/fetchWishlists')
        } else {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 300)
        }
      } catch (error) {
        this.$store.commit('toast/setToast', {
          message: error.message,
          show: true,
          backgroundColor: 'bg-red-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 300)
      }
    },
  },
}
</script>

<style scoped></style>
