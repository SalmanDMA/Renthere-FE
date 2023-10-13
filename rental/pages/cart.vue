<!-- eslint-disable vue/no-v-html -->
<template>
  <main class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-5 sm:px-10">
    <h1 class="text-3xl font-semibold text-[#333] mb-12 text-center">
      Cart ({{ transaction.length }} item)
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-6 gap-10">
      <section class="md:col-span-4">
        <div
          v-for="item in transaction.data"
          :key="item.id"
          class="border border-[#333] px-4 py-4 pt-8 mb-4 grid grid-cols-1 lg:grid-cols-6 gap-4 rounded-lg relative"
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

          <div class="flex gap-2 items-start col-span-2">
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
            >
              Remove
            </button>
          </div>

          <div class="md:pl-4 absolute -top-[16px] left-0 flex gap-5">
            <p
              class="bg-[#333] rounded-md p-2 text-white text-[10px] sm:text-xs"
            >
              Start Date: {{ new Date(item.start_date).toLocaleDateString() }}
            </p>
            <p
              class="bg-[#333] rounded-md p-2 text-white text-[10px] sm:text-xs"
            >
              End Date: {{ new Date(item.end_date).toLocaleDateString() }}
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
    <overlay :show-overlay="showOverlay" @toggleSidebar="toggleSidebar" />
  </main>
</template>

<script>
export default {
  name: 'CartPage',
  data() {
    return {
      showSidebar: false,
      showOverlay: false,
      showAnimation: false,
      transaction: {
        length: 0,
        data: [],
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
            'WE ACCEPT PAYMENT VIA THE FOLLOWING CREDIT CARDS: VISA, MASTERCARD, AMERICAN EXPRESS AND DISCOVER CARD. WE ALSO ACCEPT DEBIT CARDS WITH A VISA OR MASTERCARD LOGO. (STILL UNDER DEVELOPMENT) ',
        },
        {
          title: 'Status Transaction',
          content:
            'in this website has 3 statuses, namely waiting for payment, completed payment and completed transaction, if you are in the first status then, you are required to pay immediately, if your second status means the system has detected that you have made a payment, and the last status indicates that you have completed the transaction or finished returning the vehicle you rented, (but because it is still in the development stage, we will do all status changes manually, please be patient o prospective customers).',
        },
      ],
      editedItem: {},
    }
  },
  computed: {
    sidebarClasses() {
      return this.showAnimation ? 'active' : 'deactive'
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
      this.toggleSidebar()
      this.editedItem = {}
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
    async getTransaction() {
      try {
        const response = await this.$axios.get('/transactions')
        console.log(response.data.data)
        this.transaction.length = response.data.data.length
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
  },
}
</script>

<style></style>
