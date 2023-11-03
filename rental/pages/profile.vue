<template>
  <main class="bg-[#f5f5f5] pt-[70px]">
    <div class="w-full">
      <section class="w-full relative">
        <nuxt-img
          :src="displayCoverImage"
          alt="cover image profile"
          class="w-full h-[300px] sm:h-[500px] shadow-xl object-cover object-center grayscale cursor-pointer"
          :placeholder="[100, 50, 10]"
          loading="lazy"
          title="click to changes cover image"
          @click="togglePopupCoverImage"
        />
        <div
          class="w-full absolute -bottom-4 sm:-bottom-8 left-0 flex justify-between px-5 sm:px-10 items-center"
        >
          <nuxt-img
            :src="
              dataProfile.profilePicture
                ? dataProfile.profilePicture
                : 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1686&q=80'
            "
            alt="profile user"
            class="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] border border-white rounded-lg shadow-xl object-cover object-center"
            :placeholder="[100, 50, 10]"
            loading="lazy"
          />
          <div class="mb-8 sm:mb-0">
            <h1 class="text-2xl md:text-4xl font-bold text-white">
              {{ dataProfile.name }}
            </h1>
            <p
              v-if="dataProfile.address"
              class="text-white text-sm font-medium flex items-center gap-2 mt-2"
            >
              <fa :icon="['fas', 'location-dot']" />
              {{ dataProfile.address }}
            </p>
            <p
              v-if="dataProfile.phoneNumber"
              class="text-white text-sm font-medium flex items-center gap-2"
            >
              <fa :icon="['fas', 'phone']" />
              {{ dataProfile.phoneNumber }}
            </p>
          </div>
        </div>
      </section>
      <section
        class="px-4 sm:px-20 pt-14 pb-4 bg-gray-100 border rounded-lg flex justify-between gap-4 w-full"
      >
        <button
          class="px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-orange-400 transition-colors duration-300 ease-in-out h-max"
          @click="togglePopup"
        >
          Edit Profile
        </button>
        <div class="flex gap-5">
          <div class="text-center">
            <p class="text-2xl font-semibold">{{ lengthTransaction }}</p>
            <p class="text-gray-500">Transaction</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-semibold">10</p>
            <p class="text-gray-500">Wishlist</p>
          </div>
        </div>
      </section>
    </div>
    <popup-layout
      :title="isPopupOpen ? 'Edit Profile' : 'Edit Cover Image'"
      :popup-class="popupClasses"
      :is-open="isPopupOpen ? isPopupOpen : isPopupOpenCoverImage"
      type="profilePage"
      @close="isPopupOpen ? togglePopup() : togglePopupCoverImage()"
    >
      <popup-profile
        v-if="isPopupOpen"
        @handleInput="handleInputFile"
        @save="saveData"
      />
      <popup-cover-image
        v-if="isPopupOpenCoverImage"
        :edited-cover-image="displayCoverImage"
        @save="saveData"
      />
    </popup-layout>
    <overlay
      :show-overlay="showOverlay"
      @toggleSidebar="isPopupOpen ? togglePopup() : togglePopupCoverImage()"
    />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import dataCoverImage from '@/helpers/coverImageData'
import PopupCoverImage from '~/components/Popup/PopupCoverImage.vue'
export default {
  name: 'Profile',

  components: { PopupCoverImage },
  middleware: ['auth'],
  data() {
    return {
      dataCoverImage,
      isPopupOpen: false,
      isPopupOpenCoverImage: false,
      showAnimation: false,
      showOverlay: false,
      base64Url: null,
      previewUrl: null,
    }
  },
  head() {
    return {
      title: 'Profile - RentHere',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/renthere.ico' }],
    }
  },
  computed: {
    ...mapGetters({
      lengthTransaction: 'transactions/getLengthTransaction',
      user: 'users/getUser',
    }),
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
    dataProfile() {
      return this.user
    },
    displayCoverImage() {
      return this.user.coverPicture
        ? this.user.coverPicture
        : 'https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    },
  },
  mounted() {
    this.$store.dispatch('transactions/fetchTransactionLength')
    this.$store.dispatch('users/fetchMe')
  },
  methods: {
    handleInputFile(event) {
      const file = event
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
    togglePopup() {
      if (this.showAnimation) {
        this.showAnimation = !this.showAnimation
        setTimeout(() => {
          this.isPopupOpen = !this.isPopupOpen
          this.showOverlay = !this.showOverlay
        }, 400)
        return
      }
      this.showAnimation = !this.showAnimation
      this.isPopupOpen = !this.isPopupOpen
      this.showOverlay = !this.showOverlay
    },
    togglePopupCoverImage() {
      if (this.showAnimation) {
        this.showAnimation = !this.showAnimation
        setTimeout(() => {
          this.isPopupOpenCoverImage = !this.isPopupOpenCoverImage
          this.showOverlay = !this.showOverlay
        }, 400)
        return
      }
      this.showAnimation = !this.showAnimation
      this.isPopupOpenCoverImage = !this.isPopupOpenCoverImage
      this.showOverlay = !this.showOverlay
    },
    async saveData(item) {
      if (this.isPopupOpen) {
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
          }
          if ((this.base64Url && this.previewUrl) || item.profilePicture) {
            const response = await this.$axios.put(
              '/me',
              {
                ...item,
                profilePicture: this.previewUrl
                  ? this.previewUrl
                  : item.profilePicture,
              },
              {
                headers: {
                  Authorization: this.$auth.getToken('local'),
                },
              }
            )
            if (response.data.status === 'success') {
              this.$store.commit('toast/setToast', {
                message: response.data.message,
                show: true,
                backgroundColor: 'bg-green-500',
              })
              setTimeout(() => {
                this.$store.commit('toast/closeToast')
              }, 3000)
              const dataUser = {
                ...item,
                profilePicture: this.previewUrl
                  ? this.previewUrl
                  : item.profilePicture,
              }
              this.$store.commit('users/updateProfile', dataUser)
              this.base64Url = null
              this.previewUrl = ''
              this.togglePopup()
            }
          }
        } catch (error) {
          this.$store.commit('toast/setToast', {
            message: error,
            show: true,
            backgroundColor: 'bg-red-500',
          })
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
      }
      if (this.isPopupOpenCoverImage) {
        const matchingImage = this.dataCoverImage.find(
          (image) => image.link === item
        )
        if (matchingImage) {
          try {
            const response = await this.$axios.put(
              '/me',
              {
                ...this.dataProfile,
                coverPicture: matchingImage.link,
              },
              {
                headers: {
                  Authorization: this.$auth.getToken('local'),
                },
              }
            )

            if (response.data.status === 'success') {
              this.$store.commit('toast/setToast', {
                message: response.data.message,
                show: true,
                backgroundColor: 'bg-green-500',
              })

              setTimeout(() => {
                this.$store.commit('toast/closeToast')
              }, 3000)
              this.$store.commit('users/updateCoverPicture', matchingImage.link)
              this.togglePopupCoverImage()
            }
          } catch (error) {
            this.$store.commit('toast/setToast', {
              message: error.message,
              show: true,
              backgroundColor: 'bg-red-500',
            })

            setTimeout(() => {
              this.$store.commit('toast/closeToast')
            }, 3000)
          }
        } else {
          this.$store.commit('toast/setToast', {
            message: 'Image not found',
            show: true,
            backgroundColor: 'bg-red-500',
          })

          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
      }
    },
  },
}
</script>

<style></style>
