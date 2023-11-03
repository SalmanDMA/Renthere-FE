<!-- eslint-disable vue/no-use-computed-property-like-method -->
<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Testimonials" link="/testimonials" />

    <div class="p-10 bg-[#F7FAFC] w-full h-full">
      <section class="mb-4 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          class="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-[14rem]"
          @click="openAddTestimonialModal"
        >
          <fa :icon="['fas', 'plus']" class="text-lg mr-4" />
          Add New Testimonials
        </button>
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchTerm"
            class="px-4 py-2 rounded-md shadow-lg border border-orange-400 focus:outline-none w-full"
            placeholder="Search testimonial by name here..."
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
              <th class="px-4 py-2">User</th>
              <th class="px-4 py-2">Car</th>
              <th class="px-4 py-2">Rating Car</th>
              <th class="px-4 py-2">Car Testimonial</th>
              <th class="px-4 py-2">Bike</th>
              <th class="px-4 py-2">Rating Bike</th>
              <th class="px-4 py-2">Bike Testimonial</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr
              v-for="testimonial in paginatedTestimonials"
              :key="testimonial.id"
            >
              <td class="border border-orange-400 px-4 py-2">
                {{ testimonial?.user?.name ? testimonial?.user?.name : '-' }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ testimonial?.car?.name ? testimonial?.car?.name : '-' }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ testimonial.rating_car ? testimonial.rating_car : '-' }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{
                  testimonial.carTestimonial ? testimonial.carTestimonial : '-'
                }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ testimonial?.bike?.name ? testimonial?.bike?.name : '-' }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ testimonial.rating_bike ? testimonial.rating_bike : '-' }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{
                  testimonial.bikeTestimonial
                    ? testimonial.bikeTestimonial
                    : '-'
                }}
              </td>

              <td class="border border-orange-400 px-4 py-2">
                <div class="flex justify-center gap-3 w-full">
                  <button
                    class="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openEditTestimonialModal(testimonial)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openDeleteTestimonialModal(testimonial.id)"
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
      <popup-form
        :btn-text="editPopup ? 'Update' : 'Add'"
        :delete-popup="deletePopup"
        type="testimonial"
        @save="saveTestimonial"
        @close="closeModal"
      >
        <popup-testimonial
          v-if="!deletePopup"
          :edited-testimonial="editedTestimonial"
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
  name: 'Testimonials',
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
      modalTitle: '',
      editedTestimonial: {
        userId: '',
        carId: '',
        bikeId: '',
        carTestimonial: '',
        bikeTestimonial: '',
        ratingBike: '',
        ratingCar: '',
      },
      testimonialIdToDelete: null,
      loading: false,
    }
  },
  head() {
    return {
      title: 'Testimonials | RentHere',
    }
  },
  computed: {
    ...mapGetters({
      testimonials: 'testimonials/getTestimonials',
    }),
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
    filteredTestimonials() {
      if (!this.searchTerm) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = false
        return this.testimonials
      }

      const filtered = this.testimonials.filter((testimonial) =>
        testimonial.name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
      return Math.ceil(this.filteredTestimonials.length / this.itemsPerPage)
    },
    paginatedTestimonials() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredTestimonials.slice(
        startIndex,
        startIndex + this.itemsPerPage
      )
    },
  },
  mounted() {
    this.fetchTestimonials()
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
    async fetchTestimonials() {
      this.loading = true
      try {
        await this.$store.dispatch('testimonials/fetchTestimonials')
      } catch (error) {
        console.error('An error occurred during fetching testimonials', error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.showAnimation = false
      setTimeout(() => {
        this.showModal = false
        this.editPopup = false
        this.editedTestimonial = {
          userId: '',
          carId: '',
          bikeId: '',
          carTestimonial: '',
          bikeTestimonial: '',
          ratingBike: '',
          ratingCar: '',
        }
        this.testimonialIdToDelete = null
        this.deletePopup = false
      }, 300)
    },
    openAddTestimonialModal() {
      this.showModal = true
      this.showAnimation = true
      this.modalTitle = 'Add Testimonial'
      this.$store.commit('testimonials/setFalseValidation')
    },
    openEditTestimonialModal(testimonial) {
      this.showModal = true
      this.showAnimation = true
      this.editPopup = true
      this.modalTitle = 'Edit Testimonial'
      this.editedTestimonial = {
        ...testimonial,
        ratingBike: testimonial.rating_bike,
        ratingCar: testimonial.rating_car,
      }
    },
    openDeleteTestimonialModal(id) {
      this.showModal = true
      this.showAnimation = true
      this.deletePopup = true
      this.modalTitle = 'Delete Testimonial'
      this.testimonialIdToDelete = id
    },
    async saveTestimonial() {
      if (!this.editPopup && !this.deletePopup) {
        await this.addTestimonial()
      }
      if (this.editPopup && !this.deletePopup) {
        await this.editTestimonial()
      }
      if (!this.editPopup && this.deletePopup) {
        await this.deleteTestimonial(this.testimonialIdToDelete)
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
      this.fetchTestimonials()
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
    async addTestimonial() {
      this.editedTestimonial.userId = Number(this.editedTestimonial.userId)
      this.editedTestimonial.carId = this.editedTestimonial.carId
        ? Number(this.editedTestimonial.carId)
        : null
      this.editedTestimonial.bikeId = this.editedTestimonial.bikeId
        ? Number(this.editedTestimonial.bikeId)
        : null
      this.editedTestimonial.ratingBike = this.editedTestimonial.ratingBike
        ? parseFloat(this.editedTestimonial.ratingBike)
        : null

      this.editedTestimonial.ratingCar = this.editedTestimonial.ratingCar
        ? parseFloat(this.editedTestimonial.ratingCar)
        : null

      try {
        const response = await this.$axios.post(
          '/testimonials/admin',
          this.editedTestimonial,
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
    async editTestimonial() {
      try {
        const response = await this.$axios.put(
          `/testimonials/admin/${this.editedTestimonial.id}`,
          {
            userId: Number(this.editedTestimonial.userId),
            carId: this.editedTestimonial.carId
              ? Number(this.editedTestimonial.carId)
              : null,
            bikeId: this.editedTestimonial.bikeId
              ? Number(this.editedTestimonial.bikeId)
              : null,
            carTestimonial: this.editedTestimonial.carTestimonial,
            bikeTestimonial: this.editedTestimonial.bikeTestimonial,
            ratingBike: (this.editedTestimonial.ratingBike = this
              .editedTestimonial.ratingBike
              ? parseFloat(this.editedTestimonial.ratingBike)
              : null),
            ratingCar: (this.editedTestimonial.ratingCar = this
              .editedTestimonial.ratingCar
              ? parseFloat(this.editedTestimonial.ratingCar)
              : null),
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
    async deleteTestimonial(id) {
      try {
        const response = await this.$axios.delete(`/testimonials/${id}`, {
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
