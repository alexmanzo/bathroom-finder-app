<template>
  <form id="search-form" @submit.prevent="submitSearch">
    <label for="userInput">Enter your search term</label>
    <input type="text" name="userInput" v-model="searchTerm">
    <button>Search</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    }
  },
  methods: {
    submitSearch() {
      if (this.searchTerm === '') {
        console.log('no search entered')
      } else {
        console.log(this.searchTerm)
      }
      this.searchTerm = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';
</style>
