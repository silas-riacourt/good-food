export const state = () => ({
  counter: 0,
  loading: false,
  categorie: {}
})

export const getters = {
  getCategorie (state) {
    return state.categorie
  },
  isLoading (state) {
    return state.loading
  }
}

export const mutations = {
  setCategorie (state, { categorie }) {
    state.categorie = categorie
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

export const actions = {

  async getCategorieById ({ commit }, id) {
    commit('setLoading', true)
    try {
      const categorie = await this.$axios.$get('/api/categories/' + id)
      commit('setCategorie', { categorie })
      commit('setLoading', false)
      commit('restaurant/setLoading', false, { root: true })
    } catch (error) {
      commit('setLoading', false)
    }
  }

}
