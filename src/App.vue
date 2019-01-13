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

#background-container {
  background-image: url(./assets/gender-neutral.svg);
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0.15;
  position: fixed;
  background-repeat: repeat;
  background-size: 150px;
  padding: 0;
  margin: 0;
  z-index: -1;
}

#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color;
}
</style>
