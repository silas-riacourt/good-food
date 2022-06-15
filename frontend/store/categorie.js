export const state = () => ({
  counter: 0,
  loading: false,
  categories: [
    {
      id: 10,
      name: 'Chips Loan Fresh',
      description: 'Cap-Vert Multi-channelled Armenian',
      image: 'protocol archive paradigm',
      products: [],
      restaurants: null
    },
    {
      id: 2,
      name: 'Account mindshare',
      description: 'a Automotive Berkshire',
      image: 'web-enabled Cambridgeshire haptic',
      products: [],
      restaurants: null
    },
    {
      id: 5,
      name: 'b',
      description: 'Metal Allemagne override',
      image: 'Stagiaire Plastic',
      products: [],
      restaurants: null
    },
    {
      id: 8,
      name: 'Home Tuna Pays',
      description: 'visualize backing a',
      image: 'complexity Account a',
      products: [],
      restaurants: null
    },
    {
      id: 6,
      name: 'overriding Picardie orchid',
      description: 'Soudan Frozen Bedfordshire',
      image: 'Awesome',
      products: [],
      restaurants: null
    },
    {
      id: 4,
      name: 'Practical Champagne-Ardenne',
      description: 'cyan Computers Kids',
      image: 'area composite AI',
      products: [],
      restaurants: null
    },
    {
      id: 1,
      name: 'Jordanian Tilsitt',
      description: 'optical Cotton',
      image: 'payment Serbian',
      products: [],
      restaurants: null
    },
    {
      id: 3,
      name: 'Cambridgeshire',
      description: 'ROI Lepic',
      image: 'Ingenieur transparent Metal',
      products: [],
      restaurants: null
    },
    {
      id: 9,
      name: 'sticky Borders reciprocal',
      description: 'wireless',
      image: 'b Bourgogne Midi-Pyrénées',
      products: [],
      restaurants: null
    },
    {
      id: 7,
      name: 'Loire navigate',
      description: 'Buckinghamshire',
      image: 'Business-focused Concrete Consultant',
      products: [],
      restaurants: null
    }
  ]
})

export const getters = {
  getAll (state) {
    return state.categories
  },
  isLoading (state) {
    return state.loading
  }
}

export const mutations = {
  setCategories (state, { categories }) {
    state.categories = categories
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export const actions = {

  async getCategories ({ commit }) {
    commit('setLoading', true)
    try {
      const categories = await this.$axios.$get('/api/categories')
      commit('setCategories', { categories })
      commit('setLoading', false)
    } catch (error) {
      commit('setLoading', false)
    }
  }

}
