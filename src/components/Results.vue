<template>
  <div id="results">
    <h1 v-if="results.length === 0">Loading...</h1>
    <div v-else v-for="location in results" :key="location.id">
      <h2>{{ location.name }}</h2>
      <p>{{ location.street }} {{ location.city }}, {{ location.state }}</p>
      <p>{{ location.type }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      results: [],
    }
  },
  props: {},
  methods: {
    async getBathroomsFromUserLocation() {
      await navigator.geolocation.getCurrentPosition(location => {
        return axios
          .get(
            `${process.env.VUE_APP_API_BASE_URL}/locations/geography?lat=${
              location.coords.latitude
            }&lng=${location.coords.longitude}`
          )
          .then(results => {
            this.results = results.data
          })
      })
    },
  },
  mounted() {
    this.getBathroomsFromUserLocation()
    this.$root.$on('searchSubmitted', bathroomLocationData => {
      this.results = bathroomLocationData.data
    })
  },
}
</script>


<style scoped lang="scss">
@import 'main.scss';
</style>
