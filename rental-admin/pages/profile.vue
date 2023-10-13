<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Profile" link="/profile" />

    <div
      class="p-5 grid place-items-center grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-3 content-container w-full"
    >
      <div
        class="grid place-items-center bg-white p-4 rounded-lg shadow-md w-full sm:w-[312px] md:max-w-sm xl:max-w-lg xl:w-[512px] min-h-[612px] text-center"
      >
        <div class="flex justify-center mb-4">
          <img
            v-if="user.profilePicture"
            :src="user.profilePicture"
            alt="User Profile"
            class="rounded-full w-36 h-36"
          />
          <p v-else class="text-gray-600">No profile picture available</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Name</label>
          <p class="text-lg font-semibold">{{ user.name }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Email</label>
          <p>{{ user.email }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Role</label>
          <p>{{ user.role }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Address</label>
          <p>{{ user.address }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Phone Number</label>
          <p>{{ user.phoneNumber }}</p>
        </div>
      </div>
      <div
        class="bg-white p-4 rounded-lg shadow-md w-full sm:w-[312px] md:max-w-sm xl:max-w-lg xl:w-[512px] min-h-[612px]"
      >
        <h2 class="text-center text-2xl font-semibold text-[#333] mb-4">
          Input User Profile
        </h2>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Name</label>
          <input
            v-model="user.name"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="user.email"
            class="w-full px-3 py-2 border rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Role</label>
          <input
            v-model="user.role"
            class="w-full px-3 py-2 border rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Address</label>
          <input
            v-model="user.address"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Phone</label>
          <input
            v-model="user.phoneNumber"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600"
            >Picture ( Only Url & Format Picture )</label
          >
          <input
            v-model="user.profilePicture"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="flex justify-center">
          <button
            class="bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            @click="saveProfile"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        role: '',
        address: '',
        phoneNumber: '',
        profilePicture: '',
      },
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    saveProfile() {
      this.$axios
        .put('/me', this.user, {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        .then((response) => {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        })
        .catch((error) => {
          console.error('An error occurred during saving profile', error)
          this.$store.commit('toast/setToast', {
            message: error,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        })
    },
    async fetchUsers() {
      try {
        const response = await this.$axios.get('/me', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        this.user = response.data.data
      } catch (error) {
        console.error('An error occurred during fetching users', error)
      }
    },
  },
}
</script>

<style scoped>
.content-container {
  min-height: calc(100vh - 80px);
}
</style>
