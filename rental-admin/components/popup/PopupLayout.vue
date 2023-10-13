<template>
  <section
    v-if="showModal"
    class="fixed top-0 left-0 w-full h-full grid place-items-center bg-black/30 z-50 cursor-pointer py-10 overflow-y-auto"
    @click="closeOverlayOnClickOutside"
  >
    <div
      ref="modalContent"
      class="bg-white py-6 px-4 sm:p-6 rounded-lg w-[280px] sm:w-[600px] cursor-default"
    >
      <!-- Isi Pop-up di sini -->
      <h2 class="text-xl font-semibold mb-4">{{ modalTitle }}</h2>
      <!-- Form untuk menambah/mengedit pengguna -->
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PopupLayout',
  props: {
    showModal: Boolean,
    modalTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeOverlayOnClickOutside(event) {
      if (this.showModal) {
        const modalContent = this.$refs.modalContent
        if (!modalContent.contains(event.target)) {
          this.$emit('close')
        }
      }
    },
  },
}
</script>

<style></style>
