<template>
  <main
    class="min-h-screen h-full flex flex-col justify-center items-center pt-[94px] bg-[#f5f5f5]"
  >
    <section class="w-full px-10">
      <nuxt-img
        src="/images/hero/mobil-motor.webp"
        alt="collection cars and bikes"
        class="w-full"
        :placeholder="[100, 50, 10]"
        loading="lazy"
      />
    </section>
    <section class="text-center pt-10 px-10">
      <h1 class="text-xl md:text-4xl font-extrabold text-[#333] mb-4 uppercase">
        Renting cars and motorcycles has never been easier
      </h1>
      <p class="text-base md:text-lg text-gray-700 mb-4">
        The RentHere team is ready to serve and assist you.
      </p>
      <nuxt-link
        :to="linkContact"
        class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
      >
        Get Started
      </nuxt-link>
    </section>
    <section
      class="w-full flex flex-wrap gap-3 mt-12 justify-center lg:flex-nowrap"
    >
      <div
        class="flex flex-wrap items-center gap-3 bg-orange-400 rounded-lg p-5 w-full max-w-[200px] shadow-xl"
      >
        <div class="bg-[#f5f5f5] rounded-full p-2">
          <fa :icon="['fas', 'house']" class="text-orange-400 text-xl" />
        </div>
        <div>
          <h3 class="text-2xl text-[#f5f5f5] font-semibold">
            {{ lengtOfItems.brands }}+
          </h3>
          <p class="text-lg text-[#f5f5f5]">Branches</p>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center gap-3 bg-orange-400 rounded-lg p-5 w-full max-w-[200px] shadow-xl"
      >
        <div class="bg-[#f5f5f5] rounded-full p-2">
          <fa :icon="['fas', 'car']" class="text-orange-400 text-xl" />
        </div>
        <div>
          <h3 class="text-2xl text-[#f5f5f5] font-semibold">
            {{ lengtOfItems.cars }}+
          </h3>
          <p class="text-lg text-[#f5f5f5]">Cars</p>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center gap-3 bg-orange-400 rounded-lg p-5 w-full max-w-[200px] shadow-xl"
      >
        <div class="bg-[#f5f5f5] rounded-full p-2">
          <fa :icon="['fas', 'motorcycle']" class="text-orange-400 text-xl" />
        </div>
        <div>
          <h3 class="text-2xl text-[#f5f5f5] font-semibold">
            {{ lengtOfItems.bikes }}+
          </h3>
          <p class="text-lg text-[#f5f5f5]">Bikes</p>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center gap-3 bg-orange-400 rounded-lg p-5 w-full max-w-[200px] shadow-xl"
      >
        <div class="bg-[#f5f5f5] rounded-full p-2">
          <fa :icon="['fas', 'retweet']" class="text-orange-400 text-xl" />
        </div>
        <div>
          <h3 class="text-2xl text-[#f5f5f5] font-semibold">
            {{ lengtOfItems.transactions }}+
          </h3>
          <p class="text-lg text-[#f5f5f5]">Rented</p>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center gap-3 bg-orange-400 rounded-lg p-5 w-full max-w-[200px] shadow-xl"
      >
        <div class="bg-[#f5f5f5] rounded-full p-2">
          <fa
            :icon="['fas', 'face-laugh-squint']"
            class="text-orange-400 text-xl"
          />
        </div>
        <div>
          <h3 class="text-2xl text-[#f5f5f5] font-semibold">
            {{ lengtOfItems.customers }}+
          </h3>
          <p class="text-lg text-[#f5f5f5]">Customers</p>
        </div>
      </div>
    </section>
    <section class="mt-12 w-full px-10">
      <h2
        class="text-xl md:text-3xl font-bold text-[#333] mb-8 text-center uppercase"
      >
        Why rent a vehicle at RentHere?
      </h2>
      <div class="flex flex-wrap lg:flex-nowrap items-center gap-4">
        <div
          class="flex flex-col items-center text-center border-2 border-orange-400 py-4 px-8 rounded-lg shadow-md shadow-[#333] w-full sm:w-[80%] sm:mx-auto"
        >
          <fa
            :icon="['fas', 'circle-check']"
            class="text-orange-400 text-5xl mb-4"
          />
          <p class="text-md sm:text-lg">Wide Selection</p>
          <p class="text-gray-600">
            Choose from a variety of vehicles that suit your needs and won't
            disappoint.
          </p>
        </div>
        <div
          class="flex flex-col items-center text-center border-2 border-orange-400 py-4 px-8 rounded-lg shadow-md shadow-[#333] w-full sm:w-[80%] sm:mx-auto"
        >
          <fa :icon="['fas', 'clock']" class="text-orange-400 text-5xl mb-4" />
          <p class="text-md sm:text-lg">Convenience</p>
          <p class="text-gray-600">
            Hassle-free and time-saving vehicle rental for you and your family
            on vacation
          </p>
        </div>
        <div
          class="flex flex-col items-center text-center border-2 border-orange-400 py-4 px-8 rounded-lg shadow-md shadow-[#333] w-full sm:w-[80%] sm:mx-auto"
        >
          <fa :icon="['fas', 'shield']" class="text-orange-400 text-5xl mb-4" />
          <p class="text-md sm:text-lg">Safety First</p>
          <p class="text-gray-600">
            Our vehicles are regularly inspected and maintained for your safety.
          </p>
        </div>
        <div
          class="flex flex-col items-center text-center border-2 border-orange-400 py-4 px-8 rounded-lg shadow-md shadow-[#333] w-full sm:w-[80%] sm:mx-auto"
        >
          <fa
            :icon="['fas', 'dollar-sign']"
            class="text-orange-400 text-5xl mb-4"
          />
          <p class="text-md sm:text-lg">Affordable Rates</p>
          <p class="text-gray-600">
            Enjoy competitive prices and budget-friendly options for all of you.
          </p>
        </div>
      </div>
    </section>
    <section class="mt-12 w-full bg-[#3D5974] rounded-t-md pb-10">
      <h2
        class="text-xl md:text-3xl font-bold text-white mb-8 text-center uppercase pt-10"
      >
        Let's Get Rent Right Now
      </h2>
      <div class="flex flex-wrap sm:flex-nowrap items-center">
        <div ref="animation-container" class="w-full sm:w-[60%]"></div>
        <div class="flex flex-col justify-center items-center mx-auto">
          <h3 class="text-3xl font-semibold text-white mb-2">Get Started</h3>
          <p class="text-gray-300 mb-4 text-md md:text-xl text-center">
            Experience new things with Rent<span class="text-orange-400"
              >Here</span
            >
          </p>
          <div class="flex items-center gap-3">
            <nuxt-link
              :to="linkCars"
              class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
            >
              Cars
            </nuxt-link>
            <p class="text-gray-300 text-sm">or</p>
            <nuxt-link
              :to="linkBikes"
              class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
            >
              Bikes
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import lottie from 'lottie-web'
import { linkContact, linkBikes, linkCars } from '@/helpers/linkData'
import heroImage from '@/static/images/hero/mobil-motor.webp'

export default {
  name: 'IndexPage',
  data() {
    return {
      heroImage,
      linkContact,
      linkBikes,
      linkCars,
      lengtOfItems: {
        cars: 0,
        bikes: 0,
        brands: 0,
        customers: 0,
      },
    }
  },
  head() {
    return {
      title: 'Home - RentHere',
    }
  },
  mounted() {
    this.loadLottie('animation-container', 'animation-work')
    this.getLengthCars()
    this.getLengthBikes()
    this.getLengthUsers()
    this.getLengthBrands()
    this.getLengthTransactions()
  },
  methods: {
    loadLottie(reference, file) {
      // Lottie config instance
      const animation = lottie.loadAnimation({
        container: this.$refs[reference],
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: `${window.location.origin}/animations/${file}.json`,
      })

      // Init animation
      animation.play()
    },
    async getLengthCars() {
      try {
        const response = await this.$axios.get('/cars')

        this.lengtOfItems.cars = response.data.data.length
      } catch (error) {
        console.error(error)
      }
    },
    async getLengthBikes() {
      try {
        const response = await this.$axios.get('/bikes')

        this.lengtOfItems.bikes = response.data.data.length
      } catch (error) {
        console.error(error)
      }
    },
    async getLengthUsers() {
      try {
        const response = await this.$axios.get('/users/length')
        this.lengtOfItems.customers = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async getLengthTransactions() {
      try {
        const response = await this.$axios.get('/transactions/length')
        this.lengtOfItems.transactions = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async getLengthBrands() {
      try {
        const carsResponse = await this.$axios.get('/cars')
        const bikesResponse = await this.$axios.get('/bikes')

        const carsBrands = carsResponse.data.data.map((item) => item.brand)
        const bikesBrands = bikesResponse.data.data.map((item) => item.brand)

        const brands = [...new Set([...carsBrands, ...bikesBrands])]

        this.lengtOfItems.brands = brands.length
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped></style>
