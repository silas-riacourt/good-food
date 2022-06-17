export const state = () => ({
  counter: 0,
  loading: true,
  restaurants: [
    {
      name: 'GoodFood BREST',
      locationName: 'BREST 29910 10 route test',
      open: false,
      locationLat: 48.390392,
      locationLng: -4.486076
    },
    {
      name: 'GoodFood PARIS',
      locationName: 'PARIS Avenue des chams ',
      open: false,
      locationCoords: [48.856613, 2.352222],
      locationLat: 48.390392,
      locationLng: -4.486076
    },
    {
      name: 'GoodFood RENNES',
      locationName: 'RENNES location address',
      open: false,
      locationCoords: [48.117268, -1.677793],
      locationLat: 48.390392,
      locationLng: -4.486076
    },
    {
      name: 'GoodFood TOULOUSE',
      locationName: 'TOULOUSE location address',
      open: false,
      locationCoords: [43.604652, 1.444209],
      locationLat: 48.390392,
      locationLng: -4.486076
    },
    {
      name: 'GoodFood GRENOBLE',
      locationName: 'adresse',
      open: false,
      locationCoords: [45.194260, 5.731670],
      locationLat: 48.390392,
      locationLng: -4.486076
    },
    {
      name: 'GoodFood BRUXELLES',
      locationName: 'adresse',
      open: false,
      locationCoords: [50.8465573, 4.351697],
      locationLat: 48.390392,
      locationLng: -4.486076
    },
    {
      name: 'GoodFood LUXEMBOURG',
      locationName: 'adresse',
      open: false,
      locationCoords: [49.8158683, 6.1296751],
      locationLat: 48.390392,
      locationLng: -4.486076
    }
  ],
  restaurant: {}
})

export const getters = {
  getAll (state) {
    return state.restaurants
  },
  getRestaurant (state) {
    return state.restaurant
  },
  isLoading (state) {
    return state.loading
  }
}

export const mutations = {
  setRestaurants (state, { restaurants }) {
    state.restaurants = restaurants
  },
  setRestaurant (state, { restaurant }) {
    state.restaurant = restaurant
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export const actions = {

  async getRestaurants ({ commit }) {
    commit('setLoading', true)
    try {
      const restaurants = await this.$axios.$get('/api/restaurants')
      commit('setRestaurants', { restaurants })
      commit('setLoading', false)
    } catch (error) {
      commit('setLoading', false)
    }
  },
  async getRestaurant (context, id) {
    context.commit('setLoading', true)
    try {
      const restaurant = await this.$axios.$get('/api/restaurants/' + id)
      context.commit('setRestaurant', { restaurant })
      context.dispatch('categorie/getCategorieById', restaurant.categories[0].id, { root: true })
      context.commit('cart/setRestaurant', { restaurant }, { root: true })
    } catch (error) {
      context.commit('setLoading', false)
    }
  }
}
