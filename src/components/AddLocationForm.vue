<template>
  <div id="add-new-location">
    <form id="autocomplete-form">
      <label for="userInput">Enter the location you'd like to add:</label>
      <input type="text" name="userInput" ref="autocomplete" v-model="autocomplete">
    </form>
    <h2>Does this look right?</h2>
    <div id="place-preview">
      <p>
        <strong>{{ name }}</strong>
      </p>
      <p>{{ street_number }} {{ route }}</p>
      <p>{{ city }}, {{state}} {{zip}}</p>
      <p>{{ loc.coordinates[0]}}, {{ loc.coordinates[1]}}</p>
      <p v-for="type in locationType" :key="type">{{type}}</p>
      <button @click.prevent="postLocation">Submit Location</button>
      <p>{{message}}</p>
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
      googlePlaceId: [],
      loc: {
        type: 'Point',
        coordinates: [],
      },
      states,
      message: '',
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
        this.loc.coordinates.push(place.geometry.location.lat())
        this.loc.coordinates.push(place.geometry.location.lng())
        this.googlePlaceId.push(place.place_id)
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
    postLocation() {
      axios
        .post('https://gentle-lake-28954.herokuapp.com/api/locations', {
          name: this.name,
          street: this.street_number + ' ' + this.route,
          city: this.city,
          state: this.state,
          zip: this.zip,
          type: this.locationType,
          googlePlaceId: this.googlePlaceId,
          loc: this.loc,
        })
        .then(() => {
          this.message =
            'Location added succesfully! Thanks for your contribution.'
          ;(this.autocomplete = ''),
            (this.name = ''),
            (this.street_number = ''),
            (this.route = ''),
            (this.city = ''),
            (this.state = ''),
            (this.zip = null),
            (this.locationType = []),
            (this.googlePlaceId = []),
            (this.loc = {
              type: 'Point',
              coordinates: [],
            })
        })
        .catch(err => {
          this.message = `Uh oh, something went wrong! ${err}`
        })
    },
    // async handleSearch() {
    //   const bathroomLocationData = await axios.get(
    //     `https://gentle-lake-28954.herokuapp.com/api/locations?googlePlaceId=${
    //       this.searchValue.place_id
    //     }`
    //   )
    //   this.$root.$emit('searchSubmitted', bathroomLocationData)
    //   this.searchTerm = ''
    // },
  },
  mounted() {
    this.generateAutocomplete()
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';
</style>
