<template>
  <main
    class="bg-[#f5f5f5] pt-[94px] pb-10 px-5 sm:px-10 flex flex-wrap justify-center items-center gap-10"
  >
    <div
      class="w-full h-max flex flex-col justify-center items-center text-center"
    >
      <h1 class="text-3xl font-bold text-[#333]">Account Page</h1>
      <p class="text-gray-600 text-sm">
        Be careful what you do with this information
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 w-full h-full gap-4">
      <!-- Bagian Change Password -->
      <div class="w-full h-full bg-white p-4 sm:p-8 rounded-lg shadow-md mb-4">
        <h2 class="text-2xl font-semibold">Change Password</h2>
        <p class="text-gray-600 text-sm mb-4">
          Password are important and highly confidential, please don't share it
          and keep it safe
        </p>
        <form @submit.prevent="changePassword">
          <div class="mb-4">
            <label for="currentPassword" class="block text-gray-700"
              >Current Password</label
            >
            <input
              id="currentPassword"
              v-model="currentPassword"
              type="password"
              class="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div class="mb-4">
            <label for="newPassword" class="block text-gray-700"
              >New Password</label
            >
            <input
              id="newPassword"
              v-model="newPassword"
              type="password"
              class="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-700"
              >Confirm Password</label
            >
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            class="bg-[#333] text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
          >
            Save Changes
          </button>
        </form>
      </div>

      <!-- Bagian Delete Account -->
      <div class="w-full h-full bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <p class="text-sm bg-red-500 text-white p-2 max-w-max rounded-lg mb-3">
          Danger Zone
        </p>
        <h2 class="text-2xl font-semibold mb-4">Delete Account</h2>
        <p class="text-gray-600">
          Are you sure you want to delete this account permanently? This action
          is irreversible and will delete everything you have done on this
          Renthere website. Please think wisely before clicking the button
          below.
        </p>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out"
          @click="togglePopup"
        >
          Delete Account
        </button>
      </div>
    </div>
    <popup-layout
      title="Delete Item"
      :popup-class="popupClasses"
      :is-open="isPopupOpen"
      type="accountPage"
      @close="togglePopup"
      @save="deleteAccount"
    >
      <popup-delete
        :cancel="togglePopup"
        title="Are you sure you want to delete this account ?"
      />
    </popup-layout>
    <overlay :show-overlay="showOverlay" @toggleSidebar="togglePopup" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      isPopupOpen: false,
      showOverlay: false,
      showAnimation: false,
    }
  },
  head() {
    return {
      title: 'Account - RentHere',
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
    console.log(this.$auth)
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
    },
    handleResetInputs() {
      this.currentPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    async changePassword() {
      try {
        if (this.newPassword !== this.confirmPassword) {
          this.$store.commit('toast/setToast', {
            message: 'Password does not match',
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
          return
        }

        const response = await this.$axios.put(
          '/users/password',
          {
            email: this.$auth.user.email,
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
          },
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
          this.handleResetInputs()
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

    async deleteAccount() {
      try {
        const response = await this.$axios.delete('/users/delete', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        if (response.data.status === 'success') {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          this.togglePopup()
          this.$auth.logout()
          this.$store.dispatch('token/setToken', null)
          this.$router.push('/')
        }
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 3000)
      } catch (error) {
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

<style>
/* Gaya tambahan sesuai kebutuhan Anda */
</style>
