<template>
  <div id="results">
    <loading v-if="this.loading"></loading>
    <div v-else v-for="location in results" :key="location.id" class="location-container">
      <div class="location-container--info">
        <h2>{{ location.name }}</h2>
        <p>{{ location.street }} {{ location.city }}, {{ location.state }}</p>
      </div>
      <div v-if="location.dist" class="location-container--distance">
        <p>Distance</p>
        <p>{{ (location.dist.calculated / 1098).toFixed(1) }} miles</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading.vue'

export default {
  components: {
    loading: Loading,
  },
  data() {
    return {
      results: [],
      loading: false,
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
    this.$root.$on('searchError', () => {
      this.loading = false
      this.results = []
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
