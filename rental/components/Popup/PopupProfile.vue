<!-- eslint-disable vue/no-mutating-props -->
<template>
  <form @submit.prevent="saveChanges">
    <section class="mb-4">
      <label class="block text-gray-700">Name</label>
      <input
        v-model="localData.name"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        @input="validateName"
      />
      <div v-if="isNameTouched && !isNameValid" class="text-red-600">
        Name is required and must be at least 3 characters long.
      </div>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Address</label>
      <input
        v-model="localData.address"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        @input="validateAddress"
      />
      <div v-if="isAddressTouched && !isAddressValid" class="text-red-600">
        Address is required.
      </div>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700">Phone Number</label>
      <input
        v-model="localData.phoneNumber"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        @input="validatePhoneNumber"
      />
      <div
        v-if="isPhoneNumberTouched && !isPhoneNumberValid"
        class="text-red-600"
      >
        Phone is required and must be a number.
      </div>
    </section>
    <section class="mb-4">
      <label class="block text-gray-700"
        >Profile Picture
        <span class="text-gray-800 text-sm">(max 1 mb)</span></label
      >
      <div class="flex flex-wrap sm:flex-nowrap items-center gap-3">
        <input
          v-model="localData.profilePicture"
          type="text"
          class="w-full sm:w-max border rounded-md px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          :disabled="isFileInputTouched"
          @input="validateProfilePicture"
        />
        <p class="w-full sm:w-max text-center text-gray-600">Or</p>
        <input
          type="file"
          accept="image/*"
          class="w-full sm:w-max rounded-md px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          :disabled="isProfilePictureTouched"
          @change="handleInput"
        />
      </div>
      <div
        v-if="errorProfilePicture && !isProfilePictureValid"
        class="text-red-600"
      >
        Profile Picture is required.
      </div>
    </section>
    <section class="flex justify-center">
      <button
        class="bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
        type="submit"
        :disabled="!isFormValid"
      >
        Save Changes
      </button>
    </section>
  </form>
</template>

<script>
export default {
  name: 'PopupCart',
  data() {
    return {
      isNameTouched: false,
      isAddressTouched: false,
      isPhoneNumberTouched: false,
      isProfilePictureTouched: false,
      isFileInputTouched: false,
      errorProfilePicture: false,
      isNameValid: false,
      isAddressValid: false,
      isPhoneNumberValid: false,
      isProfilePictureValid: false,
      localData: {
        name: '',
        address: '',
        phoneNumber: '',
        profilePicture: '',
      },
    }
  },
  computed: {
    isFormValid() {
      return (
        this.isNameValid &&
        this.isAddressValid &&
        this.isPhoneNumberValid &&
        this.isProfilePictureValid
      )
    },
  },
  mounted() {
    this.isNameValid = true
    this.isAddressValid = true
    this.isPhoneNumberValid = true
    this.isProfilePictureValid = true
    this.localData = { ...this.$store.state.users.user }
  },
  methods: {
    validateName() {
      this.isNameTouched = true
      this.isNameValid = this.localData.name.length >= 3
    },
    validateAddress() {
      this.isAddressTouched = true
      this.isAddressValid = this.localData.address.length > 0
    },
    validatePhoneNumber() {
      this.isPhoneNumberTouched = true
      const phoneNumberRegex = /^\d+$/
      this.isPhoneNumberValid = phoneNumberRegex.test(
        this.localData.phoneNumber
      )
    },
    validateProfilePicture() {
      if (this.localData.profilePicture.length === 0) {
        this.isProfilePictureTouched = false
        this.errorProfilePicture = true
        this.isProfilePictureValid =
          this.localData.profilePicture.length > 0 || this.isFileInputTouched
      } else {
        this.isProfilePictureTouched = true
        this.errorProfilePicture = false
        this.isProfilePictureValid = this.localData.profilePicture.length > 0
      }
    },
    handleInput(e) {
      if (e.target.files.length === 0) {
        this.isFileInputTouched = false
        this.errorProfilePicture = true
        this.isProfilePictureValid =
          this.localData.profilePicture.length > 0 || this.isFileInputTouched
      } else {
        this.localData.profilePicture = e.target.files[0].name
        this.isFileInputTouched = true
        this.errorProfilePicture = false
        this.isProfilePictureValid = this.isFileInputTouched
        const fileName = e.target.files[0]
        this.$emit('handleInput', fileName)
      }
    },
    saveChanges() {
      this.$emit('save', this.localData)
    },
  },
}
</script>

<style></style>
