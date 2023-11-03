<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section class="mt-16 bg-white flex flex-col justify-center items-center p-8">
    <h2 class="text-2xl font-bold text-[#333] mb-4 text-center">
      {{
        editedTestimonial ? 'Form Edit Testimonial' : 'Form Give Testimonial'
      }}
    </h2>
    <div class="text-center">
      <div v-if="!editedTestimonial">
        <p class="text-gray-600 text-sm">Click one of the button below</p>
        <div class="flex flex-wrap justify-center mt-3 gap-3">
          <button
            type="button"
            class="text-white py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out"
            @click="toggleInput('car')"
          >
            Give Testimonial Car
          </button>
          <button
            type="button"
            class="text-white py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out"
            @click="toggleInput('bike')"
          >
            Give Testimonial Bike
          </button>
          <button
            type="button"
            class="text-white py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out"
            @click="toggleInput('both')"
          >
            Give Testimonial Car & Bike
          </button>
        </div>
      </div>
      <form
        v-if="showInput.car || showInput.bike || showInput.both"
        @submit.prevent="submitTestimonials"
      >
        <!-- Input testimonial untuk mobil jika dipilih -->
        <div v-if="showInput.car || showInput.both">
          <label class="block text-gray-600 text-sm mt-4">Pick Car</label>
          <select
            v-model="testimonial.carId"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="editedTestimonial"
            @change="validatePickCar"
          >
            <option selected value="">Select Car Here</option>
            <option v-for="car in cars" :key="car.id" :value="car.id">
              {{ car.name }}
            </option>
          </select>
        </div>

        <div v-if="showInput.car || showInput.both">
          <label for="ratingCar" class="block text-gray-600 text-sm mt-4"
            >Rating Car:</label
          >
          <div class="flex justify-center items-center space-x-1 mt-1">
            <span
              v-for="index in 5"
              :key="index"
              class="cursor-pointer"
              @click="testimonial.ratingCar = index"
              @mouseover="testimonial.hoverRatingCar = index"
              @mouseleave="testimonial.hoverRatingCar = testimonial.ratingCar"
            >
              <fa
                :icon="['fas', 'star']"
                class="text-2xl"
                :class="
                  testimonial.hoverRatingCar >= index
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                "
                @click="validateRatingCar"
              />
            </span>
          </div>
        </div>

        <div v-if="showInput.car || showInput.both">
          <label for="carTestimonial" class="block text-gray-600 text-sm mt-4"
            >Car Testimonial:</label
          >
          <textarea
            id="carTestimonial"
            v-model="testimonial.carTestimonial"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows="4"
            @input="validateCarTestimonial"
          ></textarea>
        </div>

        <!-- Input testimonial untuk sepeda motor jika dipilih -->
        <div v-if="showInput.bike || showInput.both">
          <label class="block text-gray-600 text-sm mt-4">Pick Bike</label>
          <select
            v-model="testimonial.bikeId"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="editedTestimonial"
            @change="validatePickBike"
          >
            <option selected value="">Select Bike Here</option>
            <option v-for="bike in bikes" :key="bike.id" :value="bike.id">
              {{ bike.name }}
            </option>
          </select>
        </div>

        <div v-if="showInput.bike || showInput.both">
          <label for="ratingBike" class="block text-gray-600 text-sm mt-4"
            >Rating Bike:</label
          >
          <div class="flex justify-center items-center space-x-1 mt-1">
            <span
              v-for="index in 5"
              :key="index"
              class="cursor-pointer"
              @click="testimonial.ratingBike = index"
              @mouseover="testimonial.hoverRatingBike = index"
              @mouseleave="testimonial.hoverRatingBike = testimonial.ratingBike"
            >
              <fa
                :icon="['fas', 'star']"
                class="text-2xl"
                :class="
                  testimonial.hoverRatingBike >= index
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                "
                @click="validateRatingBike"
              />
            </span>
          </div>
        </div>

        <div v-if="showInput.bike || showInput.both">
          <label for="bikeTestimonial" class="block text-gray-600 text-sm mt-4"
            >Bike Testimonial:</label
          >
          <textarea
            id="bikeTestimonial"
            v-model="testimonial.bikeTestimonial"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows="4"
            @input="validateBikeTestimonial"
          ></textarea>
        </div>
        <div
          v-if="(isPickCarTouched || isPickBikeTouched) && !isPickVehicleValid"
          class="text-red-600"
        >
          {{
            showInput.both
              ? 'Please pick car and bike'
              : 'Please select car or bike'
          }}
        </div>

        <div
          v-if="
            (isRatingCarTouched || isRatingBikeTouched) && !isRatingVehicleValid
          "
          class="text-red-600"
        >
          {{
            showInput.both
              ? 'Please rate car and bike'
              : 'Please rate car or bike'
          }}
        </div>

        <div
          v-if="
            (isCarTestimonialTouched || isBikeTestimonialTouched) &&
            !isTestimonialVehicleValid
          "
          class="text-red-600"
        >
          {{
            showInput.both
              ? 'Please input car and bike testimonial'
              : 'Please input car or bike testimonial'
          }}
        </div>

        <button
          type="submit"
          class="mt-4 text-white py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
          :disabled="!isFormValid"
        >
          {{ editedTestimonial ? 'Edit Testimonial' : 'Add Testimonial' }}
        </button>
        <button
          v-if="editedTestimonial"
          type="button"
          class="mt-4 text-white py-2 px-4 rounded-lg bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          @click="toggleInput"
        >
          Back to List Testimonials
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FormInputTestimonial',
  props: {
    showInput: {
      type: Object,
      required: true,
    },
    testimonial: {
      type: Object,
      required: true,
    },
    editedTestimonial: {
      type: Boolean,
    },
  },
  data() {
    return {
      isPickCarTouched: false,
      isPickBikeTouched: false,
      isRatingCarTouched: false,
      isRatingBikeTouched: false,
      isCarTestimonialTouched: false,
      isBikeTestimonialTouched: false,
      isPickVehicleValid: false,
      isRatingVehicleValid: false,
      isTestimonialVehicleValid: false,
    }
  },
  computed: {
    ...mapGetters({
      cars: 'vehicles/getCars',
      bikes: 'vehicles/getBikes',
    }),
    isFormValid() {
      return (
        this.isPickVehicleValid &&
        this.isRatingVehicleValid &&
        this.isTestimonialVehicleValid
      )
    },
  },
  mounted() {
    this.$store.dispatch('vehicles/fetchCars')
    this.$store.dispatch('vehicles/fetchBikes')
    if (this.editedTestimonial) {
      this.isPickVehicleValid = true
      this.isRatingVehicleValid = true
      this.isTestimonialVehicleValid = true
    }
  },
  methods: {
    toggleInput(type) {
      this.$emit('toggleInput', type)
    },
    submitTestimonials() {
      this.$emit('submitTestimonials', this.testimonial)
    },
    validatePickCar() {
      this.isPickCarTouched = true
      this.isPickBikeTouched = false
      if (this.showInput.both) {
        this.isPickVehicleValid =
          this.testimonial.carId !== '' && this.testimonial.bikeId !== ''
      } else {
        this.isPickVehicleValid =
          this.testimonial.carId !== '' || this.testimonial.bikeId !== ''
      }
    },
    validatePickBike() {
      this.isPickBikeTouched = true
      this.isPickCarTouched = false
      if (this.showInput.both) {
        this.isPickVehicleValid =
          this.testimonial.carId !== '' && this.testimonial.bikeId !== ''
      } else {
        this.isPickVehicleValid =
          this.testimonial.carId !== '' || this.testimonial.bikeId !== ''
      }
    },
    validateRatingCar() {
      this.isRatingCarTouched = true
      this.isRatingBikeTouched = false
      if (this.showInput.both) {
        this.isRatingVehicleValid =
          (this.testimonial.ratingCar !== '' &&
            this.testimonial.ratingBike !== '') ||
          (this.testimonial.ratingCar !== 0 &&
            this.testimonial.ratingBike !== 0)
      } else {
        this.isRatingVehicleValid =
          this.testimonial.ratingCar !== '' ||
          this.testimonial.ratingCar !== 0 ||
          this.testimonial.ratingBike !== '' ||
          this.testimonial.ratingBike !== 0
      }
    },
    validateRatingBike() {
      this.isRatingBikeTouched = true
      this.isRatingCarTouched = false
      if (this.showInput.both) {
        this.isRatingVehicleValid =
          (this.testimonial.ratingCar !== '' &&
            this.testimonial.ratingBike !== '') ||
          (this.testimonial.ratingCar !== 0 &&
            this.testimonial.ratingBike !== 0)
      } else {
        this.isRatingVehicleValid =
          this.testimonial.ratingCar !== '' ||
          this.testimonial.ratingCar !== 0 ||
          this.testimonial.ratingBike !== '' ||
          this.testimonial.ratingBike !== 0
      }
    },
    validateCarTestimonial() {
      this.isCarTestimonialTouched = true
      this.isBikeTestimonialTouched = false
      if (this.showInput.both) {
        this.isTestimonialVehicleValid =
          this.testimonial.carTestimonial !== '' &&
          this.testimonial.bikeTestimonial !== ''
      } else {
        this.isTestimonialVehicleValid =
          this.testimonial.carTestimonial !== '' ||
          this.testimonial.bikeTestimonial !== ''
      }
    },
    validateBikeTestimonial() {
      this.isBikeTestimonialTouched = true
      this.isCarTestimonialTouched = false
      if (this.showInput.both) {
        this.isTestimonialVehicleValid =
          this.testimonial.carTestimonial !== '' &&
          this.testimonial.bikeTestimonial !== ''
      } else {
        this.isTestimonialVehicleValid =
          this.testimonial.carTestimonial !== '' ||
          this.testimonial.bikeTestimonial !== ''
      }
    },
  },
}
</script>

<style></style>
