<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section>
    <div class="mb-4">
      <label class="block text-gray-700">Name</label>
      <input
        v-model="editedUser.name"
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
      <label class="block text-gray-700">Email</label>
      <input
        v-model="editedUser.email"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isEmailValid && isEmailTouched }"
        @input="validateEmail"
      />
      <div v-if="isEmailTouched && !isEmailValid" class="text-red-600">
        Email is required and must be a valid email address.
      </div>
    </div>
    <div v-if="!showInputPassword" class="mb-4">
      <label class="block text-gray-700">Password</label>
      <input
        v-model="editedUser.password"
        type="password"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isPasswordValid && isPasswordTouched }"
        @input="validatePassword"
      />
      <div v-if="isPasswordTouched && !isPasswordValid" class="text-red-600">
        Password must contain at least 1 letter, 1 number, and 1 special
        character, and be at least 8 characters long
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Role</label>
      <input
        v-model="editedUser.role"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        disabled
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Address</label>
      <input
        v-model="editedUser.address"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{ 'border-red-500': !isAddressValid && isAddressTouched }"
        @input="validateAddress"
      />
      <div v-if="isAddressTouched && !isAddressValid" class="text-red-600">
        Address is required.
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Phone</label>
      <input
        v-model="editedUser.phoneNumber"
        type="text"
        class="w-full border rounded-md px-3 py-2"
        :class="{
          'border-red-500': !isPhoneNumberValid && isPhoneNumberTouched,
        }"
        @input="validatePhoneNumber"
      />
      <div
        v-if="isPhoneNumberTouched && !isPhoneNumberValid"
        class="text-red-600"
      >
        Phone is required and must be a number.
      </div>
    </div>
    <div class="mb-4">
      <div>
        <label class="block text-gray-700"
          >Profile Picture
          <span class="text-gray-800 text-sm">(max 1 mb)</span></label
        >
        <div class="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <input
            v-model="editedUser.profilePicture"
            type="text"
            class="w-full sm:w-max border rounded-md px-3 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            :class="{
              'border-red-500':
                !isProfilePictureValid && isProfilePictureTouched,
            }"
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
      </div>
      <div
        v-if="errorProfilePicture && !isProfilePictureValid"
        class="text-red-600"
      >
        Profile Picture is required.
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PopupUser',
  props: {
    editedUser: {
      type: Object,
      required: true,
    },
    showInputPassword: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isNameTouched: false,
      isEmailTouched: false,
      isPasswordTouched: false,
      isAddressTouched: false,
      isPhoneNumberTouched: false,
      isProfilePictureTouched: false,
      isFileInputTouched: false,
      errorProfilePicture: false,
    }
  },
  computed: {
    ...mapState({
      isNameValid: (state) => state.users.isNameValid,
      isEmailValid: (state) => state.users.isEmailValid,
      isPasswordValid: (state) => state.users.isPasswordValid,
      isAddressValid: (state) => state.users.isAddressValid,
      isPhoneNumberValid: (state) => state.users.isPhoneNumberValid,
      isProfilePictureValid: (state) => state.users.isProfilePictureValid,
    }),
  },
  methods: {
    ...mapMutations('users', ['updateValidation']),
    validateName() {
      this.isNameTouched = true
      this.updateValidation({
        inputName: 'Name',
        isValid: this.editedUser.name.length >= 3,
      })
    },
    validateEmail() {
      this.isEmailTouched = true
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      this.updateValidation({
        inputName: 'Email',
        isValid: emailRegex.test(this.editedUser.email),
      })
    },
    validatePassword() {
      this.isPasswordTouched = true
      if (!this.showInputPassword) {
        const passwordRegex =
          /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
        this.updateValidation({
          inputName: 'Password',
          isValid: passwordRegex.test(this.editedUser.password),
        })
      }
    },
    validateAddress() {
      this.isAddressTouched = true
      this.updateValidation({
        inputName: 'Address',
        isValid: this.editedUser.address.length > 0,
      })
    },
    validatePhoneNumber() {
      this.isPhoneNumberTouched = true
      const phoneNumberRegex = /^\d+$/
      this.updateValidation({
        inputName: 'PhoneNumber',
        isValid: phoneNumberRegex.test(this.editedUser.phoneNumber),
      })
    },
    validateProfilePicture() {
      if (this.editedUser.profilePicture.length === 0) {
        this.isProfilePictureTouched = false
        this.errorProfilePicture = true
        this.updateValidation({
          inputName: 'ProfilePicture',
          isValid:
            this.editedUser.profilePicture.length > 0 ||
            this.isFileInputTouched,
        })
      } else {
        this.isProfilePictureTouched = true
        this.errorProfilePicture = false
        this.updateValidation({
          inputName: 'ProfilePicture',
          isValid: this.editedUser.profilePicture.length > 0,
        })
      }
    },
    handleInput(event) {
      if (event.target.files.length === 0) {
        this.isFileInputTouched = false
        this.errorProfilePicture = true
        this.updateValidation({
          inputName: 'ProfilePicture',
          isValid:
            this.editedUser.profilePicture.length > 0 ||
            this.isFileInputTouched,
        })
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        this.editedUser.profilePicture = ''
        this.isFileInputTouched = true
        this.errorProfilePicture = false
        this.updateValidation({
          inputName: 'ProfilePicture',
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
