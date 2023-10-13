<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Dashboard" link="/" />
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
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'auth',
  head() {
    return {
      title: 'Dashboard | RentHere',
    }
  },
  computed: {
    Cars() {
      return this.$store.state.vechicles.cars
    },
    Bikes() {
      return this.$store.state.vechicles.bikes
    },
    Users() {
      return this.$store.state.users.users
    },
    Transactions() {
      return this.$store.state.managements.transactions
    },
    Testimonials() {
      return this.$store.state.managements.testimonials
    },
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
      try {
        const response = await this.$axios.get('/me', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        this.$store.commit('users/setUser', response.data.data)
      } catch (error) {
        console.error('An error occurred during get user', error)
      }
    },
    async dataCars() {
      try {
        const response = await this.$axios.get('/cars')
        this.$store.commit('vechicles/setCars', response.data.data)
      } catch (error) {
        console.error('An error occurred during get cars', error)
      }
    },
    async dataBikes() {
      try {
        const response = await this.$axios.get('/bikes')
        this.$store.commit('vechicles/setBikes', response.data.data)
      } catch (error) {
        console.error('An error occurred during get bikes', error)
      }
    },
    async dataUsers() {
      try {
        const response = await this.$axios.get('/users', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        this.$store.commit('users/setUsers', response.data.data)
      } catch (error) {
        console.error('An error occurred during get users', error)
      }
    },
    async dataTransactions() {
      try {
        const response = await this.$axios.get('/transactions/admin', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        this.$store.commit('managements/setTransactions', response.data.data)
      } catch (error) {
        console.error('An error occurred during get transactions', error)
      }
    },
    async dataTestimonials() {
      try {
        const response = await this.$axios.get('/testimonials')
        this.$store.commit('managements/setTestimonials', response.data.data)
      } catch (error) {
        console.error('An error occurred during get testimonials', error)
      }
    },
  },
}
</script>

<style scoped></style>
