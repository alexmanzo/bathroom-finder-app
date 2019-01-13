<template>
  <div id="results">
    <h1 v-if="results.length === 0">Loading...</h1>
    <div v-else v-for="location in results" :key="location.id" class="location-container">
      <h2>{{ location.name }}</h2>
      <p>{{ location.street }} {{ location.city }}, {{ location.state }}</p>
      <div class="location-container--distance"> 
        <p>Distance</p>
        <p> {{ (location.dist.calculated / 1098).toFixed(1) }} miles</p>
      </div>
      <hr>
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
            `https://gentle-lake-28954.herokuapp.com/api/locations/geography?lat=${
              location.coords.latitude
            }&lng=${location.coords.longitude}`
          )
          .then(results => {
            this.results = results.data
          })
      })
    },
  },
  created() {
    this.$root.$on('searchSubmitted', bathroomLocationData => {
      this.results = bathroomLocationData.data
    })
  },
  mounted() {
    this.getBathroomsFromUserLocation()
  },
}
</script>


<style scoped lang="scss">
@import 'main.scss';

#results {
  width: 70%;
  margin: 0 auto;
}

hr {
  border: 1px dashed $orange;
}
</style>
