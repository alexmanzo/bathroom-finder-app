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
      autocompleteSearchBox.setFields(['place_id', 'vicinity', 'name'])
      autocompleteSearchBox.addListener('place_changed', () => {
        let place = autocompleteSearchBox.getPlace()
        this.searchValue = place
      })
    },
    async handleSearch() {
      console.log(this.searchValue.name)
      const bathroomLocationData = await axios.get(
        `https://gentle-lake-28954.herokuapp.com/api/locations/search?searchTerm=${
          this.searchValue.name
        }`
      )
      this.$root.$emit('searchSubmitted', bathroomLocationData)
      this.searchTerm = ''
    },
  },
  mounted() {
    this.generateAutocomplete()
  },
  updated() {
    this.generateAutocomplete()
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';
</style>
