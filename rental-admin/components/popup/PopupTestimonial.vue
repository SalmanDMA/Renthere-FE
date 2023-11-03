<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section>
    <div class="mb-4">
      <label class="block text-gray-700">User</label>
      <select
        v-model="editedTestimonial.userId"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500': !isUserIdValid && isUserIdTouched,
        }"
        @change="validateUserId"
      >
        <option value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <div v-if="isUserIdTouched && !isUserIdValid" class="text-red-600">
        User is required.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Cars</label>
      <select
        v-model="editedTestimonial.carId"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isCarIdTouched || isBikeIdTouched) && !isVehicleIdValid,
        }"
        @change="validateVehicleId"
      >
        <option value="">Select Cars</option>
        <option v-for="car in cars" :key="car.id" :value="car.id">
          {{ car.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Bikes</label>
      <select
        v-model="editedTestimonial.bikeId"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isCarIdTouched || isBikeIdTouched) && !isVehicleIdValid,
        }"
        @change="validateVehicleId"
      >
        <option value="">Select Bikes</option>
        <option v-for="bike in bikes" :key="bike.id" :value="bike.id">
          {{ bike.name }}
        </option>
      </select>
      <div
        v-if="(isCarIdTouched || isBikeIdTouched) && !isVehicleIdValid"
        class="text-red-600"
      >
        Choice at least one car or bike.
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Rating Car 0 - 5</label>
      <input
        v-model="editedTestimonial.ratingCar"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isRatingCarTouched || isRatingBikeTouched) && !isRatingValid,
        }"
        @input="validateRating"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Rating Bike 0 - 5</label>
      <input
        v-model="editedTestimonial.ratingBike"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isRatingCarTouched || isRatingBikeTouched) && !isRatingValid,
        }"
        @input="validateRating"
      />
      <div
        v-if="(isRatingCarTouched || isRatingBikeTouched) && !isRatingValid"
        class="text-red-600"
      >
        Choice at least one rating car or bike.
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Testimonial Car</label>
      <textarea
        v-model="editedTestimonial.carTestimonial"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isTestimonialCarTouched || isTestimonialBikeTouched) &&
            !isTestimonialValid,
        }"
        @input="validateTestimonial"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Testimonial Bike</label>
      <textarea
        v-model="editedTestimonial.bikeTestimonial"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isTestimonialCarTouched || isTestimonialBikeTouched) &&
            !isTestimonialValid,
        }"
        @input="validateTestimonial"
      />
      <div
        v-if="
          (isTestimonialCarTouched || isTestimonialBikeTouched) &&
          !isTestimonialValid
        "
        class="text-red-600"
      >
        Choice at least one testimonial car or bike, minimum 10 characters and
        maximum 100 characters.
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PopupTestimonial',
  props: {
    editedTestimonial: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cars: [],
      bikes: [],
      users: [],
      isCarIdTouched: false,
      isBikeIdTouched: false,
      isUserIdTouched: false,
      isRatingCarTouched: false,
      isRatingBikeTouched: false,
      isTestimonialCarTouched: false,
      isTestimonialBikeTouched: false,
    }
  },
  computed: {
    ...mapState({
      isUserIdValid: (state) => state.testimonials.isUserIdValid,
      isVehicleIdValid: (state) => state.testimonials.isVehicleIdValid,
      isRatingValid: (state) => state.testimonials.isRatingValid,
      isTestimonialValid: (state) => state.testimonials.isTestimonialValid,
    }),
  },
  mounted() {
    this.dataCars()
    this.dataBikes()
    this.dataUsers()
  },
  methods: {
    ...mapMutations('testimonials', ['updateValidation']),
    validateUserId() {
      this.isUserIdTouched = true
      this.updateValidation({
        inputName: 'UserId',
        isValid: this.editedTestimonial.userId !== '',
      })
    },
    validateVehicleId() {
      this.isCarIdTouched = true
      this.isBikeIdTouched = true
      this.updateValidation({
        inputName: 'VehicleId',
        isValid:
          this.editedTestimonial.carId !== '' ||
          this.editedTestimonial.bikeId !== '',
      })
    },
    validateRating() {
      this.isRatingCarTouched = true
      this.isRatingBikeTouched = true
      this.updateValidation({
        inputName: 'Rating',
        isValid:
          this.editedTestimonial.ratingCar !== '' ||
          this.editedTestimonial.ratingBike !== '',
      })
    },
    validateTestimonial() {
      this.isTestimonialCarTouched = true
      this.isTestimonialBikeTouched = true
      this.updateValidation({
        inputName: 'Testimonial',
        isValid:
          (this.editedTestimonial.carTestimonial !== '' ||
            this.editedTestimonial.bikeTestimonial !== '') &&
          (this.editedTestimonial.carTestimonial.length > 10 ||
            this.editedTestimonial.bikeTestimonial.length > 10) &&
          (this.editedTestimonial.carTestimonial.length <= 100 ||
            this.editedTestimonial.bikeTestimonial.length <= 100),
      })
    },
    async dataUsers() {
      try {
        const response = await this.$axios.get('/users', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        this.users = response.data.data
      } catch (error) {
        console.error('An error occurred during fetching users', error)
      }
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

<style></style>
