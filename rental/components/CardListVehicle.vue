<template>
  <section class="flex flex-col justify-center items-center gap-10">
    <div
      class="flex flex-wrap justify-between items-center w-full gap-5 md:gap-0"
    >
      <div>
        <h2 class="text-3xl font-bold text-[#333]">{{ title }}</h2>
        <p class="text-gray-500">{{ subtitle }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-3">
          <p class="text-gray-500">Filter by Merk</p>
          <select
            v-model="localSelectedCategory"
            class="border border-gray-300 rounded-lg px-3 py-2"
            @change="emitCategoryChange"
          >
            <option
              v-for="category in uniqueCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <input
            v-model="localSearchQuery"
            type="text"
            :placeholder="searchPlaceholder"
            class="border border-gray-300 rounded-lg px-3 py-2"
            @input="emitSearchQueryChange"
          />
        </div>
      </div>
    </div>
    <div v-if="cardNotFound" class="flex justify-center">
      <h3 class="text-2xl font-semibold text-[#333]">Data Not Found</h3>
    </div>
    <div v-else class="flex flex-wrap justify-center items-center gap-5">
      <div
        v-for="car in paginatedCars"
        :key="car.id"
        class="bg-white rounded-lg shadow-lg p-5 sm:p-10 w-[250px] sm:w-[300px] xl:max-w-[400px] flex flex-col items-center"
      >
        <div class="relative">
          <nuxt-img
            :src="car.picture"
            :alt="car.name"
            class="w-full h-[175px] mb-4 rounded-lg"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
          <div
            class="absolute top-2 right-2 bg-white rounded-lg p-3 h-[40px] w-[40px] flex items-center justify-center shadow-xl"
          >
            <fa
              v-if="wishlistsSaved(car.id)"
              :icon="['fas', 'bookmark']"
              class="cursor-pointer text-xl text-orange-400"
              @click="handleToggleWishlist(car.id)"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
              class="text-xl cursor-pointer"
              fill="#FB923C"
              @click="handleToggleWishlist(car.id)"
            >
              <path
                d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"
              />
            </svg>
          </div>
        </div>
        <div class="mb-4 w-full">
          <p class="text-right text-gray-600 text-sm">
            Price: Rp.{{ car.price }}
          </p>
          <h3 class="text-xl font-semibold text-[#333] truncate">
            {{ car.name }}
          </h3>
          <p class="text-gray-500 text-sm">{{ car.brand }}</p>
        </div>
        <nuxt-link
          :to="linkCars + '/' + car.id"
          class="text-white py-2 px-4 rounded-lg bg-[#333] hover:bg-orange-400 transition-colors duration-300 ease-in-out"
        >
          Get Detail
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VehicleList',
  props: {
    paginatedCars: {
      type: Array,
      required: true,
    },
    linkCars: {
      type: String,
      required: true,
    },
    searchQuery: {
      type: String,
      default: '',
    },
    uniqueCategories: {
      type: Array,
      required: true,
    },
    selectedCategory: {
      type: String,
      default: '',
    },
    cardNotFound: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    searchPlaceholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localSearchQuery: this.searchQuery,
      localSelectedCategory: this.selectedCategory,
    }
  },
  computed: {
    ...mapGetters({
      wishlists: 'wishlist/getWishlists',
    }),
  },
  methods: {
    emitCategoryChange() {
      this.$emit('category-change', this.localSelectedCategory)
    },
    emitSearchQueryChange() {
      this.$emit('search-query-change', this.localSearchQuery)
    },
    handleToggleWishlist(vehicleId) {
      this.$emit('toggle-wishlist', vehicleId)
    },
    wishlistsSaved(vehicleId) {
      if (this.type === 'bike') {
        return this.wishlists.find((wishlist) => wishlist.bikeId === vehicleId)
      } else {
        return this.wishlists.find((wishlist) => wishlist.carId === vehicleId)
      }
    },
  },
}
</script>

<style></style>
