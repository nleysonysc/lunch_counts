<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  let inputVal = ref("")
  let inputField = ref()
  let router = useRouter()

  let props = defineProps({
    onEnter: Function
  })

  function onReturn(e) {
    if(e.keyCode === 13 || e.keyCode === 10){
      if (typeof props.onEnter === 'function'){
        props.onEnter(inputVal.value)
      }
      inputVal.value = ""
      inputField.value.focus()
    }
  }

</script>

<template>
      <v-text-field
        v-model="inputVal"
        clearable
        label="ID"
        :rules="[v=> v&&!v.match(/^\d+$/) ? 'Must be a number' : true]"
        variant="underlined"
        autofocus
        density="comfortable"
        height="auto"
        hint="Scan a card or enter a student ID and press enter"
        class="pa-6"
        @keydown="onReturn"
        ref="inputField"
      >
      </v-text-field>
</template>

<style scoped>

</style>