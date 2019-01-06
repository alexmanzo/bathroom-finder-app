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
      autocompleteSearchBox.setFields(['place_id'])
      autocompleteSearchBox.addListener('place_changed', () => {
        let place = autocompleteSearchBox.getPlace()
        this.searchValue = place
      })
    },
    async handleSearch() {
      const bathroomLocationData = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/locations?googlePlaceId=${
          this.searchValue.place_id
        }`
      )
      console.log(this.searchValue.place_id)
      this.$root.$emit('searchSubmitted', bathroomLocationData)
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
