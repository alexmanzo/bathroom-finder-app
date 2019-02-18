<template>
  <div id="add-new-location" @submit.prevent="searchLocation">
    <h2>First, let's search for the location you'd like to add:</h2>
    <autocomplete-form></autocomplete-form>
    <div id="message" :class="showMessage">
      <p>{{message}}</p>
      <button @click.prevent="resetForm" :class="showAddAnother">Add another?</button>
      <button @click.prevent="resetForm" :class="showStartOver">Start Over</button>
    </div>
    <div :class="showPreview" id="preview">
      <h2>Does this look right?</h2>
      <div id="place-preview">
        <p>
          <strong>{{ place.name }}</strong>
        </p>
        <p>{{ place.street_number }} {{ place.route }}</p>
        <p>{{ place.city }}, {{place.state}} {{place.zip}}</p>
      </div>
      <button @click.prevent="postLocation">Submit Location</button>
      <button @click.prevent="resetForm">Start Over</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AutocompleteSearch from '@/components/AutocompleteSearch.vue'

export default {
  components: {
    'autocomplete-form': AutocompleteSearch,
  },
  data() {
    return {
      place: {
        name: '',
        street_number: '',
        route: '',
        city: '',
        state: '',
        zip: '',
        locationType: [],
        googlePlaceId: '',
        loc: {
          type: 'Point',
          coordinates: [],
        },
      },
      message: '',
      previewVisible: false,
      formVisible: true,
      messageVisible: false,
    }
  },
  methods: {
    //async searchLocation(place) {
    // // if (placeInput === undefined) {
    // //   this.message = `Please enter the location you'd like to add.`
    // // } else if (placeInput.route === '' || placeInput.street_number === '') {
    // //   this.message = `Sorry, we require more specific information to add a location`
    // // } else if (placeInput) {
    // this.place.name = name
    // this.place.locationType = types
    // this.place.googlePlaceId = placeId
    // //this.place.loc.coordinates = [geometry.]
    // addressComponents.forEach((component, index) => {
    //   switch (addressComponents[index].types[0]) {
    //     case 'street_number':
    //       this.place.street_number = addressComponents[index].long_name
    //       break
    //     case 'route':
    //       this.place.route = addressComponents[index].long_name
    //       break
    //     case 'locality':
    //       this.place.city = addressComponents[index].long_name
    //       break
    //     case 'postal_code':
    //       this.place.zip = addressComponents[index].long_name
    //       break
    //     case 'administrative_area_level_1':
    //       this.place.state = addressComponents[index].short_name
    //       break
    //   }
    // })
    // // }
    //},
    async postLocation() {
      try {
        await axios.post(
          'https://gentle-lake-28954.herokuapp.com/api/locations',
          this.place
        )
        this.message =
          'Location added succesfully! Thanks for your contribution.'
      } catch (err) {
        this.message = `Sorry, ${err.response.data.message}.`
      }
    },
    resetForm() {
      this.place = {}
    },
  },
  computed: {
    showPreview() {
      return {
        visible: this.previewVisible === true,
        hidden: this.previewVisible === false,
      }
    },
    showForm() {
      return {
        visble: this.formVisible === true,
        hidden: this.formVisible === false,
      }
    },
    showMessage() {
      return {
        visible: this.messageVisible === true,
        hidden: this.messageVisible === false,
      }
    },
    showAddAnother() {
      return {
        visible:
          this.message ===
          'Location added succesfully! Thanks for your contribution.',
        hidden:
          this.message !==
          'Location added succesfully! Thanks for your contribution.',
      }
    },
    showStartOver() {
      return {
        visible:
          this.message ===
          `Sorry, we require more specific information to add a location`,
        hidden:
          this.message !==
          `Sorry, we require more specific information to add a location`,
      }
    },
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
#preview.hidden,
#autocomplete-form.hidden,
#message.hidden,
button.hidden {
  display: none;
}
#preview.visible,
#autocomplete-form.visible,
#message.visible {
  display: block;
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
#preview button,
button.visible {
  border-radius: 25px;
  font-size: 20px;
  padding: 10px 20px;
  background-color: $orange;
  color: white;
  border: 1px solid $orange;
  display: flex;
  margin: 25px auto;
}
#autocomplete-form button {
  font-size: 20px;
  position: absolute;
  border-radius: 0 25px 25px 0;
  padding: 10px 20px;
  background-color: $orange;
  color: white;
  border: 1px solid $orange;
  margin-right: 65px;
}
#preview button:focus,
#autocomplete-form button:focus,
#message.visible button:focus {
  outline: none;
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
}
#autocomplete-form button:hover,
#preview button:hover,
#message.visible button:hover {
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
  cursor: pointer;
}
#autocomplete-form button:active,
#preview button:active,
#message.visible button:active {
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
