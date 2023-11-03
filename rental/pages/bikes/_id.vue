<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="flex flex-col gap-5">
      <section v-if="bike !== null" class="bg-white rounded-lg shadow-lg p-5">
        <div class="mb-6">
          <nuxt-img
            :src="bike.picture"
            :alt="bike.name"
            class="w-full h-full object-cover object-center rounded-lg"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
        </div>
        <div class="mb-4">
          <div class="flex justify-between">
            <h1 class="text-2xl font-semibold text-[#333]">{{ bike.name }}</h1>
            <p class="text-gray-500 text-sm">Rate : {{ bike.rating }} / 5</p>
          </div>
          <p class="text-gray-500 text-sm">{{ bike.brand }}</p>
        </div>
        <div class="mb-6">
          <p class="text-[#333]">{{ bike.description }}</p>
        </div>
        <div class="mb-10">
          <p class="text-gray-600">Price: Rp. {{ bike.price }}</p>
          <p class="text-gray-600">Available Quantity: {{ bike.quantity }}</p>
        </div>
        <button
          class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
          :disabled="bike.quantity === 0"
          @click="togglePopup"
        >
          Add to Cart
        </button>
      </section>
      <card-rekomendation
        :link-vehicle="linkBikes"
        :recommendations="recommendations"
      />
      <section class="bg-white rounded-lg shadow-lg p-5">
        <h2 class="text-xl font-semibold mb-3">Testimonial Users</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          <article
            v-for="item in filteredTestimonials"
            :key="item.id"
            class="bg-white rounded-lg shadow-xl p-6 border border-orange-400"
          >
            <nuxt-img
              :src="
                item.user.profilePicture
                  ? item.user.profilePicture
                  : 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1697260404~exp=1697261004~hmac=429d4c74dcdf55bb6ba3bd143254d3a9708069bb8932b72bc17aafd7134e2acf'
              "
              alt="gambar wajah user"
              class="w-full h-[200px] rounded-lg object-cover border-2 border-orange-400"
              :placeholder="[100, 50, 10]"
              loading="lazy"
            />
            <div class="pt-4">
              <div v-if="item.bike" class="flex flex-col gap-5 mb-5">
                <div class="flex items-center flex-wrap justify-center gap-3">
                  <p class="text-gray-600 text-sm">
                    {{ item.bike.name }}
                  </p>
                  -
                  <p class="text-gray-600 text-sm">
                    {{ item.rating_bike }} / 5
                  </p>
                </div>
                <p class="text-gray-700 text-lg">
                  <span class="text-orange-400 font-bold font-serif text-lg"
                    >"</span
                  >
                  {{ item.bikeTestimonial }}
                  <span class="text-orange-400 font-bold font-serif text-lg"
                    >"</span
                  >
                </p>
              </div>
              <div class="flex flex-wrap justify-between items-center">
                <p class="text-orange-400 font-bold">- {{ item.user.name }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>
      <popup-layout
        title="Add Item"
        :popup-class="popupClasses"
        :is-open="isPopupOpen"
        type="vehiclePage"
        @close="togglePopup"
        @save="saveData"
      >
        <popup-cart :edited-transaction="editedTransaction" type="bike" />
      </popup-layout>
      <overlay :show-overlay="showOverlay" @toggleSidebar="togglePopup" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { linkBikes } from '@/helpers/linkData'

export default {
  name: 'Bikes',
  middleware: ['auth'],
  data() {
    return {
      linkBikes,
      isPopupOpen: false,
      showAnimation: false,
      showOverlay: false,
      editedTransaction: {},
    }
  },
  head() {
    return {
      title: this.bike
        ? `${this.bike.name} - RentHere`
        : 'Bike Not Found - RentHere',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/renthere.ico' }],
    }
  },
  computed: {
    ...mapGetters({
      bike: 'vehicles/getBike',
      bikes: 'vehicles/getBikes',
      recommendations: 'vehicles/getRekomendationsBikes',
      testimonials: 'testimonials/getTestimonials',
      notFound: 'vehicles/getNotFound',
    }),
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
    filteredTestimonials() {
      const testimonials = this.testimonials.filter(
        (t) => t.bikeId === Number(this.$route.params.id)
      )

      return testimonials
    },
  },
  watch: {
    '$route.params': {
      handler() {
        this.$store.dispatch(
          'vehicles/fetchRekomendasiBikes',
          this.$route.params
        )
        this.getTestimonialByParams()
      },
    },
  },
  mounted() {
    if (this.notFound) {
      this.$router.push('/error')
    }
    this.$store.dispatch('vehicles/fetchRekomendasiBikes', this.$route.params)
    this.getTestimonialByParams()
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
        carId: null,
        bikeId: this.bike.id,
        payment: '',
        startDate: '',
        rentalDuration: '',
        totalBike: '',
      }
    },
    fetchTransactions() {
      this.$store.dispatch('transactions/fetchTransactionLength')
    },
    getTestimonialByParams() {
      this.$store.dispatch('testimonials/fetchTestimonials')
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
