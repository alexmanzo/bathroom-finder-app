<template>
  <div id="results">
    <loading v-if="this.loading"></loading>
    <div v-else v-for="location in resultsInformation.data" :key="location.id" class="location-container">
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
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
    }
  },
  props: {},
  methods: {
    ...mapActions({
      setLocationInformation: 'setLocationInformation',
      setResults: 'setResults',
    }),
    async getBathroomsFromUserLocation() {
      this.loading = true
      await navigator.geolocation.getCurrentPosition(location => {
        return axios
          .get(
            `https://gentle-lake-28954.herokuapp.com/api/locations/geography?lat=${
              location.coords.latitude
            }&lng=${location.coords.longitude}`
          )
          .then(results => {
            this.setResults(results)
            this.loading = false
          })
      })
    },
  },
  computed: {
    ...mapGetters(['resultsInformation']),
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
    this.getBathroomsFromUserLocation()
    this.$eventBus.$on('Reset Page', () => {
      this.results = []
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

@media screen and (min-width: $large) {
  #results {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
