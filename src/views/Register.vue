<template>
  <div id="add-new">
    <app-header></app-header>
    <register-form></register-form>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  components: {
    'register-form': RegisterForm,
  },
  name: 'register',
}
</script>
