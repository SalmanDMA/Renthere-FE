export const state = () => ({
  cars: [],
  car: null,
  rekomendationsCars: [],
  bikes: [],
  bike: null,
  rekomendationsBikes: [],
  notFound: false
})

export const mutations = {
  setCars(state, cars) {
    state.cars = cars
  },
  setBikes(state, bikes) {
    state.bikes = bikes
  },
  setCar(state, car) {
    state.car = car
  },
  setRekomendationsCars(state, rekomendationsCars) {
    state.rekomendationsCars = rekomendationsCars
  },
  setBike(state, bike) {
    state.bike = bike
  },
  setRekomendationsBikes(state, rekomendationsBikes) {
    state.rekomendationsBikes = rekomendationsBikes
  },
  setNotFound(state, notFound) {
    state.notFound = notFound
  }
}

export const actions = {
  async fetchCars({ commit }) {
    try {
      const response = await this.$axios.get('/cars', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      });
      const cars = response.data.data;
      commit('setCars', cars);
    } catch (error) {
      console.error(error);
    }
  },

  async fetchRekomendasiCars({ commit, state }, params) {
    try {
      const response = await this.$axios.get('/cars', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      });
      const cars = response.data.data;
      const car = cars.find((car) => car.id === Number(params.id));

      if (!car) {
        commit('setNotFound', true);
        commit('setCar', null);
        commit('setRekomendationsCars', []);
        return;
      }

      commit('setNotFound', false);
      commit('setCar', car);

      const shuffledCars = cars.slice().sort(() => Math.random() - 0.5);

      const rekomendasiCars = shuffledCars.slice(0, 5);

      commit('setRekomendationsCars', rekomendasiCars);
    } catch (error) {
      console.error(error);
    }
  },


  async fetchBikes({ commit }) {
    try {
      const response = await this.$axios.get('/bikes', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      });
      const bikes = response.data.data;
      commit('setBikes', bikes);
    }
    catch (error) {
      console.error(error);
    }
  },

  async fetchRekomendasiBikes({ commit, state }, params) {
    try {
      const response = await this.$axios.get('/bikes', {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      });
      const bikes = response.data.data;
      const bike = bikes.find((bike) => bike.id === Number(params.id));

      if (!bike) {
        commit('setNotFound', true);
        commit('setBike', null);
        commit('setRekomendationsBikes', []);
        return;
      }

      commit('setNotFound', false);
      commit('setBike', bike);

      const shuffledBikes = bikes.slice().sort(() => Math.random() - 0.5);

      const rekomendasiBikes = shuffledBikes.slice(0, 5);

      commit('setRekomendationsBikes', rekomendasiBikes);
    } catch (error) {
      console.error(error);
    }
  },
}

export const getters = {
  getCars(state) {
    return state.cars;
  },
  getBikes(state) {
    return state.bikes;
  },
  getCar(state) {
    return state.car;
  },
  getRekomendationsCars(state) {
    return state.rekomendationsCars;
  },
  getBike(state) {
    return state.bike;
  },
  getRekomendationsBikes(state) {
    return state.rekomendationsBikes;
  },
  getNotFound(state) {
    return state.notFound;
  }
}
