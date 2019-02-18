import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  placeData: {},
  message: '',
  results: [],
}

const actions = {
  setLocationInformation(context, place) {
    context.commit('setLocationInformation', place)
  },
  setResults(context, results) {
    context.commit('setResults', results)
  },
  async getSearchResults(context) {
    if (state.placeData.name) {
      const url = `https://gentle-lake-28954.herokuapp.com/api/locations/search?searchTerm=${
        state.placeData.name
      }`
      try {
        const locationData = await axios({
          url,
          method: 'get',
        })
        if (locationData.data.length === 0) {
          throw 'no results found'
        }
        context.commit('setResults', locationData)
      } catch (err) {
        context.commit('setMessage', `Sorry, ${err}. Try another search.`)
      }
    } else {
      context.commit('setMessage', 'Please enter a search term.')
    }
  },
}

const mutations = {
  setLocationInformation: (state, place) => (state.placeData = place),
  setMessage: (state, message) => (state.message = message),
  setResults: (state, results) => (state.results = results),
  setLoading: state => (state.loading = !state.loading),
}

const getters = {
  locationInformation: state => state.placeData,
  resultsInformation: state => state.results,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
