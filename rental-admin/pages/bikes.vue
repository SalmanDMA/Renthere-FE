<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Bikes" link="/bikes" />

    <div class="p-10 bg-[#F7FAFC] w-full h-full">
      <section class="mb-4 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          class="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-44"
          @click="openAddBikeModal"
        >
          <fa :icon="['fas', 'plus']" class="text-lg mr-4" />
          Add New Bike
        </button>
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchTerm"
            class="px-4 py-2 rounded-md shadow-lg border border-orange-400 focus:outline-none w-full"
            placeholder="Search bikes by name here..."
          />
          <fa
            :icon="['fas', 'magnifying-glass']"
            class="text-lg ml-2 absolute top-1/2 right-[15px] -translate-y-1/2 text-orange-400"
          />
        </div>
      </section>

      <!-- Tabel -->
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead class="bg-orange-400 border border-orange-400 text-white">
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Brand</th>
              <th class="px-4 py-2">Qty</th>
              <th class="px-4 py-2">Picture</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Rating</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bike in paginatedBikes" :key="bike.id">
              <td class="border border-orange-400 px-4 py-2">
                {{ bike.name }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ bike.brand }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ bike.quantity }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                <img :src="bike.picture" alt="profile picture" class="w-10" />
              </td>
              <td class="border border-orange-400 px-4 py-2">
                Rp. {{ bike.price }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ bike.description }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ bike.rating }} / 5
              </td>
              <td class="border border-orange-400 px-4 py-2">
                <div class="flex justify-center gap-3 w-full">
                  <button
                    class="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openEditBikeModal(bike)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openDeleteBikeModal(bike.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :go-to-page="goToPage"
      :next-page="nextPage"
      :prev-page="prevPage"
    />
    <data-not-found v-if="notFound" />

    <popup-layout
      :show-modal="showModal"
      :modal-title="modalTitle"
      @close="closeModal"
    >
      <popup-form
        :btn-text="editPopup ? 'Update' : 'Add'"
        :delete-popup="deletePopup"
        @save="saveBike"
        @close="closeModal"
      >
        <popup-vehicle v-if="!deletePopup" :edited-vehicle="editedVehicle" />
      </popup-form>
    </popup-layout>
  </main>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import PopupForm from '../components/popup/PopupForm.vue'
export default {
  name: 'Bikes',
  components: { Pagination, PopupForm },
  middleware: 'auth',
  data() {
    return {
      bikes: [],
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10,
      showModal: false,
      notFound: false,
      editPopup: false,
      deletePopup: false,
      modalTitle: '',
      editedVehicle: {
        name: '',
        brand: '',
        quantity: '',
        price: '',
        description: '',
        picture: '',
      },
      bikeIdToDelete: null,
    }
  },
  head() {
    return {
      title: 'Bikes | RentHere',
    }
  },
  computed: {
    filteredBikes() {
      if (!this.searchTerm) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = false
        return this.bikes
      }

      const filtered = this.bikes.filter((bike) =>
        bike.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )

      if (filtered.length === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = true
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.currentPage = 1
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = false
      }

      return filtered
    },

    totalPages() {
      return Math.ceil(this.filteredBikes.length / this.itemsPerPage)
    },
    paginatedBikes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredBikes.slice(
        startIndex,
        startIndex + this.itemsPerPage
      )
    },
  },
  mounted() {
    this.fetchBikes()
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    goToPage(page) {
      this.currentPage = page
    },
    async fetchBikes() {
      try {
        const response = await this.$axios.get('/bikes', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        this.bikes = response.data.data
        this.$store.commit('vechicles/setBikes', response.data.data)
      } catch (error) {
        console.error('An error occurred during fetching bikes', error)
      }
    },
    closeModal() {
      this.showModal = false
      this.editPopup = false
      this.editedVehicle = {
        name: '',
        brand: '',
        quantity: '',
        price: '',
        description: '',
        picture: '',
      }
      this.bikeIdToDelete = null
      this.deletePopup = false
    },
    closeOverlayOnClickOutside(event) {
      if (this.showModal) {
        const modalContent = this.$refs.modalContent
        if (!modalContent.contains(event.target)) {
          this.closeModal()
        }
      }
    },
    openAddBikeModal() {
      this.showModal = true
      this.modalTitle = 'Add Bike'
    },
    openEditBikeModal(bike) {
      this.showModal = true
      this.editPopup = true
      this.modalTitle = 'Edit Bike'
      this.editedVehicle = { ...bike }
    },
    openDeleteBikeModal(id) {
      this.showModal = true
      this.deletePopup = true
      this.modalTitle = 'Delete Bike'
      this.bikeIdToDelete = id
    },
    async saveBike() {
      if (!this.editPopup && !this.deletePopup) {
        await this.addBike()
      }
      if (this.editPopup && !this.deletePopup) {
        await this.editBike()
      }
      if (!this.editPopup && this.deletePopup) {
        await this.deleteBike(this.bikeIdToDelete)
      }
    },
    successToast(message) {
      this.$store.commit('toast/setToast', {
        message,
        show: true,
        backgroundColor: 'bg-green-500',
      })
      setTimeout(() => {
        this.$store.commit('toast/closeToast')
      }, 3000)
      this.fetchBikes()
      this.closeModal()
    },
    failToast(message) {
      this.$store.commit('toast/setToast', {
        message,
        show: true,
        backgroundColor: 'bg-red-500',
      })
      setTimeout(() => {
        this.$store.commit('toast/closeToast')
      }, 3000)
    },
    async addBike() {
      this.editedVehicle.quantity = Number(this.editedVehicle.quantity)
      this.editedVehicle.price = Number(this.editedVehicle.price)

      try {
        const response = await this.$axios.post('/bikes', this.editedVehicle, {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        if (response.data.status === 'success') {
          this.successToast(response.data.message)
        } else {
          this.failToast(response.data.message)
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async editBike() {
      try {
        const response = await this.$axios.put(
          `/bikes/${this.editedVehicle.id}`,
          {
            name: this.editedVehicle.name,
            brand: this.editedVehicle.email,
            quantity: Number(this.editedVehicle.quantity),
            price: Number(this.editedVehicle.price),
            description: this.editedVehicle.description,
            picture: this.editedVehicle.picture,
          },
          {
            headers: {
              Authorization: this.$auth.getToken('local'),
            },
          }
        )
        if (response.data.status === 'success') {
          this.successToast(response.data.message)
        } else {
          this.failToast(response.data.message)
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async deleteBike(id) {
      try {
        const response = await this.$axios.delete(`/bikes/${id}`, {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        if (response.data.status === 'success') {
          this.successToast(response.data.message)
        } else {
          this.failToast(response.data.message)
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
  },
}
</script>

<style></style>
