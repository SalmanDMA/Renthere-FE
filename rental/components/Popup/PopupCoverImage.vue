<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form @submit.prevent="saveChanges">
    <div class="mb-4">
      <label class="block text-gray-700">Select Cover Images</label>
      <select
        v-model="localCoverImage"
        class="w-full border rounded-md px-3 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <option v-for="cover in covers" :key="cover.id" :value="cover.link">
          {{ cover.name }}
        </option>
      </select>
    </div>
    <section class="flex justify-center">
      <button
        class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out"
        type="submit"
      >
        Save Changes
      </button>
    </section>
  </form>
</template>

<script>
import dataCoverImage from '@/helpers/coverImageData'
export default {
  name: 'PopupCart',
  props: {
    editedCoverImage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      covers: dataCoverImage,
      localCoverImage: this.editedCoverImage,
    }
  },
  methods: {
    saveChanges() {
      this.$emit('save', this.localCoverImage)
    },
  },
}
</script>

<style></style>
