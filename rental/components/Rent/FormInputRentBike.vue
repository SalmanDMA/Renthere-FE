<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <section class="mb-4">
      <label class="block text-gray-700">Bike</label>
      <select
        v-model="editedTransaction.bikeId"
        class="w-full border rounded-md px-3 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        @change="validateBikeId"
      >
        <option selected value="">Select Bike</option>
        <option v-for="bike in bikes" :key="bike.id" :value="bike.id">
          {{ bike.name }}
        </option>
      </select>
      <div v-if="isBikeIdTouched && !isVehicleIdValid" class="text-red-600">
        Bike is required
      </div>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Total Bike</label>
      <input
        v-model="editedTransaction.totalBike"
        type="text"
        class="w-full border-b-2 border-b-gray-700 px-3 py-2 focus:outline-none focus:ring-0 bg-transparent"
        @input="validateTotalBike"
      />
      <div
        v-if="isTotalBikeTouched && !isTotalVehicleValid"
        class="text-red-600"
      >
        Total bike is required
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
    bikes: {
      type: Array,
      required: true,
    },
    isTotalBikeTouched: {
      type: Boolean,
      required: true,
    },
    isBikeIdTouched: {
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
    validateTotalBike() {
      this.$emit('validate-total-bike')
    },
    validateBikeId() {
      this.$emit('validate-bike-id')
    },
  },
}
</script>

<style></style>
