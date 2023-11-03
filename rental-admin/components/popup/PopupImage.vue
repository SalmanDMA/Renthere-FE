<template>
  <div class="relative">
    <img
      :src="picture"
      alt="profile picture"
      class="w-full sm:max-w-lg lg:max-w-2xl"
    />
    <button
      type="button"
      class="absolute top-[-22px] right-[-20px]"
      @click="closeModal"
    >
      <fa :icon="['fas', 'xmark']" class="text-2xl" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'PopupImage',
  props: {
    picture: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
