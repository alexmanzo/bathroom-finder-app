<template>
  <div id="register">
    <form id="registration-form" @submit.prevent="registerUser">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="user.username" required />
      <label for="email">Email</label>
      <input type="email" v-model="user.email" id="email" required />
      <label for="password">Password</label>
      <input type="password" v-model="user.password" id="password" required />
      <label for="password-confirm">Confirm Password</label>
      <input type="password" v-model="user.passwordConfirm" id="password-confirm" />
      <label for="firstName">First Name</label>
      <input type="text" v-model="user.firstName" id="lirstName" required />
      <label for="lastName">Last Name</label>
      <input type="text" v-model="user.lastName" id="lastName" required />
      <button class="register-button">Register</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        firstName: '',
        lastName: '',
        admin: false,
      },
    }
  },
  methods: {
    ...mapActions({ setMessage: 'setMessage' }),
    async registerUser() {
      if (this.user.password !== this.user.passwordConfirm) {
        this.setMessage("Sorry, passwords don't match. Try again!")
        return
      }
      try {
        await axios.post('https://gentle-lake-28954.herokuapp.com/api/users', {
          username: this.user.username,
          password: this.user.password,
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          admin: false,
        })
        this.setMessage('Success!')
      } catch (err) {
        this.setMessage(`Sorry, ${err.response.data.message}`)
      }
    },
  },
  computed: {
    ...mapGetters(['message']),
  },
  mounted() {
    // this.$eventBus.$on('triggerSearch', place => {
    //   this.searchLocation(place)
    // })
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';

#register {
  text-align: center;
  width: 600px;
  margin: 0 auto;
}
label {
  display: block;
  text-align: left;
  padding: 0 0 10px 10px;
}
input {
  font-size: 20px;
  width: calc(100% - 40px);
  color: $font-color;
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid $orange;
  position: relative;
  margin-bottom: 25px;
}
/* Button */
.register-button {
  display: block;
  margin-right: auto;
  font-size: 20px;
  border-radius: 25px;
  padding: 10px 20px;
  background-color: $orange;
  color: white;
  border: 1px solid $orange;
}

.register-button:focus {
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
}

.register-button:hover {
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
}

.register-button:active {
  background-color: white;
  color: $orange;
}
</style>
