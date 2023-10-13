<template>
  <header class="navbar px-4 fixed z-50 w-full">
    <section class="container mx-auto flex items-center justify-between py-4">
      <div class="">
        <nuxt-link
          to="/"
          class="text-center md:text-start text-3xl font-bold text-white hover:scale-110 transition-all duration-300 ease-in-out inline-block"
        >
          Rent<span class="text-orange-400">Here</span>
        </nuxt-link>
      </div>
      <nav class="hidden lg:flex space-x-4">
        <nuxt-link
          v-for="(link, index) in navigationData"
          :key="index"
          :to="link.to"
          class="nav-link"
          :class="{
            'nuxt-link-exact-active':
              (isCarsRoute && link.to === '/cars') ||
              (isBikesRoute && link.to === '/bikes'),
          }"
        >
          {{ link.text }}
        </nuxt-link>
      </nav>
      <div class="flex gap-3 items-center">
        <button
          type="button"
          class="hidden lg:block login-button order-2"
          @click="handleAuth"
        >
          {{ buttonName }}
          <fa v-if="token" :icon="['fas', 'right-from-bracket']" />
        </button>
        <nuxt-link
          v-if="token"
          :to="linkCart"
          class="order-1 border rounded-md p-2 relative"
          type="button"
        >
          <fa :icon="['fas', 'cart-shopping']" />
          <span
            class="absolute -top-[10px] -left-[10px] bg-red-500 text-white rounded-full px-1"
            >{{ lengthTransaction ? lengthTransaction : 0 }}</span
          >
        </nuxt-link>
        <button
          type="button"
          class="flex lg:hidden hamburger order-2"
          title="Menu"
          @click="toggleSidebar"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </section>
    <sidebar-navigation
      :show-sidebar="showSidebar"
      :sidebar-classes="sidebarClasses"
      :navigation-data="navigationData"
      :is-cars-route="isCarsRoute"
      :token="token"
      :button-name="buttonName"
      @toggleSidebar="toggleSidebar"
      @handleAuth="handleAuth"
    />
    <overlay :show-overlay="showOverlay" @toggleSidebar="toggleSidebar" />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { linkHome, linkCart } from '@/helpers/linkData'
import navigationData from '@/helpers/navigationData'

export default {
  data() {
    return {
      showSidebar: false,
      showOverlay: false,
      showAnimation: false,
      linkHome,
      linkCart,
      navigationData,
      token: '',
    }
  },
  computed: {
    sidebarClasses() {
      return this.showAnimation ? 'active' : 'deactive'
    },
    isCarsRoute() {
      return this.$route.path.startsWith('/cars/')
    },
    isBikesRoute() {
      return this.$route.path.startsWith('/bikes/')
    },
    buttonName() {
      return this.token ? this.$auth.user.name : 'Login'
    },
    ...mapGetters({
      lengthTransaction: 'transactions/getLengthTransaction',
    }),
  },
  mounted() {
    if (this.$auth.getToken('local')) {
      this.token = this.$auth.getToken('local')
    }
    this.$store.dispatch('transactions/fetchTransactionLength')
  },
  methods: {
    toggleSidebar() {
      if (this.showAnimation) {
        this.showAnimation = !this.showAnimation
        setTimeout(() => {
          this.showSidebar = !this.showSidebar
          this.showOverlay = !this.showOverlay
        }, 400)
        return
      }
      this.showAnimation = !this.showAnimation
      this.showSidebar = !this.showSidebar
      this.showOverlay = !this.showOverlay
    },
    handleAuth() {
      if (this.$auth.getToken('local')) {
        this.$auth.logout()
        this.$store.commit('toast/setToast', {
          message: 'You have been logged out',
          show: true,
          backgroundColor: 'bg-green-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 3000)
        this.token = ''
        this.$router.push('/')
      } else {
        this.$router.push('/auth')
      }
    },
  },
}
</script>

<style scoped>
.nav-link.nuxt-link-exact-active {
  @apply text-orange-400 border-b border-b-orange-400;
}
/* Navbar styles */
.navbar {
  background-color: #333;
  color: white;
}

.nav-link {
  text-decoration: none;
  color: white;
  @apply duration-300 transition-colors;
}

.nav-link:hover {
  @apply hover:text-orange-400;
}

.login-button {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  @apply duration-300 transition-colors;
}

.login-button:hover {
  @apply hover:text-orange-400 hover:border border-orange-400;
}

.hamburger {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 24px;
}

.bar {
  background-color: white;
  display: flex;
  gap: 5px;
  height: 4px;
  width: 100%;
}
</style>
