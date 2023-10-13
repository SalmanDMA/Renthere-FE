<template>
  <div>
    <HeaderLayout />
    <nuxt-child />
    <FooterLayout />
    <div
      v-if="show"
      class="fixed top-0 right-0 m-4 p-3 text-white rounded shadow z-[999]"
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
  name: 'Default',
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
