<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="p-4 text-center">
    <p class="text-lg font-semibold mb-4">
      {{ title }}
    </p>
    <div class="flex justify-center">
      <button
        type="button"
        class="bg-red-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-red-600"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupDelete',
  props: {
    cancel: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
