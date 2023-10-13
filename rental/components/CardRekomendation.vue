<template>
  <section
    v-if="recommendations?.length > 0"
    class="bg-white rounded-lg shadow-lg p-5"
  >
    <h2 class="text-xl font-semibold mb-3">Recommendation Cars</h2>
    <div class="flex gap-5 flex-wrap justify-evenly lg:flex-nowrap">
      <article
        v-for="recommendation in recommendations"
        :key="recommendation.id"
        class="mb-4 h-full max-h-[300px]"
      >
        <nuxt-img
          :src="recommendation.picture"
          :alt="recommendation.name"
          class="w-full max-w-[200px] h-[150px] object-cover rounded-lg"
          :placeholder="[100, 50, 10]"
          loading="lazy"
        />
        <div class="mt-2">
          <h3
            class="text-lg w-full max-w-[180px] font-semibold text-[#333] truncate"
          >
            {{ recommendation.name }}
          </h3>
          <p class="text-gray-600 mb-3">Price: ${{ recommendation.price }}</p>
          <nuxt-link
            :to="linkVehicle + '/' + recommendation.id"
            class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
          >
            Get Detail
          </nuxt-link>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RekomendationCard',
  props: {
    recommendations: {
      type: Array,
      required: true,
    },
    linkVehicle: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
