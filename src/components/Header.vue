<template>
  <header>
    <i class="fas fa-transgender-alt"></i>
    <h1>All-Gender Bathroom Finder</h1>
    <app-nav></app-nav>
  </header>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  components: {
    'app-nav': Nav,
  },
  props: {},
}
</script>


<style scoped lang="scss">
@import 'main.scss';

header {
  display: flex;
  padding: 25px;
}

i {
  color: $orange;
  font-size: 150px;
}

h1 {
  color: $blue;
  font-size: 48px;
  -webkit-margin-before: 1em;
  padding-left: 5px;
}

nav {
  align-self: center;
  margin-left: auto;
}

@media screen and (max-width: $small) {
  header {
    display: block;
    text-align: center;
    padding: 10px;
    width: 75%;
    margin: 0 auto;
  }

  i {
    font-size: 100px;
  }

  h1 {
    padding-left: 0;
    -webkit-margin-before: 0.5em;
    font-size: 32px;
  }
}
</style>
