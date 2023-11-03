export const state = () => ({
  users: [],
  user: {},
  // validator
  isNameValid: false,
  isEmailValid: false,
  isPasswordValid: false,
  isAddressValid: false,
  isPhoneNumberValid: false,
  isProfilePictureValid: false,
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setUser(state, user) {
    state.user = user
  },
  updateValidation(state, { inputName, isValid }) {
    state[`is${inputName}Valid`] = isValid;
  },
  setFalseValidation(state) {
    state.isNameValid = false
    state.isEmailValid = false
    state.isPasswordValid = false
    state.isAddressValid = false
    state.isPhoneNumberValid = false
    state.isProfilePictureValid = false
  },
  setTrueValidation(state) {
    state.isNameValid = true
    state.isEmailValid = true
    state.isPasswordValid = true
    state.isAddressValid = true
    state.isPhoneNumberValid = true
    state.isProfilePictureValid = true
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await this.$axios.get('/users', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      })
      commit('setUsers', response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchMe({ commit }) {
    try {
      const response = await this.$axios.get(`/me`, {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      })
      commit('setUser', response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  getUsers(state) {
    return state.users
  },
  getUser(state) {
    return state.user
  },
  isFormUserValid(state) {
    return (
      state.isNameValid &&
      state.isEmailValid &&
      state.isPasswordValid &&
      state.isAddressValid &&
      state.isPhoneNumberValid &&
      state.isProfilePictureValid
    )
  }
}
