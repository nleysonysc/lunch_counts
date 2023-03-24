import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('asset', () => {
  let messages = ref({})

  function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  function add(message){
    console.log()
    let key = String(Math.abs(hashCode(message+String(Date.now()))))
    messages.value[key] = message
    setTimeout(_=> delete messages.value[key], 2000)
  }

  return { messages, add}
})
