<template>
  <section
    v-if="isSidebarOpen"
    class="w-full fixed top-0 left-0 min-h-screen h-full block z-30 bg-black/50 cursor-pointer"
    @click="closeOverlayOnClickOutside"
  >
    <div
      ref="modalContent"
      class="w-64 relative top-20 bg-[#F7FAFC] border-r min-h-screen h-full cursor-default"
    >
      <navbar-layout />
    </div>
  </section>
</template>

<script>
export default {
  name: 'SidebarLayout',
  computed: {
    isSidebarOpen() {
      return this.$store.state.sidebar.isSidebarOpen
    },
  },
  methods: {
    closeOverlayOnClickOutside(event) {
      if (this.isSidebarOpen) {
        const modalContent = this.$refs.modalContent
        if (!modalContent.contains(event.target)) {
          this.$store.commit('sidebar/toggleSidebar')
        }
      }
    },
  },
}
</script>

<style></style>
