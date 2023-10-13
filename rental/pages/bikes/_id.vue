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
          class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
        >
          Add to Cart
        </button>
      </section>
      <card-rekomendation
        :link-vehicle="linkBikes"
        :recommendations="recommendations"
      />
    </div>
  </main>
</template>

<script>
import { linkBikes } from '@/helpers/linkData'

export default {
  name: 'Bikes',
  middleware: ['auth'],
  async asyncData({ $axios, params, error }) {
    try {
      const response = await $axios.get(`/bikes`)
      if (response.data.status === 'success') {
        const bike = response.data.data.find(
          (bike) => bike.id === Number(params.id)
        )
        if (!bike) {
          error({ statusCode: 404, message: 'Bike Not Found' })
          return {
            bike: null,
            notFound: true,
            recommendations: [],
          }
        }
        const shuffledBikes = response.data.data.sort(() => Math.random() - 0.5)
        const recommendations = shuffledBikes.slice(0, 5)
        return {
          bike,
          recommendations,
          notFound: false,
        }
      }
    } catch (err) {
      console.error(err)
      error({ statusCode: 500, message: 'Internal Server Error' })
      return {
        bike: null,
        notFound: true,
        recommendations: [],
      }
    }
  },
  data() {
    return {
      linkBikes,
      carEdited: {},
    }
  },
  head() {
    return {
      title: this.bike
        ? `${this.bike.name} - RentHere`
        : 'Bike Not Found - RentHere',
    }
  },
  mounted() {
    if (this.notFound) {
      this.$router.push('/error')
    }
  },
}
</script>
