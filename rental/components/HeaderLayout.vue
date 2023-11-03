<template>
  <header class="navbar px-4 fixed z-50 w-full">
    <section class="container mx-auto flex items-center justify-between py-4">
      <div class="">
        <nuxt-link
          to="/"
          class="text-center md:text-start text-xl sm:text-3xl font-bold text-white hover:scale-110 transition-all duration-300 ease-in-out inline-block"
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
      <div class="flex gap-3 items-center relative">
        <button
          v-if="token"
          class="border rounded-md p-2 relative"
          type="button"
          @click="toggleElement('showMenuNotification')"
        >
          <fa :icon="['fas', 'bell']" />
          <span
            class="absolute -top-[10px] -left-[10px] bg-red-500 text-white rounded-full px-1"
            >{{ notificationData }}</span
          >
        </button>
        <nuxt-img
          v-if="token"
          :src="
            user.profilePicture
              ? user.profilePicture
              : 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1686&q=80'
          "
          alt="profile user"
          class="w-[40px] h-[40px] cursor-pointer object-cover rounded-full object-center border border-white"
          :placeholder="[100, 50, 10]"
          loading="lazy"
          @click="toggleElement('showMenu')"
        />
        <button
          v-else
          type="button"
          class="hidden lg:block login-button"
          @click="handleAuth"
        >
          Login
        </button>
        <section
          v-if="showMenuNotification"
          class="menu-notification"
          :class="sidebarClasses"
        >
          <div class="flex flex-col p-4 border-b border-white gap-3">
            <nuxt-link :to="linkCart" class="menu-link-notification">
              <div class="flex gap-3 items-center">
                <fa :icon="['fas', 'cart-shopping']" />
                <span>Cart</span>
              </div>
              <div
                class="bg-white w-6 h-6 rounded-full flex justify-center items-center"
              >
                <p class="text-sm text-gray-600 font-medium">
                  {{ lengthTransaction }}
                </p>
              </div>
            </nuxt-link>
            <nuxt-link :to="linkWishlist" class="menu-link-notification">
              <div class="flex gap-3 items-center">
                <fa :icon="['fas', 'bookmark']" class="ml-1" />
                <span>Wishlist</span>
              </div>
              <div
                class="bg-white w-6 h-6 rounded-full flex justify-center items-center"
              >
                <p class="text-sm text-gray-600 font-medium">
                  {{ lengthWishlist }}
                </p>
              </div>
            </nuxt-link>
          </div>
        </section>
        <section v-if="showMenu" class="menu" :class="sidebarClasses">
          <div class="flex flex-col p-4 border-b border-white">
            <p class="font-bold text-xl">{{ user.name }}</p>
            <p class="text-sm">
              {{ user.email }}
            </p>
          </div>
          <div class="flex flex-col p-4 border-b border-white gap-3">
            <nuxt-link :to="linkProfile" class="menu-link">
              <fa :icon="['fas', 'user']" />
              <span>Profile</span>
            </nuxt-link>
            <nuxt-link :to="linkAccount" class="menu-link">
              <fa :icon="['fas', 'file-invoice']" />
              <span>Account</span></nuxt-link
            >
          </div>
          <button type="button" class="button-link" @click="handleAuth">
            <fa :icon="['fas', 'right-from-bracket']" />
            <span>Logout</span>
          </button>
        </section>

        <button
          type="button"
          class="flex lg:hidden hamburger order-2"
          title="Menu"
          @click="toggleElement('showSidebar')"
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
      @toggleSidebar="toggleElement('showSidebar')"
      @handleAuth="handleAuth"
    />
    <overlay :show-overlay="showOverlay" @toggleSidebar="toggleOverlay" />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  linkHome,
  linkCart,
  linkProfile,
  linkAccount,
  linkWishlist,
} from '@/helpers/linkData'
import navigationData from '@/helpers/navigationData'

export default {
  data() {
    return {
      showSidebar: false,
      showOverlay: false,
      showAnimation: false,
      showMenu: false,
      showMenuNotification: false,
      linkHome,
      linkCart,
      linkWishlist,
      linkProfile,
      linkAccount,
      navigationData,
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
    ...mapGetters({
      lengthTransaction: 'transactions/getLengthTransaction',
      lengthWishlist: 'wishlist/getLengthWishlist',
      token: 'token/getToken',
      user: 'users/getUser',
    }),
    notificationData() {
      if (!this.lengthTransaction && !this.lengthWishlist) {
        return 0
      }
      return this.lengthTransaction + this.lengthWishlist
    },
  },
  mounted() {
    if (this.$auth.getToken('local')) {
      this.$store.dispatch('token/setToken', this.$auth.getToken('local'))
    }
    this.$store.dispatch('transactions/fetchTransactionLength')
    this.$store.dispatch('wishlist/fetchWishlists')
    this.$store.dispatch('users/fetchMe')
  },
  methods: {
    toggleOverlay() {
      if (this.showSidebar) {
        this.toggleElement('showSidebar')
      } else if (this.showMenu) {
        this.toggleElement('showMenu')
      } else {
        this.toggleElement('showMenuNotification')
      }
    },
    toggleElement(elementName) {
      if (this.showAnimation) {
        this.showAnimation = !this.showAnimation
        setTimeout(() => {
          this[elementName] = !this[elementName]
          this.showOverlay = !this.showOverlay
        }, 400)
        return
      }
      this.showAnimation = !this.showAnimation
      this[elementName] = !this[elementName]
      this.showOverlay = !this.showOverlay
    },
    handleAuth() {
      if (this.$auth.getToken('local')) {
        this.$auth.logout()
        if (this.showSidebar) {
          this.toggleElement('showSidebar')
        } else if (this.showMenu) {
          this.toggleElement('showMenu')
        } else {
          this.toggleElement('showMenuNotification')
        }
        this.$store.commit('toast/setToast', {
          message: 'You have been logged out',
          show: true,
          backgroundColor: 'bg-green-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 3000)
        this.$store.commit('token/setToken', null)
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
  @apply hover:text-orange-400 hover:border border-orange-400 pb-2;
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

.menu {
  @apply absolute bg-[#333] border shadow-xl text-white rounded-lg w-56  -right-[26px] mr-6 z-[100];
}

.menu.active {
  animation: dropIn 0.5s ease-in-out forwards;
}

.menu.deactive {
  animation: dropOut 0.5s ease-in-out forwards;
}

.menu-notification {
  @apply absolute bg-[#333] border shadow-xl text-white rounded-lg w-56  right-[10px] lg:right-[-22px] mr-6 z-[100];
}

.menu-notification.active {
  animation: dropInNotification 0.5s ease-in-out forwards;
}

.menu-notification.deactive {
  animation: dropOutNotification 0.5s ease-in-out forwards;
}

@keyframes dropIn {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: -262px;
    opacity: 1;
  }
}

@keyframes dropOut {
  from {
    bottom: -262px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
@keyframes dropInNotification {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: -125px;
    opacity: 1;
  }
}

@keyframes dropOutNotification {
  from {
    bottom: -125px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

.menu-link {
  @apply cursor-pointer flex items-center gap-3 relative pb-2;
}

.menu-link-notification {
  @apply cursor-pointer flex justify-between items-center  relative pb-2;
}

.button-link {
  @apply cursor-pointer flex items-center gap-1 relative w-full text-left  p-4 hover:bg-[#1f1f1f] transition-colors duration-300 ease-in-out;
}

.menu-link::before,
.menu-link-notification::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #ffffff;
  bottom: 0;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.menu-link:hover::before,
.menu-link-notification:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}
</style>
