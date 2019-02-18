<template>
  <header>
    <router-link :to="{ name: 'home' }">
      <i class="fas fa-transgender-alt" @click="handleClick"></i>
    </router-link>
    <router-link :to="{ name: 'home' }">
      <h1 @click="handleClick">All-Gender Bathroom Finder</h1>
    </router-link>
    <app-nav></app-nav>
  </header>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    'app-nav': Nav,
  },
  methods: {
    ...mapActions({
      resetPage: 'resetPage',
    }),
    handleClick() {
      this.resetPage()
    },
  },
}
</script>


<style scoped lang="scss">
@import 'main.scss';

header {
  display: flex;
  padding: 25px;
  justify-content: center;
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

a {
  text-decoration: none;
  color: $blue;
}

nav {
  align-self: center;
  padding-left: 65px;
}

@media screen and (max-width: $large) {
  nav {
    padding-left: 25px;
  }

  h1 {
    font-size: 40px;
    -webkit-margin-before: 0.75em;
  }

  i {
    font-size: 110px;
  }
}

@media screen and (max-width: $medium) {
  header {
    display: block;
    text-align: center;
    padding: 10px;
    width: 75%;
    margin: 0 auto;
  }

  h1 {
    padding-left: 0;
  }

  nav {
    padding-left: 0;
  }
}
</style>
