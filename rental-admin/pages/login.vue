<template>
  <section class="bg-[#F3F4F6] flex justify-center items-center h-screen">
    <div class="relative w-[280px] sm:w-[600px]">
      <div
        class="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg transform -rotate-[8deg] rounded-lg"
      ></div>
      <div class="relative bg-white rounded-lg shadow pt-8 px-8 pb-12">
        <h1 class="text-3xl font-bold text-center">
          Rent<span class="text-orange-400">Here</span>
        </h1>
        <p class="text-sm text-slate-500 text-center mb-10">
          Sign in to access the dashboard
        </p>
        <div class="flex items-center gap-3">
          <form class="w-full sm:w-1/2" @submit.prevent="login">
            <div class="mt-4">
              <label for="email" class="block text-gray-600 text-sm font-medium"
                >Email</label
              >
              <input
                id="email"
                v-model="email"
                type="text"
                class="mt-1 block w-full border-b-2 border-b-gray-300 shadow-sm focus:ring focus:ring-orange-200 focus:border-orange-400 focus:outline-orange-400"
              />
            </div>
            <div class="mt-4">
              <label
                for="password"
                class="block text-gray-600 text-sm font-medium"
                >Password</label
              >
              <input
                id="password"
                v-model="password"
                type="password"
                class="mt-1 block w-full border-b-2 border-b-gray-300 shadow-sm focus:ring focus:ring-orange-200 focus:border-orange-400 focus:outline-orange-400"
              />
            </div>
            <div class="mt-6">
              <button
                type="submit"
                class="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-200 focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </form>
          <div class="sm:w-1/2 hidden sm:block">
            <img :src="unlock" alt="unlock image" class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import unlock from '@/static/unlock.svg'

export default {
  name: 'Login',
  layout: 'empty',
  data() {
    return {
      email: '',
      password: '',
      unlock,
    }
  },
  head() {
    return {
      title: 'Login | RentHere',
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })

        if (this.$auth.user.role !== 'ADMIN') {
          this.$store.commit('toast/setToast', {
            message: 'You are not admin, please login as admin',
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
          this.email = ''
          this.password = ''
          return this.$router.push('/login')
        }

        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          this.$router.push('/')
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        } else {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
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

<style scoped></style>
