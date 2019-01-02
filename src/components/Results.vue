<template>
  <div id="results">
    <h1 v-if="results.length === 0">Loading...</h1>
    <div v-else v-for="location in results" :key="location.id">
      <h2>{{ location.location }}</h2>
      <p>{{ location.address }}</p>
      <p>{{ location.type }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const geocoder = new google.maps.Geocoder()
const baseApiUrl = 'http://localhost:3000/api'
export default {
  components: {},
  data() {
    return {
      results: [],
    }
  },
  props: {},
  methods: {
    getZipFromUserLocation() {
      navigator.geolocation.getCurrentPosition(location => {
        const latLng = new google.maps.LatLng(
          location.coords.latitude,
          location.coords.longitude
        )

        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK') {
            const address = results[0].address_components
            const zipcode = address[address.length - 2].long_name
            this.zipcode = zipcode
            this.getBathroomLocations(zipcode)
          }
        })
      })
    },
    async getBathroomLocations(zip) {
      let resultData = await axios.get(`${baseApiUrl}/locations/zip/${zip}`)
      this.results = resultData.data
    },
  },
  created() {
    this.getZipFromUserLocation()
  },
}
</script>


<style scoped lang="scss">
@import 'main.scss';
</style>
