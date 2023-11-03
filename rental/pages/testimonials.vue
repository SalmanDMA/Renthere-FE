<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10">
    <div class="container mx-auto px-4">
      <section class="w-full gap-5 md:gap-0" :class="displaySectionContainer">
        <div>
          <h2
            class="text-4xl font-bold text-[#333]"
            :class="displayTitleAndSubtitle"
          >
            Testimonials
          </h2>
          <p class="text-lg text-gray-600" :class="displayTitleAndSubtitle">
            Here are what our customers have to say about us
          </p>
        </div>
        <button
          v-if="token && !editedTestimonial"
          class="text-white py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          @click="toggleInputTestimonial"
        >
          {{
            showInputTestimonial
              ? 'Show All Testimonials'
              : 'Add New Testimonial'
          }}
        </button>
      </section>
      <form-input-testimonial
        v-if="showInputTestimonial"
        :show-input="showInput"
        :testimonial="dataTestimonial"
        :edited-testimonial="editedTestimonial"
        @toggleInput="toggleInput"
        @submitTestimonials="submitTestimonials"
      />
      <section
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-16"
      >
        <div
          v-for="testimonial in displayTestimonialDataByUser"
          :key="testimonial.id"
          class="bg-white rounded-lg shadow-xl p-6 border border-orange-400 relative"
        >
          <nuxt-img
            :src="
              testimonial.user.profilePicture
                ? testimonial.user.profilePicture
                : 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1686&q=80'
            "
            alt="gambar wajah user"
            class="w-[80px] h-[80px] rounded-full object-cover border-8 border-orange-400 shadow-lg absolute top-[-10%] sm:top-[-12%] left-1/2 -translate-x-1/2"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
          <div class="pt-14">
            <div v-if="testimonial.car" class="flex flex-col gap-5 mb-5">
              <div class="flex items-center flex-wrap justify-center gap-3">
                <p class="text-gray-600 text-sm">
                  {{ testimonial.car.name }}
                </p>
                -
                <p class="text-gray-600 text-sm">
                  {{ testimonial.rating_car }} / 5
                </p>
              </div>
              <p class="text-gray-700 text-lg">
                <span class="text-orange-400 font-bold font-serif text-lg"
                  >"</span
                >
                {{ testimonial.carTestimonial }}
                <span class="text-orange-400 font-bold font-serif text-lg"
                  >"</span
                >
              </p>
            </div>
            <div v-if="testimonial.bike" class="flex flex-col gap-5 mb-5">
              <div class="flex items-center flex-wrap justify-center gap-3">
                <p v-if="testimonial.bike" class="text-gray-600 text-sm">
                  {{ testimonial.bike.name }}
                </p>
                -
                <p class="text-gray-600 text-sm">
                  {{ testimonial.rating_bike }} / 5
                </p>
              </div>
              <p class="text-gray-700 text-lg">
                <span class="text-orange-400 font-bold font-serif text-lg"
                  >"</span
                >
                {{ testimonial.bikeTestimonial }}
                <span class="text-orange-400 font-bold font-serif text-lg"
                  >"</span
                >
              </p>
            </div>

            <div class="flex flex-wrap justify-between items-center">
              <p class="text-orange-400 font-bold">
                - {{ testimonial.user.name }}
              </p>
              <button
                v-if="token && $auth.user.id === testimonial.user.id"
                class="text-white py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out"
                @click="handleEditTestimonial(testimonial)"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import FormInputTestimonial from '~/components/Testimonial/FormInputTestimonial.vue'
export default {
  name: 'Testimonials',
  components: { FormInputTestimonial },
  data() {
    return {
      showInputTestimonial: false,
      showInput: {
        car: false,
        bike: false,
        both: false,
      },
      dataTestimonial: {
        carTestimonial: '',
        bikeTestimonial: '',
        ratingCar: 0,
        ratingBike: 0,
        hoverRatingCar: 0,
        hoverRatingBike: 0,
        carId: '',
        bikeId: '',
      },
      editedTestimonial: false,
    }
  },
  head() {
    return {
      title: 'Testimonials - RentHere',
    }
  },
  computed: {
    ...mapGetters({
      token: 'token/getToken',
      cars: 'vehicles/getCars',
      bikes: 'vehicles/getBikes',
      testimonials: 'testimonials/getTestimonials',
    }),
    displaySectionContainer() {
      let display
      if (this.token && !this.editedTestimonial) {
        display = 'flex flex-wrap justify-between items-center'
      } else if (this.token && this.editedTestimonial) {
        display = ''
      } else {
        display = ''
      }

      return display
    },
    displayTitleAndSubtitle() {
      let display
      if (this.token && !this.editedTestimonial) {
        display = ''
      } else if (this.token && this.editedTestimonial) {
        display = 'text-center'
      } else {
        display = 'text-center'
      }
      return display
    },
    displayTestimonialDataByUser() {
      let display = this.testimonials.slice()
      if (this.$auth) {
        const userTestimonials = display.filter(
          (testimonial) => testimonial.user.id === this.$auth.user.id
        )
        const otherTestimonials = display.filter(
          (testimonial) => testimonial.user.id !== this.$auth.user.id
        )
        display = [...userTestimonials, ...otherTestimonials]
      } else {
        display = this.testimonials.slice()
      }
      return display
    },
  },
  mounted() {
    this.$store.dispatch('testimonials/fetchTestimonials')
  },
  methods: {
    handleReset() {
      this.dataTestimonial = {
        carTestimonial: '',
        bikeTestimonial: '',
        ratingCar: 0,
        ratingBike: 0,
        hoverRatingCar: 0,
        hoverRatingBike: 0,
        carId: '',
        bikeId: '',
      }
      this.editedTestimonial = false
    },
    toggleInputTestimonial() {
      this.showInputTestimonial = !this.showInputTestimonial
      this.showInput = {
        car: false,
        bike: false,
        both: false,
      }
      this.handleReset()
    },
    toggleInput(type) {
      if (this.editedTestimonial) {
        this.showInputTestimonial = !this.showInputTestimonial
        this.editedTestimonial = false
        this.handleReset()
      } else {
        const showInput = {
          car: false,
          bike: false,
          both: false,
        }
        this.editedTestimonial = false
        showInput[type] = true
        this.showInput = showInput
        this.handleReset()
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
      this.showInputTestimonial = false
      this.handleReset()
      this.$store.dispatch('testimonials/fetchTestimonials')
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
    handleEditTestimonial(testimonial) {
      this.editedTestimonial = true
      this.dataTestimonial = {
        id: testimonial.id,
        carTestimonial: testimonial.carTestimonial,
        bikeTestimonial: testimonial.bikeTestimonial,
        ratingCar: Number(testimonial.rating_car),
        hoverRatingCar: Number(testimonial.rating_car),
        ratingBike: Number(testimonial.rating_bike),
        hoverRatingBike: Number(testimonial.rating_bike),
        carId: testimonial.carId ? Number(testimonial.carId) : null,
        bikeId: testimonial.bikeId ? Number(testimonial.bikeId) : null,
      }
      this.showInputTestimonial = true
      this.editedTestimonial = true
      if (testimonial.carId) {
        this.showInput.car = true
      } else if (testimonial.bikeId) {
        this.showInput.bike = true
      } else if (testimonial.carId && testimonial.bikeId) {
        this.showInput.both = true
      }
    },
    async submitTestimonials(data) {
      if (this.editedTestimonial) {
        await this.editData(data)
      } else {
        await this.saveData(data)
      }
    },
    async saveData(data) {
      try {
        const response = await this.$axios.post('/testimonials', {
          carTestimonial: data.carTestimonial,
          bikeTestimonial: data.bikeTestimonial,
          ratingCar: Number(data.ratingCar),
          ratingBike: Number(data.ratingBike),
          carId: Number(data.carId) ? Number(data.carId) : null,
          bikeId: Number(data.bikeId) ? Number(data.bikeId) : null,
        })

        if (response.data.status === 'success') {
          this.successToast(response.data.message)
        } else {
          this.failToast(response.data.message)
        }
      } catch (error) {
        this.failToast(error)
      }
    },
    async editData(data) {
      await console.log(data)
      try {
        const response = await this.$axios.put(`/testimonials/${data.id}`, {
          carTestimonial: data.carTestimonial,
          bikeTestimonial: data.bikeTestimonial,
          ratingCar: Number(data.ratingCar),
          ratingBike: Number(data.ratingBike),
          carId: Number(data.carId) ? Number(data.carId) : null,
          bikeId: Number(data.bikeId) ? Number(data.bikeId) : null,
        })
        if (response.data.status === 'success') {
          this.successToast(response.data.message)
          this.handleReset()
          this.showInputTestimonial = false
        } else {
          this.failToast(response.data.message)
        }
      } catch (error) {
        this.failToast(error)
      }
    },
  },
}
</script>

<style></style>
