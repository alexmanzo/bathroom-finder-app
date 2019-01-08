<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import 'main.scss';

body {
  background-color: $background;
}

#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color;
}
</style>
