<template>
  <div id="add-new-location" @submit.prevent="searchLocation">
    <form id="autocomplete-form" :class="showForm">
      <h2>First, let's search for the location you'd like to add:</h2>
      <fieldset>
        <input type="text" name="userInput" ref="autocomplete" v-model="autocomplete">
        <button type="submit">Search</button>
      </fieldset>
    </form>
    <div id="message" :class="showMessage">
      <p>{{message}}</p>
      <button @click.prevent="resetForm" :class="showAddAnother">Add another?</button>
    </div>
    <div :class="showPreview" id="preview">
      <h2>Does this look right?</h2>
      <div id="place-preview">
        <p>
          <strong>{{ name }}</strong>
        </p>
        <p>{{ street_number }} {{ route }}</p>
        <p>{{ city }}, {{state}} {{zip}}</p>
      </div>
      <button @click.prevent="postLocation">Submit Location</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import states from '@/states.json'
export default {
  data() {
    return {
      autocomplete: '',
      name: '',
      street_number: '',
      route: '',
      city: '',
      state: '',
      zip: null,
      locationType: [],
      googlePlaceId: '',
      loc: {
        type: 'Point',
        coordinates: [],
      },
      states,
      message: '',
      previewVisible: false,
      formVisible: true,
      messageVisible: false,
    }
  },
  methods: {
    generateAutocomplete() {
      const autocompleteSearchBox = new google.maps.places.Autocomplete(
        this.$refs.autocomplete
      )
      this.input = autocompleteSearchBox
      autocompleteSearchBox.setFields([
        'place_id',
        'address_components',
        'geometry',
        'name',
        'types',
        'vicinity',
      ])
      autocompleteSearchBox.addListener('place_changed', () => {
        let place = autocompleteSearchBox.getPlace()

        this.name = place.name
        this.loc.coordinates = [
          place.geometry.location.lng(),
          place.geometry.location.lat(),
        ]
        this.googlePlaceId = place.place_id
        this.locationType = place.types
        place.address_components.forEach((component, index) => {
          switch (place.address_components[index].types[0]) {
            case 'street_number':
              this.street_number = place.address_components[index].long_name
              break
            case 'route':
              this.route = place.address_components[index].long_name
              break
            case 'locality':
              this.city = place.address_components[index].long_name
              break
            case 'postal_code':
              this.zip = place.address_components[index].long_name
              break
            case 'administrative_area_level_1':
              this.state = place.address_components[index].short_name
              break
          }
        })
      })
    },
    searchLocation() {
      if (this.autocomplete === '') {
        this.message = `Please enter the location you'd like to add.`
        this.messageVisible = true
      } else {
        this.previewVisible = true
        this.autocomplete = ''
      }
    },
    async postLocation() {
      try {
        await axios.post(
          'https://gentle-lake-28954.herokuapp.com/api/locations',
          {
            name: this.name,
            street: this.street_number + ' ' + this.route,
            city: this.city,
            state: this.state,
            zip: this.zip,
            type: this.locationType,
            googlePlaceId: this.googlePlaceId,
            loc: this.loc,
          }
        )
        this.message =
          'Location added succesfully! Thanks for your contribution.'
        this.previewVisible = false
        this.formVisible = false
        this.messageVisible = true
      } catch (err) {
        this.message = `Sorry, ${err.response.data.message}.`
        this.previewVisible = false
        this.formVisible = true
        this.messageVisible = true
      }
    },
    resetForm() {
      ;(this.name = ''),
        (this.street_number = ''),
        (this.route = ''),
        (this.city = ''),
        (this.state = ''),
        (this.zip = null),
        (this.locationType = []),
        (this.googlePlaceId = ''),
        (this.loc = {
          type: 'Point',
          coordinates: [],
        }),
        (this.message = ''),
        (this.previewVisible = false),
        (this.formVisible = true),
        (this.messageVisible = false)
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
        hidden: this.message !==
          'Location added succesfully! Thanks for your contribution.',
      }
    },
  },
  mounted() {
    this.generateAutocomplete()
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
button.visible  {
  border-radius: 25px;
  font-size: 20px;
  padding: 10px 20px;
  background-color: $orange;
  color: white;
  border: 1px solid $orange;
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
