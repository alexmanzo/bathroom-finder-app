<template>
  <div id="results">
    <button
      v-if="locationPermissions === 'prompt'"
      @click.prevent="getUserLocation"
    >Enable my Location</button>
    <loading v-if="this.loading"></loading>
    <div
      v-else
      v-for="location in resultsInformation"
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
      setUserLocation: 'setUserLocation',
    }),
    checkPermissions() {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        let permissions = result.state
        if (permissions === 'granted') {
          this.getUserLocation()
        } else if (permissions === 'prompt') {
          this.locationPermissions = 'prompt'
          this.setMessage(
            `Please enable location services to find bathrooms near you!`
          )
        } else if (permissions === 'denied') {
          this.setMessage(
            `It looks like you've blocked access to your location, so we can't automatically find bathrooms near you. Feel free to use the search bar above to find a safe space!`
          )
        } else {
          this.getBathroomsFromUserLocation()
        }
      })
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition(
        location => {
          this.setUserLocation({
            lng: location.coords.longitude,
            lat: location.coords.latitude,
          })
          this.getBathroomsFromUserLocation()
        },
        error => {
          this.setLoading(false)
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.setMessage('User denied the request for Geolocation. Please try searching for a location above.')
              break
            case error.POSITION_UNAVAILABLE:
              this.setMessage('Location information is unavailable. Please try searching for a location above.')
              break
            case error.TIMEOUT:
              this.setMessage('The request to get user location timed out.Please try searching for a location above.')
              break
            case error.UNKNOWN_ERROR:
              this.setMessage('An unknown error occurred trying to get your location. Please try searching for a location above.')
              break
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    },
    async getBathroomsFromUserLocation() {
      this.setLoading(true)
      this.locationPermissions = ''
      this.setMessage('')

      let { data } = await axios
        .get(
          `https://gentle-lake-28954.herokuapp.com/api/locations/geography?lat=${
            this.userLocation.lat
          }&lng=${this.userLocation.lng}`
        )
        .catch(err => {
          this.setMessage(`Sorry, something went wrong. The error was: ${err}`)
        })
      this.setResults(data)
      this.setLoading(false)
    },
  },
  computed: {
    ...mapGetters(['resultsInformation', 'loading', 'userLocation']),
  },
  mounted() {
    this.getUserLocation()
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'setLocationInformation' &&
        state.results.length === 0
      ) {
        this.checkPermissions()
      }
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

@media screen and (max-width: $small) {
  #results {
    padding-top: 75px;
  }
}
</style>
