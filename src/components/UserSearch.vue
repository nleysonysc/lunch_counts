<script setup>
  import { ref, watch } from 'vue'
  import { useUserStore } from '../stores/userStore'

  let userStore = useUserStore();
  const props = defineProps({
    onSubmit: Function
  })
  
  let selectedUser = ref("")

  function onSubmit(e) {
    if(e.keyCode === 13 || e.keyCode === 10){
      if (typeof props.onSubmit === 'function'){
        props.onSubmit(selectedUser.value)
      }
      console.log(selectedUser.value)
    }
  }
  

</script>

<template>
  <v-autocomplete
    :items="userStore.userSuggestions"
    v-model="selectedUser"
    v-model:search="userStore.userSearch"
    hide-no-data
    :loading="userStore.loadingSearch"
    density="comfortable"
    variant="underlined"
    class="pa-6"
    clearable
    label="Last Name"
    autofocus
    @keydown="onSubmit"
    hint="Enter a last name"
  >
  </v-autocomplete>
</template>

<style scoped>

</style>
