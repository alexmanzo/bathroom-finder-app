<template>
  <input type="text" name="userInput" ref="input" placeholder="Durham, NC 27712">
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      setLocationInformation: 'setLocationInformation',
    }),
    generateAutocomplete() {
      // Intializes Google's autocomplete functionality on text input.
      const autocompleteSearchBox = new google.maps.places.Autocomplete(
        this.$refs.input
      )
      autocompleteSearchBox.setFields([
        'place_id',
        'address_components',
        'geometry',
        'name',
        'types',
        'vicinity',
      ])
      // When a user selects a place from the list, it fires a 'place_changed' event. This adds a listener for that.
      autocompleteSearchBox.addListener('place_changed', () => {
        const place = autocompleteSearchBox.getPlace()
        this.setLocationInformation(place)
      })
    },
  },
  mounted() {
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
    top: 55px;
  }

  label {
    font-size: 12px;
    width: 100%;
  }
}
</style>
