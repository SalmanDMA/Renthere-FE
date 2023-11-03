<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="flex flex-col gap-10">
      <card-list-vehicle
        title="Bikes Showcase"
        subtitle="Find your dream bike"
        search-placeholder="Search bike by name here..."
        type="bike"
        :paginated-cars="paginatedBikes"
        :link-cars="linkBikes"
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
import { linkContact, linkBikes } from '@/helpers/linkData'
import heroImage from '@/static/images/hero/mobil-motor.webp'

export default {
  name: 'Bikes',
  data() {
    return {
      heroImage,
      linkContact,
      linkBikes,
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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/renthere.ico' }],
    }
  },
  computed: {
    ...mapGetters({
      bikesData: 'vehicles/getBikes',
      wishlists: 'wishlist/getWishlists',
    }),
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
    this.$store.dispatch('vehicles/fetchBikes')
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

    async saveWishList(bikeId) {
      try {
        const findWishlistSaved = this.wishlists.find(
          (wishlist) => wishlist.bikeId === bikeId
        )
        if (findWishlistSaved) {
          await this.removeWishList(findWishlistSaved.id)
        } else {
          await this.addWishList(bikeId)
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

    async addWishList(bikeId) {
      try {
        const response = await this.$axios.post(
          '/wishlists',
          {
            bikeId,
            carId: null,
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
