<template>
  <nav>
    <a href="/add-new">+ Add New</a>
    <a href="/login">Login</a>
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

a {
  font-size: 16px;
  padding: 8px 14px;
  background-color: $orange;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  border: 1px solid white;
  text-decoration: none;
}

a:hover {
  background-color: transparent;
  color: $orange;
  border: 1px solid $orange;
  cursor: pointer;
}

a:focus {
  background-color: transparent;
  color: $orange;
  border: 1px solid $orange;
}

a + a {
  margin-left: 25px;
}
</style>
