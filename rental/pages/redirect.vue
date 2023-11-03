<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div
      class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center"
    >
      <div
        class="flex justify-center items-center rounded-full bg-red-400 w-40 h-40"
      >
        <fa :icon="['fas', 'exclamation']" class="text-[80px] text-white" />
      </div>
      <h1 class="text-3xl font-semibold mb-4">You are not logged in</h1>
      <p class="text-gray-600 mb-4">
        You will be redirected to the login page in a few seconds.
      </p>
      <p class="text-gray-600 mb-4">or</p>
      <nuxt-link
        :to="linkHome"
        class="bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
        >Go back home</nuxt-link
      >
    </div>
  </main>
</template>

<script>
import { linkHome } from '@/helpers/linkData'

export default {
  name: 'Redirect',
  beforeRouteLeave(to, from, next) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    next()
  },
  layout: 'empty',
  data() {
    return {
      linkHome,
    }
  },
  head() {
    return {
      title: 'Redirect - RentHere',
      meta: [
        {
          httpEquiv: 'refresh',
          content: "7;url='/auth'",
        },
      ],
    }
  },
  mounted() {
    this.timeoutId = setTimeout(() => {
      this.$router.push('/auth')
    }, 7000)
  },
}
</script>
