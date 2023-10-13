<template>
  <header class="sticky top-0 z-40">
    <div
      class="w-full h-20 px-6 bg-[#F7FAFC] border-b flex items-center justify-between"
    >
      <div class="flex gap-3">
        <div class="lg:hidden flex items-center mr-4">
          <button
            class="hover:text-orange-400 hover:border-white focus:outline-none navbar-burger"
            @click="toggleSidebar"
          >
            <fa :icon="['fas', 'bars']" class="h-6 w-6 fill-current" />
          </button>
        </div>
        <div class="text-gray-800">
          <p>
            <span class="text-gray-400">Pages</span> /
            <nuxt-link :to="link">{{ title }}</nuxt-link>
          </p>
          <p class="font-bold tex-base sm:text-xl text-orange-400">
            {{ title }}
          </p>
        </div>
      </div>
      <div
        class="flex items-center gap-2 relative cursor-pointer"
        @click="toggleMenu"
      >
        <img
          :src="
            user?.profilePicture
              ? user.profilePicture
              : 'https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg'
          "
          class="w-12 h-12 rounded-full shadow-lg"
          alt="profile"
        />
        <p class="hidden sm:block text-base sm:text-lg">{{ user?.name }}</p>
        <fa :icon="['fas', 'chevron-down']" />
        <div
          v-if="showMenu"
          class="absolute bg-[#F7FAFC] border border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 -bottom-[136px] sm:-bottom-[96px] -right-[26px] mr-6"
        >
          <p class="block sm:hidden px-4 py-2 cursor-default">
            {{ user?.name }}
          </p>
          <nuxt-link
            to="/profile"
            class="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >Account</nuxt-link
          ><button
            type="button"
            class="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showMenu: false,
      user: null,
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const response = await this.$axios.get('/me', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      })
      this.user = response.data.data
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    toggleSidebar() {
      this.$store.commit('sidebar/toggleSidebar')
    },
    logout() {
      this.$auth.logout()
      this.$store.commit('toast/setToast', {
        message: 'You have been logged out',
        show: true,
        backgroundColor: 'bg-green-500',
      })
      setTimeout(() => {
        this.$store.commit('toast/closeToast')
      }, 3000)
      this.$router.push('/login')
    },
  },
}
</script>

<style></style>
