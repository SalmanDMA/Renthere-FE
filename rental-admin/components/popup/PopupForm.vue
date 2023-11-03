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
        class="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!isFormValid"
      >
        {{ btnText }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
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
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      isFormUserValid: 'users/isFormUserValid',
      isFormVehicleValid: 'vehicles/isFormVehicleValid',
      isFormTransactionsValid: 'transactions/isFormTransactionValid',
      isFormTestimonialValid: 'testimonials/isFormTestimonialValid',
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    isFormValid() {
      if (this.type === 'user') {
        return this.isFormUserValid
      } else if (this.type === 'car') {
        return this.isFormVehicleValid
      } else if (this.type === 'bike') {
        return this.isFormVehicleValid
      } else if (this.type === 'transaction') {
        return this.isFormTransactionsValid
      } else if (this.type === 'testimonial') {
        return this.isFormTestimonialValid
      }
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
