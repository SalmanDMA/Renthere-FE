<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Profile" link="/profile" />

    <div
      v-if="!loading"
      class="p-5 grid place-items-center grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-3 content-container w-full"
    >
      <div
        class="grid place-items-center bg-white p-4 rounded-lg shadow-md w-full sm:w-[312px] md:max-w-sm xl:max-w-lg xl:w-[512px] min-h-[612px] text-center"
      >
        <div class="flex justify-center mb-4 relative">
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-600">Max file size 1MB</label>
            <nuxt-img
              v-if="user && user.profilePicture"
              :src="base64Url ? base64Url : user.profilePicture"
              :alt="user.name"
              class="rounded-full w-36 h-36 object-cover object-center"
              :placeholder="[100, 50, 10]"
              loading="lazy"
            />
          </div>
          <div class="absolute -bottom-4 w-full flex justify-center">
            <label
              v-if="base64Url === null"
              for="imageInput"
              class="mx-auto cursor-pointer bg-orange-400 p-2 text-2xl text-white rounded-full w-12 h-12 flex items-center justify-center"
            >
              <fa :icon="['fas', 'pen-to-square']" />
            </label>
            <div
              v-else
              class="mx-auto cursor-pointer bg-[#7895CB] p-2 text-2xl text-white rounded-full flex items-center justify-between space-x-4"
            >
              <button @click="cancelUpload">
                <fa :icon="['fas', 'xmark']" />
              </button>
              <button @click="upload"><fa :icon="['fas', 'check']" /></button>
            </div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handlePreview"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Name</label>
          <p class="text-lg font-semibold">{{ user.name }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Email</label>
          <p>{{ user.email }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Role</label>
          <p>{{ user.role }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Address</label>
          <p>{{ user.address }}</p>
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Phone Number</label>
          <p>{{ user.phoneNumber }}</p>
        </div>
      </div>
      <div
        class="bg-white p-4 rounded-lg shadow-md w-full sm:w-[312px] md:max-w-sm xl:max-w-lg xl:w-[512px] min-h-[612px]"
      >
        <h2 class="text-center text-2xl font-semibold text-[#333] mb-4">
          Input User Profile
        </h2>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Name</label>
          <input
            v-model="user.name"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="user.email"
            class="w-full px-3 py-2 border rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Role</label>
          <input
            v-model="user.role"
            class="w-full px-3 py-2 border rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Address</label>
          <input
            v-model="user.address"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600">Phone</label>
          <input
            v-model="user.phoneNumber"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm text-gray-600"
            >Picture ( Only Url & Format Picture )</label
          >
          <input
            v-model="user.profilePicture"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div class="flex justify-center">
          <button
            class="bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            @click="saveProfile"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
    <profile-skeleton v-else />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileSkeleton from '../components/skeleton/ProfileSkeleton.vue'
export default {
  name: 'Profile',
  components: { ProfileSkeleton },
  data() {
    return {
      loading: false,
      base64Url: null,
      previewUrl: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'users/getUser',
    }),
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    handlePreview(event) {
      const file = event.target.files[0]
      if (file) {
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
    async upload() {
      try {
        try {
          const res = await this.$axios.post('upload/images', {
            image: this.base64Url,
          })
          this.previewUrl = res.data.data.url
        } catch (error) {
          this.base64Url = null
          this.previewUrl = ''
          this.$store.commit('toast/setToast', {
            message: error,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
        if (this.base64Url && this.previewUrl) {
          await this.$axios.put('/me', {
            profilePicture: this.previewUrl,
          })
          this.user.profilePicture = this.previewUrl
          this.base64Url = null
          this.previewUrl = ''
          this.$store.commit('toast/setToast', {
            message: 'Upload Success',
            show: true,
            backgroundColor: 'bg-green-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
      } catch (error) {
        this.base64Url = null
        this.previewUrl = ''
        this.$store.commit('toast/setToast', {
          message: error,
          show: true,
          backgroundColor: 'bg-red-500',
        })
        setTimeout(() => {
          this.$store.commit('toast/closeToast')
        }, 3000)
      }
    },
    cancelUpload() {
      this.base64Url = null
      this.previewUrl = ''
      this.$store.commit('toast/setToast', {
        message: 'Upload Cancelled',
        show: true,
        backgroundColor: 'bg-red-500',
      })
      setTimeout(() => {
        this.$store.commit('toast/closeToast')
      }, 3000)
    },
    saveProfile() {
      this.$axios
        .put('/me', this.user, {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })
        .then((response) => {
          this.$store.commit('toast/setToast', {
            message: response.data.message,
            show: true,
            backgroundColor: 'bg-green-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        })
        .catch((error) => {
          console.error('An error occurred during saving profile', error)
          this.$store.commit('toast/setToast', {
            message: error,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        })
    },
    async fetchUsers() {
      this.loading = true
      try {
        await this.$store.dispatch('users/fetchMe')
      } catch (error) {
        console.error('An error occurred during fetching users', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.content-container {
  min-height: calc(100vh - 80px);
}
</style>
