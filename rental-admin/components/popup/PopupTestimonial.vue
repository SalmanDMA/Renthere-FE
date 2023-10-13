<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section>
    <div class="mb-4">
      <label class="block text-gray-700">User </label>
      <select
        v-model="editedTestimonial.userId"
        class="w-full border rounded-md px-3 py-2"
        required
      >
        <option value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Cars</label>
      <select
        v-model="editedTestimonial.carId"
        class="w-full border rounded-md px-3 py-2"
      >
        <option value="">Select Cars</option>
        <option v-for="car in cars" :key="car.id" :value="car.id">
          {{ car.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Rating Car 0 - 5</label>
      <input
        v-model="editedTestimonial.ratingCar"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Bikes</label>
      <select
        v-model="editedTestimonial.bikeId"
        class="w-full border rounded-md px-3 py-2"
      >
        <option value="">Select Bikes</option>
        <option v-for="bike in bikes" :key="bike.id" :value="bike.id">
          {{ bike.name }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Rating Bike 0 - 5</label>
      <input
        v-model="editedTestimonial.ratingBike"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Testimonial Text</label>
      <textarea
        v-model="editedTestimonial.testimonial"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
  </section>
</template>

<script>
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
    }
  },
  mounted() {
    this.dataCars()
    this.dataBikes()
    this.dataUsers()
  },
  methods: {
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
