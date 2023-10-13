export const state = () => ({
  users: [],
  user: {}
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setUser(state, user) {
    state.user = user
  },
}
