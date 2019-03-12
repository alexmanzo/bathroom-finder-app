<template>
  <div>
    <form id="search-form" @submit.prevent="getSearchResults" page>
      <label for="userInput">Enter your search for an affirming space:</label>
      <autocomplete-input></autocomplete-input>
      <button>Search</button>
    </form>
    <p v-if="message !== ''">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import AutocompleteSearch from '@/components/AutocompleteSearch.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    'autocomplete-input': AutocompleteSearch,
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading',
      setResults: 'setResults',
      setMessage: 'setMessage',
    }),
    async getSearchResults(event) {
      this.setLoading(true)
      this.setMessage('')
      event.target.reset()
      if (this.locationInformation.name) {
        const url = `https://gentle-lake-28954.herokuapp.com/api/locations/search?searchTerm=${
          this.locationInformation.name
        }`
        try {
          const { data } = await axios({
            url,
            method: 'get',
          })

          if (data.length === 0) {
            throw 'no results found'
          }
          this.setResults(data)
          this.setLoading(false)
        } catch (err) {
          this.setMessage(
            `Sorry, ${err}. Try another search, or check below for locations we found near you.`
          )
          this.setLoading(false)
        }
      } else {
        this.setMessage(`Please enter a search term.`)
        this.setLoading(false)
      }
    },
  },
  computed: {
    ...mapGetters(['locationInformation', 'message']),
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

p {
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
    margin: 35px 0 15px 0;
    width: 85%;
    display: flex;
    flex-direction: column;
  }

  p {
    padding: 60px 0 10px 0;
  }

  input {
    border-radius: 25px;
    width: 100%;
  }

  button {
    border-radius: 25px;
    left: 40%;
    top: 10vh;
  }

  label {
    font-size: 12px;
    width: 100%;
  }
}
</style>
