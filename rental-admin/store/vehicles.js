export const state = () => ({
  cars: [],
  bikes: [],
  // validator
  isNameValid: false,
  isBrandValid: false,
  isQuantityValid: false,
  isPriceValid: false,
  isDescriptionValid: false,
  isPictureValid: false,
})

export const mutations = {
  setCars(state, cars) {
    state.cars = cars
  },
  setBikes(state, bikes) {
    state.bikes = bikes
  },
  updateValidation(state, { inputName, isValid }) {
    state[`is${inputName}Valid`] = isValid;
  },
  toggleCarDescription(state, carId) {
    const car = state.cars.find((car) => car.id === carId);
    if (car) {
      car.expanded = !car.expanded;
    }
  },
  toggleBikeDescription(state, bikeId) {
    const bike = state.bikes.find((bike) => bike.id === bikeId);
    if (bike) {
      bike.expanded = !bike.expanded;
    }
  },
  setFalseValidation(state) {
    state.isNameValid = false
    state.isBrandValid = false
    state.isQuantityValid = false
    state.isPriceValid = false
    state.isDescriptionValid = false
    state.isPictureValid = false
  },
  setTrueValidation(state) {
    state.isNameValid = true
    state.isBrandValid = true
    state.isQuantityValid = true
    state.isPriceValid = true
    state.isDescriptionValid = true
    state.isPictureValid = true
  }
}

export const actions = {
  async fetchCars({ commit }) {
    try {
      const response = await this.$axios.get('/cars', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      })

      const newCars = response.data.data.map((car) => ({
        ...car,
        expanded: false,
      }))

      commit('setCars', newCars)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchBikes({ commit }) {
    try {
      const response = await this.$axios.get('/bikes', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      })

      const newBikes = response.data.data.map((bike) => ({
        ...bike,
        expanded: false,
      }))

      commit('setBikes', newBikes)
    } catch (error) {
      console.log(error)
    }
  },
  toggleCarDescription({ commit }, carId) {
    commit('toggleCarDescription', carId);
  },
  toggleBikeDescription({ commit }, bikeId) {
    commit('toggleBikeDescription', bikeId);
  },
}

export const getters = {
  getCars(state) {
    return state.cars
  },
  getBikes(state) {
    return state.bikes
  },
  isFormVehicleValid(state) {
    return (
      state.isNameValid &&
      state.isBrandValid &&
      state.isQuantityValid &&
      state.isPriceValid &&
      state.isDescriptionValid &&
      state.isPictureValid
    )
  }
}
