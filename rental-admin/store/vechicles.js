export const state = () => ({
  cars: [],
  bikes: []
})

export const mutations = {
  setCars(state, cars) {
    state.cars = cars
  },
  setBikes(state, bikes) {
    state.bikes = bikes
  }
}
