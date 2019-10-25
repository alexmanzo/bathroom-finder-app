<template>
  <div id="add-new">
    <app-header></app-header>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    'login-form': LoginForm,
  },
  name: 'login',
}
</script>
