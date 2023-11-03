export const state = () => ({
  lengthTransaction: 0,
})

export const mutations = {
  setLengthTransaction(state, length) {
    state.lengthTransaction = length;
  },
}

export const actions = {
  async fetchTransactionLength({ commit }) {
    try {
      const response = await this.$axios.get('/transactions', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      });

      const filteredTransactions = response.data.data.filter(transaction => transaction.status !== 'completed');
      const length = filteredTransactions.length;

      commit('setLengthTransaction', length);
    } catch (error) {
      console.error(error);
    }
  },

};

export const getters = {
  getLengthTransaction(state) {
    return state.lengthTransaction;
  },
}
