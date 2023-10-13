export const state = () => ({
  testimonials: [],
  transactions: []
})

export const mutations = {
  setTestimonials(state, testimonials) {
    state.testimonials = testimonials
  },
  setTransactions(state, transactions) {
    state.transactions = transactions
  }
}
