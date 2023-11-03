<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section>
    <div class="mb-4">
      <label class="block text-gray-700">Name</label>
      <input
        v-model="editedVehicle.name"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isNameValid && isNameTouched }"
        @input="validateName"
      />
      <div v-if="isNameTouched && !isNameValid" class="text-red-600">
        Name is required and must be at least 3 characters long.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Brand</label>
      <input
        v-model="editedVehicle.brand"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isBrandValid && isBrandTouched }"
        @input="validateBrand"
      />
      <div v-if="isBrandTouched && !isBrandValid" class="text-red-600">
        Brand is required and must be at least 3 characters long.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Quantity</label>
      <input
        v-model="editedVehicle.quantity"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isQuantityValid && isQuantityTouched }"
        @input="validateQuantity"
      />
      <div v-if="isQuantityTouched && !isQuantityValid" class="text-red-600">
        Quantity is required and must be a number.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Price</label>
      <input
        v-model="editedVehicle.price"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isPriceValid && isPriceTouched }"
        @input="validatePrice"
      />
      <div v-if="isPriceTouched && !isPriceValid" class="text-red-600">
        Price is required and must be a number.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Description</label>
      <textarea
        v-model="editedVehicle.description"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500': !isDescriptionValid && isDescriptionTouched,
        }"
        @input="validateDescription"
      />
      <div
        v-if="isDescriptionTouched && !isDescriptionValid"
        class="text-red-600"
      >
        Description is required, min length is 10, max length is 2000 characters
      </div>
    </div>
    <div class="mb-4">
      <div>
        <label class="block text-gray-700"
          >Picture <span class="text-gray-800 text-sm">(max 1 mb)</span></label
        >
        <div class="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <input
            v-model="editedVehicle.picture"
            type="text"
            class="w-full sm:w-max border rounded-md px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            :class="{ 'border-red-500': !isPictureValid && isPictureTouched }"
            :disabled="isFileInputTouched"
            @input="validatePicture"
          />
          <p class="w-full sm:w-max text-center text-gray-600">Or</p>
          <input
            type="file"
            accept="image/*"
            class="w-full sm:w-max rounded-md px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            :disabled="isPictureTouched"
            @change="handleInput"
          />
        </div>
      </div>
      <div v-if="errorPicture && !isPictureValid" class="text-red-600">
        Picture is required
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PopupVehicle',
  props: {
    editedVehicle: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isNameTouched: false,
      isBrandTouched: false,
      isQuantityTouched: false,
      isPriceTouched: false,
      isDescriptionTouched: false,
      isPictureTouched: false,
      isFileInputTouched: false,
      errorPicture: false,
    }
  },
  computed: {
    ...mapState({
      isNameValid: (state) => state.vehicles.isNameValid,
      isBrandValid: (state) => state.vehicles.isBrandValid,
      isQuantityValid: (state) => state.vehicles.isQuantityValid,
      isPriceValid: (state) => state.vehicles.isPriceValid,
      isDescriptionValid: (state) => state.vehicles.isDescriptionValid,
      isPictureValid: (state) => state.vehicles.isPictureValid,
    }),
  },
  methods: {
    ...mapMutations('vehicles', ['updateValidation']),
    validateName() {
      this.isNameTouched = true
      this.updateValidation({
        inputName: 'Name',
        isValid: this.editedVehicle.name.length >= 3,
      })
    },
    validateBrand() {
      this.isBrandTouched = true
      this.updateValidation({
        inputName: 'Brand',
        isValid: this.editedVehicle.brand.length >= 3,
      })
    },
    validateQuantity() {
      this.isQuantityTouched = true
      const qtyRegex = /^\d+$/
      this.updateValidation({
        inputName: 'Quantity',
        isValid:
          qtyRegex.test(this.editedVehicle.quantity) &&
          this.editedVehicle.quantity.length > 0,
      })
    },
    validatePrice() {
      this.isPriceTouched = true
      const priceRegex = /^\d+$/
      this.updateValidation({
        inputName: 'Price',
        isValid:
          priceRegex.test(this.editedVehicle.price) &&
          this.editedVehicle.price.length > 0,
      })
    },
    validateDescription() {
      this.isDescriptionTouched = true
      this.updateValidation({
        inputName: 'Description',
        isValid:
          this.editedVehicle.description.length > 10 &&
          this.editedVehicle.description.length <= 2000,
      })
    },
    validatePicture() {
      if (this.editedVehicle.picture.length === 0) {
        this.errorPicture = true
        this.isPictureTouched = false
        this.updateValidation({
          inputName: 'Picture',
          isValid:
            this.editedVehicle.picture.length > 0 || this.isFileInputTouched,
        })
      } else {
        this.isPictureTouched = true
        this.errorPicture = false
        this.updateValidation({
          inputName: 'Picture',
          isValid: this.editedVehicle.picture.length > 0,
        })
      }
    },
    handleInput(event) {
      if (event.target.files.length === 0) {
        this.isFileInputTouched = false
        this.errorPicture = true
        this.updateValidation({
          inputName: 'Picture',
          isValid:
            this.editedVehicle.picture.length > 0 || this.isFileInputTouched,
        })
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        this.editedVehicle.picture = ''
        this.isFileInputTouched = true
        this.errorPicture = false
        this.updateValidation({
          inputName: 'Picture',
          isValid: this.isFileInputTouched,
        })
        const fileName = event.target.files[0]
        this.$emit('handleInput', fileName)
      }
    },
  },
}
</script>

<style></style>
