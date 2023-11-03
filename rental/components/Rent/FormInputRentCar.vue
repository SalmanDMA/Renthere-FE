<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <section class="mb-4">
      <label class="block text-gray-700">Cars</label>
      <select
        v-model="editedTransaction.carId"
        class="w-full border rounded-md px-3 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        @change="validateCarId"
      >
        <option selected value="">Select Car</option>
        <option v-for="car in cars" :key="car.id" :value="car.id">
          {{ car.name }}
        </option>
      </select>
      <div v-if="isCarIdTouched && !isVehicleIdValid" class="text-red-600">
        Car is required
      </div>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Total Car</label>
      <input
        v-model="editedTransaction.totalCar"
        type="text"
        class="w-full border-b-2 border-b-gray-700 px-3 py-2 focus:outline-none focus:ring-0 bg-transparent"
        @input="validateTotalCar"
      />
      <div
        v-if="isTotalCarTouched && !isTotalVehicleValid"
        class="text-red-600"
      >
        Total car is required
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    editedTransaction: {
      type: Object,
      required: true,
    },
    cars: {
      type: Array,
      required: true,
    },
    isTotalCarTouched: {
      type: Boolean,
      required: true,
    },
    isCarIdTouched: {
      type: Boolean,
      required: true,
    },
    isVehicleIdValid: {
      type: Boolean,
      required: true,
    },
    isTotalVehicleValid: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    validateTotalCar() {
      this.$emit('validate-total-car')
    },
    validateCarId() {
      this.$emit('validate-car-id')
    },
  },
}
</script>

<style></style>
