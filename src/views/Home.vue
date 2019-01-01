<template>
  <div id="home">
    <app-header></app-header>
    <results></results>
  </div>
</template>

<script>
import Results from '@/components/Results.vue'

export default {
  name: 'home',
  components: {
    results: Results,
  },
}
</script>
