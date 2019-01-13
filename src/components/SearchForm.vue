<template>
  <form id="search-form" @submit.prevent="handleSearch">
    <label for="userInput">Enter your search for an affirming space</label>
    <input
      type="text"
      name="userInput"
      ref="input"
      v-model="searchTerm"
      placeholder="Durham, NC 27712"
    >
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
      const url = `https://gentle-lake-28954.herokuapp.com/api/locations/search?searchTerm=${
        this.searchValue.name
      }`
      const bathroomLocationData = await axios.get(url)
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

#search-form {
  position: relative;
  margin: 3% 8% 2% 0;
  text-align: center;
}

input {
  font-size: 20px;
  color: $font-color;
  padding: 10px 20px;
  width: 600px;
  border-radius: 25px 0 0 25px;
  border: 1px solid $orange;
}

input:focus {
  outline: none;
}

/* Label */
label {
  font-size: 14px;
  color: $font-color;
  position: absolute;
  top: -20px;
  padding-left: 25px;
}

/* Button */

button {
  font-size: 20px;
  position: absolute;
  border-radius: 0 25px 25px 0;
  padding: 10px 20px;
  background-color: $orange;
  color: white;
  border: 1px solid $orange;
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
}

button:active {
  background-color: white;
  color: $orange;
}

/* Media Queries */
@media only screen and (max-width: $large) {
  input {
    width: 500px;
  }
}

@media only screen and (max-width: $medium) {
  input {
    width: 400px;
  }
}

@media only screen and (max-width: $small) {
  #search-form {
    margin-right: 30%;
  }
  input {
    width: 200px;
  }
  label {
    font-size: 12px;
  }
}
</style>
