<template>
  <form id="search-form" @submit.prevent="handleSearch">
    <label for="userInput">Enter your search term</label>
    <input type="text" name="userInput" ref="input" v-model="searchTerm">
    <button>Search</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchTerm: '',
      searchValue: {},
    }
  },
  methods: {
    generateAutocomplete() {
      const autocompleteSearchBox = new google.maps.places.Autocomplete(
        this.$refs.input
      )
      this.input = autocompleteSearchBox
      autocompleteSearchBox.setFields(['formatted_address', 'name', 'place_id'])
      autocompleteSearchBox.addListener('place_changed', () => {
        let place = autocompleteSearchBox.getPlace()
        this.searchValue = place
      })
    },
    async handleSearch() {
      const fullAddress = this.searchValue.formatted_address
      let street, city, statezip
      ;[street, city, statezip] = fullAddress.split(/,\s*/)
      let zip = statezip.slice(3)
      console.log(zip)
      const query = {
        name: this.searchValue.name,
        zip: this.searchValue.formatted_address,
      }
      //let bathroomLocationData = await axios.get(`${baseApiUrl}/locations/`)
    },
  },
  mounted() {
    this.generateAutocomplete()
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';
</style>
