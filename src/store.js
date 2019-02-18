import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  placeData: {},
  message: '',
  results: [],
  loading: false,
  userLocation: {
    lng: null,
    lat: null,
  },
}

const actions = {
  setLocationInformation(context, place) {
    context.commit('setLocationInformation', place)
  },
  setResults(context, results) {
    context.commit('setResults', results)
    context.commit('setLocationInformation', {})
  },
  setLoading(context, boolean) {
    context.commit('setLoading', boolean)
  },
  setMessage(context, message) {
    context.commit('setMessage', message)
  },
  resetPage(context) {
    context.commit('setMessage', '')
    context.commit('setResults', [])
    context.commit('setLocationInformation', {})
    context.commit('setLoading', true)
  },
  setUserLocation(context, coords) {
    context.commit('setUserLocation', coords)
  },
}

const mutations = {
  setLocationInformation: (state, place) => (state.placeData = place),
  setMessage: (state, message) => (state.message = message),
  setResults: (state, results) => (state.results = results),
  setLoading: (state, boolean) => (state.loading = boolean),
  setUserLocation: (state, coords) => (state.userLocation = coords),
}

const getters = {
  locationInformation: state => state.placeData,
  resultsInformation: state => state.results,
  message: state => state.message,
  loading: state => state.loading,
  userLocation: state => state.userLocation,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
