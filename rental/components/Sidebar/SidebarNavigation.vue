<template>
  <section v-if="showSidebar" class="sidebar" :class="sidebarClasses">
    <button type="button" class="sidebar-close" @click="toggleSidebar">
      <fa :icon="['fas', 'xmark']" />
    </button>
    <nav class="sidebar-links">
      <nuxt-link
        v-for="(link, index) in navigationData"
        :key="index"
        :to="link.to"
        class="sidebar-link"
        :class="{ active: isCarsRoute && link.to === '/cars' }"
      >
        {{ link.text }}
      </nuxt-link>
      <button type="button" class="sidebar-login-button" @click="handleAuth">
        {{ buttonName }}
        <fa v-if="token" :icon="['fas', 'right-from-bracket']" />
      </button>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'SidebarNavigation',
  props: {
    showSidebar: {
      type: Boolean,
      required: true,
    },
    sidebarClasses: {
      type: String,
      required: true,
    },
    navigationData: {
      type: Array,
      required: true,
    },
    isCarsRoute: {
      type: Boolean,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    buttonName: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
    handleAuth() {
      this.$emit('handleAuth')
    },
  },
}
</script>

<style scoped>
/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  width: 250px;
  height: 100%;
  background-color: #333;
  color: white;
  z-index: 100;
}

.sidebar.active {
  animation: slideIn 0.5s ease-in-out forwards;
}

.sidebar.deactive {
  animation: slideOut 0.5s ease-in-out forwards;
}

@keyframes slideIn {
  from {
    left: -100%;
  }
  to {
    left: 0;
  }
}

@keyframes slideOut {
  from {
    left: 0;
  }
  to {
    left: -100%;
  }
}

.sidebar-close {
  background-color: transparent;
  @apply cursor-pointer absolute top-2 right-4 text-2xl border-0 text-white z-10;
}

.sidebar-links {
  @apply flex flex-col p-8;
}

.sidebar-link {
  @apply text-white mb-4 no-underline duration-300 transition-colors;
}

.sidebar-login-button {
  @apply text-white border border-white py-2 px-4 rounded-md cursor-pointer w-full duration-300 transition-colors;
  background-color: transparent;
}

.sidebar-link.nuxt-link-exact-active {
  @apply text-orange-400 border-b border-b-orange-400;
}
.sidebar-link:hover {
  @apply hover:text-orange-400;
}
.sidebar-login-button:hover {
  @apply hover:text-orange-400 hover:border border-orange-400;
}
</style>
