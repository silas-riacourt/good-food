export const state = () => ({

  loading: false,
  products: [],
  restaurant: {
    id: 1001,
    name: 'Goodfood BREST',
    locationName: '19 rue de paris',
    description: 'Goodfood BREST',
    schedule: 'Ouvert du lundi au samedi de 11h à 14h et de 18h à 22h',
    open: false
  }
})

export const getters = {
  getCart (state) {
    return state.products
  },
  getRestaurant (state) {
    return state.restaurant
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
  setLoading (state, loading) {
    state.loading = loading
  },
  resetCart (state) {
    state.product = []
  },
  setRestaurant (state, restaurant) {
    state.restaurant = restaurant.restaurant
  },
  updateQuantityAddOne (state, { product }) {
    const index = state.products.indexOf(product)
    state.products[index].quantity++
  },
  updateQuantityRemoveOne (state, { product }) {
    const index = state.products.indexOf(product)
    if (state.products[index].quantity === 1) {
      state.products.splice(index, 1)
    } else {
      state.products[index].quantity--
    }
  },
  addProductToCart (state, { product, quantity }) {
    const newProduct = JSON.parse(JSON.stringify(product))

    const index = state.products.findIndex(item => item.name === product.name)
    console.log(index)

    if (index !== -1) {
      state.products[index].quantity++
    } else {
      newProduct.quantity = quantity
      state.products.push(newProduct)
    }
  }
}

export const actions = {

}
