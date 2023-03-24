<script setup>
  import { useMessageStore } from '../stores/messageStore'

  let messageStore = useMessageStore()
  
</script>

<template>
      <v-fade-transition group="true">
        <v-card 
          v-for="(message, key) in messageStore.messages" 
          :key="key" 
          variant="outlined"
          class="pa-2 ma-1"
        >
          {{ message }}
        </v-card>
      </v-fade-transition>
</template>

<style scoped>

</style>