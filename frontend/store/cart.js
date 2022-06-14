export const state = () => ({

  loading: false,
  products: [
    {
      name: 'Burger 1',
      price: 4.95,
      image: 'burger_1',
      description: 'description',
      quantity: 1
    },
    {
      name: 'Burger 2',
      price: 3,
      image: 'burger_2',
      description: 'description',
      quantity: 2
    }
  ]
})

export const getters = {
  getCart (state) {
    return state.products
  },
  isLoading (state) {
    return state.loading
  },
  totalPrice (state) {
    let sum = 0

    state.products.forEach((product) => {
      sum += (product.price * product.quantity)
    })
    return sum
  }
}

export const mutations = {
  setRestaurants (state, { restaurants }) {
    state.restaurants = restaurants
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export const actions = {

}
