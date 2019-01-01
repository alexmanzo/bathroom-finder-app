<template>
  <div id="results">
    <h1>Results</h1>
    <div v-for="location in results" :key="location.id">
        <p>{{ location.location }}</p>
        <p>{{ location.address }}</p>
        <p>{{ location.type }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const username = process.env.VUE_APP_GEONAME_USERNAME
const baseApiUrl = 'http://localhost:3000/api'
export default {
  components: {},
  data() {
    return {
      zipcode: 27701,
      results: [],
    }
  },
  props: {},
  methods: {
    async getZipCodesFromUserLocation(location) {
      const lat = location.coords.latitude
      const long = location.coords.longitude
      let zipCodeData = await axios.get(
        `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${lat}&lng=${long}&username=${username}`
      )
      this.zipcode = zipCodeData.data.postalCodes[0].postalCode
      this.getBathroomLocations(zipCodeData.data.postalCodes[0].postalCode)
    },
    async getBathroomLocations(zip) {
      let resultData = await axios.get(`${baseApiUrl}/locations/zip/${zip}`)
      this.results = resultData.data
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(location => {
      this.getZipCodesFromUserLocation(location)
    })
  },
}
</script>


<style scoped lang="scss">
@import 'main.scss';
</style>
