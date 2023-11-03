<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Users" link="/users" />

    <div class="p-10 bg-[#F7FAFC] w-full h-full">
      <section class="mb-4 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          class="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-44"
          @click="openAddUserModal"
        >
          <fa :icon="['fas', 'plus']" class="text-lg mr-4" />
          Add New User
        </button>
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchTerm"
            class="px-4 py-2 rounded-md shadow-lg border border-orange-400 focus:outline-none w-full"
            placeholder="Search users by name here..."
          />
          <fa
            :icon="['fas', 'magnifying-glass']"
            class="text-lg ml-2 absolute top-1/2 right-[15px] -translate-y-1/2 text-orange-400"
          />
        </div>
      </section>

      <!-- Tabel -->
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead class="bg-orange-400 border border-orange-400 text-white">
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Role</th>
              <th class="px-4 py-2">Address</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Picture</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td class="border border-orange-400 px-4 py-2">
                {{ user.name }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ user.email }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ user.role }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ user.address }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ user.phoneNumber }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                <nuxt-img
                  v-if="user && user.profilePicture"
                  :src="user.profilePicture"
                  :alt="user.name"
                  class="w-20 cursor-pointer"
                  :placeholder="[100, 50, 10]"
                  loading="lazy"
                  @click="openImagePopup(user.profilePicture)"
                />
              </td>
              <td class="border border-orange-400 px-4 py-2">
                <div class="flex justify-center gap-3 w-full">
                  <button
                    class="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    :disabled="user.role === 'ADMIN'"
                    @click="openEditUserModal(user)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    :disabled="user.role === 'ADMIN'"
                    @click="openDeleteUserModal(user.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <table-skeleton v-else :td="7" />
        </table>
      </div>
    </div>

    <pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :go-to-page="goToPage"
      :next-page="nextPage"
      :prev-page="prevPage"
    />
    <data-not-found v-if="notFound" />

    <popup-layout
      :show-modal="showModal"
      :modal-title="modalTitle"
      :popup-class="popupClasses"
      @close="closeModal"
    >
      <popup-image v-if="imagePopup" :picture="userImage" @close="closeModal" />
      <popup-form
        v-else
        type="user"
        :btn-text="editPopup ? 'Update' : 'Add'"
        :delete-popup="deletePopup"
        @save="saveUser"
        @close="closeModal"
      >
        <popup-user
          v-if="!deletePopup"
          :edited-user="editedUser"
          :show-input-password="editPopup"
          @handleInput="handleInputFile"
        />
      </popup-form>
    </popup-layout>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '../components/Pagination.vue'
import TableSkeleton from '../components/skeleton/TableSkeleton.vue'
export default {
  name: 'Users',
  components: { Pagination, TableSkeleton },
  middleware: 'auth',
  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10,
      showModal: false,
      showAnimation: false,
      notFound: false,
      editPopup: false,
      deletePopup: false,
      imagePopup: false,
      modalTitle: '',
      editedUser: {
        name: '',
        email: '',
        role: 'USER',
        address: '',
        phoneNumber: '',
        profilePicture: '',
      },
      userIdToDelete: null,
      userImage: '',
      loading: false,
      base64Url: null,
      previewUrl: null,
    }
  },
  head() {
    return {
      title: 'Users | RentHere',
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/getUsers',
    }),
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
    filteredUsers() {
      if (!this.searchTerm) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = false
        return this.users
      }

      const filtered = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )

      if (filtered.length === 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = true
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.currentPage = 1
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = false
      }

      return filtered
    },

    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredUsers.slice(
        startIndex,
        startIndex + this.itemsPerPage
      )
    },
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    handleInputFile(event) {
      const file = event
      if (file) {
        console.log()
        if (file.size > 1000000) {
          throw new Error('File too large')
        }

        const reader = new FileReader()

        reader.onload = () => {
          const image = new Image()
          image.src = reader.result

          image.onload = () => {
            const canvas = document.createElement('canvas')
            const maxDimension = 500

            let width = image.width
            let height = image.height

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height *= maxDimension / width
                width = maxDimension
              } else {
                width *= maxDimension / height
                height = maxDimension
              }
            }

            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, width, height)

            const resizedBase64Url = canvas.toDataURL('image/jpg')

            this.base64Url = resizedBase64Url
          }
        }
        reader.readAsDataURL(file)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    goToPage(page) {
      this.currentPage = page
    },
    async fetchUsers() {
      this.loading = true
      try {
        await this.$store.dispatch('users/fetchUsers')
      } catch (error) {
        console.error('An error occurred during fetching users', error)
      } finally {
        this.loading = false
      }
    },
    closeModal() {
      this.showAnimation = false
      setTimeout(() => {
        this.showModal = false
        this.editPopup = false
        this.editedUser = {
          name: '',
          email: '',
          password: '',
          role: 'USER',
          address: '',
          phoneNumber: '',
          profilePicture: '',
        }
        this.userIdToDelete = null
        this.deletePopup = false
        this.imagePopup = false
        this.userImage = ''
        this.base64Url = null
        this.previewUrl = null
      }, 300)
    },
    openAddUserModal() {
      this.showModal = true
      this.showAnimation = true
      this.modalTitle = 'Add User'
      this.$store.commit('users/setFalseValidation')
    },
    openEditUserModal(user) {
      this.showModal = true
      this.editPopup = true
      this.showAnimation = true
      this.modalTitle = 'Edit User'
      this.editedUser = { ...user }
      this.$store.commit('users/setTrueValidation')
    },
    openDeleteUserModal(id) {
      this.showModal = true
      this.showAnimation = true
      this.deletePopup = true
      this.modalTitle = 'Delete User'
      this.userIdToDelete = id
    },
    openImagePopup(image) {
      this.showModal = true
      this.showAnimation = true
      this.imagePopup = true
      this.userImage = image
      this.modalTitle = ''
    },
    async saveUser() {
      if (!this.editPopup && !this.deletePopup) {
        await this.addUser()
      }
      if (this.editPopup && !this.deletePopup) {
        await this.editUser()
      }
      if (!this.editPopup && this.deletePopup) {
        await this.deleteUser(this.userIdToDelete)
      }
    },
    successToast(message) {
      this.$store.commit('toast/setToast', {
        message,
        show: true,
        backgroundColor: 'bg-green-500',
      })
      setTimeout(() => {
        this.$store.commit('toast/closeToast')
      }, 3000)
      this.fetchUsers()
      this.closeModal()
    },
    failToast(message) {
      this.$store.commit('toast/setToast', {
        message,
        show: true,
        backgroundColor: 'bg-red-500',
      })
      setTimeout(() => {
        this.$store.commit('toast/closeToast')
      }, 3000)
    },
    async addUser() {
      try {
        try {
          const res = await this.$axios.post('upload/images', {
            image: this.base64Url,
          })
          this.previewUrl = res.data.data.url
        } catch (error) {
          this.base64Url = null
          this.previewUrl = ''
          this.failToast(error)
        }
        if (
          (this.base64Url && this.previewUrl) ||
          this.editedUser.profilePicture
        ) {
          const response = await this.$axios.post(
            '/users',
            {
              ...this.editedUser,
              profilePicture: this.previewUrl
                ? this.previewUrl
                : this.editedUser.profilePicture,
            },
            {
              headers: {
                Authorization: this.$auth.getToken('local'),
              },
            }
          )
          if (response.data.status === 'success') {
            this.successToast(response.data.message)
          } else {
            this.failToast(response.data.message)
          }
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async editUser() {
      try {
        try {
          const res = await this.$axios.post('upload/images', {
            image: this.base64Url,
          })
          this.previewUrl = res.data.data.url
        } catch (error) {
          this.base64Url = null
          this.previewUrl = ''
          this.failToast(error)
        }
        if (
          (this.base64Url && this.previewUrl) ||
          this.editedUser.profilePicture
        ) {
          const response = await this.$axios.put(
            `/users/${this.editedUser.id}`,
            {
              name: this.editedUser.name,
              email: this.editedUser.email,
              role: this.editedUser.role,
              address: this.editedUser.address,
              phoneNumber: this.editedUser.phoneNumber,
              profilePicture: this.previewUrl
                ? this.previewUrl
                : this.editedUser.profilePicture,
            },
            {
              headers: {
                Authorization: this.$auth.getToken('local'),
              },
            }
          )
          if (response.data.status === 'success') {
            this.successToast(response.data.message)
          } else {
            this.failToast(response.data.message)
          }
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async deleteUser(id) {
      try {
        const response = await this.$axios.delete(`/users/${id}`, {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        if (response.data.status === 'success') {
          this.successToast(response.data.message)
        } else {
          this.failToast(response.data.message)
        }
      } catch (error) {
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
  },
}
</script>

<style></style>
