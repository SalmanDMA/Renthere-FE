<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <h2 class="text-2xl font-semibold text-[#333] mb-6">{{ title }}</h2>
    <form @submit.prevent="saveData">
      <section class="mb-4">
        <label class="block text-gray-700">Start Date</label>
        <input
          v-model="editedTransaction.startDate"
          type="datetime-local"
          class="w-full border rounded-md px-3 py-2"
          @input="validateStartDate"
        />
        <div
          v-if="isStartDateTouched && !isStartDateValid"
          class="text-red-600"
        >
          Start date is required
        </div>
      </section>
      <slot></slot>
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
          Payment is required
        </div>
      </section>
      <section class="mb-4">
        <label class="block text-gray-700">Rental Duration by Day</label>
        <input
          v-model="editedTransaction.rentalDuration"
          type="number"
          class="w-full border-b-2 border-b-gray-700 px-3 py-2 focus:outline-none focus:ring-0 bg-transparent"
          @input="validateRentalDuration"
        />
        <div
          v-if="isRentalDurationTouched && !isRentalDurationValid"
          class="text-red-600"
        >
          Rental duration is required
        </div>
      </section>
      <section class="flex justify-center items-center gap-3">
        <button
          class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
          :disabled="!isFormValid"
        >
          Add to Cart
        </button>
        <button
          class="bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-[#333] transition-colors duration-300 ease-in-out"
          type="button"
          @click="handleBackToChoiceRentVehicle"
        >
          Back to Choice Rent Vehicle
        </button>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormInputRentLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
    editedTransaction: {
      type: Object,
      required: true,
    },
    isStartDateTouched: {
      type: Boolean,
      required: true,
    },
    isStartDateValid: {
      type: Boolean,
      required: true,
    },
    isPaymentTouched: {
      type: Boolean,
      required: true,
    },
    isPaymentValid: {
      type: Boolean,
      required: true,
    },
    isRentalDurationTouched: {
      type: Boolean,
      required: true,
    },
    isRentalDurationValid: {
      type: Boolean,
      required: true,
    },
    isFormValid: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    saveData() {
      this.$emit('save-data')
    },
    handleBackToChoiceRentVehicle() {
      this.$emit('handle-back-to-choice-rent-vehicle')
    },
    validateStartDate() {
      this.$emit('validate-start-date')
    },
    validatePayment() {
      this.$emit('validate-payment')
    },
    validateRentalDuration() {
      this.$emit('validate-rental-duration')
    },
  },
}
</script>

<style scoped></style>
