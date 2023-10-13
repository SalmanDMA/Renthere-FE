<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section
    v-if="showSidebar"
    class="sidebar w-full sm:w-[450px]"
    :class="sidebarClasses"
  >
    <div class="flex items-center justify-between px-8 pt-10">
      <h3 class="text-2xl font-semibold">Edit</h3>
      <button type="button" class="sidebar-close" @click="toggleSidebar">
        <fa :icon="['fas', 'xmark']" />
      </button>
    </div>
    <form class="sidebar-links" @submit.prevent="saveEdit">
      <div class="mb-4">
        <label class="block text-white">Start Date</label>
        <input
          v-model="editedItem.startDate"
          type="datetime-local"
          class="w-full border rounded-md px-3 py-2 text-[#333]"
        />
      </div>
      <div v-if="editedItem.carId" class="mb-4">
        <label class="block text-white">Cars</label>
        <select
          v-model="editedItem.carId"
          class="w-full border rounded-md px-3 py-2 text-[#333]"
        >
          <option value="">Select Cars</option>
          <option v-for="car in cars" :key="car.id" :value="car.id">
            {{ car.name }}
          </option>
        </select>
      </div>
      <div v-if="editedItem.bikeId" class="mb-4">
        <label class="block text-white">Bikes</label>
        <select
          v-model="editedItem.bikeId"
          class="w-full border rounded-md px-3 py-2 text-[#333]"
        >
          <option value="">Select Bikes</option>
          <option v-for="bike in bikes" :key="bike.id" :value="bike.id">
            {{ bike.name }}
          </option>
        </select>
      </div>
      <div v-if="editedItem.carId" class="mb-4">
        <label class="block text-white">Total Car</label>
        <input
          v-model="editedItem.total_car"
          type="text"
          class="w-full border rounded-md px-3 py-2 text-[#333]"
        />
      </div>
      <div v-if="editedItem.bikeId" class="mb-4">
        <label class="block text-white">Total Bike</label>
        <input
          v-model="editedItem.total_bike"
          type="number"
          class="w-full border rounded-md px-3 py-2 text-[#333]"
        />
      </div>
      <div class="mb-4">
        <label class="block text-white">Rental Duration by Day</label>
        <input
          v-model="editedItem.rental_duration"
          type="number"
          class="w-full border rounded-md px-3 py-2 text-[#333]"
        />
      </div>
      <div>
        <button type="submit" class="sidebar-login-button">Save</button>
      </div>
    </form>
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
    editedItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cars: [],
      bikes: [],
    }
  },
  mounted() {
    this.dataBikes()
    this.dataCars()
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
    handleAuth() {
      this.$emit('handleAuth')
    },
    saveEdit() {
      this.$emit('saveEdit', this.editedItem)
    },
    async dataCars() {
      try {
        const response = await this.$axios.get('/cars', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })

        this.cars = response.data.data
      } catch (error) {
        console.error('An error occurred during fetching cars', error)
      }
    },
    async dataBikes() {
      try {
        const response = await this.$axios.get('/bikes', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })

        this.bikes = response.data.data
      } catch (error) {
        console.error('An error occurred during fetching bikes', error)
      }
    },
  },
}
</script>

<style scoped>
/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
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
    right: -100%;
  }
  to {
    right: 0;
  }
}

@keyframes slideOut {
  from {
    right: 0;
  }
  to {
    right: -100%;
  }
}

.sidebar-links {
  @apply flex flex-col px-8 pt-10 pb-8;
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
