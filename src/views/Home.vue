<template>
  <div id="home">
    <app-header></app-header>
    <search-form></search-form>
    <results></results>
  </div>
</template>

<script>
import Results from '@/components/Results.vue'
import SearchForm from '@/components/SearchForm.vue'
export default {
  name: 'home',
  components: {
    results: Results,
    'search-form': SearchForm,
  },
}
</script>
