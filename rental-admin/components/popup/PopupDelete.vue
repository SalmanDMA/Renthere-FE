<template>
  <section>
    <p class="mb-4 text-lg text-center">
      Are you sure you want to delete this data?
    </p>
    <div class="text-center">
      <button
        class="text-gray-600 hover:underline mr-4"
        type="button"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        Delete
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PopupUserDelete',
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style></style>
