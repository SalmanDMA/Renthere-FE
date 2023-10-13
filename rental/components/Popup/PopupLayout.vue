<template>
  <section v-if="isOpen" :class="popupClass">
    <h3 class="text-xl mb-4 text-[#333] font-bold text-center">{{ title }}</h3>
    <form class="mb-4" @submit.prevent="saveChanges">
      <slot></slot>
    </form>
    <button
      type="button"
      class="bg-transparent cursor-pointer absolute -top-8 -right-4 text-2xl border-0 text-white z-10"
      @click="closePopup"
    >
      <fa :icon="['fas', 'xmark']" />
    </button>
  </section>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    popupClass: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    saveChanges() {
      this.$emit('save')
    },
  },
}
</script>

<style scoped>
.popup-content {
  @apply bg-white p-4 rounded-lg shadow-lg fixed  z-[100];
}
.active {
  animation: scalein 0.3s ease-in-out forwards;
}

.deactive {
  animation: scaleOut 0.3s ease-in-out forwards;
}

@keyframes scalein {
  0% {
    transform: scale(0);
    top: 0%;
    left: 0%;
  }
  100% {
    transform: scale(1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@keyframes scaleOut {
  0% {
    transform: scale(1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  100% {
    transform: scale(0);
    top: 0%;
    left: 0%;
  }
}
</style>
