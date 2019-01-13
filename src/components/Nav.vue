<template>
  <nav>
    <router-link :to="{ name: 'addNew' }"><button>+ Add New</button></router-link>
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

button {
  font-size: 16px;
  padding: 8px 14px;
  background-color: $orange;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  border: 1px solid white;
}

button:hover {
  background-color: transparent;
  color: $orange;
  border: 1px solid $orange;
  cursor: pointer;
}

button:focus {
  background-color: transparent;
  color: $orange;
  border: 1px solid $orange;
}
</style>
