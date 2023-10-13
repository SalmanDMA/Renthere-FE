<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section>
    <div class="mb-4">
      <label class="block text-gray-700">Name</label>
      <input
        v-model="editedVehicle.name"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Brand</label>
      <input
        v-model="editedVehicle.brand"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Quantity</label>
      <input
        v-model="editedVehicle.quantity"
        type="number"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Price</label>
      <input
        v-model="editedVehicle.price"
        type="number"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Description</label>
      <textarea
        v-model="editedVehicle.description"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Picture</label>
      <input
        v-model="editedVehicle.picture"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'PopupVehicle',
  props: {
    editedVehicle: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
