export const state = () => ({
  counter: 0,
  loading: false,
  products: [
    {
      id: 10,
      name: 'Plastic Cambridgeshire',
      description: 'Automotive',
      price: 53352,
      image: 'Zimbabwe Games Balboa',
      ingredients: [],
      categories: null
    },
    {
      id: 2,
      name: 'Handmade',
      description: 'b Pound withdrawal',
      price: 88209,
      image: 'Unbranded Soap',
      ingredients: [],
      categories: null
    },
    {
      id: 5,
      name: 'Rubber',
      description: 'aggregate a c',
      price: 35518,
      image: 'a Sports',
      ingredients: [],
      categories: null
    },
    {
      id: 8,
      name: 'multi-byte Solférino project',
      description: 'Computer Alsace mobile',
      price: 44109,
      image: 'User-friendly c navigate',
      ingredients: [],
      categories: null
    },
    {
      id: 6,
      name: 'Limousin yellow Canada',
      description: 'Salvador',
      price: 66238,
      image: 'Rubber Chips',
      ingredients: [],
      categories: null
    },
    {
      id: 4,
      name: 'Malagasy intranet',
      description: 'neutral',
      price: 4184,
      image: 'Business-focused',
      ingredients: [],
      categories: null
    },
    {
      id: 1,
      name: 'Steel',
      description: 'Consultant',
      price: 57374,
      image: 'monetize Producteur wireless',
      ingredients: [],
      categories: null
    },
    {
      id: 3,
      name: 'networks Metical',
      description: 'throughput',
      price: 46442,
      image: 'transmitting Niger Bedfordshire',
      ingredients: [],
      categories: null
    },
    {
      id: 9,
      name: 'Francs-Bourgeois Automotive',
      description: 'Checking system-worthy',
      price: 9545,
      image: 'a',
      ingredients: [],
      categories: null
    },
    {
      id: 7,
      name: 'Keyboard',
      description: "d'Argenteuil black pixel",
      price: 28408,
      image: 'optical Cheese',
      ingredients: [],
      categories: null
    }
  ]
})

export const getters = {
  getAll (state) {
    return state.products
  },
  isLoading (state) {
    return state.loading
  }
}

export const mutations = {
  setProducts (state, { products }) {
    state.products = products
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export const actions = {

  async getProductByCategorieId ({ commit }) {
    commit('setLoading', true)
    try {
      const products = await this.$axios.$get('/api/product /')
      commit('setProducts', { products })
      commit('setLoading', false)
    } catch (error) {
      commit('setLoading', false)
    }
  }

}
