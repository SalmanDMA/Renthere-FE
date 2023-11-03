<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Cars" link="/cars" />

    <div class="p-10 bg-[#F7FAFC] w-full h-full">
      <section class="mb-4 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          class="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-44"
          @click="openAddCarModal"
        >
          <fa :icon="['fas', 'plus']" class="text-lg mr-4" />
          Add New Car
        </button>
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchTerm"
            class="px-4 py-2 rounded-md shadow-lg border border-orange-400 focus:outline-none w-full"
            placeholder="Search cars by name here..."
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
          <tbody v-if="!loading">
            <tr v-for="car in paginatedCars" :key="car.id">
              <td class="border border-orange-400 px-4 py-2">
                {{ car.name }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ car.brand }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ car.quantity }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                <nuxt-img
                  v-if="car && car.picture"
                  :src="car.picture"
                  :alt="car.name"
                  class="w-20 cursor-pointer"
                  :placeholder="[100, 50, 10]"
                  loading="lazy"
                  @click="openImagePopup(car.picture)"
                />
              </td>
              <td class="border border-orange-400 px-4 py-2">
                Rp. {{ car.price }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                <value-table-description :vehicle="car" type="car" />
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ car.rating }} / 5
              </td>
              <td class="border border-orange-400 px-4 py-2">
                <div class="flex justify-center gap-3 w-full">
                  <button
                    class="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openEditCarModal(car)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openDeleteCarModal(car.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <table-skeleton v-else :td="8" />
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
      :popup-class="popupClasses"
      @close="closeModal"
    >
      <popup-image v-if="imagePopup" :picture="carImage" @close="closeModal" />
      <popup-form
        v-else
        :btn-text="editPopup ? 'Update' : 'Add'"
        type="car"
        :delete-popup="deletePopup"
        @save="saveCar"
        @close="closeModal"
      >
        <popup-vehicle
          v-if="!deletePopup"
          :edited-vehicle="editedVehicle"
          @handleInput="handleInputFile"
        />
      </popup-form>
    </popup-layout>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '../components/Pagination.vue'
import PopupForm from '../components/popup/PopupForm.vue'
import TableSkeleton from '../components/skeleton/TableSkeleton.vue'
export default {
  name: 'Cars',
  components: { Pagination, PopupForm, TableSkeleton },
  middleware: 'auth',
  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10,
      showModal: false,
      showAnimation: false,
      notFound: false,
      editPopup: false,
      deletePopup: false,
      imagePopup: false,
      modalTitle: '',
      editedVehicle: {
        name: '',
        brand: '',
        quantity: '',
        price: '',
        description: '',
        picture: '',
      },
      carIdToDelete: null,
      carImage: '',
      loading: false,
      base64Url: null,
      previewUrl: null,
    }
  },
  head() {
    return {
      title: 'Cars | RentHere',
    }
  },
  computed: {
    ...mapGetters({
      cars: 'vehicles/getCars',
    }),
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
    filteredCars() {
      if (!this.searchTerm) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = false
        return this.cars
      }

      const filtered = this.cars.filter((car) =>
        car.name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
      return Math.ceil(this.filteredCars.length / this.itemsPerPage)
    },
    paginatedCars() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredCars.slice(startIndex, startIndex + this.itemsPerPage)
    },
  },
  mounted() {
    this.fetchCars()
  },
  methods: {
    handleInputFile(event) {
      const file = event
      if (file) {
        console.log()
        if (file.size > 1000000) {
          throw new Error('File too large')
        }

        const reader = new FileReader()

        reader.onload = () => {
          const image = new Image()
          image.src = reader.result

          image.onload = () => {
            const canvas = document.createElement('canvas')
            const maxDimension = 500

            let width = image.width
            let height = image.height

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height *= maxDimension / width
                width = maxDimension
              } else {
                width *= maxDimension / height
                height = maxDimension
              }
            }

            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, width, height)

            const resizedBase64Url = canvas.toDataURL('image/jpg')

            this.base64Url = resizedBase64Url
          }
        }
        reader.readAsDataURL(file)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    goToPage(page) {
      this.currentPage = page
    },
    async fetchCars() {
      this.loading = true
      try {
        await this.$store.dispatch('vehicles/fetchCars')
      } catch (error) {
        console.error('An error occurred during fetching cars', error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.showAnimation = false
      setTimeout(() => {
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
        this.carIdToDelete = null
        this.deletePopup = false
        this.imagePopup = false
        this.carImage = ''
        this.base64Url = null
        this.previewUrl = null
      }, 300)
    },
    openAddCarModal() {
      this.showModal = true
      this.showAnimation = true
      this.modalTitle = 'Add Car'
      this.$store.commit('vehicles/setFalseValidation')
    },
    openEditCarModal(car) {
      this.showModal = true
      this.showAnimation = true
      this.editPopup = true
      this.modalTitle = 'Edit Car'
      this.editedVehicle = { ...car }
      this.$store.commit('vehicles/setTrueValidation')
    },
    openDeleteCarModal(id) {
      this.showModal = true
      this.showAnimation = true
      this.deletePopup = true
      this.modalTitle = 'Delete Car'
      this.carIdToDelete = id
    },
    openImagePopup(image) {
      this.showModal = true
      this.showAnimation = true
      this.imagePopup = true
      this.carImage = image
      this.modalTitle = ''
    },
    async saveCar() {
      if (!this.editPopup && !this.deletePopup) {
        await this.addCar()
      }
      if (this.editPopup && !this.deletePopup) {
        await this.editCar()
      }
      if (!this.editPopup && this.deletePopup) {
        await this.deleteCar(this.carIdToDelete)
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
      this.fetchCars()
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
    async addCar() {
      this.editedVehicle.quantity = Number(this.editedVehicle.quantity)
      this.editedVehicle.price = Number(this.editedVehicle.price)

      try {
        try {
          const res = await this.$axios.post('upload/images', {
            image: this.base64Url,
          })
          this.previewUrl = res.data.data.url
        } catch (error) {
          this.base64Url = null
          this.previewUrl = ''
          this.failToast(error)
        }
        if ((this.base64Url && this.previewUrl) || this.editedVehicle.picture) {
          const response = await this.$axios.post(
            '/cars',
            {
              ...this.editedVehicle,
              picture: this.previewUrl
                ? this.previewUrl
                : this.editedVehicle.picture,
            },
            {
              headers: {
                Authorization: this.$auth.getToken('local'),
              },
            }
          )
          if (response.data.status === 'success') {
            this.successToast(response.data.message)
            this.base64Url = null
            this.previewUrl = null
          } else {
            this.failToast(response.data.message)
          }
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async editCar() {
      try {
        try {
          const res = await this.$axios.post('upload/images', {
            image: this.base64Url,
          })
          this.previewUrl = res.data.data.url
        } catch (error) {
          this.base64Url = null
          this.previewUrl = ''
          this.failToast(error)
        }
        if ((this.base64Url && this.previewUrl) || this.editedVehicle.picture) {
          const response = await this.$axios.put(
            `/cars/${this.editedVehicle.id}`,
            {
              name: this.editedVehicle.name,
              brand: this.editedVehicle.brand,
              quantity: Number(this.editedVehicle.quantity),
              price: Number(this.editedVehicle.price),
              description: this.editedVehicle.description,
              picture: this.previewUrl
                ? this.previewUrl
                : this.editedVehicle.picture,
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
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async deleteCar(id) {
      try {
        const response = await this.$axios.delete(`/cars/${id}`, {
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

<style scoped></style>
