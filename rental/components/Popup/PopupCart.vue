<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <section class="mb-4">
      <label class="block text-gray-700">Start Date</label>
      <input
        v-model="editedTransaction.startDate"
        type="datetime-local"
        class="w-full border rounded-md px-3 py-2"
      />
    </section>
    <div class="mb-4">
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
    <section class="mb-4">
      <label class="block text-gray-700">Total Car</label>
      <input
        v-model="editedTransaction.totalCar"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Payment Method</label>
      <select
        v-model="editedTransaction.payment"
        class="w-full border rounded-md px-3 py-2"
        required
      >
        <option selected value="">Select Payment Method</option>
        <option value="credit_card">Credit Card</option>
      </select>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Rental Duration by Day</label>
      <input
        v-model="editedTransaction.rentalDuration"
        type="number"
        class="w-full border rounded-md px-3 py-2"
      />
    </section>
    <section class="flex justify-center">
      <button
        class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
        type="submit"
      >
        Add to Cart
      </button>
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
  },
}
</script>

<style></style>
