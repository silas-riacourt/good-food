export const state = () => ({

  loading: false,
  products: [

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
  setLoading (state, loading) {
    state.loading = loading
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
    const index = state.products.indexOf(product)
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
