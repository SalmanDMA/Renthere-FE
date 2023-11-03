<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Dashboard" link="/" />
    <div v-if="!loading">
      <chart
        :cars="Cars"
        :bikes="Bikes"
        :users="Users"
        :transactions="Transactions"
        :testimonials="Testimonials"
      />

      <section class="p-10 bg-[#F7FAFC] w-full h-full">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <!-- Car Card -->
          <div class="bg-orange-400 p-4 rounded-lg shadow-md text-white">
            <div class="flex items-center">
              <fa :icon="['fas', 'car']" class="text-4xl mr-4"></fa>
              <div>
                <p class="text-2xl font-semibold">Total Cars</p>
                <p class="text-lg">{{ Cars.length }}</p>
              </div>
            </div>
          </div>

          <!-- Bike Card -->
          <div class="bg-orange-400 p-4 rounded-lg shadow-md text-white">
            <div class="flex items-center">
              <fa :icon="['fas', 'motorcycle']" class="text-4xl mr-4"></fa>
              <div>
                <p class="text-2xl font-semibold">Total Bikes</p>
                <p class="text-lg">{{ Bikes.length }}</p>
              </div>
            </div>
          </div>

          <!-- Users Card -->
          <div class="bg-orange-400 p-4 rounded-lg shadow-md text-white">
            <div class="flex items-center">
              <fa :icon="['fas', 'users']" class="text-4xl mr-4"></fa>
              <div>
                <p class="text-2xl font-semibold">Total Users</p>
                <p class="text-lg">{{ Users.length }}</p>
              </div>
            </div>
          </div>

          <!-- Transactions Card -->
          <div class="bg-orange-400 p-4 rounded-lg shadow-md text-white">
            <div class="flex items-center">
              <fa :icon="['fas', 'clipboard']" class="text-4xl mr-4"></fa>
              <div>
                <p class="text-2xl font-semibold">Total Transactions</p>
                <p class="text-lg">{{ Transactions.length }}</p>
              </div>
            </div>
          </div>

          <!-- Testimonials Card -->
          <div class="bg-orange-400 p-4 rounded-lg shadow-md text-white">
            <div class="flex items-center">
              <fa :icon="['fas', 'comment']" class="text-4xl mr-4"></fa>
              <div>
                <p class="text-2xl font-semibold">Total Testimonials</p>
                <p class="text-lg">{{ Testimonials.length }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <dasboard-skeleton v-else />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import DasboardSkeleton from '../components/skeleton/DasboardSkeleton.vue'
export default {
  name: 'IndexPage',
  components: { DasboardSkeleton },
  middleware: 'auth',
  data() {
    return {
      loading: false,
    }
  },
  head() {
    return {
      title: 'Dashboard | RentHere',
    }
  },
  computed: {
    ...mapGetters({
      Users: 'users/getUsers',
      User: 'users/getUser',
      Cars: 'vehicles/getCars',
      Bikes: 'vehicles/getBikes',
      Transactions: 'transactions/getTransactions',
      Testimonials: 'testimonials/getTestimonials',
    }),
  },
  mounted() {
    this.userLogin()
    this.dataCars()
    this.dataBikes()
    this.dataUsers()
    this.dataTransactions()
    this.dataTestimonials()
  },
  methods: {
    async userLogin() {
      this.loading = true
      try {
        await this.$store.dispatch('users/fetchMe')
      } catch (error) {
        console.error('An error occurred during get user', error)
      } finally {
        this.loading = false
      }
    },
    async dataCars() {
      this.loading = true
      try {
        await this.$store.dispatch('vehicles/fetchCars')
      } catch (error) {
        console.error('An error occurred during get cars', error)
      } finally {
        this.loading = false
      }
    },
    async dataBikes() {
      this.loading = true
      try {
        await this.$store.dispatch('vehicles/fetchBikes')
      } catch (error) {
        console.error('An error occurred during get bikes', error)
      } finally {
        this.loading = false
      }
    },
    async dataUsers() {
      this.loading = true
      try {
        await this.$store.dispatch('users/fetchUsers')
      } catch (error) {
        console.error('An error occurred during get users', error)
      } finally {
        this.loading = false
      }
    },
    async dataTransactions() {
      this.loading = true
      try {
        await this.$store.dispatch('transactions/fetchTransactions')
      } catch (error) {
        console.error('An error occurred during get transactions', error)
      } finally {
        this.loading = false
      }
    },
    async dataTestimonials() {
      this.loading = true
      try {
        await this.$store.dispatch('testimonials/fetchTestimonials')
      } catch (error) {
        console.error('An error occurred during get testimonials', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
