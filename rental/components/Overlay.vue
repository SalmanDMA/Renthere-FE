<template>
  <section v-if="showOverlay" class="overlay" @click="toggleSidebar"></section>
</template>

<script>
export default {
  name: 'OverlayComponent',
  props: {
    showOverlay: Boolean,
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggleSidebar')
    },
  },
}
</script>

<style scoped>
.overlay {
  @apply fixed top-0 left-0 w-full h-full cursor-pointer z-[99];
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
