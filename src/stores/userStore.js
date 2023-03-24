import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let userSuggestions = ref([]);
  let userSearch = ref('')
  let loadingSearch = ref(false)

  function userSuggestionsHandler(response) {
    loadingSearch.value = false
    response = JSON.parse(response)
    console.log(response)
    if ('error' in response) {
      console.log(response.error)
    }
    else {
      userSuggestions.value = response.result
    }
  }

  const fetchUserSuggestions = async function(search) {
    if (import.meta.env.DEV) {
      userSuggestions.value = [
        {title: 'fname lname (email@example.com)', value:'email@example.com'},
        {title: 'fname2 lname2 (email2@example.com)', value:'email2@example.com'}
      ]
      return new Promise((resolve, reject)=>{
        resolve(userSuggestions)
        reject("Could not access user object")
      })
    }
    else {
      loadingSearch.value = true
      google.script.run.withSuccessHandler(userSuggestionsHandler).userSuggestions(search);
    }
  }

  watch(userSearch, async(newUserSearch) => {
    if (newUserSearch.length > 2){
      fetchUserSuggestions(newUserSearch)
    }
  })

  return { loadingSearch, fetchUserSuggestions, userSuggestions, userSearch }
})
