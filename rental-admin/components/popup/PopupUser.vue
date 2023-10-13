<!-- eslint-disable vue/no-mutating-props -->
<template>
  <section>
    <div class="mb-4">
      <label class="block text-gray-700">Name</label>
      <input
        v-model="editedUser.name"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Email</label>
      <input
        v-model="editedUser.email"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div v-if="!showInputPassword" class="mb-4">
      <label class="block text-gray-700">Password</label>
      <input
        v-model="editedUser.password"
        type="password"
        class="w-full border rounded-md px-3 py-2"
      />
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
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Phone</label>
      <input
        v-model="editedUser.phoneNumber"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700">Profile Picture</label>
      <input
        v-model="editedUser.profilePicture"
        type="text"
        class="w-full border rounded-md px-3 py-2"
      />
    </div>
  </section>
</template>

<script>
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
}
</script>

<style></style>
