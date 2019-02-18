<template>
  <div id="add-new-location" @submit.prevent="formatLocation">
    <h2>First, let's search for the location you'd like to add:</h2>
    <autocomplete-form v-if="formVisible"></autocomplete-form>
    <p>{{message}}</p>
    <button @click.prevent="resetForm" v-if="addAnotherVisible">Add another?</button>
    <button @click.prevent="resetForm" v-if="startOverVisible">Start Over</button>
    <div v-if="previewVisible" id="preview">
      <h2>Does this look right?</h2>
      <div id="place-preview">
        <p>
          <strong>{{ locationInformation.name }}</strong>
        </p>
        <p>{{ this.street_number }} {{ this.route }}</p>
        <p>{{ this.city }}, {{this.state}} {{this.zip}}</p>
      </div>
      <button @click.prevent="postLocation">Submit Location</button>
      <button @click.prevent="resetForm">Start Over</button>
    </div>
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
    return {
      addAnotherVisible: false,
      startOverVisible: false,
      previewVisible: false,
      formVisible: true,
      street_number: '',
      route: '',
      city: '',
      state: '',
      zip: '',
    }
  },
  methods: {
    ...mapActions({
      setMessage: 'setMessage',
      setLocationInformation: 'setLocationInformation',
    }),
    formatLocation() {
      this.formVisible = false
      if (this.locationInformation.address_components.length < 5) {
        this.setMessage(
          'Sorry, we require more specific information to add a location.'
        )
        this.startOverVisible = true
      } else {
        this.locationInformation.address_components.forEach(component => {
          switch (component.types[0]) {
            case 'street_number':
              this.street_number = component.long_name
              break
            case 'route':
              this.route = component.long_name
              break
            case 'locality':
              this.city = component.long_name
              break
            case 'postal_code':
              this.zip = component.long_name
              break
            case 'administrative_area_level_1':
              this.state = component.short_name
              break
          }
        })

        this.previewVisible = true
      }
    },
    async postLocation() {
      try {
        await axios.post(
          'https://gentle-lake-28954.herokuapp.com/api/locations',
          {
            name: this.locationInformation.name,
            street: this.street_number + ' ' + this.route,
            city: this.city,
            state: this.state,
            zip: this.zip,
            type: this.locationInformation.types,
            googlePlaceId: this.locationInformation.place_id,
            loc: {
              type: 'Point',
              coordinates: [
                this.locationInformation.geometry.location.lng(),
                this.locationInformation.geometry.location.lat(),
              ],
            },
          }
        )
        this.setMessage(
          'Location added succesfully! Thanks for your contribution.'
        )
        this.previewVisible = false
        this.startOverVisible = true
      } catch (err) {
        this.previewVisible = false
        this.startOverVisible = true
        this.setMessage(`Sorry, ${err.response.data.message}.`)
      }
    },
    resetForm() {
      this.setMessage('')
      this.setLocationInformation({})
      this.previewVisible = false
      this.formVisible = true
      this.startOverVisible = false
    },
  },
  computed: {
    ...mapGetters(['locationInformation', 'message']),
  },
  mounted() {
    this.$eventBus.$on('triggerSearch', place => {
      this.searchLocation(place)
    })
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';
h2 {
  font-size: 32px;
}

#add-new-location {
  position: relative;
  margin: 45px auto;
  text-align: center;
}
#preview {
  margin-top: 50px;
  position: relative;
}
#autocomplete-form fieldset {
  margin-right: 70px;
  border: none;
}
#preview p,
#message p {
  font-size: 22px;
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
/* Button */
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
