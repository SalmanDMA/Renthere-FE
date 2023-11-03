<template>
  <section>
    <div v-if="item.carId" class="bg-white rounded-lg shadow-lg p-5 sm:p-10">
      <section class="relative mb-4">
        <nuxt-img
          :src="item.car.picture"
          :alt="item.car.name"
          class="w-full h-[150px] object-cover object-center rounded-lg"
          :placeholder="[100, 50, 10]"
          loading="lazy"
        />
        <span
          v-if="item.car.quantity > 0"
          class="bg-green-500 text-white py-1 px-2 rounded-full text-xs absolute top-3 right-3"
          >Ready</span
        >
        <span
          v-else
          class="bg-red-500 text-white py-1 px-2 rounded-full text-xs absolute top-3 right-3"
          >Sold Out</span
        >
      </section>
      <section class="flex flex-col text-gray-600 mb-6">
        <div class="flex gap-3 justify-between items-center">
          <h2 class="title-card">
            {{ item.car.name }}
          </h2>
          <p class="text-gray-600 text-sm font-semibold">
            Rp {{ item.car.price }}
          </p>
        </div>
        <p class="text-sm text-gray-600">
          In Stock ({{ item.car.quantity }} items)
        </p>
      </section>
      <section class="flex flex-wrap gap-3 justify-center items-center">
        <button
          type="button"
          class="w-full md:max-w-max bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          @click="handleOpenAddPopup(item, 'car')"
        >
          Add to Cart
        </button>
        <nuxt-link
          :to="linkCars + '/' + item.car.id"
          class="w-full md:max-w-max bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-[#1f1f1f] transition-colors duration-300 ease-in-out text-center"
        >
          Get detail Car
        </nuxt-link>
        <button
          type="button"
          class="w-full md:max-w-max bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
          @click="handleOpenRemovePopup(item.id)"
        >
          Hapus Item
        </button>
      </section>
    </div>
    <div v-if="item.bikeId" class="bg-white rounded-lg shadow-lg p-5 sm:p-10">
      <section class="relative mb-4">
        <nuxt-img
          :src="item.bike.picture"
          :alt="item.bike.name"
          class="w-full h-[150px] object-cover object-center rounded-lg"
          :placeholder="[100, 50, 10]"
          loading="lazy"
        />
        <span
          v-if="item.bike.quantity > 0"
          class="bg-green-500 text-white py-1 px-2 rounded-full text-xs absolute top-3 right-3"
          >Ready</span
        >
        <span
          v-else
          class="bg-red-500 text-white py-1 px-2 rounded-full text-xs absolute top-3 right-3"
          >Sold Out</span
        >
      </section>
      <section class="flex flex-col text-gray-600 mb-6">
        <div class="flex gap-3 justify-between items-center">
          <h2 class="title-card">
            {{ item.bike.name }}
          </h2>
          <p class="text-gray-600 text-sm font-semibold">
            Rp {{ item.bike.price }}
          </p>
        </div>
        <p class="text-sm text-gray-600">
          In Stock ({{ item.bike.quantity }} items)
        </p>
      </section>
      <section class="flex flex-wrap gap-3 justify-center items-center">
        <button
          type="button"
          class="w-full md:max-w-max bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          @click="handleOpenAddPopup(item, 'bike')"
        >
          Add to Cart
        </button>
        <nuxt-link
          :to="linkCars + '/' + item.bike.id"
          class="w-full md:max-w-max bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-[#1f1f1f] transition-colors duration-300 ease-in-out text-center"
        >
          Get detail Car
        </nuxt-link>
        <button
          type="button"
          class="w-full md:max-w-max bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out"
          @click="handleOpenRemovePopup(item.id)"
        >
          Hapus Item
        </button>
      </section>
    </div>
    <popup-layout
      :title="isDeletePopupOpen ? 'Delete Item' : 'Add Item'"
      type="wishlistPage"
      :popup-class="popupClasses"
      :is-open="isDeletePopupOpen ? isDeletePopupOpen : isAddItemPopupOpen"
      @close="toggleOverlay"
      @save="isDeletePopupOpen ? handleRemove() : handleAdd()"
    >
      <popup-delete
        v-if="isDeletePopupOpen"
        :cancel="toggleOverlay"
        title="Are you sure you want to delete this wishlist ?"
      />
      <popup-cart
        v-else
        :edited-transaction="isCarType ? itemCarData : itemBikeData"
        :type="type"
      />
    </popup-layout>
    <overlay :show-overlay="showOverlay" @toggleSidebar="toggleOverlay" />
  </section>
</template>

<script>
import { linkCars } from '@/helpers/linkData'
export default {
  name: 'ProductCardWishlist',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      linkCars,
      isDeletePopupOpen: false,
      isAddItemPopupOpen: false,
      showOverlay: false,
      showAnimation: false,
      itemIdToRemove: null,
      isCarType: false,
      isBikeType: false,
      itemCarData: {
        startDate: '',
        totalCar: '',
        payment: '',
        rentalDuration: '',
        carId: '',
        bikeId: null,
        totalBike: '',
      },
      itemBikeData: {
        startDate: '',
        totalCar: '',
        payment: '',
        rentalDuration: '',
        carId: null,
        bikeId: '',
        totalBike: '',
      },
    }
  },
  computed: {
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
    type() {
      return this.isCarType ? 'car' : 'bike'
    },
  },
  methods: {
    handleResetInput() {
      this.itemCarData = {
        startDate: '',
        totalCar: '',
        payment: '',
        rentalDuration: '',
        carId: '',
        bikeId: null,
        totalBike: '',
      }
      this.itemBikeData = {
        startDate: '',
        totalCar: '',
        payment: '',
        rentalDuration: '',
        carId: null,
        bikeId: '',
        totalBike: '',
      }
      this.isCarType = false
      this.isBikeType = false
    },
    handleOpenRemovePopup(id) {
      this.toggleElement('isDeletePopupOpen')
      this.itemIdToRemove = id
    },
    handleOpenAddPopup(item, type) {
      if (type === 'car') {
        this.itemCarData = {
          ...this.itemCarData,
          carId: item.carId,
        }
        this.isCarType = true
        return this.toggleElement('isAddItemPopupOpen')
      }
      if (type === 'bike') {
        this.itemBikeData = {
          ...this.itemBikeData,
          bikeId: item.bikeId,
        }
        this.isBikeType = true
        return this.toggleElement('isAddItemPopupOpen')
      }
    },
    handleRemove() {
      this.$emit('remove', this.itemIdToRemove)
      this.itemIdToRemove = null
    },
    handleAdd() {
      if (this.isCarType) {
        this.$emit('add', this.itemCarData)
      } else {
        this.$emit('add', this.itemBikeData)
      }
      this.handleResetInput()
    },
    toggleOverlay() {
      if (this.isDeletePopupOpen) {
        this.toggleElement('isDeletePopupOpen')
      } else {
        this.toggleElement('isAddItemPopupOpen')
      }
    },
    toggleElement(elementName) {
      if (this.showAnimation) {
        this.showAnimation = !this.showAnimation
        setTimeout(() => {
          this[elementName] = !this[elementName]
          this.showOverlay = !this.showOverlay
          this.handleResetInput()
        }, 400)
        return
      }
      this.showAnimation = !this.showAnimation
      this[elementName] = !this[elementName]
      this.showOverlay = !this.showOverlay
    },
  },
}
</script>

<style scoped>
.title-card {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  @apply font-bold text-orange-400 text-xl max-w-[150px];
}
</style>
