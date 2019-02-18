<template>
  <div id="results">
    <button
      v-if="locationPermissions === 'prompt'"
      @click.prevent="getBathroomsFromUserLocation"
    >Enable my Location</button>
    <loading v-if="this.loading"></loading>
    <div
      v-else
      v-for="location in resultsInformation.data"
      :key="location.id"
      class="location-container"
    >
      <div class="location-container--info">
        <h2>{{ location.name }}</h2>
        <p>{{ location.street }} {{ location.city }}, {{ location.state }}</p>
      </div>
      <div v-if="location.dist" class="location-container--distance">
        <p>Distance</p>
        <p>{{ (location.dist.calculated / 1609.344).toFixed(1) }} miles</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      locationPermissions: '',
    }
  },
  props: {},
  methods: {
    ...mapActions({
      setLocationInformation: 'setLocationInformation',
      setResults: 'setResults',
      setMessage: 'setMessage',
      setLoading: 'setLoading',
    }),
    checkPermissions() {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        let permissions = result.state

        if (permissions === 'granted') {
          this.getBathroomsFromUserLocation()
        }
        if (permissions === 'prompt') {
          this.locationPermissions = 'prompt'
          this.setMessage(
            `Please enable location services to find bathrooms near you!`
          )
        }
        if (permissions === 'denied') {
          this.setMessage(
            `It looks like you've blocked access to your location, so we can't automatically find bathrooms near you. Feel free to use the search bar above to find a safe space!`
          )
        }
      })
    },
    async getBathroomsFromUserLocation() {
      this.setLoading(true)
      this.locationPermissions = ''
      this.setMessage('')

      await navigator.geolocation.getCurrentPosition(
        location => {
          axios
            .get(
              `https://gentle-lake-28954.herokuapp.com/api/locations/geography?lat=${
                location.coords.latitude
              }&lng=${location.coords.longitude}`
            )
            .then(results => {
              this.setResults(results)
              this.setLoading(false)
            })
        },
        err => {
          this.setLoading(false)
          this.setMessage(
            `Sorry something went wrong. Try entering a search in the search bar. The error was: ${err.message.toLowerCase()}.`
          )
        },
        { timeout: 10000 }
      )
    },
  },
  computed: {
    ...mapGetters(['resultsInformation', 'loading']),
  },
  created() {
    this.$eventBus.$on('triggerSearch', () => {
      this.results = []
      this.loading = true
    })
    this.$eventBus.$on('searchSubmitted', bathroomLocationData => {
      this.loading = false
      this.results = bathroomLocationData.data
    })
    this.$eventBus.$on('searchError', () => {
      this.loading = false
      this.results = []
    })
  },
  mounted() {
    this.checkPermissions()
    this.$eventBus.$on('Reset Page', () => {
      this.getBathroomsFromUserLocation()
    })
  },
}
</script>


<style scoped lang="scss">
@import 'main.scss';

#results {
  width: 80%;
  margin: 0 auto;
}

hr {
  border: 1px dashed $orange;
}

.location-container {
  display: flex;
  border-bottom: 1px dashed $orange;

  &--distance {
    align-self: flex-end;
    margin-left: auto;
  }
}

button {
  border-radius: 25px;
  font-size: 20px;
  padding: 10px 20px;
  background-color: $orange;
  color: white;
  border: 1px solid $orange;
  display: flex;
  margin: 25px auto;
}

button:focus {
  outline: none;
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
}

button:hover {
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
  cursor: pointer;
}

button:active {
  background-color: white;
  color: $orange;
}

@media screen and (min-width: $large) {
  #results {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
