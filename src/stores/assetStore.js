import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAssetStore = defineStore('asset', () => {
  let activeAsset = ref(new Map())
  const searchResults = ref([])
  const searchSuggestions = ref([])
  let searchTerm = ref("")
  let loadingSearch = ref(false)
  let loadingAsset = ref(false)

  function activeAssetHandler(response){
    loadingAsset.value = false
    response = JSON.parse(response)
    if ('error' in response) {
      console.log(response.error)
    }
    else {
      let result = JSON.parse(response.result)
      activeAsset.value = {rowNum: result.rowNum, data: new Map(result.data)}
    }
  }

  function searchSuggestionsHandler(response){
    loadingSearch.value = false
    response = JSON.parse(response)
    console.log(response)
    if ('error' in response) {
      console.log(response.error)
    }
    else {
      searchSuggestions.value = response.result
    }
  }

  async function fetchAssetByRow(rowNum) {
    if (import.meta.env.DEV) {
      activeAsset.value = {rowNum: 1, data: new Map([["Serial", 'FE34AH4'], ["Location", "room 12"], ["Checked_In", true], ["Tag", "asdf1234"]])}
      return new Promise((resolve, reject) => {
        resolve(activeAsset)
        reject("Could not find asset at row "+rowNum)
      })
    }
    else {
      loadingAsset.value = true
      google.script.run.withSuccessHandler(activeAssetHandler).getAssetByRow(rowNum);
    }
  }

  async function fetchAssetByTag(tag) {
    if (import.meta.env.DEV) {
      activeAsset.value = {rowNum: 1, data: new Map([["Serial", 'FE34AH4'], ["Location", "room 12"], ["Checked_In", true], ["Tag", tag]])}
      return new Promise((resolve, reject) => {
        resolve(activeAsset)
        reject("Could not find asset with tag "+tag)
      })
    }

    else {
      loadingAsset.value = true
      google.script.run.withSuccessHandler(activeAssetHandler).getAssetByTag(tag);
    }

  }

  async function fetchAssetBySerial(serialNum) {
    if (import.meta.env.DEV) {
      activeAsset.value = {rowNum: 1, data: new Map([["Serial", serialNum], ["Location", "room 12"], ["Checked_In", true], ["Tag", 'tag']])}
      return new Promise((resolve, reject) => {
        resolve(activeAsset)
        reject("Could not find asset with tag "+tag)
      })
    }

    else {
      loadingAsset.value = true
      google.script.run.withSuccessHandler(activeAssetHandler).getAssetBySerial(serialNum);
    }
  }

  async function fetchSearch(){
    if (import.meta.env.DEV) {
      searchResults.value = [
        new Map([["Serial", 'FE34AH4'], ["Tag", tag]]),
        new Map([["Serial", 'FE34AH4'], ["Tag", tag]]),
        new Map([["Serial", 'FE34AH4'], ["Tag", tag]]),

      ]
      return new Promise((resolve, reject) => {
        resolve(activeAsset)
        reject("Could not find asset with tag "+tag)
      })
    }
    else {
        loadingSearch.value = true
        google.script.run.withSuccessHandler(response=> {activeAsset.value = response.result}).getAssetBySerial();
    }
  }

  function updateActiveAsset(values) {
    loadingAsset.value = true
    google.script.run.withSuccessHandler(activeAssetHandler).withFailureHandler((e)=>console.log(e)).patchRow(activeAsset.value.rowNum, values);
  }

  function addAsset(values, success=_=>_, failure=_=>_) {
    google.script.run.withSuccessHandler(success).withFailureHandler(failure).addAsset(values);
  }

  function bulkCheckIn(tags, callback=_=>null, userObject=null){
    google.script.run
      .withSuccessHandler(callback)
      .withFailureHandler((e)=>console.log(e))
      .withUserObject(userObject)
      .bulkCheckIn(tags);
  }

  watch(searchTerm, async(newTerm, oldTerm) => {
    // fetch search suggestions from backend
    if (newTerm.length > 2) {
      if (import.meta.env.DEV) {
        searchSuggestions.value = [
          {rowNum: 1, headerName: 'Asset', value: newTerm},
          {rowNum: 7, headerName: 'Asset', value: 'asdf4657'},
          {rowNum: 4, headerName: 'Asset', value: 'asdf5656'}
        ]
      }
      else {
        loadingSearch.value = true
        google.script.run.withSuccessHandler(searchSuggestionsHandler).getSearchSuggestions(newTerm, ['Tag', 'Serial']);
      }
    }
  })

  return { addAsset, fetchAssetBySerial, activeAsset, bulkCheckIn, updateActiveAsset, fetchAssetByRow, fetchAssetByTag, searchSuggestions, searchTerm, loadingAsset, loadingSearch }
})
