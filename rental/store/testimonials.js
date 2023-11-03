export const state = () => ({
  testimonials: [],
})

export const mutations = {
  setTestimonials(state, testimonials) {
    state.testimonials = testimonials
  },
}

export const actions = {
  async fetchTestimonials({ commit }) {
    try {
      const response = await this.$axios.get('/testimonials', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      });
      const testimonials = response.data.data;
      commit('setTestimonials', testimonials);
    } catch (error) {
      console.error(error);
    }
  },
}

export const getters = {
  getTestimonials(state) {
    return state.testimonials
  },
}
