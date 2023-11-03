export const state = () => ({
  testimonials: [],
  // validator
  isUserIdValid: false,
  isVehicleIdValid: false,
  isRatingValid: false,
  isTestimonialValid: false
})

export const mutations = {
  setTestimonials(state, testimonials) {
    state.testimonials = testimonials
  },
  updateValidation(state, { inputName, isValid }) {
    state[`is${inputName}Valid`] = isValid;
  },
  setFalseValidation(state) {
    state.isUserIdValid = false
    state.isVehicleIdValid = false
    state.isRatingValid = false
    state.isTestimonialValid = false
  }
}

export const actions = {
  async fetchTestimonials({ commit }) {
    try {
      const response = await this.$axios.get('/testimonials', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      })
      commit('setTestimonials', response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  getTestimonials(state) {
    return state.testimonials
  },
  isFormTestimonialValid(state) {
    return (
      state.isUserIdValid &&
      state.isVehicleIdValid &&
      state.isRatingValid &&
      state.isTestimonialValid
    )
  }
}
