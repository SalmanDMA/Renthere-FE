export const state = () => ({
  message: '',
  show: false,
  backgroundColor: '',
})

export const mutations = {
  setToast(state, { message, show, backgroundColor }) {
    state.message = message;
    state.show = show;
    state.backgroundColor = backgroundColor;
  },
  closeToast(state) {
    state.message = '';
    state.show = false;
    state.backgroundColor = '';
  }
}

