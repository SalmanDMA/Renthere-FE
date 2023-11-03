export const state = () => ({
  transactions: [],
  // validator
  isUserIdValid: false,
  isStartDateValid: false,
  isVehicleIdValid: false,
  isTotalVehicleValid: false,
  isPaymentValid: false,
  isStatusValid: false,
  isRentalDurationValid: false
})

export const mutations = {
  setTransactions(state, transactions) {
    state.transactions = transactions
  },
  updateValidation(state, { inputName, isValid }) {
    state[`is${inputName}Valid`] = isValid;
  },
  setFalseValidation(state) {
    state.isUserIdValid = false
    state.isStartDateValid = false
    state.isVehicleIdValid = false
    state.isTotalVehicleValid = false
    state.isPaymentValid = false
    state.isStatusValid = false
    state.isRentalDurationValid = false
  }
}

export const actions = {
  async fetchTransactions({ commit }) {
    try {
      const response = await this.$axios.get('/transactions/admin', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      })
      commit('setTransactions', response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  getTransactions(state) {
    return state.transactions
  },
  isFormTransactionValid(state) {
    return (
      state.isUserIdValid &&
      state.isStartDateValid &&
      state.isVehicleIdValid &&
      state.isTotalVehicleValid &&
      state.isPaymentValid &&
      state.isStatusValid &&
      state.isRentalDurationValid
    )
  }
}
