<template>
  <div>
    <aside
      class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 min-h-screen h-full lg:block bg-[#F7FAFC] border-r z-30 hidden"
    >
      <navbar-layout />
    </aside>
    <sidebar-layout />
    <nuxt-child />
    <div
      v-if="show"
      class="fixed top-0 right-0 m-4 p-3 text-white rounded shadow z-[9999]"
      :class="backgroundColor"
    >
      {{ message }}
      <button class="ml-2 text-white" @click="closeToast">
        <fa :icon="['fas', 'xmark']" class="fill-current" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    backgroundColor() {
      return this.$store.state.toast.backgroundColor
    },
    message() {
      return this.$store.state.toast.message
    },
    show() {
      return this.$store.state.toast.show
    },
  },
  methods: {
    closeToast() {
      this.$store.commit('toast/closeToast')
    },
  },
}
</script>

<style></style>
