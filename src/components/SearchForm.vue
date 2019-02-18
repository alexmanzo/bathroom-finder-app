<template>
  <div>
    <autocomplete-form label="Enter your search for an affirming space" :page="'home'"></autocomplete-form>
    <p v-if="message !== ''">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import AutocompleteSearch from '@/components/AutocompleteSearch.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    'autocomplete-form': AutocompleteSearch,
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
    async getSearchResults() {
      this.setLoading(true)
      this.setMessage('')
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
      }
    },
  },
  computed: {
    ...mapGetters(['locationInformation', 'message']),
  },
  mounted() {
    this.$eventBus.$on('searchForLocations', () => {
      this.getSearchResults()
    })
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
    margin: 35px 0 45px 0;
    width: 85%;
    display: flex;
    flex-direction: column;
  }

  input {
    border-radius: 25px;
    width: 100%;
  }

  button {
    border-radius: 25px;
    left: 40%;
    top: 12vh;
  }

  label {
    font-size: 12px;
    width: 100%;
  }
}
</style>
