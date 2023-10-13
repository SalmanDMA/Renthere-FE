<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="flex flex-col gap-5">
      <section v-if="car !== null" class="bg-white rounded-lg shadow-lg p-5">
        <div class="mb-6">
          <nuxt-img
            :src="car.picture"
            :alt="car.name"
            class="w-full h-full object-cover object-center rounded-lg"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
        </div>
        <div class="mb-4">
          <div class="flex justify-between">
            <h1 class="text-2xl font-semibold text-[#333]">{{ car.name }}</h1>
            <p class="text-gray-500 text-sm">Rate : {{ car.rating }} / 5</p>
          </div>
          <p class="text-gray-500 text-sm">{{ car.brand }}</p>
        </div>
        <div class="mb-6">
          <p class="text-[#333]">{{ car.description }}</p>
        </div>
        <div class="mb-10">
          <p class="text-gray-600">Price: Rp. {{ car.price }}</p>
          <p class="text-gray-600">Available Quantity: {{ car.quantity }}</p>
        </div>
        <button
          class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
          @click="togglePopup"
        >
          Add to Cart
        </button>
      </section>
      <card-rekomendation
        :link-vehicle="linkCars"
        :recommendations="recommendations"
      />
      <popup-layout
        title="Add Item"
        :popup-class="popupClasses"
        :is-open="isPopupOpen"
        @close="togglePopup"
        @save="saveData"
      >
        <popup-cart :edited-transaction="editedTransaction" :cars="cars" />
      </popup-layout>
      <overlay :show-overlay="showOverlay" @toggleSidebar="togglePopup" />
    </div>
  </main>
</template>

<script>
import { linkCars } from '@/helpers/linkData'

export default {
  name: 'CarsId',
  middleware: ['auth'],
  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get(`/cars`)
      if (response.data.status === 'success') {
        const cars = response.data.data
        const car = response.data.data.find(
          (car) => car.id === Number(params.id)
        )
        if (!car) {
          error({ statusCode: 404, message: 'Car Not Found' })
          return {
            car: null,
            cars: [],
            notFound: true,
            recommendations: [],
          }
        }
        const shuffledCars = response.data.data.sort(() => Math.random() - 0.5)
        const recommendations = shuffledCars.slice(0, 5)
        return {
          car,
          cars,
          recommendations,
          notFound: false,
        }
      }
    } catch (err) {
      console.error(err)
      error({ statusCode: 500, message: 'Internal Server Error' })
      return {
        car: null,
        cars: [],
        notFound: true,
        recommendations: [],
      }
    }
  },

  data() {
    return {
      linkCars,
      isPopupOpen: false,
      showAnimation: false,
      showOverlay: false,
      editedTransaction: {},
    }
  },
  head() {
    return {
      title: this.car
        ? `${this.car.name} - RentHere`
        : 'Car Not Found - RentHere',
    }
  },
  computed: {
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
  },
  mounted() {
    if (this.notFound) {
      this.$router.push('/error')
    }
    if (!this.$auth) {
      this.$router.push('/auth')
    }
  },
  methods: {
    togglePopup() {
      if (this.showAnimation) {
        this.showAnimation = !this.showAnimation
        setTimeout(() => {
          this.isPopupOpen = !this.isPopupOpen
          this.showOverlay = !this.showOverlay
        }, 400)
        return
      }
      this.showAnimation = !this.showAnimation
      this.isPopupOpen = !this.isPopupOpen
      this.showOverlay = !this.showOverlay
      this.editedTransaction = {
        carId: this.car.id,
        bikeId: null,
        payment: '',
        startDate: '',
        rentalDuration: '',
        totalCar: '',
      }
    },
    fetchTransactions() {
      this.$store.dispatch('transactions/fetchTransactionLength')
    },
    async saveData() {
      try {
        const response = await this.$axios.post(
          '/transactions',
          this.editedTransaction,
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
          this.$router.push('/cart')
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
          this.togglePopup()
          this.fetchTransactions()
        }
      } catch (error) {
        console.error(error)
        this.$store.commit('toast/setToast', {
          message: error,
          show: true,
          backgroundColor: 'bg-red-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 3000)
      }
    },
  },
}
</script>
