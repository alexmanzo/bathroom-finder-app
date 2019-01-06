<template>
  <div id="add-new">
    <app-header></app-header>
    <add-location-form></add-location-form>
  </div>
</template>

<script>
import AddLocationForm from '@/components/AddLocationForm.vue'
export default {
  name: 'add-new',
  components: {
    'add-location-form': AddLocationForm,
  },
}
</script>
