<template>
  <div id="login">
    <p class="welcome-message">{{ message }}</p>
    <form id="login-form" @submit.prevent="loginUser">
      <label for="username">Username</label>
      <input type="text" v-model="username" id="username" required />
      <label for="password">Password</label>
      <input type="password" v-model="password" id="email" required />
      <div class="submit-container">
        <button class="login-button">Login</button>
        <p class="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          New?
          <a href="/register">Register</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    ...mapActions({ setMessage: 'setMessage' }),
    async loginUser() {
      try {
        await axios.post(
          'https://gentle-lake-28954.herokuapp.com/api/auth/login',
          {
            username: this.username,
            password: this.password,
          }
        )
        this.setMessage('Success!')
      } catch (err) {
        if (err.response.status === 401) {
          this.setMessage(
            'Username or password are incorrect, please try again.'
          )
        } else {
          this.setMessage('Sorry, somethign went wrong.')
        }
      }
    },
  },
  computed: {
    ...mapGetters(['message']),
  },
  mounted() {
    this.setMessage('Welcome! Please log in to access your account.')
    // this.$eventBus.$on('triggerSearch', place => {
    //   this.searchLocation(place)
    // })
  },
}
</script>

<style lang="scss" scoped>
@import 'main.scss';

#login {
  text-align: center;
  width: 600px;
  margin: 0 auto;
}
.welcome-message {
  margin-bottom: 50px;
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
.submit-container {
  display: flex;
  justify-content: flex-end;

  .forgot-password {
    margin-right: 25px;
  }
}
/* Button */
.login-button {
  display: block;
  margin-right: auto;
  font-size: 20px;
  border-radius: 25px;
  padding: 10px 20px;
  background-color: $orange;
  color: white;
  border: 1px solid $orange;
}

.login-button:focus {
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
}

.login-button:hover {
  background-color: transparent;
  border: 1px solid $orange;
  color: $orange;
}

.login-button:active {
  background-color: white;
  color: $orange;
}
</style>
