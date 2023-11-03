<!-- eslint-disable vue/no-v-html -->
<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-5 sm:px-10">
    <h1 class="text-3xl font-semibold text-[#333] mb-12 text-center">
      Cart
      <span class="text-orange-400 text-sm"
        >({{ transaction.length }} items)</span
      >
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-10">
      <section class="md:col-span-4">
        <div
          v-for="item in transaction.data"
          :key="item.id"
          class="border border-[#333] px-4 py-4 pt-8 mb-8 grid grid-cols-1 lg:grid-cols-6 gap-4 rounded-lg relative"
        >
          <div class="flex flex-col col-span-4">
            <div
              v-if="item.car"
              class="flex gap-4 flex-wrap lg:flex-nowrap mb-4"
            >
              <nuxt-img
                :src="item.car.picture"
                :alt="item.car.name"
                class="w-full lg:w-[150px] lg:h-[150px] object-cover rounded-md"
                :placeholder="[100, 50, 10]"
                loading="lazy"
              />
              <div class="flex flex-col justify-between flex-1">
                <div>
                  <h3
                    class="font-bold text-lg text-[#333] border-b-2 border-[#333] max-w-max"
                  >
                    {{ item.car.name }}
                  </h3>
                  <p class="text-slate-500 text-sm mt-1">
                    Price: Rp {{ item.price_car }}
                  </p>
                  <p class="text-slate-500 text-sm">
                    Quantity: {{ item.total_car }}
                  </p>
                </div>
                <p class="text-slate-500 font-semibold italic mt-4">
                  Total Cost Car: Rp
                  {{ item.total_amount_car }}
                </p>
              </div>
            </div>
            <div v-if="item.bike" class="flex gap-4 flex-wrap lg:flex-nowrap">
              <nuxt-img
                :src="item.bike.picture"
                :alt="item.bike.name"
                class="w-full lg:w-[150px] lg:h-[150px] object-cover rounded-md"
                :placeholder="[100, 50, 10]"
                loading="lazy"
              />
              <div class="flex flex-col justify-between flex-1">
                <div>
                  <h3
                    class="font-bold text-lg text-[#333] border-b-2 border-[#333] max-w-max"
                  >
                    {{ item.bike.name }}
                  </h3>
                  <p class="text-slate-500 text-sm mt-1">
                    Price: Rp {{ item.price_bike }}
                  </p>
                  <p class="text-slate-500 text-sm">
                    Quantity: {{ item.total_bike }}
                  </p>
                </div>
                <p class="text-slate-500 font-semibold italic mt-4">
                  Total Cost Bike: Rp
                  {{ item.total_amount_bike }}
                </p>
              </div>
            </div>
            <div class="text-[#333] font-bold mt-2 flex gap-2">
              <p>Total Cost Transaction:</p>
              <p>Rp {{ item.total_cost }}</p>
            </div>
            <div class="text-[#333] font-bold mt-2 flex gap-2">
              <p>Rental Duration:</p>
              <p>{{ item.rental_duration }} day</p>
            </div>
            <div class="text-[#333] font-bold mt-2 flex gap-2">
              <p>Status:</p>
              <p class="capitalize">{{ item.status }}</p>
            </div>
          </div>

          <div
            v-if="item.status !== 'completed'"
            class="flex flex-col items-center justify-between gap-2 col-span-2"
          >
            <div class="flex gap-2 items-start">
              <button
                type="button"
                class="bg-blue-500 hover:bg-blue-600 text-white h-8 px-4 rounded-md transition duration-300"
                @click="handleEdit(item)"
              >
                Edit
              </button>
              <p class="text-gray-500 text-lg">/</p>
              <button
                class="bg-red-500 hover:bg-red-600 text-white h-8 px-4 rounded-md transition duration-300"
                @click="handleRemove(item.id)"
              >
                Remove
              </button>
            </div>
            <div class="mb-7">
              <button
                type="button"
                class="bg-[#333] hover:bg-[#1f1f1f] text-white h-8 px-4 rounded-md transition duration-300"
                @click="handleCheckout(item)"
              >
                Checkout Now
              </button>
            </div>
          </div>

          <div class="md:pl-4 absolute -top-[16px] left-0 flex gap-5">
            <p
              class="bg-[#333] rounded-md p-2 text-white text-[10px] sm:text-xs"
            >
              Start Date: {{ new Date(item.start_date).toLocaleString() }}
            </p>
            <p
              class="bg-[#333] rounded-md p-2 text-white text-[10px] sm:text-xs"
            >
              End Date: {{ new Date(item.end_date).toLocaleString() }}
            </p>
          </div>
        </div>
      </section>
      <section class="md:col-span-2">
        <h3
          class="bg-gray-100 p-4 text-lg font-bold border rounded-lg uppercase"
        >
          Support
        </h3>
        <div
          v-for="(item, index) in accordionItems"
          :key="index"
          class="border rounded-lg mb-2"
        >
          <div
            class="cursor-pointer flex justify-between items-center bg-gray-100 p-4"
            @click="toggleAccordion(index)"
          >
            <h2 class="text-lg font-semibold uppercase">{{ item.title }}</h2>
            <svg
              class="w-6 h-6 transform transition-transform"
              :class="{ 'rotate-180': activeIndex === index }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div v-show="activeIndex === index" class="p-4 border-t">
            <p class="uppercase" v-html="item.content" />
          </div>
        </div>
      </section>
    </div>
    <sidebar-cart
      :show-sidebar="showSidebar"
      :sidebar-classes="sidebarClasses"
      :edited-item="editedItem"
      @toggleSidebar="toggleSidebar"
      @saveEdit="saveEdit"
    />
    <popup-layout
      title="Delete Item"
      :popup-class="popupClasses"
      :is-open="isPopupOpen"
      type="cartPage"
      @close="togglePopup"
      @save="deleteTransaction"
    >
      <popup-delete
        :cancel="togglePopup"
        title="Are you sure you want to delete this transaction ?"
      />
    </popup-layout>
    <overlay
      :show-overlay="showOverlay"
      @toggleSidebar="showSidebar ? toggleSidebar() : togglePopup()"
    />
  </main>
</template>

<script>
export default {
  name: 'CartPage',
  data() {
    return {
      showSidebar: false,
      isPopupOpen: false,
      showOverlay: false,
      showAnimation: false,
      transaction: {
        length: 0,
        data: [],
        idToDelete: null,
      },
      activeIndex: -1,
      accordionItems: [
        {
          title: 'For Your Information ',
          content: `We apologize profusely for your inconvenience when using this website, especially in the payment section and others. This website is still under development and we hope to resolve the bugs as soon as we can, for more information please visit this website <a href="https://bit.ly/portofolioSalmanDMA" target="_blank" class="underline" >Portofolio Salman (Developer RentHere)</a>  to ask anything you want about RentHere website. `,
        },
        {
          title: 'Payment',
          content:
            'WE ACCEPT PAYMENT FROM VARIOUS METHODS, YOU CAN CHOOSE IT YOURSELF WHEN YOU CLICK THE CHECKOUT BUTTON. BUT IF THERE IS A PROBLEM, IT MEANS THAT THE PAYMENT IS STILL IN THE DEVELOPMENT STAGE, WE RECOMMEND THAT YOU USE THE BANK METHOD SO THAT IT IS EASIER TO USE. ',
        },
        {
          title: 'Status Transaction',
          content:
            'in this website has 2 statuses, namely waiting for payment, and completing payment if you are in the first status then, you are required to pay immediately, if your second status indicates that you have completed the transaction or finished returning the vehicle you rented, (but because it is still in the development stage, please apologize if there are some glitches, we will fix it immediately and please report if you have difficulty on the contact page).',
        },
      ],
      editedItem: {},
    }
  },
  head() {
    return {
      title: 'Cart - RentHere',
    }
  },
  computed: {
    sidebarClasses() {
      return this.showAnimation ? 'active' : 'deactive'
    },
    popupClasses() {
      return this.showAnimation
        ? 'popup-content active'
        : 'popup-content deactive'
    },
  },
  mounted() {
    this.getTransaction()
  },
  methods: {
    convertDateToDisplayOnInputField(originalDate) {
      const date = new Date(originalDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`

      return formattedDateTime
    },
    handleEdit(item) {
      this.toggleSidebar()
      const formattedDateTime = this.convertDateToDisplayOnInputField(
        item.start_date
      )
      this.editedItem = {
        ...item,
        startDate: formattedDateTime,
      }
      this.transaction.idToDelete = null
    },
    handleRemove(id) {
      this.togglePopup()
      this.transaction.idToDelete = id
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
      this.getTransaction()
      if (this.transaction.idToDelete) {
        this.fetchTransactions()
        this.togglePopup()
        this.transaction.idToDelete = null
      }
      if (this.editedItem && this.editedItem.id) {
        this.toggleSidebar()
        this.editedItem = {}
      }
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
    async deleteTransaction() {
      try {
        const response = await this.$axios.delete(
          `/transactions/${this.transaction.idToDelete}`,
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
      } catch (error) {
        this.failToast(error)
      }
    },
    async saveEdit(editedItem) {
      try {
        const response = await this.$axios.put(
          `/transactions/${editedItem.id}`,
          {
            carId: Number(editedItem.carId),
            bikeId: Number(editedItem.bikeId),
            startDate: editedItem.startDate,
            totalCar: Number(editedItem.total_car),
            totalBike: Number(editedItem.total_bike),
            rentalDuration: Number(editedItem.rental_duration),
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
      } catch (error) {
        this.failToast(error)
      }
    },
    toggleSidebar() {
      if (this.showAnimation) {
        this.showAnimation = !this.showAnimation
        setTimeout(() => {
          this.showSidebar = !this.showSidebar
          this.showOverlay = !this.showOverlay
        }, 400)
        return
      }
      this.showAnimation = !this.showAnimation
      this.showSidebar = !this.showSidebar
      this.showOverlay = !this.showOverlay
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
    async getTransaction() {
      try {
        const response = await this.$axios.get('/transactions')
        const filteredTransactions = response.data.data.filter(
          (transaction) => transaction.status !== 'completed'
        )
        this.transaction.length = filteredTransactions.length
        this.transaction.data = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    toggleAccordion(index) {
      if (this.activeIndex === index) {
        this.activeIndex = -1
      } else {
        this.activeIndex = index
      }
    },

    async handleCheckout(data) {
      try {
        const dataOrder = {
          transactionId: data.id,
          totalCost: data.total_cost,
        }
        const config = {
          headers: {
            Authorization: this.$auth.getToken('local'),
            'Content-Type': 'application/json',
          },
        }

        const response = await this.$axios.post('/orders', dataOrder, config)

        if (response.data.status === 'success') {
          let snapToken = response.data.data.token

          // Menggunakan Snap Pay untuk proses pembayaran
          // eslint-disable-next-line no-undef
          Snap.pay(snapToken, {
            onSuccess: async (result) => {
              const response = await this.$axios.put(
                `/transactions/${data.id}`,
                {
                  carId: Number(data.carId),
                  bikeId: Number(data.bikeId),
                  startDate: data.startDate,
                  totalCar: Number(data.total_car),
                  totalBike: Number(data.total_bike),
                  rentalDuration: Number(data.rental_duration),
                  status: 'completed',
                },
                {
                  headers: {
                    Authorization: this.$auth.getToken('local'),
                  },
                }
              )
              if (response.data.status === 'success') {
                this.successToast(
                  'Transaction completed. ' + response.data.message
                )
                console.log(result)
                this.getTransaction()
                snapToken = ''
              } else {
                this.failToast(response.data.message)
              }
            },
            onPending: (result) => {
              this.successToast(
                'Transaction pending. ' + JSON.stringify(result)
              )
              snapToken = ''
            },
            onError: (result) => {
              this.failToast(`Transaction failed. ${JSON.stringify(result)}`)
              snapToken = ''
            },
            onClose: () => {
              this.failToast('Transaction closed.')
              snapToken = ''
            },
          })
        } else {
          this.failToast(response.data.message)
        }
      } catch (error) {
        this.failToast(error)
      }
    },
  },
}
</script>

<style></style>
