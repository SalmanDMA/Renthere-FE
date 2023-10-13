<!-- eslint-disable vue/no-use-computed-property-like-method -->
<template>
  <main class="w-full bg-[#F7FAFC] pl-0 lg:pl-64 min-h-screen">
    <header-layout title="Transactions" link="/transactions" />

    <div class="p-10 bg-[#F7FAFC] w-full h-full">
      <section class="mb-4 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          class="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-[14rem]"
          @click="openAddTransactionModal"
        >
          <fa :icon="['fas', 'plus']" class="text-lg mr-4" />
          Add New Transaction
        </button>
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchTerm"
            class="px-4 py-2 rounded-md shadow-lg border border-orange-400 focus:outline-none w-full"
            placeholder="Search transactions by name here..."
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
              <th class="px-4 py-2">User ID</th>
              <th class="px-4 py-2">Car ID</th>
              <th class="px-4 py-2">Bike ID</th>
              <th class="px-4 py-2">Start Date</th>
              <th class="px-4 py-2">Rental Duration</th>
              <th class="px-4 py-2">End Date</th>
              <th class="px-4 py-2">Price Car</th>
              <th class="px-4 py-2">Total Car</th>
              <th class="px-4 py-2">Total Amount Car</th>
              <th class="px-4 py-2">Price Bike</th>
              <th class="px-4 py-2">Total Bike</th>
              <th class="px-4 py-2">Total Amount Bike</th>
              <th class="px-4 py-2">Total Cost</th>
              <th class="px-4 py-2">Payment</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in paginatedTransactions"
              :key="transaction.id"
            >
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.user.name }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.car?.name ? transaction.car.name : '-' }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.bike?.name ? transaction.bike.name : '-' }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ new Date(transaction.start_date).toLocaleString() }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.rental_duration }} day
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ new Date(transaction.end_date).toLocaleString() }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ formatToIDR(transaction.price_car) }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.total_car }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ formatToIDR(transaction.total_amount_car) }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ formatToIDR(transaction.price_bike) }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.total_bike }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ formatToIDR(transaction.total_amount_bike) }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ formatToIDR(transaction.total_cost) }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.payment }}
              </td>
              <td class="border border-orange-400 px-4 py-2">
                {{ transaction.status }}
              </td>

              <td class="border border-orange-400 px-4 py-2">
                <div class="flex justify-center gap-3 w-full">
                  <button
                    class="bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openEditTransactionModal(transaction)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    @click="openDeleteTransactionModal(transaction.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
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
      @close="closeModal"
    >
      <popup-form
        :btn-text="editPopup ? 'Update' : 'Add'"
        :delete-popup="deletePopup"
        @save="saveTransaction"
        @close="closeModal"
      >
        <popup-transaction
          v-if="!deletePopup"
          :edited-transaction="editedTransaction"
        />
      </popup-form>
    </popup-layout>
  </main>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import PopupForm from '../components/popup/PopupForm.vue'
import PopupTransaction from '../components/popup/PopupTransaction.vue'
export default {
  name: 'Transactions',
  components: { Pagination, PopupForm, PopupTransaction },
  middleware: 'auth',
  data() {
    return {
      transactions: [],
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10,
      showModal: false,
      notFound: false,
      editPopup: false,
      deletePopup: false,
      modalTitle: '',
      editedTransaction: {
        userId: '',
        startDate: '',
        totalCar: '',
        totalBike: '',
        payment: '',
        status: '',
        carId: '',
        bikeId: '',
        rentalDuration: '',
      },
      transactionIdToDelete: null,
    }
  },
  head() {
    return {
      title: 'Transactions | RentHere',
    }
  },
  computed: {
    filteredTransactions() {
      if (!this.searchTerm) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notFound = false
        return this.transactions
      }

      const filtered = this.transactions.filter((transaction) =>
        transaction.name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
      return Math.ceil(this.filteredTransactions.length / this.itemsPerPage)
    },
    paginatedTransactions() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredTransactions.slice(
        startIndex,
        startIndex + this.itemsPerPage
      )
    },
  },
  mounted() {
    this.fetchTransactions()
  },
  methods: {
    formatToIDR(price) {
      const formattedPrice = price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })

      return formattedPrice
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
    async fetchTransactions() {
      try {
        const response = await this.$axios.get('/transactions/admin', {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        })

        this.transactions = response.data.data
      } catch (error) {
        console.error('An error occurred during fetching transaction', error)
      }
    },
    closeModal() {
      this.showModal = false
      this.editPopup = false
      this.editedTransaction = {
        userId: '',
        startDate: '',
        totalCar: '',
        totalBike: '',
        payment: '',
        status: '',
        carId: '',
        bikeId: '',
        rentalDuration: '',
      }
      this.transactionIdToDelete = null
      this.deletePopup = false
    },
    closeOverlayOnClickOutside(event) {
      if (this.showModal) {
        const modalContent = this.$refs.modalContent
        if (!modalContent.contains(event.target)) {
          this.closeModal()
        }
      }
    },

    openAddTransactionModal() {
      this.showModal = true
      this.modalTitle = 'Add Transaction'
    },
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
    openEditTransactionModal(transaction) {
      this.showModal = true
      this.editPopup = true
      this.modalTitle = 'Edit Transaction'
      const formattedDateTime = this.convertDateToDisplayOnInputField(
        transaction.start_date
      )
      this.editedTransaction = {
        ...transaction,
        startDate: formattedDateTime,
        totalCar: transaction.total_car,
        totalBike: transaction.total_bike,
        rentalDuration: transaction.rental_duration,
      }
    },
    openDeleteTransactionModal(id) {
      this.showModal = true
      this.deletePopup = true
      this.modalTitle = 'Delete Transaction'
      this.transactionIdToDelete = id
    },
    async saveTransaction() {
      if (!this.editPopup && !this.deletePopup) {
        await this.addTransaction()
      }
      if (this.editPopup && !this.deletePopup) {
        await this.editTransaction()
      }
      if (!this.editPopup && this.deletePopup) {
        await this.deleteTransaction(this.transactionIdToDelete)
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
      this.fetchTransactions()
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
    async addTransaction() {
      this.editedTransaction.userId = Number(this.editedTransaction.userId)
      this.editedTransaction.carId = Number(this.editedTransaction.carId)
      this.editedTransaction.bikeId = Number(this.editedTransaction.bikeId)
      this.editedTransaction.rentalDuration = Number(
        this.editedTransaction.rentalDuration
      )
      this.editedTransaction.totalCar = Number(this.editedTransaction.totalCar)
      this.editedTransaction.totalBike = Number(
        this.editedTransaction.totalBike
      )

      try {
        const response = await this.$axios.post(
          '/transactions/admin',
          this.editedTransaction,
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
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async editTransaction() {
      try {
        const response = await this.$axios.put(
          `/transactions/admin/${this.editedTransaction.id}`,
          {
            userId: Number(this.editedTransaction.userId),
            carId: Number(this.editedTransaction.carId),
            bikeId: Number(this.editedTransaction.bikeId),
            rentalDuration: Number(this.editedTransaction.rentalDuration),
            totalCar: Number(this.editedTransaction.totalCar),
            totalBike: Number(this.editedTransaction.totalBike),
            status: this.editedTransaction.status,
            payment: this.editedTransaction.payment,
            startDate: this.editedTransaction.startDate,
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
        console.error('An error occurred during sign in', error)
        this.failToast(error)
      }
    },
    async deleteTransaction(id) {
      try {
        const response = await this.$axios.delete(`/transactions/admin/${id}`, {
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
