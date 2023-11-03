<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section>
    <div class="mb-4">
      <label class="block text-gray-700">User </label>
      <select
        v-model="editedTransaction.userId"
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
      <label class="block text-gray-700">Start Date</label>
      <input
        v-model="editedTransaction.startDate"
        type="datetime-local"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isStartDateValid && isStartDateTouched }"
        @input="validateStartDate"
      />
      <div v-if="isStartDateTouched && !isStartDateValid" class="text-red-600">
        Start Date is required.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Cars</label>
      <select
        v-model="editedTransaction.carId"
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
        v-model="editedTransaction.bikeId"
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
    </div>
    <div
      v-if="(isCarIdTouched || isBikeIdTouched) && !isVehicleIdValid"
      class="text-red-600"
    >
      Choice at least one car or bike.
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Total Car</label>
      <input
        v-model="editedTransaction.totalCar"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isTotalCarTouched || isTotalBikeTouched) && !isTotalVehicleValid,
        }"
        @input="validateTotalVehicle"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Total Bike</label>
      <input
        v-model="editedTransaction.totalBike"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500':
            (isTotalCarTouched || isTotalBikeTouched) && !isTotalVehicleValid,
        }"
        @input="validateTotalVehicle"
      />
    </div>
    <div
      v-if="(isTotalCarTouched || isTotalBikeTouched) && !isTotalVehicleValid"
      class="text-red-600"
    >
      Choice at least one total car or bike and total must be greater than 0 and
      number.
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Payment Method</label>
      <select
        v-model="editedTransaction.payment"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isPaymentValid && isPaymentTouched }"
        @change="validatePayment"
      >
        <option selected value="">Select Payment Method</option>
        <option value="credit_card">Credit Card</option>
      </select>
      <div v-if="isPaymentTouched && !isPaymentValid" class="text-red-600">
        Payment Method is required.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Status</label>
      <select
        v-model="editedTransaction.status"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isStatusValid && isStatusTouched }"
        @change="validateStatus"
      >
        <option value="">Select Status Confirmation</option>
        <option value="waiting">Waiting for Payment</option>
        <option value="completed">Payment Completed</option>
        <option value="done">Transaction Done</option>
      </select>
      <div v-if="isStatusTouched && !isStatusValid" class="text-red-600">
        Status is required.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Rental Duration by Day</label>
      <input
        v-model="editedTransaction.rentalDuration"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500': !isRentalDurationValid && isRentalDurationTouched,
        }"
        @input="validateRentalDuration"
      />
      <div
        v-if="isRentalDurationTouched && !isRentalDurationValid"
        class="text-red-600"
      >
        Rental Duration is required and must be a number.
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PopupTransaction',
  props: {
    editedTransaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cars: [],
      bikes: [],
      users: [],
      isUserIdTouched: false,
      isStartDateTouched: false,
      isCarIdTouched: false,
      isBikeIdTouched: false,
      isTotalCarTouched: false,
      isTotalBikeTouched: false,
      isPaymentTouched: false,
      isStatusTouched: false,
      isRentalDurationTouched: false,
    }
  },
  computed: {
    ...mapState({
      isUserIdValid: (state) => state.transactions.isUserIdValid,
      isStartDateValid: (state) => state.transactions.isStartDateValid,
      isVehicleIdValid: (state) => state.transactions.isVehicleIdValid,
      isTotalVehicleValid: (state) => state.transactions.isTotalVehicleValid,
      isPaymentValid: (state) => state.transactions.isPaymentValid,
      isStatusValid: (state) => state.transactions.isStatusValid,
      isRentalDurationValid: (state) =>
        state.transactions.isRentalDurationValid,
    }),
  },
  mounted() {
    this.dataCars()
    this.dataBikes()
    this.dataUsers()
  },
  methods: {
    ...mapMutations('transactions', ['updateValidation']),
    validateUserId() {
      this.isUserIdTouched = true
      this.updateValidation({
        inputName: 'UserId',
        isValid: this.editedTransaction.userId !== '',
      })
    },
    validateStartDate() {
      this.isStartDateTouched = true
      this.updateValidation({
        inputName: 'StartDate',
        isValid: this.editedTransaction.startDate !== '',
      })
    },
    validateVehicleId() {
      this.isCarIdTouched = true
      this.isBikeIdTouched = true
      this.updateValidation({
        inputName: 'VehicleId',
        isValid:
          this.editedTransaction.carId !== '' ||
          this.editedTransaction.bikeId !== '',
      })
    },
    validateTotalVehicle() {
      this.isTotalCarTouched = true
      this.isTotalBikeTouched = true
      const total = /^\d+$/
      this.updateValidation({
        inputName: 'TotalVehicle',
        isValid:
          (this.editedTransaction.totalCar !== '' ||
            this.editedTransaction.totalBike !== '') &&
          (total.test(this.editedTransaction.totalCar) ||
            total.test(this.editedTransaction.totalBike)),
      })
    },
    validatePayment() {
      this.isPaymentTouched = true
      this.updateValidation({
        inputName: 'Payment',
        isValid: this.editedTransaction.payment !== '',
      })
    },
    validateStatus() {
      this.isStatusTouched = true
      this.updateValidation({
        inputName: 'Status',
        isValid: this.editedTransaction.status !== '',
      })
    },
    validateRentalDuration() {
      this.isRentalDurationTouched = true
      const rentalDuration = /^\d+$/
      this.updateValidation({
        inputName: 'RentalDuration',
        isValid:
          this.editedTransaction.rentalDuration !== '' &&
          rentalDuration.test(this.editedTransaction.rentalDuration),
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
