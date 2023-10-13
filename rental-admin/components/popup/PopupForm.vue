<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form @submit.prevent="saveUser">
    <slot></slot>
    <popup-delete v-if="deletePopup" :close-modal="closeModal" />
    <div v-else class="text-right">
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
        {{ btnText }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'PopupForm',
  props: {
    btnText: {
      type: String,
      required: true,
    },
    deletePopup: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    saveUser() {
      this.$emit('save')
    },
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
