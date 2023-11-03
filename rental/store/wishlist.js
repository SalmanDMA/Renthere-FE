export const state = () => ({
  lengthWishlist: 0,
  wishlists: [],
})

export const mutations = {
  setLengthWishlist(state, length) {
    state.lengthWishlist = length;
  },
  setWishlists(state, wishlists) {
    state.wishlists = wishlists;
  }
}

export const actions = {
  async fetchWishlists({ commit }) {
    try {
      const response = await this.$axios.get('/wishlists', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      });
      const length = response.data.data.length;
      const wishlists = response.data.data;
      commit('setWishlists', wishlists);
      commit('setLengthWishlist', length);
    } catch (error) {
      console.error(error);
    }
  },
};

export const getters = {
  getLengthWishlist(state) {
    return state.lengthWishlist;
  },
  getWishlists(state) {
    return state.wishlists;
  }
}
