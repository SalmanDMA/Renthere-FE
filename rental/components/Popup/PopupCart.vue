<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <section class="mb-4">
      <label class="block text-gray-700">Start Date</label>
      <input
        v-model="editedTransaction.startDate"
        type="datetime-local"
        class="w-full border rounded-md px-3 py-2"
        @input="validateStartDate"
      />
      <div v-if="isStartDateTouched && !isStartDateValid" class="text-red-600">
        Start date is required
      </div>
    </section>
    <div v-if="type === 'car'" class="mb-4">
      <label class="block text-gray-700">Cars</label>
      <select
        v-model="editedTransaction.carId"
        class="w-full border rounded-md px-3 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled
      >
        <option v-for="car in cars" :key="car.id" :value="car.id">
          {{ car.name }}
        </option>
      </select>
    </div>
    <div v-if="type === 'bike'" class="mb-4">
      <label class="block text-gray-700">Bike</label>
      <select
        v-model="editedTransaction.bikeId"
        class="w-full border rounded-md px-3 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled
      >
        <option v-for="bike in bikes" :key="bike.id" :value="bike.id">
          {{ bike.name }}
        </option>
      </select>
    </div>
    <section class="mb-4">
      <label class="block text-gray-700">{{
        type === 'car' ? 'Total Car' : 'Total Bike'
      }}</label>
      <input
        v-if="type === 'car'"
        v-model="editedTransaction.totalCar"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        @input="validateTotalCar"
      />
      <input
        v-if="type === 'bike'"
        v-model="editedTransaction.totalBike"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        @input="validateTotalBike"
      />
      <div
        v-if="(isTotalCarTouched || isTotalBikeTouched) && !isTotalVehicleValid"
        class="text-red-600"
      >
        Please choice total vehicle type
      </div>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Payment Method</label>
      <select
        v-model="editedTransaction.payment"
        class="w-full border rounded-md px-3 py-2"
        @change="validatePayment"
      >
        <option selected value="">Select Payment Method</option>
        <option value="credit_card">Credit Card</option>
      </select>
      <div v-if="isPaymentTouched && !isPaymentValid" class="text-red-600">
        Payment method is required
      </div>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Rental Duration by Day</label>
      <input
        v-model="editedTransaction.rentalDuration"
        type="number"
        class="w-full border rounded-md px-3 py-2"
        @input="validateRentalDuration"
      />
      <div
        v-if="isRentalDurationTouched && !isRentalDurationValid"
        class="text-red-600"
      >
        Rental duration is required
      </div>
    </section>
    <section class="flex justify-center">
      <button
        class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
        type="submit"
        :disabled="!isFormValid"
      >
        Add to Cart
      </button>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PopupCart',
  props: {
    editedTransaction: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isStartDateTouched: false,
      isPaymentTouched: false,
      isRentalDurationTouched: false,
      isTotalCarTouched: false,
      isTotalBikeTouched: false,
      isStartDateValid: false,
      isPaymentValid: false,
      isRentalDurationValid: false,
      isTotalVehicleValid: false,
    }
  },
  computed: {
    ...mapGetters({
      cars: 'vehicles/getCars',
      bikes: 'vehicles/getBikes',
    }),
    isFormValid() {
      return (
        this.isStartDateValid &&
        this.isPaymentValid &&
        this.isRentalDurationValid &&
        this.isTotalVehicleValid
      )
    },
  },
  mounted() {
    this.$store.dispatch('vehicles/fetchCars')
    this.$store.dispatch('vehicles/fetchBikes')
  },
  methods: {
    validateStartDate() {
      this.isStartDateTouched = true
      this.isStartDateValid = this.editedTransaction.startDate !== ''
    },
    validatePayment() {
      this.isPaymentTouched = true
      this.isPaymentValid = this.editedTransaction.payment !== ''
    },
    validateRentalDuration() {
      this.isRentalDurationTouched = true
      this.isRentalDurationValid = this.editedTransaction.rentalDuration !== ''
    },
    validateTotalCar() {
      this.isTotalCarTouched = true
      this.isTotalBikeTouched = false
      this.isTotalVehicleValid =
        this.editedTransaction.totalCar !== '' ||
        this.editedTransaction.totalBike !== ''
    },
    validateTotalBike() {
      this.isTotalCarTouched = false
      this.isTotalBikeTouched = true
      this.isTotalVehicleValid =
        this.editedTransaction.totalCar !== '' ||
        this.editedTransaction.totalBike !== ''
    },
  },
}
</script>

<style></style>
