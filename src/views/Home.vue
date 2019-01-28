<template>
  <div id="home">
    <app-header></app-header>
    <search-form></search-form>
    <results></results>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Results from '@/components/Results.vue'
import SearchForm from '@/components/SearchForm.vue'
export default {
  name: 'home',
  components: {
    results: Results,
    'search-form': SearchForm,
    'app-footer': Footer,
  },
}
</script>
