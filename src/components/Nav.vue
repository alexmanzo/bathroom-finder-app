<template>
  <nav>
    <ul>
      <li v-for="item in navItems" :key="item">{{ item }}</li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navItems: ['Sign In', 'Sign Up'],
    }
  },
}
</script>


<style scoped lang="scss">
@import 'main.scss';

ul {
  padding-inline-start: 0;
}

li {
  list-style: none;
  color: $orange;
  font-weight: 500;
  font-size: 20px;
}

@media screen and (max-width: $large) {
  li {
    font-size: 16px;
  }
}

@media screen and (max-width: $medium) {
  li {
    font-size: 18px;
  }
}
</style>
