<template>
  <main
    class="min-h-screen bg-[#f5f5f5] pt-[94px] pb-10 px-10 flex justify-center items-center"
  >
    <div class="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <section
        v-if="!showInput.car && !showInput.bike && !showInput.both"
        class="flex flex-wrap justify-center items-center gap-10 lg:flex-nowrap"
      >
        <div class="order-2 lg:order-1">
          <h1 class="text-2xl md:text-4xl font-bold mb-4 text-center">
            {{ `Hello ${displayNameByLogin}` }}
          </h1>
          <p class="text-gray-700 text-center">
            What do you want to rent today ?
          </p>
          <div
            class="mt-4 text-center flex flex-wrap gap-2 justify-center items-center"
          >
            <button
              class="bg-orange-400 hover:bg-orange-600 transition-colors duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
              @click="toggleInput('car')"
            >
              Car
            </button>
            <button
              class="bg-[#333] hover:bg-[#1f1f1f] transition-colors duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
              @click="toggleInput('bike')"
            >
              Bike
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
              @click="toggleInput('both')"
            >
              Car & Bike
            </button>
          </div>
        </div>
        <nuxt-img
          src="/images/rent/hello.png"
          alt="vector people waving hand"
          class="w-full max-[400px] lg:max-w-xl h-auto max-h-[500px] object-cover object-center order-1 lg:order-2"
          :placeholder="[100, 50, 10]"
          loading="lazy"
          title="Image by https://www.freepik.com/free-vector/hand-drawn-flat-design-people-waving-illustration_21452141.htm#query=hello&position=2&from_view=search&track=sph"
        />
      </section>
      <section
        class="flex flex-wrap justify-center items-center gap-20 lg:flex-nowrap"
      >
        <nuxt-img
          v-if="showInput.car || showInput.bike || showInput.both"
          :src="displayImgByShowInput"
          alt="vector human service"
          class="w-full max-[400px] lg:max-w-xl h-auto max-h-[500px] object-cover object-center"
          :placeholder="[100, 50, 10]"
          loading="lazy"
          :title="displayTitleImgByShowInput"
        />
        <form-input-rent-layout
          v-if="showInput.car || showInput.bike || showInput.both"
          :title="displayTitleFormInput"
          :edited-transaction="editedTransaction"
          :is-form-valid="isFormValid"
          :is-start-date-touched="isStartDateTouched"
          :is-start-date-valid="isStartDateValid"
          :is-payment-touched="isPaymentTouched"
          :is-payment-valid="isPaymentValid"
          :is-rental-duration-touched="isRentalDurationTouched"
          :is-rental-duration-valid="isRentalDurationValid"
          @save-data="saveData"
          @handle-back-to-choice-rent-vehicle="handleBackToChoiceRentVehicle"
          @validate-start-date="validateStartDate"
          @validate-payment="validatePayment"
          @validate-rental-duration="validateRentalDuration"
        >
          <form-input-rent-car
            v-if="showInput.car || showInput.both"
            :edited-transaction="editedTransaction"
            :cars="cars"
            :is-total-vehicle-valid="isTotalVehicleValid"
            :is-vehicle-id-valid="isVehicleIdValid"
            :is-car-id-touched="isCarIdTouched"
            :is-total-car-touched="isTotalCarTouched"
            @validate-total-car="validateTotalCar"
            @validate-car-id="validateCarId"
          />
          <form-input-rent-bike
            v-if="showInput.bike || showInput.both"
            :edited-transaction="editedTransaction"
            :bikes="bikes"
            :is-total-vehicle-valid="isTotalVehicleValid"
            :is-vehicle-id-valid="isVehicleIdValid"
            :is-bike-id-touched="isBikeIdTouched"
            :is-total-bike-touched="isTotalBikeTouched"
            @validate-total-bike="validateTotalBike"
            @validate-bike-id="validateBikeId"
          />
        </form-input-rent-layout>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import FormInputRentBike from '~/components/Rent/FormInputRentBike.vue'
import FormInputRentCar from '~/components/Rent/FormInputRentCar.vue'
import FormInputRentLayout from '~/components/Rent/FormInputRentLayout.vue'

export default {
  name: 'Rent',
  components: { FormInputRentCar, FormInputRentBike, FormInputRentLayout },
  middleware: ['auth'],
  data() {
    return {
      editedTransaction: {
        startDate: '',
        carId: '',
        bikeId: '',
        payment: '',
        rentalDuration: '',
        totalCar: '',
        totalBike: '',
      },
      showInput: {
        car: false,
        bike: false,
        both: false,
      },
      isStartDateTouched: false,
      isPaymentTouched: false,
      isRentalDurationTouched: false,
      isTotalCarTouched: false,
      isTotalBikeTouched: false,
      isCarIdTouched: false,
      isBikeIdTouched: false,
      isStartDateValid: false,
      isPaymentValid: false,
      isRentalDurationValid: false,
      isTotalVehicleValid: false,
      isVehicleIdValid: false,
    }
  },
  head() {
    return {
      title: 'Rent - RentHere',
    }
  },
  computed: {
    ...mapGetters({
      cars: 'vehicles/getCars',
      bikes: 'vehicles/getBikes',
    }),
    displayNameByLogin() {
      return this.$auth.user.name
    },
    displayTitleFormInput() {
      if (this.showInput.car) {
        return 'Form Input Rent Car'
      } else if (this.showInput.bike) {
        return 'Form Input Rent Bike'
      } else {
        return 'Form Input Rent Car & Bike'
      }
    },
    displayImgByShowInput() {
      if (this.showInput.car) {
        return '/images/rent/input.svg'
      } else if (this.showInput.bike) {
        return '/images/rent/input1.svg'
      } else {
        return '/images/rent/input2.svg'
      }
    },
    displayTitleImgByShowInput() {
      if (this.showInput.car) {
        return 'https://storyset.com/people (People illustrations by Storyset)'
      } else if (this.showInput.bike) {
        return 'https://storyset.com/online (Online illustrations by Storyset)'
      } else {
        return 'https://storyset.com/online (Online illustrations by Storyset)'
      }
    },
    isFormValid() {
      return (
        this.isStartDateValid &&
        this.isPaymentValid &&
        this.isRentalDurationValid &&
        this.isTotalVehicleValid &&
        this.isVehicleIdValid
      )
    },
  },
  mounted() {
    this.$store.dispatch('vehicles/fetchBikes')
    this.$store.dispatch('vehicles/fetchCars')
  },
  methods: {
    fetchTransactions() {
      this.$store.dispatch('transactions/fetchTransactionLength')
    },
    async saveData() {
      try {
        const response = await this.$axios.post(
          '/transactions',
          {
            carId: this.editedTransaction.carId
              ? this.editedTransaction.carId
              : null,
            bikeId: this.editedTransaction.bikeId
              ? this.editedTransaction.bikeId
              : null,
            startDate: this.editedTransaction.startDate,
            payment: this.editedTransaction.payment,
            rentalDuration: this.editedTransaction.rentalDuration,
            totalCar: this.editedTransaction.totalCar
              ? this.editedTransaction.totalCar
              : null,
            totalBike: this.editedTransaction.totalBike
              ? this.editedTransaction.totalBike
              : null,
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
          this.$router.push('/cart')
          this.fetchTransactions()
          setTimeout(() => {
            this.$store.commit('toast/closeToast')
          }, 3000)
        }
      } catch (error) {
        console.error(error)
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
    handleBackToChoiceRentVehicle() {
      this.showInput = {
        car: false,
        bike: false,
        both: false,
      }
    },
    handleReset() {
      this.editedTransaction = {
        startDate: '',
        carId: '',
        bikeId: '',
        payment: '',
        rentalDuration: '',
        totalCar: '',
        totalBike: '',
      }
    },
    toggleInput(type) {
      const showInput = {
        car: false,
        bike: false,
        both: false,
      }
      showInput[type] = true
      this.showInput = showInput
      this.handleReset()
    },
    validateStartDate() {
      this.isStartDateTouched = true
      this.isStartDateValid = this.editedTransaction.startDate !== ''
    },
    validatePayment() {
      this.isPaymentTouched = true
      this.isPaymentValid = this.editedTransaction.payment !== ''
    },
    validateRentalDuration() {
      this.isRentalDurationTouched = true
      this.isRentalDurationValid = this.editedTransaction.rentalDuration !== ''
    },
    validateTotalCar() {
      this.isTotalCarTouched = true
      this.isTotalBikeTouched = false
      this.isTotalVehicleValid =
        this.editedTransaction.totalCar !== '' ||
        this.editedTransaction.totalBike !== ''
    },
    validateTotalBike() {
      this.isTotalCarTouched = false
      this.isTotalBikeTouched = true
      this.isTotalVehicleValid =
        this.editedTransaction.totalCar !== '' ||
        this.editedTransaction.totalBike !== ''
    },
    validateCarId() {
      this.isCarIdTouched = true
      this.isBikeIdTouched = false
      this.isVehicleIdValid =
        this.editedTransaction.carId !== '' ||
        this.editedTransaction.bikeId !== ''
    },
    validateBikeId() {
      this.isCarIdTouched = false
      this.isBikeIdTouched = true
      this.isVehicleIdValid =
        this.editedTransaction.carId !== '' ||
        this.editedTransaction.bikeId !== ''
    },
  },
}
</script>

<style scoped></style>
