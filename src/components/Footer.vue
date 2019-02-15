<template>
  <footer>
    <p>Return to
      <br>
      <a href="https://alexmanzo.me">alexmanzo.me</a>
    </p>
    <div class="github">
      <a href="https://github.com/alexmanzo/bathroom-finder-app" target="_blank">
        <i class="fab fa-github"></i>
        <p>See the code!</p>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';

footer {
  padding: 40px;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  display: flex;
}

a {
  color: $orange;
  text-align: center;
}

a:hover {
  text-decoration: none;
  color: $blue;
}

i {
  font-size: 50px;
}

.github > p {
  margin-top: 5px;
}

.github {
  padding-left: 20px;
}

@media only screen and (max-width: $small) {
 footer {
   padding: 20px 0;
   display: block;
 }
 .github {
   padding-left: 0;
 }
}
</style>
